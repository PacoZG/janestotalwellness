const express = require('express')
const app = express()
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let users = [
  {
    id: 1,
    createdAt: '',
    type: "client",
    name: "Francisco Zavala",
    height: 169,
    weight: 75,
    hobbies: [
      "basketball", "gaming", "music"
    ]
  },
  {
    id: 2,
    createdAt: '',
    type: "admin",
    name: "Jane Pokkinen",
    height: 160,
    weight: 61,
    hobbies: [
      "cooking", "movies", "wine"
    ]
  },
  {
    id: 3,
    createdAt: '',
    type: "client",
    name: "Samuel Pokkinen",
    height: 116,
    weight: 16,
    hobbies: [
      "drawing", "playing", "music"
    ]
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/users', (request, response) => {
  response.json(users)
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/users', (request, response) => {
  const user = {
    id: generateId(),
    createdAt: new Date(),
    ...request.body
  }
  console.log(user)
  response.json(user)
})

app.get('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users.find(user => user.id === id)
  if (user) {
  response.json (user)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/users/:id', (request, response) => {
  const id = Number(reques.params.id)
  user = users.filter (user => user.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
