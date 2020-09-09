import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const removal = (id) => {
  const config = {
    headers: { Authorization: token }
  }

  return axios.delete(`${baseUrl}/${id}`, config)
}

const postComment = (id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, newObject)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, update, removal, postComment }