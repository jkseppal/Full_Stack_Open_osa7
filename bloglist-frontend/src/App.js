import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs, giveLike, createBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  let blogs = useSelector(state => state.blogs)
  let users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  //const [users, setUsers] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
    return false
  }

  const addBlog = (blogOject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogOject))
    dispatch(notificationChange(`a new blog ${blogOject.title} by ${blogOject.author} added`, 5))
  }

  const updateBlog = (blogObject) => {
    dispatch(giveLike(blogObject.id, blogObject, blogObject.likes))
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogsByLikes = (blogs) => {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Error message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          {user.name} logged in
          <button id="logout-button" onClick={handleLogout}>logout</button>
        </p>
        <Switch>
          <Route path='/users/:id'>
            <User userArray={users}></User>
          </Route>
          <Route path='/users'>
            <Users userArray={users} />
          </Route>
          <Route path='/'>

            <div>
              {blogForm()}
            </div>

            {blogsByLikes(blogs)}
            {blogs.map(blog =>
              <Blog addLike={updateBlog} key={blog.id} blog={blog} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App