import noteService from '../services/notes'

const noteReducer = (state = [], action) => {
  console.log('NOTES STATE IN NOTEREDUCER:', state)
  console.log('NOTES ACTION.TYPE IN NOTEREDUCER:', action)
  switch (action.type) {
  case 'GET_NOTES':
    return action.data
  case 'NEW_NOTE':
    console.log(state.concat(action.data))
    return state.concat(action.data)
  case 'DELETE':
    return action.data
  case 'UPDATE_NOTE':
    return 
  default:
    return state
  }
}

export const getAllNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'GET_NOTES',
      data: notes
    })
  }
}

export const createNote = (newNote) => {
  console.log('NEW NOTE IN REDUCER: ', newNote)
  return async (dispatch) => {
    const newNoteUser = { ...newNote, user: newNote.user }
    console.log('NEW USER NOTE IN REDUCER: ', newNoteUser)
    dispatch({
      type: 'NEW_NOTE',
      data: newNoteUser,
    })
  }
}

// export const updateNote = (note) => {
//   const updatedBlog = { ...note, content: note.content }
//   return async (dispatch) => {
//     const changedNote = await noteService.update(updatedNote)
//     dispatch({
//       type: 'UPDATE_NOTE',
//       data: changedNote,
//     })
//   }
// }

export const deleteNote = (id) => {
  console.log('ID RECEIVED IN REDUCER: ', id)
  return async (dispatch) => {
    await noteService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id,
    })
  }
}

export default noteReducer
