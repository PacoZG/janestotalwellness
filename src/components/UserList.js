import React from 'react'
import { useSelector } from 'react-redux'

const UsersList = () => {

  const users = useSelector(state => state.users)
  console.log('USERS: ', users)

  return (
    <div ></div>
  )
}

export default UsersList