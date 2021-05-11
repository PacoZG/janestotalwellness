const multer = require('../utils/multer')
const imageRouter = require('express').Router()
const converter = require('../utils/fileConverter')
const cloudinary = require('../utils/cloudinary')

imageRouter.post('/', multer.singleUploadControl, async (request, response) => {
  const file = request.file
  try {
    if (!request.file) {
      response.status(400).send({ message: 'Image is not present' })
    }
    //console.log('REQUEST FILE IN SERVER: ', file)
    const file64 = converter.formatBufferTo64(file)
    //console.log('CONVERTED FILE: ', file64)
    const uploadResponse = await cloudinary.cloudinaryUpload(file64.content)
    //console.log('CLOUDINARY RESPONSE: ', uploadResponse)
    return response.status(201).json({
      cloudinaryId: uploadResponse.public_id, url: uploadResponse.secure_url
    })
  } catch (error) {
    return response.status(404).send({ message: error.message })
  }
})

imageRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  // console.log('IMAGE ID SERVER: ', id)
  try {
    const uploadResponse = await cloudinary.cloudinaryDelete(id)
    return response.status(201).json(uploadResponse)
  } catch (error) {
    return response.status(400).send({ message: error.message })
  }
})


module.exports = imageRouter