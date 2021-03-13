import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/usersReducer'

const reducer = combineReducers({
  users: usersReducer,
  //notification: notificationReducer,
  user: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
