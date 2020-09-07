import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const id = action.data.id
    const blogToLike = state.find(b => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : likedBlog)
  }
  case 'DELETE': {
    const id = action.data
    const deleteBlog = state.find(blog => blog.id === id)
    const blogs = state.filter(blog => blog.id !== deleteBlog.id)
    return blogs
  }
  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const giveLike = (id, content, likes) => {
  return async dispatch => {
    const likedBlog = await blogService.update(id, content, likes)
    dispatch({
      type: 'LIKE',
      data: likedBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.removal(id)
    dispatch({
      type: 'DELETE',
      data: id,
    })
  }
}

export default blogReducer