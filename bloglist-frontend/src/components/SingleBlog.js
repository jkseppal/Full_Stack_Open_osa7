import React from 'react'
import { useParams } from 'react-router-dom'

const SingleBlog = ({ blogList, addLike }) => {
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
    </div>
  )
}

export default SingleBlog