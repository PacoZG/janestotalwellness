import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  //console.log('RESPONSE: ', response)
  return response.data
}

const createUser = async newUser => {
  //console.log('USER_TO_SAVE: ', newUser)
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const getUser = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const updateUser = async user => {
  const response = await axios.put(`${baseUrl}/${user.id}`, user)
  console.log('RESPONSE: ', response)
  return response.data
}

const removeUser = async user => {
  const response = await axios.delete(`${baseUrl}/${user.id}`)
  return response.data
}

export default { getAll, createUser, getUser, updateUser, removeUser }
