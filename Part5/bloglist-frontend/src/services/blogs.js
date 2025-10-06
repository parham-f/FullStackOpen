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

const newBlog = async (data, setBlogs, blogs, notifyWith, user) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, data, config)
  setBlogs(blogs.concat({
    ...response.data,
    user: { id: user.id, name: user.name, username: user.username }
  }))
  notifyWith(`A new blog '${data.title}' by '${data.author}' added.`)
  return response.data
}

const updateBlog = async (data, id, blogs, setBlogs, notifyWith) => {
  const config = {
    headers: { Authorization: token }
  }

  const targetURL = `${baseUrl}/${id}`

  const response = await axios.put(targetURL, data, config)
  setBlogs(blogs.map(b => (b.id === id ? {...b, likes: data.likes} : b)))
  notifyWith(`'${data.title} - ${data.author}' blog updated.`)
  return response.data
}

const deleteBlog = async (data, id, blogs, setBlogs, notifyWith) => {
  const config = {
    headers: { Authorization: token }
  }

  const targetURL = `${baseUrl}/${id}`

  const response = await axios.delete(targetURL, config)
  setBlogs(blogs.filter(b => b.id !== id))
  notifyWith(`'${data.title} - ${data.author}' blog deleted.`, true)
  return response.data
}

export default {getAll, newBlog, setToken, updateBlog, deleteBlog}