import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'
import imageReducer from './reducers/imageReducer'

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer,
  loggedUser: loginReducer,
  image: imageReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
