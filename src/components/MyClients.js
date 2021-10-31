import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Loading from '../utils/Loading'
import user from '../services/user'

const MyClients = () => {
  const users = useSelector(state => state.users).filter(user => user.userType === 'client')
  const { t } = useTranslation()

  if (!users) {
    return <Loading />
  }

  return (
    <div className="bg-gray-200 pt-22 min-h-screen">
      <div className="bg-gray-200 p-2 ">
        <div
          className="min-h-screen shadow md:rounded-md md:overflow-hidden rounded-b-md bg-gradient-to-br
          from-gray-300 via-white to-gray-200 p-3 pb-5"
        >
          {users.length > 0 ? (
            <ul className="space-y-8 md:space-y-1 md:flex md:flex-wrap pt-9 md:pt-9">
              {users.map(user => (
                <li className="flex flex-col items-center space-y-2 md:mt-2 md:mb-5 md:ml-5 md:mr-2 " key={user.id}>
                  <Link
                    className="bg-gradient-to-bl from-red-600 via-blue-200 to-yellow-100 rounded-full p-1"
                    to={`/myclients/${user.id}`}
                    id="client-link"
                  >
                    {user.imageURL ? (
                      <img
                        className="transition transform hover:-translate-y-1 hover:scale-110 hover:rotate-6 duration-500 ease-in-out h-28 w-28 md:h-32 md:w-32 rounded-full bg-white p-1"
                        alt="profile"
                        src={user.imageURL}
                      />
                    ) : (
                      <span className="transform hover:rotate-6 transition duration-500 inline-block rounded-full h-28 w-28 md:h-32 md:w-32  md:rounded-full overflow-hidden bg-gray-100">
                        <img src={user.imageURL ? user.imageURL : user.avatarPic} className="h-full w-full" />
                      </span>
                    )}
                  </Link>
                  <span className="text-xs">{`${user.firstName}`}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-row items-center justify-around h-screen">
              <h1 className="text-center text-xl text-gray-500 shadow-md rounded-3xl bg-opacity-0 p-6">
                {t('NoClients')}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyClients
