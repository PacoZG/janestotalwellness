import localDB from '../utils/localdb'

const loginReducer = (state = localDB.loadUser(), action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const userLogin = user => {
  return async dispatch => {
    localDB.saveUser(user)
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const userLogout = () => {
  return async dispatch => {
    localDB.removeUser()
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default loginReducer
