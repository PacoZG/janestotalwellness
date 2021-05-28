import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  console.log('ACTION IN COMMENT REDUCER: ', action.data)
  switch (action.type) {
    case 'INIT_COMMENTS':
      return action.data
    case 'NEW_COMMENT':
      return state.concat(action.data)
    case 'UPDATE_COMMENT':
      const id = action.data.id
      const toChange = state.find(comment => comment.id === id)
      const changedComment = { ...toChange, content: action.data.content }
      return state.map(comment => (comment.id !== id ? comment : changedComment))
    case 'LIKE_COMMENT': {
      const id = action.data.id
      const toChange = state.find(comment => comment.id === id)
      const changedComment = { ...toChange, likes: toChange.likes + 1 }
      return state.map(comment => (comment.id !== id ? comment : changedComment))
    }
    case 'DISLIKE_COMMENT': {
      const id = action.data.id
      const toChange = state.find(comment => comment.id === id)
      const changedComment = { ...toChange, dislikes: toChange.dislikes + 1 }
      return state.map(comment => (comment.id !== id ? comment : changedComment))
    }
    case 'DELETE_COMMENT':
      return state.filter(comment => comment.id !== action.data)
    case 'REPLY_COMMENT': {
      const id = action.data.id
      const commentToReply = state.find(comment => comment.id === id)
      const changedComment = { ...commentToReply, replies: action.data.replies }
      return state.map(comment => (comment.id !== id ? comment : changedComment))
    }
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
  return async dispatch => {
    const newComment = await commentService.createComment(comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    })
  }
}
export const editComment = editedComment => {
  return async dispatch => {
    const changedComment = await commentService.updateComment(editedComment)
    dispatch({
      type: 'UPDATE_COMMENT',
      data: changedComment,
    })
  }
}

export const likeComment = comment => {
  const likedComment = { ...comment, likes: comment.likes + 1 }
  return async dispatch => {
    const changedComment = await commentService.updateComment(likedComment)
    dispatch({
      type: 'LIKE_COMMENT',
      data: changedComment,
    })
  }
}

export const dislikeComment = comment => {
  const dislikedComment = { ...comment, dislikes: comment.dislikes + 1 }
  return async dispatch => {
    const changedComment = await commentService.updateComment(dislikedComment)
    dispatch({
      type: 'DISLIKE_COMMENT',
      data: changedComment,
    })
  }
}

export const deleteComment = comment => {
  return async dispatch => {
    await commentService.removeComment(comment.id)
    dispatch({
      type: 'DELETE_COMMENT',
      data: comment.id,
    })
  }
}

export const replyComment = repliedComment => {
  return async dispatch => {
    const updatedComment = await commentService.replyComment(repliedComment)
    dispatch({
      type: 'REPLY_COMMENT',
      data: updatedComment,
    })
  }
}

export default commentReducer
