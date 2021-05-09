import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import bruja from '../../img/bruja.jpg'

const MyClients = () => {
  const users = useSelector(state => state.users).filter(user => user.userType === 'client')
  //console.log('USERS: ', users)


  if (!users) {
    return (
      <div className="justify-center items-center flex outline-none bg-gray-100 min-h-screen">
        <div className="flex flex-row space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <p className="pr-2" >cargando...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-gray-200 p-2">

        <div className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
          from-gray-300 via-white to-gray-200 p-3 pb-5 ">
          <h3 className=" text-2xl leading-snug tracking-wide uppercase text-center font-bold border-b-2 pb-2 " >Mis clientes</h3>
          <ul className="space-y-8 md:space-y-1 md:flex md:flex-wrap pt-9 md:pt-9">
            {users.map(user =>
              <li className="flex flex-col items-center space-y-2 md:mt-2 md:mb-5 md:ml-5 md:mr-2 " key={user.id}>
                <Link className="bg-gradient-to-bl from-red-600 via-blue-200 to-yellow-100 rounded-full p-1"
                  to={`/esp/myclients/${user.id}`}>
                  {user.imageURL ?
                    <img className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-white p-1 transform hover:rotate-6 transition" src={user.imageURL} /> :
                    <img className="opacity-10 h-32 w-32 rounded-full bg-white p-1 transform hover:rotate-6 transition" src={bruja} />
                    // <span className="inline-block rounded-full h-28 w-28 md:h-32 md:w-32 transform hover:rotate-12 transition md:rounded-full overflow-hidden bg-gray-100">
                    //   <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    //     <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    //   </svg>
                    // </span>
                  }
                </Link>
                <span className="text-xs">{`${user.firstName}`}</span>
              </li>
            )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MyClients