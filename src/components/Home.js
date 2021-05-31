import React from 'react'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-gray-300 via-white to-gray-300 outline-none bg-gray-100 h-screen md:p-32 p-6 pt-24 w-full">
      <video
        autoPlay
        preload="auto|metadata|none"
        loop
        width="960"
        height="640"
        frameBorder="0"
        className="rounded-md border-2 border-black p-1"
      >
        <source
          src={'https://res.cloudinary.com/dbn5gpgi5/video/upload/v1622460129/fd2esws5cx7ns0de2oea.mp4'}
          type="video/mp4"
        />
      </video>
      <div className="flex flex-col items-center space-x-1 w-full">
        <p className="pr-2 text-center text-xl italic p-2">{t('homepage.description')}</p>
      </div>
    </div>
  )
}

export default Home
