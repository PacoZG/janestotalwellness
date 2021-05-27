import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMMENTS':
      return action.data
    case 'NEW_COMMENT':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAllComments()
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments,
    })
  }
}

export const createComment = comment => {
  console.log('COMMENT IN REDUCER :', comment)
  return async dispatch => {
    const newComment = await commentService.createComment(comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    })
  }
}

export default commentReducer
