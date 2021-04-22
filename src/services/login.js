import axios from 'axios'
import localdb from '../utils/localdb'
const baseUrl = '/api/login'

const getConfig = () => {
  return  {
    headers: { Authorization: `bearer ${localdb.loadUser().token}` }
  }
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const updatePassword = async (data) => {
  const response = await axios.put(baseUrl, data, getConfig())
  return response.data
}

export default { login, updatePassword }
