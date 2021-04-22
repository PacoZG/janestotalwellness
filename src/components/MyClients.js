import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const MyClients = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  console.log('USERS: ', users)
  const showModal = () => {
    dispatch(setNotification({ message: 'bien', title: 'open', show: true }))
  }
    return (
      <div>
        <div className="bg-gray-100 min-h-screen pl-5 pt-28">
          <h3>My clients</h3>
          <button onClick={showModal}>BUTTON</button>
        </div>
      </div>
    )
  }
  
  export default MyClients