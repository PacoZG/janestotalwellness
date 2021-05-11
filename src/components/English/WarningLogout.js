import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../reducers/loginReducer'

const WarningLogout = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const userLanguage = useSelector(state => state.language)
  // console.log('USER LANGUAGE: ', userLanguage)
  const UILanguage = userLanguage ? userLanguage : 'eng'
  // console.log('UI LANGUAGE: ', UILanguage)
  const [showModal, setShowModal] = useState(false)
  const showConfirmationModal = { display: showModal ? '' : 'none' }
  // console.log('SHOW CONFIRMATION: ', showConfirmationModal)

  let logoutTimeout

  // console.log('HISTORY', history)
  useEffect(() => {
    if (loggedUser && loggedUser.userType === 'client') {
      logoutTimeout = setTimeout(() => {
        history.push(`/${UILanguage}/home`)
        dispatch(userLogout())
        setShowModal(!showModal)
      }, 1800000)
    }
  })

  const handleLogin = () => {
    history.push(`/${UILanguage}/signIn`)
    setShowModal(!showModal)
  }

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const getTitle = () => {
    if (UILanguage === 'eng') {
      return 'Session expiration warning'
    } else if (UILanguage === 'fin') {
      return 'Istunnon vanhentumisvaroitus'
    } else if (UILanguage === 'esp') {
      return 'Advertencia de caducidad de la sesión'
    }
  }

  const getMessage = () => {
    if (UILanguage === 'eng') {
      return 'You have been logged in for 30 minutes,'
    } else if (UILanguage === 'fin') {
      return 'Olet kirjautunut sisään 30 minuutiksi. Haluatko pysyä vielä 30 minuuttia tai kirjautua ulos nyt?'
    } else if (UILanguage === 'esp') {
      return 'Has iniciado sesión durante 30 minutos, ¿te gustaría quedarte 30 minutos más o cerrar la sesión ahora?'
    }
  }

  return (
    <div>{UILanguage === 'eng' ?
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        style={showConfirmationModal}>
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
            <div className="pt-2 pr-2 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none" />
            <div className="flex items-start justify-between p-3 pl-4 pb-2 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold text-gray-700">{getTitle()}</h3>
            </div>
            <div className="relative pl-4 pr-4 pt-4 flex-auto">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 md:mx-0 md:h-10 md:w-10">
                <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{getMessage()}</p>
            </div>
            <div className="flex items-center justify-end p-3 pr-4 border-t border-solid border-blueGray-200 rounded-b">
              <button type="button" onClick={handleLogin}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                    text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-auto md:text-md"
              >Login Again</button>
              <button type="button" onClick={handleModal}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
              text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-auto md:text-md"
              >OK</button>
            </div>
          </div>
        </div>
      </div> : null}
    </div>
  )
}

export default WarningLogout