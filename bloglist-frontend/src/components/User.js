import React from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ userArray }) => {
  const id = useParams().id
  const userToShow = userArray.find(user => user.id === id)
  if (!userToShow) {
    return null
  }

  return (
    <div>
      <h2>{userToShow.name}</h2>
      <Table striped>
        <thead><h4>added blogs</h4></thead>
        <tbody>
          {userToShow.blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User