import axios from 'axios'
import localdb from '../utils/localdb'
const baseUrl = '/api/notes'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${localdb.loadUser().token}` },
  }
}

const getAllNotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNote = async data => {
  const response = await axios.post(baseUrl, data, getConfig())
  return response.data
}

const updateNote = async updatedNote => {
  const response = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote, getConfig())
  return response.data
}

const removeNote = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAllNotes, createNote, updateNote, removeNote }
