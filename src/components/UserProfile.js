import React, { useEffect } from 'react'
import localDB from '../utils/localdb'
import { getUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const UserProfile = () => {
  const dispatch = useDispatch()
  const userId = localDB.loadUser().id
  console.log('USER: ', userId)

  useEffect(async () => {
    if (userId) {
      dispatch(getUser(userId))
    }
  }, [dispatch])
  const user = useSelector(state => state.users)
  console.log('USER_INFO: ', user)

  const getAge = () => {
    const birthday = new Date(user.dateOfBirth)
    const today = new Date()
    var age = today.getFullYear() - birthday.getFullYear()
    var m = today.getMonth() - birthday.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--
    }
    return age
  }

  return (

    <div className="bg-gray-100 min-h-screen">
      <h3 className="text-3xl text-center font-medium leading-6 text-gray-700 pt-6">Profile</h3>
      <div className="bg-white m-8 shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl leading-6 font-medium text-gray-900 pl-3">Personal details</h3>
        </div>
        <div className="border-t border-gray-300">
          <dl>
            <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500 pl-6">Full name</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">{user.firstName} {user.lastName}</dd>
            </div>
            <div className="bg-gray-100 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500 pl-6">Email address</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500 pl-6">Age</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">{getAge()} years old</dd>
            </div>
            <div className="bg-gray-100 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500 pl-6">Height</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">{user.height} cm</dd>
            </div>
            <div className="bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500 pl-6">Weight</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">{user.weight} kg</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default UserProfile