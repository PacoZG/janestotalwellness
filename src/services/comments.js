import axios from 'axios'
import localdb from '../utils/localdb'
const baseUrl = '/api/comments'

const getConfig = () => {
  if (!localdb.loadUser()) {
    return null
  }
  return {
    headers: { Authorization: `bearer ${localdb.loadUser().token}` },
  }
}

const getAllComments = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createComment = async newComment => {
  const response = await axios.post(baseUrl, newComment)
  return response.data
}

const updateComment = async updatedObject => {
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, getConfig())
  return response.data
}

const removeComment = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const replyComment = async repliedComment => {
  const request = await axios.post(`${baseUrl}/${repliedComment.id}/replies`, repliedComment, getConfig())
  return request.data
}

export default { getAllComments, createComment, updateComment, removeComment, replyComment }
