import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
//import userReducer from './reducers/usersReducer'

const reducer = combineReducers({
  users: userReducer,
  //notification: notificationReducer,
  //user: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
