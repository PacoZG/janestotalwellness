import React from 'react'
import { useTranslation } from 'react-i18next'

const Loading = () => {
  const { t } = useTranslation()
  return (
    <div className="justify-center items-center flex outline-none bg-gray-400 min-h-screen">
      <div className="flex flex-row space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="pr-2 font-medium text-gray-100">{t('loading')}</p>
      </div>
    </div>
  )
}

export default Loading
