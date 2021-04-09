import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import threes from '../img/threes.png'

import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'
import { userLogin } from '../reducers/loginReducer'
import loginService from '../services/login'

const SigninForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  const credentials = {
    username: username.params.value,
    password: password.params.value,
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('CREDENTIALS: ', credentials)
    try {
      var user = await loginService.login(credentials)
      console.log('USER: ', user)
      dispatch(userLogin(user))
      history.push('/frontpage')
    } catch (exception) {
      dispatch(setNotification('Wrong username or password'))
    }
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-300 pt-40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto rounded" src={threes} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">Sign in to your account</h2>
        </div>
        <Notification />
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Username</label>
              <input id="username" name="username" autoComplete="off" pattern="[a-z]{1,15}"
                {...username.params}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-700 focus:border-blue-700  sm:text-sm"
                placeholder="Username" required />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input id="password" name="password" autoComplete="current-password"
                {...password.params}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300
                text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-700  sm:text-sm valid-haspopup"
                placeholder="Password" required />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-blue-700 focus:ring-indigo-500 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-900">
                Remember me
          </label>
            </div>

            <div className="text-sm">
              <Link to='' className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</Link>
            </div>
          </div>

          <div>
            <button type="submit" className="mt-1 mb-6 h-12 w-full bg-blue-700 text-white rounded hover:-translate-y-0.5
          focus:ring focus:ring-offset-2 focus:ring-blue-700 transform transition active:bg-blue-900">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
          Sign in
        </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SigninForm