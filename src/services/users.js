import axios from 'axios'
import localdb from '../utils/localdb'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  //console.log('REQUEST: ', response)
  return response.data
}

const createUser = async (newUser) => {
  console.log('USER_TO_SAVE: ', newUser)
  //const response = await axios.post(baseUrl, newUser)
  //return response.data
}


export default { getAll, createUser }