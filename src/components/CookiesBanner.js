import React, { useEffect, useState, Fragment } from 'react'
import localdb from '../utils/localdb'
import { Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CookieBanner = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const cookies = localdb.getCookies()
  useEffect(() => {
    if (!cookies) {
      setShow(true)
    }
  }, [setShow])

  const handleDecline = () => {
    setShow(!show)
  }

  const handleAccept = () => {
    localdb.setCookies()
    setShow(!show)
  }
  return (
    <div className="relative">
      <Transition
        show={show}
        as={Fragment}
        enter="transform duration-2000 ease-in"
        enterFrom="-translate-y-6 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transform duration-2000 ease-out"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-6 opacity-0"
      >
        <div className="absolute -bottom-12 w-full flex flex-col md:flex-row items-center justify-between p-1 pl-3 pr-3 bg-yellow-200">
          <div>
            <p className="text-xs">
              {t('CookiesBanner.Message')}
              <Link className="transition duration-1000 text-indigo-400 hover:text-red-400" to="/cookiespolicy">
                {t('CookiesBanner.Cookies')}
              </Link>
            </p>
          </div>
          <div className="flex pt-1 md:pt-0 space-x-2 items-center pr-2">
            <button
              className="border-2 text-xs border-gray-400 transition duration-1000 hover:bg-gray-600 hover:text-gray-200 rounded-sm px-1 h-7 bg-gray-200"
              onClick={handleDecline}
            >
              {t('CookiesBanner.Decline')}
            </button>
            <button
              className="border-2 text-xs border-gray-400 transition duration-1000 hover:bg-gray-600 hover:text-gray-200 rounded-sm px-1 h-7 bg-gray-200"
              onClick={handleAccept}
            >
              {t('CookiesBanner.Accept')}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default CookieBanner
