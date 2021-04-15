import React, { useState } from 'react'
import Select from 'react-select'
import { useField } from '../hooks/index'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import Footer from './Footer'
import { createUser } from '../reducers/userReducer'
import usersService from '../services/users'

const SignUpForm = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [title, setTitle] = useState('')
  const [country, setCountry] = useState('')

  const customStyles = {
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'white' : 'gray',
      color: state.isFocused ? 'white' : 'gray',
      backgroundColor: state.isSelected ? 'gray' : 'white',
      background: state.isFocused ? 'gray' : 'white',

    }),
    container: base => ({
      ...base,
      width: '100%',
    }),
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: 'none',
      height: '43px',
      borderRadius: '2px',
      outline: 'none',
      '&:hover': {
        borderColor: state.isFocused
          ? 'red'
          : base.borderColor,
      }
    }),
    valueContainer: (base, state) => ({
      ...base,
      color: 'gray',
      fontSize: '16px',
      top: '0px',
      marginLeft: '4px',
      overflow: 'visible',
    }),
    placeholder: base => ({
      ...base,
      color: 'lightgray',
      paddingLeft: '1px',
    }),
    input: (base, state) => ({
      ...base,
      color: 'gray',
      visibility: 'hidden'
    }),
  }

  const countries = [
    { label: "Finland", value: "Finland" },
    { label: "Sweden", value: "Sweden" },
    { label: "Norway", value: "Norway" },
    { label: "Estonia", value: "Estonia" },
    { label: "Mexico", value: "Mexico" },
  ]

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
    console.log('NEW_USER: ', newUser)
    try {
      if (password.params.value === passwordConfirm.params.value &&
        email.params.value === emailConfirm.params.value && country !== null) {
        const createdUser = await usersService.createUser(newUser)
        dispatch(createUser(createdUser))
        setModalMessage(`${username.params.value} has been created successfuly.`)
        setTitle('Sucess')
        setShowModal(true)
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
        country.reset()
        motivation.reset()
        for (var i = 0; i < genders.length; i++) {
          if (genders[i].checked) {
            genders[i].value = false
          }
        }
      } else if (password.params.value !== passwordConfirm.params.value) {
        setModalMessage('Password fields don\'t match, please check and fulfill all the field in the form.')
        setTitle('Password error')
        setShowModal(true)
      } else if (email.params.value !== emailConfirm.params.value) {
        setModalMessage('Email fields don\'t match, please check and fulfill all the field in the form.')
        setTitle('Email error')
        setShowModal(true)
      } else if (!country) {
        setModalMessage('Please check and fulfill all the fields in the form.')
        setTitle('Details missing')
        setShowModal(true)
      }
    } catch (error) {
      console.log('ERROR MESSAGE: ', error.response.data)
      const message = error.response.data
      if (message.includes('Error') && !message.includes(email.params.value)) {
        console.log(username.params.value)
        setModalMessage(`Username \'${username.params.value.toLowerCase()}' has been used, try with a different username.`)
        //console.log('MODAL MESSAGE: ', modalMessage)
        setTitle('Username error')
        setShowModal(true)
      } else if (message.includes(email.params.value)) {
        setModalMessage(`\'${email.params.value}' is already in our database, try with a different email.`)
        setTitle('Email error')
        setShowModal(true)
      } else if (message.includes('Username has to')) {
        setModalMessage(message.substring(34))
        setTitle('Username error')
        setShowModal(true)
      }
    }
  }
  return (
    <div className="flex flex-col min-h-screen  py-3 px-2 bg-gray-200 md:flex">
      <div>
        <form onSubmit={handleSignUp}>
          <div className="min-w-md mx-auto overflow-hidden ">
            <h1 className="text-center font-medium font-serif m-2 text-2xl text-gray-500">Sign up form</h1>
            <div className="md:flex">
              <div className="md:flex-row w-full p-3 px-6 py-10">
                <div className="mt-8 relative">
                  <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">First name</span>
                  <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                    pattern="[A-Za-z]+" placeholder="John" {...firstName.params} required />
                </div>
                <div className="mt-8 relative">
                  <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Username</span>
                  <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                    placeholder="example: jhon_1" title="User has to be at least 4 characters long" {...username.params} required />
                </div>
                <div className="mt-8 relative">
                  <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Email</span>
                  <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" id="email" placeholder="john@example.com" {...email.params} required />
                </div>
                <div className="mt-8 relative">
                  <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Password</span>
                  <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="password" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                    {...password.params} placeholder="Combination of at least 8 numeric and alphabetic characters" required />
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
              <div className="md:flex-row w-full p-3 px-6 py-10">
                <div className="mt-8 relative">
                  <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Last name</span>
                  <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                    pattern="[A-Za-z]+" placeholder="Smith" {...lastName.params} required />
                </div>
                <div className="mt-11 relative">
                  <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Country</span>

                  <Select options={countries} placeholder="Select a country" isClearable="true" styles={customStyles}
                    onChange={target => target ? setCountry(target.value) : setCountry(null)}
                  />
                </div>
                <div className="mt-8 relative">
                  <span className="absolute p-0 bottom-12 ml-2 bg-transparent text-gray-500 ">Re-type email</span>
                  <input className="h-12 mt-2 px-2 w-full border-2 border-gray-200 rounded focus:outline-none focus:border-transparent placeholder-gray-200"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"  {...emailConfirm.params} required />
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
            <button className="mt-1 mb-6 h-12 w-full bg-gray-500 text-white rounded hover:bg-red-600
          focus:ring focus:ring-offset-1 focus:ring-yellow-700 transform transition active:bg-red-800"
              type="submit">Sign up</button>
          </div>
        </form>
      </div>
      <div className="">
        <Modal showModal={showModal} setShowModal={setShowModal} message={modalMessage} title={title} />
      </div>
    </div>
  )
}

export default SignUpForm