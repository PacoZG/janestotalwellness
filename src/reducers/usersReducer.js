import usersService from '../services/user'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'NEW_USER':
      return state.concat(action.data)
    case 'GET_USER':
      return action.data
    case 'UPDATE_USER':
      const id = action.data.id
      return state.map(user => (user.id !== id ? user : action.data))
    case 'DELETE':
      return state.filter(user => user.id !== action.data)
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export const createUser = newUser => {
  return async dispatch => {
    dispatch({
      type: 'NEW_USER',
      data: newUser,
    })
  }
}

export const getUser = id => {
  return async dispatch => {
    const user = await usersService.getUser(id)
    dispatch({
      type: 'GET_USER',
      data: user,
    })
  }
}

export const updateUser = user => {
  console.log('USER: ', user)
  return async dispatch => {
    const updatedUser = await usersService.updateUser(user)
    dispatch({
      type: 'UPDATE_USER',
      data: updatedUser,
    })
  }
}

export const deleteUser = user => {
  return async dispatch => {
    await usersService.removeUser(user)
    dispatch({
      type: 'DELETE',
      data: user.id,
    })
  }
}

export default usersReducer
