import localDB from '../utils/localdb'

const loginReducer = (state = localDB.loadUser(), action) => {
  // console.log('ACTION DATA IN LOGINREDUCER:', action.data)
  // console.log('STATE OF STATE IN LOGINREDUCER:',state)
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const userLogin = (user) => {
  // debugger
  return async (dispatch) => {
    localDB.saveUser(user)
    //console.log('USER TOKEN', user.token)
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    localDB.removeUser()
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default loginReducer
