import noteService from '../services/notes'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_NOTES':
      return action.data
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'DELETE':
      return state.filter(note => note.id !== action.data)
    case 'UPDATE_NOTE':
      const id = action.data.id
      return state.map(note => (note.id !== id ? note : action.data))
    default:
      return state
  }
}

export const getAllNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAllNotes()
    dispatch({
      type: 'GET_NOTES',
      data: notes,
    })
  }
}

export const createNote = createdNote => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTE',
      data: createdNote,
    })
  }
}

export const updateNote = updatedNote => {
  return async dispatch => {
    await noteService.updateNote(updatedNote)
    dispatch({
      type: 'UPDATE_NOTE',
      data: updatedNote,
    })
  }
}

export const deleteNote = id => {
  return async dispatch => {
    await noteService.removeNote(id)
    dispatch({
      type: 'DELETE',
      data: id,
    })
  }
}

export default noteReducer
