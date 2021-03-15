import axios from 'axios'
import localdb from '../utils/localdb'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('REQUEST: ', response)
  return response.data
}


export default { getAll }