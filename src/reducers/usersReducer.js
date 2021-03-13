import usersService from '../services/users'
import localdb from '../utils/localdb'

const userReducer = (state = [], action) => {
  // console.log('BLOGS STATE IN BLOGREDUCER:', state)
  // console.log('BLOGS ACTION.TYPE IN BLOGREDUCER:', action)
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    // case 'NEW_USER':
    // return state.concat(action.data)
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
    const users = await usersService.getAllUsers()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

// export const createUser = (user) => {
//   return async (dispatch) => {
//     const newUser = await usersService.createUser(user)
//     const newBlogwUser = { ...newBlog, user: localdb.loadUser() }
//     dispatch({
//       type: 'NEW_USER',
//       data: newBlogwUser,
//     })
//   }
// }

// export const likeBlog = (blog) => {
//   const updatedBlog = { ...blog, likes: blog.likes + 1 }
//   return async (dispatch) => {
//     const changedBlog = await blogService.update(updatedBlog)
//     dispatch({
//       type: 'LIKE',
//       data: changedBlog,
//     })
//   }
// }

// export const deleteUser = (blog) => {
//   return async (dispatch) => {
//     await blogService.remove(blog.id)
//     dispatch({
//       type: 'DELETE',
//       data: blog.id,
//     })
//   }
// }

// export const commentBlog = (commentedBlog) => {
//   return async dispatch => {
//     const updatedBlog = await blogService.addComment(commentedBlog)
//     dispatch({
//       type: 'COMMENT',
//       data: updatedBlog
//     })
//   }
// }

export default userReducer
