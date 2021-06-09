import React from 'react'
import { useTranslation } from 'react-i18next'

const AboutMe = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="bg-gray-100 min-h-screen pt-28">
        <div className="flex flex-col items-center">
          <div className="mx-3 my-4">
            <div className="flex flex-col items-center pt-12 md:p-16 md:m-16 shadow-md rounded bg-gradient-to-tr from-gray-300 via-gray-100 to-gray-300">
              <img
                src="https://res.cloudinary.com/dbn5gpgi5/image/upload/v1623267005/kabssdfevse0lustdptu.jpg"
                className="w-40 h-40 md:w-72 md:h-72 shadow-lg rounded-full md:mb-12"
              />
              <ul className="p-10">
                <li className="text-lg pb-10">{t('About.1')}</li>
                <li className="text-lg pb-10">{t('About.2')}</li>
                <li className="text-lg pb-10">{t('About.3')}</li>
              </ul>
            </div>
          </div>
          <div>
            <p className="p-10 ml-10 mb-10 md:pl-20 md:pr-32 md:ml-28 md:mb-12 font-serif italic tracking-wide text-justify md:text-2xl border-l-2 border-gray-200">
              {t('About.Calling')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
