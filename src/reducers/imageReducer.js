import imageService from '../services/images'

const imageReducer = (state = [], action) => {
  console.log('IMAGE STATE IN IMAGEREDUCER:', state)
  console.log('IMAGE ACTION IN IMAGEREDUCER:', action.data)
  switch (action.type) {
    case 'NEW_IMAGE':
      return action.data
    case 'GET_IMAGE':
      return action.data
    default:
      return state
  }
}

export const postImage = (newImage) => {
  //console.log('IMAGE: ', newImage)
  return async (dispatch) => {
    //const newUser = await usersService.createUser(user)
    dispatch({
      type: 'NEW_IMAGE',
      data: newImage,
    })
  }
}

export const getImage = (id) => {
  return async (dispatch) => {
    const image = await imageService.getImage(id)
    dispatch({
      type: 'GET_IMAGE',
      data: image
    })
  }
}

export default imageReducer