import axios from 'axios'
const baseUrl = '/api/comments'

const getAllComments = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createComment = async newComment => {
  console.log('NEW DISCUSSION; ', newComment)
  const response = await axios.post(baseUrl, newComment)
  return response.data
}

export default { getAllComments, createComment }
