const notificationReducer = (state = [], action) => {
  // console.log('NOTIFICATIONreducer STATE:', state)
  // console.log('NOTIFICATIONreducer ACTION:', action.type)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return []
    default:
      return state
  }
}

export const setNotification = ({ message, title, show }) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        title: title,
        show: show,
      },
    })
  }
}

export const clearNotification = () => ({ type: 'CLEAR_NOTIFICATION' })

export default notificationReducer
