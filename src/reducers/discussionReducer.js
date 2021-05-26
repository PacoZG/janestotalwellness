import discussionService from '../services/discussions'

const discussionReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_DISCUSSIONS':
      return action.data
    case 'NEW_DISCUSSION':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initializeDiscussions = () => {
  return async dispatch => {
    const discussions = await discussionService.getAll()
    dispatch({
      type: 'INIT_DISCUSSIONS',
      data: discussions,
    })
  }
}

export const createDiscussion = discussion => {
  console.log('DISCUSSION IN REDUCER :', discussion)
  return async dispatch => {
    const newDiscussion = await discussionService.create(discussion)
    dispatch({
      type: 'NEW_DISCUSSION',
      data: newDiscussion,
    })
  }
}

export default discussionReducer
