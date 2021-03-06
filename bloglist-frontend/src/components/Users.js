import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ userArray }) => {
  console.log('users: ', userArray)

  if (!userArray) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userArray.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users