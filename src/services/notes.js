import axios from 'axios'
const baseUrl = '/api/notes'

const create = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

// const update = async (updatedObject) => {

//   const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
//   return response.data
// }

// const remove = async (id) => {
//   const response = await axios.delete(`${baseUrl}/${id}`)
//   return response.data
// }

export default { create }