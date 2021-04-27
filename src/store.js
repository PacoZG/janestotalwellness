import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'
import noteReducer from './reducers/noteReducer'


const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer,
  loggedUser: loginReducer,
  notes: noteReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
