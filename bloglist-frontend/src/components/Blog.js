import React from 'react'
//import { deleteBlog } from '../reducers/blogReducer'
//import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blog = ({ blogList }) => {
  console.log('blogs: ', blogList)
  if (!blogList) {
    return null
  }
  //const dispatch = useDispatch()
  //const [fullView, setFullView] = useState(false)

  /*const deleteButton = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (blog.user.username === user.username) {
        return (
          <button id="delete-button" onClick={handleDelete}>remove</button>
        )
      }
    }
  }*/

  /*const handleFullViewChange = async (event) => {
    event.preventDefault()
    if (fullView === false) {
      setFullView(true)
    } else {
      setFullView(false)
    }
  }*/

  /*const handleLike = async (event) => {
    event.preventDefault()
    const likedBlog = {
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: blog.user,
      likes: (blog.likes + 1),
      id: blog.id
    }
    addLike(likedBlog)
  }*/

  /*const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      window.location.reload()
    }
  }*/

  //if (fullView === false) {
  /******************return (
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
    </div>
  )*************************************/

  return (
    <div>
      <Table striped>
        <tbody>
          {blogList.map(b =>
            <tr key={b.id}>
              <td>
                <Link to={`/blogs/${b.id}`}>{b.title}</Link>
              </td>
              <td>
                {b.author}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )

  /*return (
    <div>
      <p>{blog.title} <button id="hide-button" onClick={handleFullViewChange}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes} <button id="like-button" data-testid="like-button" onClick={handleLike}>like</button><br />
        {blog.author}<br />
        {deleteButton()}</p>
    </div>
  )*/
}

export default Blog
