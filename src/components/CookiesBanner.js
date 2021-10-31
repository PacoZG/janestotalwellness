import React, { useEffect, useState, Fragment } from 'react'
import localdb from '../utils/localdb'
import { Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ReactComponent as CoockiesIcon } from '../assets/cookies.svg'

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
    <Transition
      show={show}
      as={Fragment}
      enter="transform duration-2000 ease-in"
      enterFrom=" opacity-0"
      enterTo=" opacity-100"
      leave="transform duration-2000 ease-out"
      leaveFrom="opacity-100"
      leaveTo=" opacity-0"
    >
      <div className="flex flex-col gap-2 w-44 h-32 rounded-md items-center justify-center text-center p-3 bg-yellow-200 bg-opacity-60">
        <CoockiesIcon className="h-12 w-12 absolute -top-6" />
        <div>
          <p className="text-xs font-semibold">
            {t('CookiesBanner.Message')}
            <Link
              className="transition duration-1000 text-indigo-500 hover:text-red-400"
              to="/cookiespolicy"
              target="blank"
            >
              {t('CookiesBanner.Cookies')}
            </Link>
          </p>
        </div>
        <div className="flex pt-1 md:pt-0 space-x-2 items-center pr-0">
          <button
            className="border-2 text-xs border-gray-400 transition duration-1000 hover:bg-gray-600 hover:text-gray-200 rounded-xl px-2 h-7 bg-red-300"
            onClick={handleDecline}
          >
            {t('CookiesBanner.Decline')}
          </button>
          <button
            className="border-2 text-xs border-gray-400 transition duration-1000 hover:bg-gray-600 hover:text-gray-200 rounded-xl px-2 h-7 bg-green-200"
            onClick={handleAccept}
          >
            {t('CookiesBanner.Accept')}
          </button>
        </div>
      </div>
    </Transition>
  )
}

export default CookieBanner
