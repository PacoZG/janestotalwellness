import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/index'
import { createUser } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notificationReducer'
import userService from '../../services/user'

const SignUpFormFin = () => {
  const dispatch = useDispatch()

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
  const goals = useField('text')

  const [country, setCountry] = useState(null)
  const countries = [
    'Suomi', 'Ruotsi', 'Norja', 'Viro', 'Saksa', 'Espanja', 'Italia', 'Alankomaat', 'Sveitsi', 'Meksiko'
  ]
  const handleCountry = (country) => {
    setCountry(country)
    setDropdown(!dropdown)
  }
  //console.log('DROPDOWN: ', dropdown)
  //console.log('COUNTRY: ', country)

  const handleSignUp = async (event) => {
    event.preventDefault()
    var genders = document.getElementsByName('gender')
    let selectedGender

    for (var i = 0; i < genders.length; i++) {
      if (genders[i].checked) {
        selectedGender = genders[i].value
      }
    }

    const checkBox = document.getElementById('terms-and-conditions')
    // console.log('CHECKBOX: ', checkBox.checked)

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
      goals: goals.params.value,
      userType: 'client'
    }
    //console.log('NEW_USER: ', newUser)
    try {
      if (password.params.value !== passwordConfirm.params.value) {
        dispatch(setNotification({
          message: 'Salasanakentät eivät täsmää, tarkista ja täytä kaikki lomakkeen kentät..',
          title: 'Salasanavirhe',
          show: true
        }))
      } else if (email.params.value !== emailConfirm.params.value) {
        dispatch(setNotification({
          message: 'Sähköpostikentät eivät täsmää, tarkista ja täytä kaikki lomakkeen kentät.',
          title: 'Sähköposti virhe',
          show: true
        }))
      } else if (!country) {
        dispatch(setNotification({
          message: 'Valitse maa.',
          title: 'Tiedot puuttuvat',
          show: true
        }))
      } else {
        if (checkBox.checked) {
          const createdUser = await userService.createUser(newUser)
          // console.log('CREATED USER: ', createdUser)
          dispatch(createUser(createdUser))
          dispatch(setNotification({
            message: `Käyttäjä ${username.params.value} on luotu.`,
            title: 'Menestys',
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
          goals.reset()
          setCountry('')
          for (var i = 0; i < genders.length; i++) {
            if (genders[i].checked) {
              genders[i].value = false
            }
          }
          history.push('/fin/signIn')
        } else {
          dispatch(setNotification({
            message: 'Sinun on hyväksyttävä käyttöehdot rekisteröityäksesi',
            title: 'Tarkista käyttöehdot -ruutu',
            show: true
          }))
        }
      }
    } catch (error) {
      //debugger
      if (error) {
        const message = error.response.data.message
        if (message.includes('Error') && !message.includes(email.params.value)) {
          //console.log(username.params.value)
          dispatch(setNotification({
            message: `Käyttäjätunnusta "${username.params.value.toLowerCase()}"  on käytetty, yritä toisella käyttäjätunnuksella.`,
            title: 'Käyttäjätunnusvirhe',
            show: true
          }))
        } else if (message.includes(email.params.value)) {
          dispatch(setNotification({
            message: `\'${email.params.value}' on jo tietokannassamme, yritä toisella sähköpostilla.`,
            title: 'Sähköposti virhe',
            show: true
          }))
        } else if (message.includes('Username has to')) {
          dispatch(setNotification({
            message: message.substring(34),
            title: 'Käyttäjätunnusvirhe',
            show: true
          }))
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
              <h1 className="text-center font-medium font-serif m-2 text-2xl text-gray-300">Kirjaudu</h1>
              <div className="px-4 py-4 bg-gray-700 md:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Etunimi</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      placeholder="John" {...firstName.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200">Sukunimi</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      placeholder="Smith" {...lastName.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Käyttäjätunnus</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      pattern="[A-Za-z0-9]+" placeholder="example: jhon1" title="User has to be at least 4 characters long" {...username.params} required />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <div className="mt-8 relative">
                      <label className="absolute bottom-12 ml-2 bg-transparent text-gray-200 ">Maa</label>
                      <div id="country" name="country" type="text"
                        className="h-12 w-full border border-gray-300 focus:ring-0 bg-white rounded-sm shadow-sm md:text-md text-left">
                        {country ?
                          <div className="text-lg text-gray-500">
                            {country}<span onClick={() => setCountry(null)}
                              className="absolute pt-0 opacity-50 inset-y-0 right-11 mt-2 z-30 cursor-pointer">X</span>
                          </div> :
                          <div className="opacity-25 text-lg">Valitse maa</div>}
                        <span className="absolute right-0 inset-y-0 flex items-center pr-2 pl-1 border-l mt-2 mb-2 cursor-pointer"
                          onClick={() => setDropdown(!dropdown)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div style={visibleDrop} className="absolute border rounded-b-md rounded-sm mt-2 col-span-6 w-full bg-white z-50 divide-y divide-gray-50 ">
                        {countries.sort().map(country =>
                          <p className="p-1 pl-3 text-gray-500 hover:bg-gray-500 hover:text-white cursor-pointer"
                            onClick={() => handleCountry(country)} key={country}
                          >{country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Sähköposti</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" id="email" placeholder="john@example.com" {...email.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Kirjoita sähköpostiosoite uudelleen</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" id="email-confirm" {...emailConfirm.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Salasana</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="password" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                      {...password.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Kirjoita salasana uudelleen<span className="text-sm text-gray-300 pl-2">{
                      passwordConfirm.params.value === password.params.value && passwordConfirm.params.value.length > 7 ? '(passwords matched)' : ''}</span>
                    </label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Sen on sisällettävä vähintään yksi numero ja yksi isoja ja pieniä kirjaimia sekä vähintään 8 tai enemmän merkkejä"
                      {...passwordConfirm.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Syntymäaika</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      {...dateOfBirth.params} min="1950-01-01" max="2005-12-31" required />
                  </div>
                  <div className="col-span-6 md:col-span-3 md:mt-8">
                    <div className="grid grid-flow-col justify-items-left pl-4 md:pl-4 mt-3 md:space-x-20">
                      <div className="grid grid-flow-col ">
                        <input id="male" name="gender" type="radio" value="male"
                          className="h-4 w-4 rounded-full border-gray-500 text-gray-500 focus:ring-gray-500" required />
                        <label className="block text-sm font-medium text-gray-200">Mies</label>
                      </div>
                      <div className="grid grid-flow-col">
                        <input id="female" name="gender" type="radio" value="female"
                          className="h-4 w-4 rounded-full border-gray-500 text-gray-500 focus:ring-gray-500" required />
                        <label className="lock text-sm font-medium text-gray-200">Nainen</label>
                      </div>
                      <div className="grid grid-flow-col">
                        <input id="other" name="gender" type="radio" value="other"
                          className="h-4 w-4 rounded-full border-gray-500 text-gray-500 focus:ring-gray-500" required />
                        <label className="lock text-sm font-medium text-gray-200">Muu</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Korkeus (cm)</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      {...height.params} required />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Paino (kg)</label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      {...weight.params} required />
                  </div><div className="col-span-6 md:col-span-6">
                    <label className="p-0 bottom-12 ml-2 bg-transparent text-gray-200 ">Tausta
                      <span className="text-gray-400 text-sm pl-2">(minkälaista fyysistä toimintaa olet tehnyt aiemmin?)</span></label>
                    <input className="block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent rounded-sm p-2 pl-3 h-12 w-full shadow-sm text-md border-gray-100 placeholder-gray-200"
                      {...background.params} required />
                  </div>
                </div>
                <div className="col-span-6 md:col-span-6">
                  <div className="mt-4 relative">
                    <p className="pl-2 mb-2 text-gray-200" >Tavoitteet</p>
                    <textarea className="md:h-40 h-32 block border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent w-full rounded-md p-2 text-sm placeholder-gray-200" placeholder="Tell me why you are seeking for my help"
                      {...goals.params} required />
                  </div>

                  <div className="flex items-center space-x-2 pl-3 pt-3">
                    <input id="terms-and-conditions" name="terms-and-conditions" type="checkbox"
                      className="h-3 w-3 md:h-4 md:w-4 rounded border-gray-500 text-gray-500 focus:ring-gray-500" />
                    <p className="text-xs md:text-md text-gray-200">Hyväksyn</p>
                    <a href="https://www.websitepolicies.com/policies/view/wahdskSn" target='blank' className="text-xs md:text-md text-indigo-400 hover:text-indigo-300">ehdot</a>
                    <p className="text-gray-200">ja</p>
                    <a href="https://www.websitepolicies.com/policies/view/wahdskSn" target='blank' className="text-xs md:text-md text-indigo-400 hover:text-indigo-300">tietosuojaehdot</a>
                  </div>
                  <button className="mt-4 mb-6 h-12 w-full bg-gray-500 text-white rounded hover:bg-gray-400
                    focus:ring focus:ring-offset-1 focus:ring-gray-800 transform transition active:bg-gray-800" type="submit">Sign up</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpFormFin