import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const MyClients = () => {

  const messageData = useSelector(state => state.notification)

  const dispatch = useDispatch()
  const showModal = () => {
    dispatch(setNotification({ message: 'bien', title: 'open', show: true }))
    //console.log('MESSAGE: ', messageData)
  }
    return (
      <div>
        <div className="bg-gray-100 min-h-screen pt-28">
          <h3>My clients</h3>
          <button onClick={showModal}> BUTTON</button>
        </div>
      </div>
    )
  }
  
  export default MyClients