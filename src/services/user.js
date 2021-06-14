import axios from 'axios'
import localdb from '../utils/localdb'
const baseUrl = '/api/users'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${localdb.loadUser().token}` },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createUser = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const getUser = async id => {
  const response = await axios.get(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const updateUser = async user => {
  const response = await axios.put(`${baseUrl}/${user.id}`, user, getConfig())
  return response.data
}

const removeUser = async user => {
  const response = await axios.delete(`${baseUrl}/${user.id}`, getConfig())
  return response.data
}

export default { getAll, createUser, getUser, updateUser, removeUser }
