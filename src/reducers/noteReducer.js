import noteService from '../services/notes'

const noteReducer = (state = [], action) => {
  console.log('NOTES STATE IN BLOGREDUCER:', state)
  console.log('NOTES ACTION.TYPE IN BLOGREDUCER:', action)
  switch (action.type) {
  case 'NEW_NOTE':
    return action.data
  case 'DELETE':
    return action.data
  case 'UPDATE_NOTE':
    return 
  default:
    return state
  }
}

export const createNote = (data) => {
  return async (dispatch) => {
    const newNote = await noteService.create(data)
    const newNoteUser = { ...newNote, user: data.clientId }
    console.log('NEW NOTE IN REDUCER: ', newNote)
    console.log('NEW NOTE IN REDUCER: ', newNoteUser)
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

// export const deleteNote = (blog) => {
//   return async (dispatch) => {
//     await blogService.remove(blog.id)
//     dispatch({
//       type: 'DELETE',
//       data: blog.id,
//     })
//   }
// }

export default noteReducer
