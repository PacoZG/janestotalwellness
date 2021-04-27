import userService from '../services/user'

const userReducer = (state = [], action) => {
  //console.log('USERS STATE IN USERREDUCER:', state)
  //console.log('USERS ACTION IN USERREDUCER:', action.data)
  switch (action.type) {
    case 'NEW_USER':
      return action.data
    case 'GET_USER':
      return action.data
    case 'UPDATE_USER':
      return action.data
    default:
      return state
  }
}

export const createUser = (newUser) => {
  //console.log('USER: ', user)
  return async (dispatch) => {
    dispatch({
      type: 'NEW_USER',
      data: newUser,
    })
  }
}

export const getUser = (id) => {
  return async (dispatch) => {
    const user = await userService.getUser(id)
    dispatch({
      type: 'GET_USER',
      data: user
    })
  }
}

export const updateUser = (user) => {
  console.log('USER IN REDUCER: ', user)
  return async (dispatch) => {
    const updatedUser = await userService.updateUser(user)
    dispatch({
      type: 'UPDATE_USER',
      data: updatedUser
    })
  }
}


export default userReducer
