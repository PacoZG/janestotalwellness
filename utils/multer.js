const logger = require('./logger')

const formats = ['image/jpeg', 'image/jpg', 'image/png']

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (formats.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Not supported file type'), false)
    }
  }
})

const singleUpload = upload.single('image')

const singleUploadControl = (req, res, next) => {
  singleUpload(req, res, error => {
    if (error) {
      return res.status(404).send({
        message: 'Image upload fail'
      })
    }
    logger.error(error)
    next()
  })
}

module.exports = { singleUploadControl }