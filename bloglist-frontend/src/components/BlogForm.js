import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Label>title:</Form.Label>
              </td>
              <td>
                <Form.Control
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>author:</Form.Label>
              </td>
              <td>
                <Form.Control
                  id="author"
                  value={author}
                  onChange={handleAuthorChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>url:</Form.Label>
              </td>
              <td>
                <Form.Control
                  id="url"
                  value={url}
                  onChange={handleUrlChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button variant="success" id="submit-button" type="submit">create</Button>
      </Form>
    </div>
  )
}

export default BlogForm