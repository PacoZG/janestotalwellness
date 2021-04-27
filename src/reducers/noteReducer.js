import noteService from '../services/notes'

const noteReducer = (state = [], action) => {
  // console.log('NOTES STATE IN NOTEREDUCER:', state)
  // console.log('NOTES ACTION.TYPE IN NOTEREDUCER:', action)
  switch (action.type) {
  case 'GET_NOTES':
    return action.data
  case 'NEW_NOTE':
    debugger
    console.log(state.concat(action.data))
    const updatedList = state.concat(action.data)
    return updatedList 
  case 'DELETE':
    return state.filter(note => note.id !== action.data)
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
  // debugger
  console.log('NEW NOTE IN REDUCER: ', newNote)
  return async (dispatch) => {
    console.log('NEW USER NOTE IN REDUCER: ', newNote)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    })
  }
}

export const updateNote = (updatedNote) => {
  return async (dispatch) => {
    const changedNote = await noteService.update(updatedNote)
    dispatch({
      type: 'UPDATE_NOTE',
      data: changedNote,
    })
  }
}

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
