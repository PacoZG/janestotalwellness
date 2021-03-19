import React from 'react-dom'
import { useField } from '../hooks/index'

const SignUpForm = () => {

  const handleSignUp = () => {

  }

  const fullname = useField('name')
  return (
    <div className="py-200 h-screen bg-gray-300 px-2">
      <div className="max-w-md mx-auto bg-white  overflow-hidden md:max-w-md">
      <div className="text-center"> <span className="text-xl text-gray-700">Registration Form</span> </div>
        <div className="md:flex">
          <div className="w-full p-3 px-6 py-10">
            <div className="mt-3 relative"> <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">First name</span> <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600" /> </div>
            <div className="mt-4 relative"> <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Last name</span> <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600" /> </div>
            <div className="mt-4 relative"> <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Email</span> <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600" /> </div>
            <div className="mt-4 relative"> <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Password</span> <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600" /> </div>
            <div className="mt-4"> <button className="h-12 w-full bg-red-600 text-white rounded hover:bg-red-700">Click to proceed <i className="fa fa-long-arrow-right"></i></button> </div>
          </div>
          <div className="w-full p-3 px-6 py-10">
            <div className="mt-3 relative"> <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Last name</span> <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600" /> </div>
            <div className="mt-4 relative"> <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Last name</span> <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600" /> </div>
            <div className="mt-4 relative"> <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Email</span> <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600" /> </div>
            <div className="mt-4 relative"> <span className="absolute p-1 bottom-8 ml-2 bg-white text-gray-400 ">Password</span> <input type="text" className="h-12 px-2 w-full border-2 rounded focus:outline-none focus:border-red-600" /> </div>
            <div className="mt-4"> <button className="h-12 w-full bg-red-600 text-white rounded hover:bg-red-700">Click to proceed <i className="fa fa-long-arrow-right"></i></button> </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpForm