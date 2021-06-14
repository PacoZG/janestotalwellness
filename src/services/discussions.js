import axios from 'axios'
import localdb from '../utils/localdb'
const baseUrl = '/api/discussions'

const getConfig = () => {
  if (!localdb.loadUser()) {
    return null
  }
  return {
    headers: { Authorization: `bearer ${localdb.loadUser().token}` },
  }
}

const getAllDiscussions = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createDiscussion = async newDiscussion => {
  const response = await axios.post(baseUrl, newDiscussion)
  return response.data
}

const updateDiscussion = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, getConfig())
  return response.data
}

const removeDiscussion = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAllDiscussions, createDiscussion, updateDiscussion, removeDiscussion }
