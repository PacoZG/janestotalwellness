import axios from 'axios'
const baseUrl = '/api/blogs'

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newBlog => {
  console.log('BLOG IN SERVICE: ', newBlog)
  const response = await axios.post(baseUrl, newBlog)
  return response.data
}

const updateBlog = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}

const removeBlog = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const addComment = async commentedBlog => {
  const request = await axios.post(`${baseUrl}/${commentedBlog.id}/comments`, commentedBlog)
  return request.data
}

export default { getAllBlogs, createBlog, updateBlog, removeBlog, addComment }
