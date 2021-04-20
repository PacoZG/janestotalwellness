import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import imageReducer from './reducers/imageReducer'

const reducer = combineReducers({
  users: userReducer,
  notification: notificationReducer,
  loggedUser: loginReducer,
  image: imageReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
