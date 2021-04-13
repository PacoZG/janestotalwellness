import usersService from '../services/users'

const userReducer = (state = [], action) => {
  console.log('USERS STATE IN USERREDUCER:', state)
  console.log('USERS ACTION IN USERREDUCER:', action.data)
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'NEW_USER':
      return state.concat(action.data)
    case 'GET_USER':
      return action.data
    // case 'DELETE':
    // return state.filter(user => user.id !== action.data)
    // case 'COMMENT': {
    // //console.log('ACTION DATA inside COMMET:', action.data)
    // const id= action.data.id
    // const userToComment = state.find ( user => user.id === id)
    // const changedUser = { ...userToComment, comments: action.data.comments }
    // return state.map((user) => (user.id !== id ? user : changedUser))
    // }
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

export const createUser = (user) => {
  //console.log('USER: ', user)
  return async (dispatch) => {
    const newUser = await usersService.createUser(user)
    dispatch({
      type: 'NEW_USER',
      data: newUser,
    })
  }
}

export const getUser = (id) => {
  return async (dispatch) => {
    const user = await usersService.getUser(id)
    dispatch({
      type: 'GET_USER',
      data: user
    })
  }
}


export default userReducer
