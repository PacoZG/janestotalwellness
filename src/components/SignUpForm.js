import React, { useState } from 'react-dom'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import Input from './Input'
import Notification from './Notification'

import { setNotification } from '../reducers/notificationReducer'
import { createUser } from '../reducers/userReducer'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const firstName = useField('firstName')
  const lastName = useField('lastName')
  const email = useField('email')
  const emailConfirm = useField('emailConfirm')
  const username = useField('username')
  const password = useField('password')
  const passwordConfirm = useField('password')
  const height = useField('height')
  const weight = useField('weight')
  const dateOfBirth = useField('date')
  const background = useField('hobbies')
  const motivation = useField('motivation')
  const country = useField('country')

  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ]

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
      dispatch(setNotification('Emails or password don\'t match, please fulfill all the field in the form.', 'darkgray'))
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
    dispatch(createUser(newUser))
  }

  return (
    <div className="h-screen pb-6 py-200 px-2 pt-16 bg-gray-300">
      <div className="max-w-mdz mx-auto overflow-hidden ">
        <h1 className="text-center font-medium font-serif m-2 text-2xl text-gray-500">Sign up form</h1>
        <div className="md:flex">
          <div className="w-full p-3 px-6 py-10">
            <Input params={firstName.params} label='First Name' />
            <Input params={username.params} label='Username' />
            <Input params={email.params} label='Email' placeholder='example@gmail.com' />
            <Input params={password.params} label='Password' />
            <Input params={background.params} label='Background' />
            <Input params={height.params} label='Height (cm)' />
            <Input params={dateOfBirth.params} min="1970-01-01" max="2005-12-31" label='Date of birth' />
          </div>
          <div className="w-full p-3 px-6 py-10">
            <Input params={lastName.params} label='Last Name' />
            <Input params={country.params} label='Country' />
            <Input params={emailConfirm.params} label='Re-type email' />
            <Input params={passwordConfirm.params} label='Re-type password' />
            <div className="flex flex-row ml-6 mt-12 mb-11 space-x-14">
              <div className="flex items-center">
                <input id="male" name="gender" type="radio" value="male"
                  className="focus:ring-blue-400 h-4 w-4 text-indigo-600 border-gray-500" />
                <label className="ml-3 block text-sm font-medium text-gray-400">
                  Male
                  </label>
              </div>
              <div className="flex items-center">
                <input id="female" name="gender" type="radio" value="female"
                  className="focus:ring-blue-400 h-4 w-4 text-indigo-600 border-gray-500" />
                <label className="ml-3 block text-sm font-medium text-gray-400">
                  Female
                  </label>
              </div>
              <div className="flex items-center">
                <input id="other" name="gender" type="radio" value="other"
                  className="focus:ring-blue-400 h-4 w-4 text-indigo-600 border-gray-500" />
                <label className="ml-3 block text-sm font-medium text-gray-400">
                  Other
                  </label>
              </div>
            </div>
            <Input params={weight.params} label='Weight (kg)' />
            <div className="mt-12">
              <Notification />
            </div>
          </div>
        </div>
      </div>
      <div className="pl-3 pr-3 pb-3mt-4 mx-auto">
        <div className="mt-4 relative">
          <p className="pl-2 text-gray-500" >Goals</p>
          <textarea className="h-40 px-2 w-full border-2 border-gray-200 rounded focus:outline-none placeholder-opacity-10 placeholder::color:red" placeholder="Tell me why are you seeking for my help"
            {...motivation.params}
          />
        </div>
        <button className="mt-1 mb-6 h-12 w-full bg-blue-700 text-white rounded hover:-translate-y-0.5
          focus:ring focus:ring-offset-2 focus:ring-blue-700 transform transition active:bg-blue-900"
          onClick={handleSignUp}>Sign up</button>
      </div>

    </div>
  )
}

export default SignUpForm