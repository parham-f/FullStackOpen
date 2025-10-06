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

const newBlog = async (data, setBlogs, blogs, notifyWith) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, data, config)
  setBlogs(blogs.concat(response.data))
  notifyWith(`A new blog '${data.title}' by '${data.author}' added.`)
  return response.data
}

export default {getAll, newBlog, setToken}