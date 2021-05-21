import React, { useEffect, useState, Fragment } from 'react'
import localdb from '../utils/localdb'
import { Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CookieBanner = () => {
  const [show, setShow] = useState(false)
  const cookies = localdb.getCookies()
  useEffect(() => {
    if (!cookies) {
      setShow(true)
    }
  }, [setShow])

  console.log('SHOW: ', show)

  const handleDecline = () => {
    setShow(!show)
  }

  const handleAccept = () => {
    localdb.setCookies()
    setShow(!show)
  }
  return (
    <div className="bg-gray-50">
      <Transition
        show={show}
        as={Fragment}
        enter="transition transform duration-1000 ease-in"
        enterFrom="translate-y-16 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition transform duration-1000 ease-out"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-16 opacity-0"
      >
        <div className="flex flex-col md:flex-row items-center justify-between p-1 pl-3 pr-3 bg-yellow-200">
          <div>
            <p className="text-sm">
              This website uses cookies, We use cookies to provide social media features, to analyse our traffic and
              self advertisment.
            </p>
            <p className="text-sm">
              Please read our{' '}
              <Link className="transition duration-1000 text-indigo-400 hover:text-red-400" to="/cookiespolicy">
                cookies policy
              </Link>
              .
            </p>
          </div>
          <div className="flex pt-1 md:pt-0 space-x-2">
            <button className="border-2 border-gray-600 rounded-sm px-1 h-7 bg-gray-200" onClick={handleDecline}>
              Decline
            </button>
            <button className="border-2 border-gray-600 rounded-sm px-1 h-7 bg-gray-200" onClick={handleAccept}>
              Accept
            </button>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default CookieBanner
