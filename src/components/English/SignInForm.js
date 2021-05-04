import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/index'
import threes from '../../img/threes.png' // image
import { setNotification } from '../../reducers/notificationReducer'
import { userLogin, userLogout } from '../../reducers/loginReducer'
import loginService from '../../services/login'

const SigninForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  // handle automatic logout warning modal
  const [showModal, setShowModal] = useState(false)
  const showConfirmationModal = { display: showModal ? '' : 'none' }
  // console.log('SHOW CONFIRMATION: ', showConfirmationModal)

  const credentials = {
    username: username.params.value.toLowerCase(),
    password: password.params.value,
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('CREDENTIALS: ', credentials)
    // try {
    //   var user = await loginService.login(credentials)
    //   console.log('USER: ', user)
    //   dispatch(userLogin(user))
    //   dispatch(setNotification({
    //     message: `Welcome back ${user.username}`,
    //     title: 'Success',
    //     show: true
    //   }))
    //   history.push('/eng/frontpage')
    // } catch (error) {
    //   //console.log('SIGN IN ERROR: ', error.response.data.error)
    //   dispatch(setNotification({
    //     message: `${error.response.data.error}`,
    //     title: 'Login error',
    //     show: true
    //   }))
    // }

    try {
      // debugger
      var user = await loginService.login(credentials)
      // console.log('USER: ', user)
      dispatch(userLogin(user))
      setAutoLogout()
      if (user.userType === 'client') {
        dispatch(setNotification({
          message: `Welcome back ${user.username}, your session will automatically expire in 30 minutes`,
          title: 'Success',
          show: true
        }))
        username.reset()
        password.reset()
      } else {
        dispatch(setNotification({
          message: `Welcome back ${user.username}`,
          title: 'Success',
          show: true
        }))
      }
      history.push('/eng/myprogram')
    } catch (error) {
      //console.log('SIGN IN ERROR: ', error.response.data.error)
      dispatch(setNotification({
        message: `${error.response.data.error}`,
        title: 'Login error',
        show: true
      }))
    }
  }

  let warningTimeout
  let logoutTimeout
  const setAutoLogout = () => {
    // debugger
    // clearTimeout(warningTimeout)
    // clearTimeout(logoutTimeout)
    warningTimeout = setTimeout(() => {
      // console.log(showModal)
      setShowModal(!showModal)
      // console.log(showModal)
    }, 1800000)
  }

  const handleResetTimers = () => {
    // clearTimeout(warningTimeout)
    // clearTimeout(logoutTimeout)
    logoutTimeout = setTimeout(() => {
      dispatch(userLogout())
      dispatch(setNotification({
        message: 'Your session has been expired, please log in again.',
        title: 'Session expired',
        show: true
      }))
      history.push('/eng/frontpage')
    }, 1800000)
    setShowModal(!showModal)
  }

  const handleLogout = () => {
    dispatch(userLogout())
    setShowModal(!showModal)
    history.push('/eng/frontpage')
  }


  return (
    <div className="static min-h-screen flex justify-center bg-gray-300 pt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto rounded" src={threes} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Username</label>
              <input id="username" name="username" autoComplete="off" pattern="[a-z]{1,15}"
                {...username.params}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300
                text-gray-900 rounded-t-md focus:border-gray-500 shadow-sm sm:text-md"
                placeholder="Username" title="Username is required" required />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input id="password" name="password" autoComplete="current-password"
                {...password.params}
                className="z-0 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300
                text-gray-900 rounded-b-md focus:border-gray-500 shadow-sm md:text-md valid-haspopup"
                placeholder="Password" title="Password is required" required />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center pl-2 ">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-gray-500 focus:ring-red-500 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm pr-2 ">
              <Link to='' className="font-medium text-indigo-700 hover:text-indigo-500">Forgot your password?</Link>
            </div>
          </div>

          <div>
            <button id="login-button" type="submit" className="mt-1 mb-6 h-12 w-full bg-gray-500 text-white rounded hover:bg-gray-400
          focus:ring focus:ring-offset-1 focus:ring-red-800 transform transition active:bg-red-800">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
          Sign in</button>
          </div>
        </form>
      </div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        style={showConfirmationModal}>
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
            <button className="pt-2 pr-2 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(!showModal)}  >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-start justify-between p-1 pl-4 pb-2 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold text-gray-700">Session expiration warning</h3>
            </div>
            <div className="relative pl-4 pr-4 pt-4 flex-auto">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 md:mx-0 md:h-10 md:w-10">
                <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">You have been logged in for 30 minutes, would you like to stay for 30 more minutes or logout now?</p>
            </div>
            <div className="flex items-center justify-end p-3 pr-4 border-t border-solid border-blueGray-200 rounded-b">
              <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                    text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-auto md:text-md"
              type="button" onClick={() => handleLogout()} >Logout now</button>
              <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
              text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-auto md:text-md"
              type="button" onClick={() => handleResetTimers()} >Stay logged in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninForm