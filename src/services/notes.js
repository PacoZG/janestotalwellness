import axios from 'axios'
const baseUrl = '/api/notes'

const getAllNotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNote = async data => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

const updateNote = async updatedNote => {
  const response = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote)
  return response.data
}

const removeNote = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAllNotes, createNote, updateNote, removeNote }
