import React, { useState } from 'react'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import Notification from './Notification'

import { setNotification } from '../reducers/notificationReducer'
import { createUser } from '../reducers/userReducer'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const firstName = useField('text')
  const lastName = useField('text')
  const email = useField('email')
  const emailConfirm = useField('email')
  const username = useField('text')
  const password = useField('password')
  const passwordConfirm = useField('password')
  const height = useField('text')
  const weight = useField('text')
  const dateOfBirth = useField('date')
  const background = useField('text')
  const motivation = useField('text')
  const country = useField('text')


  const handleSignUp = async (event) => {
    event.preventDefault()
    var genders = document.getElementsByName('gender');
    let selectedGender
    for (var i = 0; i < genders.length; i++) {
      if (genders[i].checked) {
        selectedGender = genders[i].value;
      }
    }
    if (password.params.value !== passwordConfirm.params.value ||
      email.params.value !== emailConfirm.params.value ||
      selectedGender === undefined
    ) {
      dispatch(setNotification('Emails or password don\'t match, please fulfill all the field in the form.'))
    }

    const newUser = {
      firstName: firstName.params.value,
      lastName: lastName.params.value,
      username: username.params.value,
      email: email.params.value,
      password: password.params.value,
      background: background.params.value,
      gender: selectedGender,
      dateOfBirth: dateOfBirth.params.value,
      height: parseInt(height.params.value),
      weight: parseInt(weight.params.value),
      country: country.params.value,
      motivation: motivation.params.value,
    }

    //console.log('NEW_USER: ', newUser)
    try {
    dispatch(createUser(newUser))
    } catch (e) {
      console.log('ERROR: ', e.response.data)
      dispatch(setNotification(error))
    }
  }

  return (
    <div className="h-screen pb-6 py-200 px-2 pt-16 bg-gray-200">
      <form onSubmit={handleSignUp}>
        <div className="max-w-mdz mx-auto overflow-hidden ">
          <h1 className="text-center font-medium font-serif m-2 text-2xl text-gray-500">Sign up form</h1>
          <div className="md:flex">
            <div className="w-full p-3 px-6 py-10">
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">First name</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                  pattern="[A-Za-z]+" placeholder="John" {...firstName.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Username</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                  pattern="^[a-zA-Z][a-zA-Z0-9-_.]{5,12}$" placeholder="example: jhon_1" {...username.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Email</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" id="email" placeholder="john@hotmail.com" {...email.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Password</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="password" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  {...password.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Background</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent"
                  {...background.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Height (cm)</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent"
                  {...height.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Date of birth</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent"
                  {...dateOfBirth.params} min="1970-01-01" max="2005-12-31" required />
              </div>
            </div>
            <div className="w-full p-3 px-6 py-10">
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Last name</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                  pattern="[A-Za-z]+" placeholder="Smith" {...lastName.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Country</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent"
                  {...country.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Re-type email</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" placeholder="john@hotmail.com" {...emailConfirm.params} required />
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Re-type password</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent "
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  {...passwordConfirm.params} required />
              </div>
              <div className="flex flex-row ml-6 mt-12 mb-11 space-x-14">
                <div className="flex items-center">
                  <input id="male" name="gender" type="radio" value="male"
                    className="focus:ring-yellow-700 h-4 w-4 text-red-600 border-gray-500" required />
                  <label className="ml-3 block text-sm font-medium text-gray-400">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="female" name="gender" type="radio" value="female"
                    className="focus:ring-yellow-700 h-4 w-4 text-red-600 border-gray-500" required />
                  <label className="ml-3 block text-sm font-medium text-gray-400">
                    Female
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="other" name="gender" type="radio" value="other"
                    className="focus:ring-yellow-700 h-4 w-4 text-red-600 border-gray-500" required />
                  <label className="ml-3 block text-sm font-medium text-gray-400">
                    Other
                  </label>
                </div>
              </div>
              <div className="mt-8 relative">
                <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Weight (kg)</span>
                <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent"
                  {...weight.params} required />
              </div>
              <div className="mt-12">
                <Notification />
              </div>
            </div>
          </div>
        </div>
        <div className="pl-3 pr-3 pb-3mt-4 mx-auto">
          <div className="mt-4 relative">
            <p className="pl-2 text-gray-500" >Goals</p>
            <textarea className="h-40 px-2 w-full border-gray-200 rounded focus:outline-none placeholder-gray-200 placeholder::color:red" placeholder="Tell me why you are seeking for my help"
              {...motivation.params} required />
          </div>
          <button className="mt-1 mb-6 h-12 w-full bg-red-500 text-white rounded hover:-translate-y-0.5
          focus:ring focus:ring-offset-2 focus:ring-yellow-700 transform transition active:bg-red-900"
            type="submit">Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm