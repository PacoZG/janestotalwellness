import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async data => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

const update = async updatedNote => {
  const response = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote)
  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, update, remove }
