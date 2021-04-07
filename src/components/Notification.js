import React from 'react'
import { useSelector } from 'react-redux'
import error from '../img/error.jpg'

const Notification = () => {

  const notification = useSelector((state) => state.notification)
  const message = notification.message
  return (
    <div className="flex flex-row self-center" >
      {message ? 
        <div className="flex flex-row self-center bg-gray-300">
          <img className="h-8 opacity-50 ml-3 mr-4" src={error} />
          <i className="pl-4 antialiased text-gray-500 tracking-wide">{message}</i>
        </div>
        : null}
    </div>
  )
}


export default Notification