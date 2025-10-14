import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const newBlog = async (data, setBlogs, blogs, user) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, data, config)
  setBlogs(blogs.concat({
    ...response.data,
    user: { id: user.id, name: user.name, username: user.username }
  }))
  return response.data
}

const updateBlog = async (data, id, blogs, setBlogs) => {
  const config = {
    headers: { Authorization: token }
  }

  const targetURL = `${baseUrl}/${id}`

  const response = await axios.put(targetURL, data, config)
  setBlogs(blogs.map(b => (b.id === id ? { ...b, likes: data.likes } : b)))
  return response.data
}

const deleteBlog = async (data, id, blogs, setBlogs) => {
  const config = {
    headers: { Authorization: token }
  }

  const targetURL = `${baseUrl}/${id}`

  const response = await axios.delete(targetURL, config)
  setBlogs(blogs.filter(b => b.id !== id))
  return response.data
}

const addComment = async (comment, id) => {
  const url = `${baseUrl}/${id}/comments`
  const data = {comment: comment}
  const response = await axios.post(url, data)
  return response.data
}

export default { getAll, newBlog, setToken, updateBlog, deleteBlog, addComment }