import React, { useState } from 'react'
import Select from 'react-select'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import usersService from '../services/users'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const [country, setCountry] = useState(null)
  const [dropdown, setDropdown] = useState(false)
  const visibleDrop = { display: dropdown ? '' : 'none' }

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

  const handleCountry = (country) => {
    setCountry(country)
    setDropdown(!dropdown)
  }
  console.log('DROPDOWN: ', dropdown)
  console.log('COUNTRY: ', country)

  const handleSignUp = async (event) => {
    event.preventDefault()
    var genders = document.getElementsByName('gender');
    let selectedGender

    for (var i = 0; i < genders.length; i++) {
      if (genders[i].checked) {
        selectedGender = genders[i].value
      }
    }

    const newUser = {
      firstName: firstName.params.value,
      lastName: lastName.params.value,
      username: username.params.value.toLowerCase(),
      email: email.params.value,
      password: password.params.value,
      background: background.params.value,
      gender: selectedGender,
      dateOfBirth: dateOfBirth.params.value,
      height: parseInt(height.params.value),
      weight: parseInt(weight.params.value),
      country: country,
      motivation: motivation.params.value,
    }
    //console.log('NEW_USER: ', newUser)
    try {
      if (password.params.value !== passwordConfirm.params.value) {
        dispatch(setNotification({
          message: 'Password fields don\'t match, please check and fulfill all the field in the form.',
          title: 'Password error',
          show: true
        }))
      } else if (email.params.value !== emailConfirm.params.value) {
        dispatch(setNotification({
          message: 'Email fields don\'t match, please check and fulfill all the field in the form.',
          title: 'Email error',
          show: true
        }))
      } else if (!country) {
        dispatch(setNotification({
          message: 'Please check and fulfill all the fields in the form.',
          title: 'Details missing',
          show: true
        }))
      } else {
        const createdUser = await usersService.createUser(newUser)
        console.log('CREATED USER: ', createdUser)
        dispatch(createUser(createdUser))
        dispatch(setNotification({
          message: `User ${username.params.value} has been successfully created.`,
          title: 'Success',
          show: true
        }))
        firstName.reset()
        lastName.reset()
        username.reset()
        email.reset()
        emailConfirm.reset()
        password.reset()
        passwordConfirm.reset()
        background.reset()
        dateOfBirth.reset()
        height.reset()
        weight.reset()
        motivation.reset()
        setCountry('')
        for (var i = 0; i < genders.length; i++) {
          if (genders[i].checked) {
            genders[i].value = false
          }
        }
      }
    } catch (error) {
      //debugger
      if (error) {
        const message = error.response.data
        if (message.includes('Error') && !message.includes(email.params.value)) {
          //console.log(username.params.value)
          dispatch(setNotification({
            message: `Username \'${username.params.value.toLowerCase()}' has been used, try with a different username.`,
            title: 'Username error',
            show: true
          }))
        } else if (message.includes(email.params.value)) {
          dispatch(setNotification({
            message: `\'${email.params.value}' is already in our database, try with a different email.`,
            title: 'Email error',
            show: true
          }))
          setModalMessage(`\'${email.params.value}' is already in our database, try with a different email.`)
          setTitle('Email error')
          setShowModal(true)
        } else if (message.includes('Username has to')) {
          dispatch(setNotification({
            message: message.substring(34),
            title: 'Username error',
            show: true
          }))
        }
      }
    }
  }
  return (
    <div className="flex flex-col min-h-screen pt-28 py-3 px-2 bg-gray-800 md:flex">
      <div className="shadow overflow-hidden md:rounded-md">
        <form onSubmit={handleSignUp}>
          <div>
            <div className="min-w-md mx-auto overflow-hidden pt-24">
              <h1 className="text-center font-medium font-serif m-2 text-2xl text-gray-300">Sign up form</h1>
              <div className="px-4 py-4 bg-gray-600 md:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">First name</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      pattern="([a-zA-Z]+\s){2,})" placeholder="John" {...firstName.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200">Last name</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      pattern="([a-zA-Z]+\s){2,})" placeholder="Smith" {...lastName.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Username</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      pattern="[A-Za-z0-9]+" placeholder="example: jhon1" title="User has to be at least 4 characters long" {...username.params} required />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <div className="mt-8 relative">
                      <label className="absolute bottom-12 ml-2 bg-transparent text-gray-200 ">Country</label>
                      <div id="country" name="country" type="text"
                        className="h-12 w-full border border-gray-300 focus:ring-0 bg-white rounded-sm shadow-sm md:text-md text-left">
                        {country ?
                          <div className="pt-1 text-gray-500">
                            {country}<span onClick={() => setCountry(null)}
                              className="absolute pt-1 opacity-50 inset-y-0 right-11 mt-2 z-50 cursor-pointer">X</span>
                          </div> :
                          <div className="opacity-25 pt-1">Select country</div>}
                        <span className="absolute right-0 inset-y-0 flex items-center pr-2 pl-1 border-l mt-2 mb-2 cursor-pointer"
                          onClick={() => setDropdown(!dropdown)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div style={visibleDrop} className="absolute border rounded-b-md rounded-sm mt-2 col-span-6 w-full bg-white z-50 ">
                        <p className="p-1 pl-2 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer"
                          onClick={() => handleCountry('Finland')}
                        >Finland</p>
                        <p className="p-1 pl-2 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer"
                          onClick={() => handleCountry('Norway')}
                        >Sweden</p>
                        <p className="p-1 pl-2 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer"
                          onClick={() => handleCountry('Sweden')}
                        >Norway</p>
                        <p className="p-1 pl-2 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer"
                          onClick={() => handleCountry('Estonia')}
                        >Estonia</p>
                        <p className="p-1 pl-2 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer"
                          onClick={() => handleCountry('Mexico')}
                        >Mexico</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Email</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" id="email" placeholder="john@example.com" {...email.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Re-type email</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" id="email-confirm" {...emailConfirm.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Password</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="password" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                      {...password.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Re-type password</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      {...passwordConfirm.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Date of birth</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      {...dateOfBirth.params} min="1950-01-01" max="2005-12-31" required />
                  </div>
                  <div className="col-span-6 md:col-span-3 md:mt-8">
                    <div className="grid grid-flow-col justify-items-left pl-4 md:pl-4 mt-3 md:space-x-20">
                      <div className="grid grid-flow-col ">
                        <input id="male" name="gender" type="radio" value="male"
                          className="focus:ring-yellow-700 h-4 w-4 text-gray-400 border-gray-500" required />
                        <label className="block text-sm font-medium text-gray-200">Male</label>
                      </div>
                      <div className="grid grid-flow-col">
                        <input id="female" name="gender" type="radio" value="female"
                          className="focus:ring-yellow-700 h-4 w-4 text-gray-400 border-gray-500" required />
                        <label className="lock text-sm font-medium text-gray-200">Female</label>
                      </div>
                      <div className="grid grid-flow-col">
                        <input id="other" name="gender" type="radio" value="other"
                          className="focus:ring-yellow-700 h-4 w-4 text-gray-400 border-gray-500" required />
                        <label className="lock text-sm font-medium text-gray-200">Other</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Height (cm)</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      {...height.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Weight (kg)</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      {...weight.params} required />
                  </div><div className="col-span-6 md:col-span-6">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Background</label>
                    <input className="focus:border-gray-500 block h-12 w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200"
                      {...background.params} required />
                  </div>
                </div>
                <div className="col-span-6 md:col-span-6">
                  <div className="mt-4 relative">
                    <p className="pl-2 text-gray-200" >Goals</p>
                    <textarea className="h-40 focus:border-gray-500 block w-full shadow-sm md:text-sm border-gray-300 rounded-md placeholder-gray-200" placeholder="Tell me why you are seeking for my help"
                      {...motivation.params} required />
                  </div>
                  <button className="mt-4 mb-6 h-12 w-full bg-gray-500 text-white rounded hover:bg-gray-400
                    focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800"
                    type="submit">Sign up</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm