import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'
import noteReducer from './reducers/noteReducer'
import blogReducer from './reducers/blogReducer'
import discussionReducer from './reducers/discussionReducer'
import commentReducer from './reducers/commentReducers'

const reducer = combineReducers({
  users: usersReducer,
  notes: noteReducer,
  loggedUser: loginReducer,
  notification: notificationReducer,
  blogs: blogReducer,
  discussions: discussionReducer,
  comments: commentReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
