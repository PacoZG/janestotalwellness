import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import UsersList from './components/UserList'
import { initializeUsers } from './reducers/userReducer'

console.log('USEEFFECT: ', useEffect)

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    < div >
    <p>Hello world</p>
    <UsersList />
  </div >
  )
}

export default App