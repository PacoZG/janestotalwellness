import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import bruja from '../img/bruja.jpg'

const MyClients = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const users = useSelector(state => state.users)
  console.log('USERS: ', users)


  // if (!users) {
  //   return null
  // }
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-gray-200 p-2">
        
        <div className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
          from-gray-300 via-white to-gray-200 p-3">
            <h3 className=" text-2xl leading-snug tracking-wide uppercase text-center font-bold border-b pb-2 " >My clients</h3>
          <ul className="flex flex-wrap pt-9">
            {users.map(user =>
              <li className="flex flex-col items-center space-y-2 mt-2 mb-5 ml-5 mr-2 " key={user.id}>
                <Link className="bg-gradient-to-bl from-red-600 via-blue-200 to-yellow-100 rounded-full p-1"
                  to={`/clients/${user.id}`}>
                  {user.imageURL ?
                    <img className="h-32 w-32 rounded-full bg-white p-1 transform hover:rotate-6 transition" src={user.imageURL} /> :
                    // <img className="opacity-10 h-32 w-32 rounded-full bg-white p-1 transform hover:rotate-6 transition" src={bruja} />
                    <span className="inline-block rounded-full h-32 w-32 transform hover:rotate-12 transition md:rounded-full overflow-hidden bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  }
                </Link>
                <span>{`${user.firstName}`}</span>
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