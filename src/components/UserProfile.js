import React, { useEffect } from 'react'
import localdb from '../utils/localdb'
import { getUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const UserProfile = () => {
  const dispatch = useDispatch()
  //console.log('USER: ', userId)

  useEffect(() => {
    if (localdb.loadUser()) {
      dispatch(getUser(localdb.loadUser().id))
    }
  }, [dispatch])
  const user = useSelector(state => state.users)
  console.log('USER_PROFILE_INFO: ', user)

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

  const getBMI = () => {
    const heightSquare = Math.pow(user.height / 100, 2)
    const bmi = Number(user.weight / heightSquare).toFixed(1)
    if (bmi < 18.5) {
      return bmi + ' (Underweight)'
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return bmi + ' (Normal weight)'
    } else if (bmi >= 25 && bmi < 29.9) {
      return bmi + ' (Overweight)'
    } else if (bmi >= 30 && bmi < 34.9) {
      return bmi + ' (Obesity class I)'
    } else if (bmi >= 35 && bmi < 39.9) {
      return bmi + ' (Obesity class II)'
    } else if (bmi >= 40) {
      return bmi + ' (Obesity class III)'
    }
  }
  // bg-gray-50 px-3 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6
  return (
    <div>
      <div className="bg-gray-100 min-h-screen pt-20 md:pt-16">
        <h3 className="p-2 md:p-6 text-2xl text-center md:text-3xl font-medium text-gray-700 ">Profile</h3>
        <div className="bg-white pb-2 m-2 mb-1 shadow overflow-hidden rounded-lg">
          <div className="p-3 md:p-1 md:pl-3">
            <h3 className="text-xl font-medium text-gray-900 pl-3 md:pl-6 md:py-3">Personal details</h3>
          </div>
          <div className="border-t border-gray-300 border-b mb-3">
            <div>
              <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <div className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Full name</div>
                <div className="pb-3 md:pt-4 text-lg text-gray-900 capitalize">{user.firstName} {user.lastName}</div>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Username</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.username}</dd>
              </div>

              <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Email address</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.email}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Postal address</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">
                  {user.address && user.zipCode && user.city ? user.address + ', ' + user.zipCode + ', ' + user.city : 'Not yet provided'}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Country</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900 capitalize">{user.country}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Mobile number</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">
                  {user.mobileNumber ? user.mobileNumber : 'Not yet provided'}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Background</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.background}</dd>
              </div>
              <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
                <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Motivation</dt>
                <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.motivation}</dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white pb-2 m-2 mb-1 shadow overflow-hidden rounded-lg">
          <div className="p-3 md:p-1 md:pl-3 ">
            <h3 className="text-xl font-medium text-gray-900 pl-3 md:pl-6 md:py-3">My data</h3>
          </div>
          <div className="border-t border-gray-300 border-b mb-3">
            <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Health information</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">
                {user.healthInfo ? user.healthInfo : 'Not yet provided'}</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Age</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">{getAge()} years old</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Gender</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900 capitalize">{user.gender}</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">Height</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.height} cm</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-50 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className=" pt-3 md:pt-4 text-lg font-medium text-gray-500">Weight</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">{user.weight} kg</dd>
            </div>
            <div className="pl-8 md:pl-10 bg-gray-100 grid grid-flow-row md:grid-cols-2 md:py-2 md:px-6">
              <dt className="pt-3 md:pt-4 text-lg font-medium text-gray-500">{'Approximate BMI\n(Body Mass Index)'}</dt>
              <dd className="pb-3 md:pt-4 text-lg text-gray-900">{getBMI()}</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile