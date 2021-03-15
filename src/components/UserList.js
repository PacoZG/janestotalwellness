import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersList = () => {

  const users = useSelector(state => state.users)
  console.log('USERS: ', users)

  return (
    null
  )
}

export default UsersList