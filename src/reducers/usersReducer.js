import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  console.log('USERS STATE IN USERREDUCER:', state)
  console.log('USERS ACTION IN USERREDUCER:', action.data)
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default usersReducer
