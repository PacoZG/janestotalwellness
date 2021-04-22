import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  //console.log('RESPONSE: ', response)
  return response.data
}

const getUser = async (id) => {
  //console.log('ID: ', id)
  const response = await axios.get(`${baseUrl}/${id}`)
  //console.log('FOUND USER:', response.data)
  return response.data
}

export default { getAll,  getUser }