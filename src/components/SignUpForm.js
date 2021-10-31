import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Transition } from '@tailwindui/react'
import { useField } from '../hooks/index'
import { createUser, initializeUsers } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import userService from '../services/user'
import { getCountries } from '../utils/helper'
import male_avatar from '../assets/male-avatar.png'
import female_avatar from '../assets/female-avatar.png'
import { ReactComponent as SelectorIcon } from '../assets/selector-icon.svg'

const SignUpForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()
  const [dropdown, setDropdown] = useState(false)

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
  const goals = useField('text')

  const [country, setCountry] = useState(null)
  const countries = getCountries()

  const handleCountry = country => {
    setCountry(country)
    setDropdown(!dropdown)
  }

  const handleSignUp = async event => {
    event.preventDefault()
    var genders = document.getElementsByName('gender')
    let selectedGender

    for (var i = 0; i < genders.length; i++) {
      if (genders[i].checked) {
        selectedGender = genders[i].value
      }
    }

    const checkBox = document.getElementById('terms-and-conditions')

    const newUser = {
      firstName: firstName.params.value,
      lastName: lastName.params.value,
      username: username.params.value.toLowerCase(),
      email: email.params.value,
      password: password.params.value,
      background: background.params.value,
      gender: selectedGender,
      dateOfBirth: dateOfBirth.params.value,
      height: parseInt(height.params.value, 10),
      weight: parseInt(weight.params.value, 10),
      country: country,
      goals: goals.params.value,
      userType: 'client',
      avatarPic: selectedGender === 'male' ? male_avatar : female_avatar,
    }
    if (!checkBox.checked) {
      dispatch(
        setNotification({
          message: t('Signup.AcceptTerms'),
          title: t('Signup.AcceptTermsTitle'),
          show: true,
        })
      )
    }
    try {
      if (
        checkBox.checked &&
        password.params.value === passwordConfirm.params.value &&
        email.params.value === emailConfirm.params.value &&
        country
      ) {
        const createdUser = await userService.createUser(newUser)
        dispatch(createUser(createdUser))
        dispatch(
          setNotification({
            message: username.params.value + t('Signup.CreatedUserSuccess'),
            title: 'Success',
            show: true,
          })
        )
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
        goals.reset()
        setCountry('')
        for (var j = 0; j < genders.length; j++) {
          if (genders[j].checked) {
            genders[j].value = false
          }
        }

        dispatch(initializeUsers())
        history.push('/signIn')
      }
    } catch (error) {
      if (error) {
        const message = error.response.data.message
        if (message.includes('Error') && !message.includes(email.params.value)) {
          dispatch(
            setNotification({
              message: username.params.value.toLowerCase() + t('Signup.UsedUsername'),
              title: 'Username error',
              show: true,
            })
          )
        }
        if (message.includes(email.params.value)) {
          dispatch(
            setNotification({
              message: email.params.value + t('Signup.UsedUsername'),
              title: 'Email error',
              show: true,
            })
          )
        }
        if (message.includes('Username has to')) {
          dispatch(
            setNotification({
              message: message.substring(34),
              title: 'Username error',
              show: true,
            })
          )
        }
      }
    }
  }
  return (
    <div className="flex flex-col min-h-screen py-3 px-2 bg-gray-800 md:flex">
      <div className="shadow overflow-hidden md:rounded-md">
        <form onSubmit={handleSignUp}>
          <div>
            <div className="min-w-md mx-auto overflow-hidden">
              <h1 className="text-center font-medium font-serif m-2 text-2xl text-gray-300">
                {t('Signup.SignupHeader')}
              </h1>
              <div className="px-4 py-4 bg-gray-700 md:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">{t('Signup.Firstname')}</label>
                    <input className="signup-input" placeholder="John" id="first-name" {...firstName.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label">{t('Signup.Lastname')}</label>
                    <input className="signup-input" placeholder="Smith" id="last-name" {...lastName.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">{t('Signup.Username')}</label>
                    <input
                      className="signup-input"
                      pattern="[a-z0-9]{4,}"
                      placeholder="example: john1"
                      id="username"
                      title="User has to be at least 4 characters long"
                      {...username.params}
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <div className="mt-8 relative">
                      <label className="absolute bottom-12 ml-2 bg-transparent text-gray-200 ">
                        {t('Signup.Country')}
                        <span className="text-sm text-gray-300 pl-2">
                          {country ? '' : <span className="text-red-300 ">{t('Signup.NotSelectedCountry')}</span>}
                        </span>
                      </label>
                      <div
                        name="country"
                        type="text"
                        className="h-12 w-full border border-gray-300 focus:ring-0 bg-white rounded-sm shadow-sm md:text-base text-left"
                      >
                        {country ? (
                          <div className="p-0 text-lg pl-1 text-gray-500">
                            {country}
                            <span
                              onClick={() => setCountry(null)}
                              className="absolute pt-0 opacity-50 inset-y-0 right-11 mt-2 z-30 cursor-pointer"
                            >
                              X
                            </span>
                          </div>
                        ) : (
                          <div className="opacity-25 text-lg">{t('Signup.SelectCountry')}</div>
                        )}
                        <span
                          className="absolute right-0 inset-y-0 flex items-center pr-2 pl-1 border-l mt-2 mb-2 cursor-pointer"
                          id="country-menu"
                          onClick={() => setDropdown(!dropdown)}
                        >
                          <SelectorIcon className="h-5 w-5" />
                        </span>
                      </div>
                      <Transition
                        show={dropdown}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <div
                          id="menu"
                          className="absolute border rounded-b-md rounded-sm col-span-6 w-full bg-white divide-y divide-gray-50 "
                        >
                          {countries.sort().map(country => (
                            <p
                              className="p-1 pl-2 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer "
                              id={`${country}`}
                              onClick={() => handleCountry(country)}
                              key={country}
                            >
                              {country}
                            </p>
                          ))}
                        </div>
                      </Transition>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">{t('Signup.Email')}</label>
                    <input
                      className="signup-input"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                      id="email"
                      placeholder="john@example.com"
                      {...email.params}
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">
                      {t('Signup.ConfirmEmail')}
                      <span className="text-sm text-gray-300 pl-2">
                        {emailConfirm.params.value === email.params.value && emailConfirm.params.value.length > 10 ? (
                          <span className="text-sm text-gray-300 pl-2">{t('Signup.EmailMatched')}</span>
                        ) : (
                          <span className="text-sm text-red-300 pl-2">{t('Signup.ConfirmEmailRequired')}</span>
                        )}
                      </span>
                    </label>
                    <input
                      className="signup-input"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
                      id="email-confirm"
                      {...emailConfirm.params}
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">{t('Signup.Password')}</label>
                    <input
                      className="signup-input"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      id="password"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      {...password.params}
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">
                      {t('Signup.ConfirmPassword')}
                      {passwordConfirm.params.value === password.params.value &&
                      passwordConfirm.params.value.length > 7 ? (
                        <span className="text-sm text-gray-300 pl-2">{t('EditForm.PasswordMatched')}</span>
                      ) : (
                        <span className="text-sm text-red-300 pl-2">{t('EditForm.PasswordWarning')}</span>
                      )}
                    </label>
                    <input
                      className="signup-input"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      {...passwordConfirm.params}
                      id="password-confirm"
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">{t('Signup.DateOfBirth')}</label>
                    <input
                      className="signup-input"
                      {...dateOfBirth.params}
                      min="1950-01-01"
                      id="dateOfBirth"
                      max="2005-12-31"
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3 md:mt-8">
                    <div className="grid grid-flow-col justify-items-left pl-4 md:pl-4 mt-3 md:space-x-20">
                      <div className="grid grid-flow-col ">
                        <input
                          id="male"
                          name="gender"
                          type="radio"
                          value="male"
                          className="h-4 w-4 rounded-full border-gray-500 text-gray-500 focus:ring-gray-500"
                          required
                        />
                        <label className="block text-sm font-medium text-gray-200">{t('Signup.Male')}</label>
                      </div>
                      <div className="grid grid-flow-col">
                        <input
                          id="female"
                          name="gender"
                          type="radio"
                          value="female"
                          className="h-4 w-4 rounded-full border-gray-500 text-gray-500 focus:ring-gray-500"
                          required
                        />
                        <label className="lock text-sm font-medium text-gray-200">{t('Signup.Female')}</label>
                      </div>
                      <div className="grid grid-flow-col">
                        <input
                          id="other"
                          name="gender"
                          type="radio"
                          value="other"
                          className="h-4 w-4 rounded-full border-gray-500 text-gray-500 focus:ring-gray-500"
                          required
                        />
                        <label className="lock text-sm font-medium text-gray-200">{t('Signup.Other')}</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">{t('Signup.Height')}</label>
                    <input className="signup-input" {...height.params} id="height" required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="signup-label ">{t('Signup.Weight')}</label>
                    <input className="signup-input" {...weight.params} id="weight" required />
                  </div>
                  <div className="col-span-6 md:col-span-6">
                    <label className="signup-label ">{t('Signup.Background')}</label>
                    <input
                      className="signup-input"
                      {...background.params}
                      minLength="12"
                      placeholder={t('Signup.BgndPlaceholder')}
                      id="background"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-6 md:col-span-6">
                  <div className="mt-4 relative">
                    <p className="p-0 bottom-12 ml-2  mb-2 bg-transparent text-gray-200">
                      {t('Signup.Goals')}
                      {goals.params.value.length > 29 ? (
                        <span className="pl-1 text-xs font-normal">{`(${goals.params.value.length}/200)`}</span>
                      ) : (
                        <span className="pl-1 text-xs font-normal">{`(${goals.params.value.length}/30 characters minimum)`}</span>
                      )}
                    </p>
                    <textarea
                      className="md:h-40 text-area"
                      placeholder={t('Signup.GoalsPlaceholder')}
                      {...goals.params}
                      minLength="30"
                      maxLength="200"
                      id="goals"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2 pl-4 pt-3">
                    <input
                      id="terms-and-conditions"
                      name="terms-and-conditions"
                      type="checkbox"
                      className="h-3 w-3 md:h-4 md:w-4 rounded border-gray-500 text-gray-500 focus:ring-gray-500"
                    />
                    <p className="text-xs md:text-sm text-gray-200">{t('Signup.Agree')}</p>
                    <a
                      href="https://www.websitepolicies.com/policies/view/wahdskSn"
                      target="blank"
                      className="text-xs md:text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      {t('Signup.Terms')}
                    </a>
                    <span className="text-xs md:text-sm text-gray-200">{t('Signup.And')}</span>
                    <a
                      href="https://www.websitepolicies.com/policies/view/wahdskSn"
                      target="blank"
                      className="text-xs md:text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      {t('Signup.Conditions')}
                    </a>
                  </div>
                  <button
                    type="submit"
                    id="subscribe-button"
                    className="mt-4 mb-6 h-12 w-full bg-gray-500 text-white rounded hover:bg-gray-400 border
                    focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition duration-500  active:bg-gray-800"
                  >
                    {t('Signup.SignupButton')}
                  </button>
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
