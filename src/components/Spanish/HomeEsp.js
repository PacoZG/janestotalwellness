import React from 'react'

const HomeEsp = () => {

  const home = null

  if (!home) {
    return (
      <div className="flex justify-center items-center outline-none bg-gray-100 min-h-screen md:p-60 p-6">
        <div className="flex flex-col items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <p className="pr-2 text-center" >Bienvenido a Jane Total Wellness app, estamos trabajando arduamente para brindar la mejor experiencia
          posible para usted y su viaje hacia un cuerpo, mente y alma saludables.</p>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="bg-gray-100 min-h-screen pt-4">
        Fronpage
      </div>
    </div>
  )
}

export default HomeEsp