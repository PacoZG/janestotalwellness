import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { userLogin } from '../reducers/loginReducer'
import loginService from '../services/login'
import localdb from '../utils/localdb'

const SigninForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')

  const loginAgain = localdb.loadUserInfo(username.params.value)
  if (loginAgain) {
    console.log('LOGIN AGAIN: ', loginAgain)
    if (username.params.value === loginAgain.username) {
      password.params.value = loginAgain.password
    }
  }

  const credentials = {
    username: username.params.value.toLowerCase(),
    password: password.params.value,
  }

  const handleLogin = async event => {
    event.preventDefault()

    var remember = document.getElementById('remember_me').checked
    console.log('REMEMBER: ', remember)
    if (remember) {
      localdb.rememberUser({
        username: username.params.value,
        password: password.params.value,
      })
    }

    try {
      var user = await loginService.login(credentials)
      dispatch(userLogin(user))
      if (user.userType === 'client') {
        dispatch(
          setNotification({
            message: t('Signin.Welcome') + user.username + t('Signin.SessionWelcome'),
            title: 'Success',
            show: true,
          })
        )
        username.reset()
        password.reset()
      } else {
        dispatch(
          setNotification({
            message: t('Signin.Welcome') + user.username,
            title: 'Success',
            show: true,
          })
        )
      }
      history.push('/home')
    } catch (error) {
      dispatch(
        setNotification({
          message: `${error.response.data.error}`,
          title: 'Login error',
          show: true,
        })
      )
    }
  }

  return (
    <div className="static min-h-screen flex justify-center bg-gray-300 pt-20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto rounded"
            alt="profile"
            src="https://res.cloudinary.com/dbn5gpgi5/image/upload/v1618604826/sample.jpg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">{t('Signin.Header')}</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">{t('Signin.Username')}</label>
              <input
                id="username"
                name="username"
                autoComplete="on"
                pattern="[a-z0-9]{4,}"
                {...username.params}
                className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full px-3 py-2 rounded-t-md placeholder-gray-200 "
                placeholder={t('Signin.Username')}
                title="Username is required"
                required
              />
            </div>
            <div>
              <label className="sr-only">{t('Signin.Password')}</label>
              <input
                id="password"
                name="password"
                autoComplete="current-password"
                {...password.params}
                className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full px-3 py-2 rounded-b-md placeholder-gray-200 "
                placeholder={t('Signin.Password')}
                title="Password is required"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center pl-2 ">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-gray-500 focus:ring-red-500 border-gray-300 rounded"
              />
              <label className="pl-2 mt-2 text-sm text-gray-600">{t('Signin.Remember')}</label>
            </div>
            <div className="text-sm pr-2 ">
              <Link to="" className="font-medium text-indigo-700 hover:text-indigo-500">
                {t('Signin.ForgotPassword')}
              </Link>
            </div>
          </div>

          <div>
            <button
              id="login-button"
              type="submit"
              className="transition duration-500 mt-1 mb-6 h-12 w-full border bg-gray-500 text-white rounded hover:bg-gray-400 focus:ring focus:ring-offset-0 focus:ring-red-800 transform active:bg-red-800"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {t('Signin.SigninButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SigninForm
