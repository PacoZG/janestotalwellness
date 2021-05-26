import axios from 'axios'
const baseUrl = '/api/discussions'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newDiscussion => {
  console.log('NEW DISCUSSION; ', newDiscussion)
  const response = await axios.post(baseUrl, newDiscussion)
  return response.data
}

export default { getAll, create }
