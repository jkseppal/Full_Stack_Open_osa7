import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'

const SingleBlog = ({ blogList, addLike }) => {
  const [content, setContent] = useState('')
  const id = useParams().id
  const blogToShow = blogList.find(blog => blog.id === id)

  const handleLike = (event) => {
    event.preventDefault()
    const likedBlog = {
      url: blogToShow.url,
      title: blogToShow.title,
      author: blogToShow.author,
      user: blogToShow.user,
      likes: (blogToShow.likes + 1),
      id: blogToShow.id
    }
    addLike(likedBlog)
  }

  const addComment = async (event) => {
    event.preventDefault()
    const commentToBeAdded = {
      content: content
    }
    console.log('comment: ', commentToBeAdded)
    blogService.postComment(id, commentToBeAdded)
    window.location.reload()
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  if (!blogToShow) {
    return null
  }

  return (
    <div>
      <h2>{blogToShow.title} by {blogToShow.author}</h2>
      <div>
        <a href={blogToShow.url}>{blogToShow.url}</a><br />
        {blogToShow.likes} likes <button onClick={handleLike}>like</button><br />
        added by {blogToShow.user.name}
      </div>
      <div>
        <h4>comments</h4>
        <div>
          <form onSubmit={addComment}>
            <div>
              <input value={content} onChange={handleContentChange} />
              <button type="submit">add comment</button>
            </div>
          </form>
        </div>
        <ul>
          {blogToShow.comments.map(c =>
            <li key={c}>
              {c}
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default SingleBlog