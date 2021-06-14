import axios from 'axios'
import localdb from '../utils/localdb'
const baseUrl = '/api/blogs'

const getConfig = () => {
  if (!localdb.loadUser()) {
    return null
  }
  return {
    headers: { Authorization: `bearer ${localdb.loadUser().token}` },
  }
}

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const updateBlog = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, getConfig())
  return response.data
}

const removeBlog = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const addComment = async commentedBlog => {
  const request = await axios.post(`${baseUrl}/${commentedBlog.id}/comments`, commentedBlog, getConfig())
  return request.data
}

export default { getAllBlogs, createBlog, updateBlog, removeBlog, addComment }
