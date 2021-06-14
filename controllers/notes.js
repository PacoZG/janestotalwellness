const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1 })
  response.status(201).json(notes.map(note => note.toJSON()))
})

notesRouter.post('/', async (request, response) => {
  const { body } = request
  const user = await User.findById(body.user.id)
  const note = new Note({
    user: user._id,
    content: body.content,
    date: new Date(),
  })
  if (body.loggedUserType !== 'admin') {
    response.status(401).json({ error: 'Only admins can write a note' })
  }
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote.toJSON())
})

notesRouter.put('/:id', async (request, response) => {
  const { body } = request
  const note = {
    user: body.user.id,
    content: body.content,
    date: new Date(),
  }
  await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => updatedNote.toJSON())
    .then(savedAndUpdatedNote => {
      response.status(201).json(savedAndUpdatedNote)
    })
})

notesRouter.delete('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (!note) {
    return response.status(400).json({ error: 'Note no longer in the db' })
  }
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).json().end()
})

module.exports = notesRouter
