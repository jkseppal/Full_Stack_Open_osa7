import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ userArray }) => {
  const id = useParams().id
  const userToShow = userArray.find(user => user.id === id)
  if (!userToShow) {
    return null
  }

  return (
    <div>
      <h2>{userToShow.name}</h2>
      <h3>added blogs</h3>
      {userToShow.blogs.map(blog =>
        <div key={blog.id}>
          <div>
            {blog.title}
          </div>
        </div>
      )}
    </div>
  )
}

export default User