import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import UsersList from './components/UserList'
import SignUpForm from './components/SignUpForm'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    < div >
      <SignUpForm />
      
    </div >
    
  )
}

export default App