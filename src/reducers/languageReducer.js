import localdb from '../utils/localdb'

const languageReducer = (state = localdb.loadUserLanguage(), action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.data
    default:
      return state
  }
}


export const switchLanguage = (language) => {
  console.log('LANGUAGE IN REDUCER: ', language)
  return async (dispatch) => {
    localdb.setUserLanguage(language)
    dispatch({
      type: 'SET_LANGUAGE',
      data: language
    })
  }
}

export default languageReducer