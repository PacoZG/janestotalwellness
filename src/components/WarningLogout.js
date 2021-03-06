import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { userLogout } from '../reducers/loginReducer'
import { ExclamationIcon } from '@heroicons/react/outline'

const WarningLogout = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const [showModal, setShowModal] = useState(false)
  const showConfirmationModal = { display: showModal ? '' : 'none' }

  useEffect(() => {
    if (loggedUser && loggedUser.userType === 'client') {
      setTimeout(() => {
        history.push('/home')
        dispatch(userLogout())
        setShowModal(!showModal)
      }, 1800000)
    }
  }, [])

  const handleLogin = () => {
    history.push('/signIn')
    setShowModal(!showModal)
  }

  const handleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        style={showConfirmationModal}
      >
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
            <div className="pt-2 pr-2 ml-auto bg-transparent border-0 float-right leading-none font-semibold outline-none focus:outline-none" />
            <div className="flex items-start justify-between p-3 pl-4 pb-2 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold text-gray-700">{t('WarningModal.Title')}</h3>
            </div>
            <div className="relative pl-4 pr-4 pt-4 flex-auto">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 md:mx-0 md:h-10 md:w-10">
                <ExclamationIcon className="h-6 w-6 text-gray-600" />
              </div>
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{t('WarningModal.Message')}</p>
            </div>
            <div className="flex items-center justify-end p-3 pr-4 border-t border-solid border-blueGray-200 rounded-b">
              <button
                type="button"
                onClick={handleLogin}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
                    text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-auto md:text-base"
              >
                {t('WarningModal.LoginAgain')}
              </button>
              <button
                type="button"
                onClick={handleModal}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium
              text-white focus:outline-none bg-gray-500 hover:bg-gray-400 focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800 md:ml-3 md:w-auto md:text-base"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarningLogout
