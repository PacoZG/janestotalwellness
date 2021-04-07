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
    <div className="bg-white min-h-screen">
      <h3 className="italic text-3xl text-center font-medium leading-6 text-gray-700 pt-10">Profile</h3>
      <div className="flex flex-row space-y-2 bg-gray-100 min-h-screen m-4 rounded border-2 border-black border-opacity-10">
        <div className="md:grid md:grid-cols-2 md:gap-6 pt-10 pl-10">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h1 className="text-xl text-gray-500 pt-8">Personal Information</h1>
            </div>
          </div>
        </div>
        <div className="mt-5 mr-5 md:mt-0 md:col-span-2 w-full">
          <form >
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-3">
                    <div className="flex flex-row space-x-10 p-3 h-auto bg-gray-50 w-full rounded-t-md" >
                      <div className="block text-xl font-xl font-semibold text-gray-500 ">Name:</div>
                      <div className="block text-xl text-right font-semibold text-gray-700" >{user.firstName} {user.lastName}</div>
                    </div>
                    <div className="flex flex-row space-x-12 p-3 h-auto bg-gray-100 w-full" >
                      <div className="block text-xl font-xl font-semibold text-gray-500">Email:</div>
                      <div className="block text-xl font-xl font-semibold text-gray-700" >{user.email}</div>
                    </div>
                    <div className="flex flex-row space-x-16 p-3 h-auto bg-gray-50 w-full" >
                      <div className="block text-xl font-xl font-semibold text-gray-500">Age:</div>
                      <div className="block text-xl font-xl font-semibold text-gray-700" >{getAge()} years old</div>
                    </div>
                    <div className="flex flex-row space-x-10 p-3 h-auto bg-gray-100 w-full" >
                      <div className="block text-xl font-xl font-semibold text-gray-500">Height:</div>
                      <div className="block text-xl font-xl font-semibold text-gray-700" >{user.height} cm</div>
                    </div>
                    <div className="flex flex-row space-x-9 p-3 h-auto bg-gray-50 w-full" >
                      <div className="block text-xl font-xl font-semibold text-gray-500">Weight:</div>
                      <div className="block text-xl font-xl font-semibold text-gray-700" >{user.weight} kg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfile