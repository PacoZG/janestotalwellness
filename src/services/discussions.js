import axios from 'axios'
const baseUrl = '/api/discussions'

const getAllDiscussions = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createDiscussion = async newDiscussion => {
  const response = await axios.post(baseUrl, newDiscussion)
  return response.data
}

const updateDiscussion = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return response.data
}

const removeDiscussion = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAllDiscussions, createDiscussion, updateDiscussion, removeDiscussion }
