const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1 })
  response.status(201).json(notes.map(note => note.toJSON()))
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('BODY: ', body)
  const user = await User.findById(body.clientId)
  const note = new Note({
    user: user._id,
    title: body.note.title,
    content: body.note.content,
    date: new Date()
  })
  
  if (body.loggedUserType === 'admin') {
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote.toJSON())
  } else {
    response.status(401).json({ error: 'Only admins can write a note' })
  }
})

notesRouter.delete('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).json().end()
  }
  else {
    return response.status(401).json({ error: 'Note no longer in the db' })
  }
})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body
  const note = {
    user: body.user.id,
    title: body.title,
    content: body.content,
    date: new Date()
  }
  await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => updatedNote.toJSON())
    .then(savedAndUpdatedNote => {
      response.status(201).json(savedAndUpdatedNote)
    })
})

module.exports = notesRouter