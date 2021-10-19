require('dotenv').config()

const PORT = process.env.SERVER_PORT || 3001
let MONGODB_URI = process.env.MONGODB_URI

// console.log('NODE_ENV === ', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = { MONGODB_URI, PORT }
