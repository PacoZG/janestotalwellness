import axios from 'axios'
const baseUrl = '/api/images'

const postImage = async (data) => {
  const response = await axios.post(baseUrl, data)
  console.log('RESPONSE: ', response.data)
  return response.data
}

const removeImage = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { postImage, removeImage }