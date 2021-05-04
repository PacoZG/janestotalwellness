import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'
import noteReducer from './reducers/noteReducer'
import languageReducer from './reducers/languageReducer'


const reducer = combineReducers({
  users: usersReducer,
  notes: noteReducer,
  loggedUser: loginReducer,
  notification: notificationReducer,
  language: languageReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
