import discussionService from '../services/discussions'

const discussionReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_DISCUSSIONS':
      return action.data
    case 'NEW_DISCUSSION':
      return state.concat(action.data)
    case 'UPDATE_DISCUSSION':
      const id = action.data.id
      const toChange = state.find(discussion => discussion.id === id)
      const changedDiscussion = { ...toChange, content: action.data.content }
      return state.map(discussion => (discussion.id !== id ? discussion : changedDiscussion))
    case 'LIKE_DISCUSSION': {
      const id = action.data.id
      const toChange = state.find(discussion => discussion.id === id)
      const changedDiscussion = { ...toChange, likes: toChange.likes + 1 }
      return state.map(discussion => (discussion.id !== id ? discussion : changedDiscussion))
    }
    case 'DISLIKE_DISCUSSION': {
      const id = action.data.id
      const toChange = state.find(discussion => discussion.id === id)
      const changedDiscussion = { ...toChange, dislikes: toChange.dislikes + 1 }
      return state.map(discussion => (discussion.id !== id ? discussion : changedDiscussion))
    }
    case 'DELETE_DISCUSSION':
      return state.filter(discussion => discussion.id !== action.data)
    default:
      return state
  }
}

export const initializeDiscussions = () => {
  return async dispatch => {
    const discussions = await discussionService.getAllDiscussions()
    dispatch({
      type: 'INIT_DISCUSSIONS',
      data: discussions,
    })
  }
}

export const createDiscussion = discussion => {
  console.log('DISCUSSION IN REDUCER :', discussion)
  return async dispatch => {
    const newDiscussion = await discussionService.createDiscussion(discussion)
    dispatch({
      type: 'NEW_DISCUSSION',
      data: newDiscussion,
    })
  }
}

export const editDiscussion = editedDiscussion => {
  return async dispatch => {
    const changedDiscussion = await discussionService.updateDiscussion(editedDiscussion)
    console.log('DISCUSSION IN REDUCER: ', editedDiscussion)
    dispatch({
      type: 'UPDATE_DISCUSSION',
      data: changedDiscussion,
    })
  }
}

export const likeDiscussion = discussion => {
  console.log('DISCUSSION: ', discussion)
  const updatedDiscussion = { ...discussion, likes: discussion.likes + 1 }
  return async dispatch => {
    const changedDiscussion = await discussionService.updateDiscussion(updatedDiscussion)
    console.log('LIKE DISCUSSION: ', changedDiscussion)
    dispatch({
      type: 'LIKE_DISCUSSION',
      data: changedDiscussion,
    })
  }
}

export const dislikeDiscussion = discussion => {
  console.log('DISCUSSION: ', discussion)
  const updatedDiscussion = { ...discussion, dislikes: discussion.dislikes + 1 }
  return async dispatch => {
    const changedDiscussion = await discussionService.updateDiscussion(updatedDiscussion)
    dispatch({
      type: 'DISLIKE_DISCUSSION',
      data: changedDiscussion,
    })
  }
}

export const deleteDiscussion = discussion => {
  return async dispatch => {
    await discussionService.removeDiscussion(discussion.id)
    dispatch({
      type: 'DELETE_DISCUSSION',
      data: discussion.id,
    })
  }
}

export default discussionReducer
