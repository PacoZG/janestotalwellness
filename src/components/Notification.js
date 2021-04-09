import React from 'react'
import { useSelector } from 'react-redux'
import error from '../img/error.jpg'

const Notification = () => {

  const notification = useSelector((state) => state.notification)
  const message = notification.message
  return (
    <div className="flex flex-row self-center" >
      {message ?
        <div className="flex flex-row self-center bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p className="pl-1 antialiased text-gray-500 tracking-wide self-center">{message}</p>
        </div>
        : null}
    </div>
  )
}


export default Notification