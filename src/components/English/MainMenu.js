import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import threes from '../../img/threes.png'
import { userLogout } from '../../reducers/loginReducer'
import { switchLanguage } from '../../reducers/languageReducer'
import Modal from './Modal'

const MainMenu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const userLanguage = useSelector(state => state.language)
  // console.log('USER LANGUAGE: ', userLanguage)
  const UILanguage = userLanguage ? userLanguage : 'eng'
  // console.log('UI LANGUAGE: ', UILanguage)

  const [dropdown, setDropdown] = useState(false)
  const [background, setBackground] = useState(false)
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [languageBackground, setLanguageBackground] = useState(false)
  const visibleLangMenu = { display: showLanguageMenu ? '' : 'none' }
  const visibleDrop = { display: dropdown ? '' : 'none' }
  const visibleMobileDrop = { display: dropdown ? '' : 'none' }
  const mobileMenu = { display: visibleMenu ? '' : 'none' }
  const backgroundVisible = { display: background ? '' : 'none' }
  const languageBackgroundVisible = { display: languageBackground ? '' : 'none' }

  const handleDropdown = () => {
    setDropdown(!dropdown)
    setBackground(!background)
  }
  const handleBrackground = () => {
    setDropdown(!dropdown)
    setBackground(!background)
  }

  const handleVisibility = () => {
    setVisibleMenu(!visibleMenu)
  }

  const handleLogout = () => {
    dispatch(userLogout())
    history.push(`/${UILanguage}/home`)
  }

  const handleLanguageDropdwon = () => {
    setShowLanguageMenu(!showLanguageMenu)
    setLanguageBackground(!languageBackground)
  }

  const handleSetLanguage = (language) => {
    dispatch(switchLanguage(language))
    var location = window.location.pathname
    const currentLocation = `/${language}${location.substring(4)}`
    history.push(currentLocation)
    setShowLanguageMenu(!showLanguageMenu)
    setLanguageBackground(!languageBackground)
    // console.log('LOCATION: ', location.substring(4))
    // console.log('CURRENT LOCATION: ', currentLocation)
  }

  const handleLanguageBrackground = () => {
    setShowLanguageMenu(!showLanguageMenu)
    setLanguageBackground(!languageBackground)
  }

  const getLibLabel = () => {
    if(UILanguage === 'eng'){
      return 'Exercise library'
    } else if(UILanguage === 'fin'){
      return 'Harjoituskirjasto'
    } else if(UILanguage === 'esp'){
      return 'Librería de ejercicios'
    }
  }

  const getProgamLabel = () => {
    if(UILanguage === 'eng'){
      return 'My Program'
    } else if(UILanguage === 'fin'){
      return 'Oma ohjelma'
    } else if(UILanguage === 'esp'){
      return 'Mi Programa'
    }
  }

  const getClientsLabel = () => {
    if(UILanguage === 'eng'){
      return 'My Clients'
    } else if(UILanguage === 'fin'){
      return 'Asiakkaani'
    } else if(UILanguage === 'esp'){
      return 'Mis Clients'
    }
  }

  const getProfileLabel = () => {
    if(UILanguage === 'eng'){
      return 'Profile'
    } else if(UILanguage === 'fin'){
      return 'Profiili'
    } else if(UILanguage === 'esp'){
      return 'Perfil'
    }
  }

  const getEditProfLabel = () => {
    if(UILanguage === 'eng'){
      return 'Edit profile'
    } else if(UILanguage === 'fin'){
      return 'Muokkaa profiilia'
    } else if(UILanguage === 'esp'){
      return 'Editar perfil'
    }
  }

  const getSignoutLabel = () => {
    if(UILanguage === 'eng'){
      return 'Sign out'
    } else if(UILanguage === 'fin'){
      return 'Kirjaudu ulos'
    } else if(UILanguage === 'esp'){
      return 'Cerrar sesión'
    }
  }

  const getSigninLabel = () => {
    if(UILanguage === 'eng'){
      return 'Sign in'
    } else if(UILanguage === 'fin'){
      return 'Kirjaudu sisään'
    } else if(UILanguage === 'esp'){
      return 'Iniciar sesión'
    }
  }

  const getSignupLabel = () => {
    if(UILanguage === 'eng'){
      return 'Sign up'
    } else if(UILanguage === 'fin'){
      return 'Kirjaudu'
    } else if(UILanguage === 'esp'){
      return 'Susbcrbirme'
    }
  }

  return (
    <div>
      <div className="bg-gray-600 w-full">
        {/* Desktop menu,. */}
        <div className="flex items-top justify-between px-2 pl-4 pr-4 pt-3 md:pt-6 md:pb-5">
          <div className="flex items-center">
            <div className="hidden md:flex">
              <div className="flex-shrink-0">
                {/* <p onClick={() => history.push('/eng/home')} className="cursor-pointer"> */}
                <img className="h-12 w-12 rounded-full" src={threes} alt="Workflow" />
                {/* </p> */}
              </div>
              <div className="ml-10 flex items-baseline space-x-3 pt-2">
                <Link id="home" to={`/${UILanguage}/home`} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <i className="text-gray-300 text-md">{'Jane\'s Total Wellness'}</i>
                </Link>
                <Link id="exercises" to={`/${UILanguage}/exercises`} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{getLibLabel()}</Link>
                {loggedUser ?
                  <Link id="myprogram" to={`/${UILanguage}/myprogram`} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{getProgamLabel()}</Link>
                  : null}
                {loggedUser && loggedUser.userType === 'admin' ?
                  <Link id="myclients" to={`/${UILanguage}/myclients`} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{getClientsLabel()}</Link> :
                  null
                }
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div style={visibleLangMenu}
                className="absolute bg-gray-200 top-14 right-28 h-auto w-auto rounded-sm z-40 origin-top-right mt-2
                            shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-500">
                <p id="ENG" className="text-center p-1 hover:bg-gray-500 cursor-pointer " onClick={() => handleSetLanguage('eng')} >
                  <img src="https://flagcdn.com/40x30/gb.png" className="h-5 w-7" width="80" height="60" alt="UK" />
                </p>
                <p id="FIN" className="text-center p-1 hover:bg-gray-500 cursor-pointer " onClick={() => handleSetLanguage('fin')}>
                  <img src="https://flagcdn.com/80x60/fi.png" className="h-5 w-7" width="80" height="60" alt="Finland" />
                </p>
                <p id="ESP" className="text-center p-1 hover:bg-gray-500 cursor-pointer " onClick={() => handleSetLanguage('esp')}>
                  <img src="https://flagcdn.com/40x30/es.png" className="h-5 w-7" width="80" height="60" alt="Spain" />
                </p>
              </div>
              <button id="language-menuShow" className="pr-3 text-xl text-gray-300 rounded-full focus:outline-none z-40 " type="button"
                onClick={handleLanguageDropdwon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>
              <button id="langBackground-button" style={languageBackgroundVisible} onClick={handleLanguageBrackground} className="fixed inset-0 w-full bg-black opacity-25 z-30 cursor-wait"></button>
              <div className="ml-3 relative">
                <button type="button" tabIndex="-1" className="relative z-50 max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300"
                  id="user-menu" aria-expanded="false" aria-haspopup="true" onClick={handleDropdown}
                >
                  {loggedUser && loggedUser.imageURL ?
                    <img className="h-12 w-12 rounded-full p-1 bg-gray-200 transform hover:rotate-6 transition" src={loggedUser.imageURL} alt="" /> :
                    <span className="inline-block rounded-full h-12 w-12 md:rounded-full overflow-hidden bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  }
                </button>
                <button id="background-button" style={backgroundVisible} onClick={handleBrackground} className="fixed inset-0 w-full bg-black opacity-25 z-40 cursor-wait"></button>
                <div style={visibleDrop} className="origin-top-right absolute right-0 z-40 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu" aria-orientation="vertical" aria-labelledby="user-menu" >
                  {loggedUser ?
                    <div className=" divide-y divide-gray-300 " >
                      <Link id="profile-button" to={`/${UILanguage}/profile`} className="block text-md text-gray-800 hover:bg-gray-100 p-1 " role="menuitem">
                        <div className="flex items-center pl-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="pl-2 text-sm">{getProfileLabel()}</span>
                        </div>
                      </Link>
                      <Link id="editprofile-button" to={`/${UILanguage}/editForm`} className="block text-md text-gray-800 hover:bg-gray-100 p-1" role="menuitem">
                        <div className="flex items-center pl-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span className="pl-2 text-sm">{getEditProfLabel()}</span>
                        </div>
                      </Link>
                      <div id="signout-button" onClick={handleLogout} className="block text-md text-gray-800 hover:bg-gray-100 p-1 cursor-pointer" role="menuitem">
                        <div className="flex items-center pl-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="pl-2 text-sm">{getSignoutLabel()}</span>
                        </div>
                      </div>
                    </div>
                    :
                    <div className=" divide-y divide-gray-300">
                      <Link id="signin-button" to={`/${UILanguage}/signIn`} className="block text-md text-gray-800 hover:bg-gray-100 p-1" role="menuitem">
                        <div className="flex items-center pl-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          <span className="pl-2 text-sm">{getSigninLabel()}</span>
                        </div>
                      </Link>
                      <Link id="signup-button" to={`/${UILanguage}/signUp`} className="block text-md text-gray-800 hover:bg-gray-100 pl-1 pt-1 pb-1" role="menuitem">
                        <div className="flex items-center pl-1 ">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                          <span className="pl-2 text-sm">{getSignupLabel()}</span>
                        </div>
                      </Link>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Mobile menu, show/hide based on menu state. */}
        <div className="flex flex-row relative mt-0 md:hidden pb-2 " id="mobile-menu">
          <div>
            <div className="flex-shrink-0 ml-3 mt-0 mb-2">
              <button onClick={handleVisibility}
                className="relative z-10 max-w-xs bg-gray-800 flex items-center text-sm focus:outline-none focus:border-transparent">
                {visibleMenu ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>}
              </button>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 border-gray-700">
            <div className="flex items-center px-4 right-0">
              <div style={visibleLangMenu}
                className="absolute bg-gray-200 top-8 right-24 h-auto w-auto rounded-sm z-40 origin-top-right mt-2
              shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-300">
                <p className="p-1 " onClick={() => handleSetLanguage('eng')} >
                  <img src="https://flagcdn.com/40x30/gb.png" className="h-5 w-7" width="80" height="60" alt="UK" />
                </p>
                <p className="p-1 " onClick={() => handleSetLanguage('fin')}>
                  <img src="https://flagcdn.com/80x60/fi.png" className="h-5 w-7" width="80" height="60" alt="Finland" />
                </p>
                <p className="p-1 " onClick={() => handleSetLanguage('esp')}>
                  <img src="https://flagcdn.com/40x30/es.png" className="h-5 w-7" width="80" height="60" alt="Spain" />
                </p>
              </div>
              <button className="pr-3 text-xl text-gray-300 rounded-full focus:outline-none " type="button"
                onClick={handleLanguageDropdwon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>
              <button style={languageBackgroundVisible} onClick={handleLanguageBrackground} className="fixed inset-0 w-full bg-black opacity-20 z-30"></button>
              <button type="button" tabIndex="-1" id="user-menu" aria-expanded="false" aria-haspopup="true" onClick={handleDropdown}
                className="relative z-50 max-w-xs bg-gray-800 rounded-full flex items-center
                text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300"
              >
                {loggedUser && loggedUser.imageURL ?
                  <img className="h-12 w-12 rounded-full" src={loggedUser.imageURL} /> :
                  <span className="inline-block rounded-full h-10 w-10 md:rounded-full overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>}
              </button>
              <button style={backgroundVisible} onClick={handleBrackground} className="fixed inset-0 w-full bg-black opacity-25 z-30"></button>
            </div>
            <div style={visibleMobileDrop} className="origin-top-right absolute right-2 z-50 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu" aria-orientation="vertical" aria-labelledby="user-menu" >
              {loggedUser ?
                <div className=" divide-y divide-gray-300 " >
                  <Link to={`/${UILanguage}/profile`} className="block text-md text-gray-800 hover:bg-gray-100 pl-2 p-1" role="menuitem">
                    <div id="profile" className="flex items-center pl-1 pb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span id="profile" className="pl-2 text-sm">{getProfileLabel()}</span>
                    </div>
                  </Link>
                  <Link id="edit-profile" to={`/${UILanguage}/editForm`} className="block text-md text-gray-800 hover:bg-gray-100 pl-2 p-1" role="menuitem">
                    <div id="edit-profile" className="flex items-center pl-1 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="pl-2 text-sm">{getEditProfLabel()}</span>
                    </div>
                  </Link>
                  <div id="signout" onClick={handleLogout} className="block text-md text-gray-800 hover:bg-gray-100 pl-2  p-1" role="menuitem">
                    <div className="flex items-center pl-1 pt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="pl-2 text-sm">{getSignoutLabel()}</span>
                    </div>
                  </div>
                </div>
                :
                <div className=" divide-y divide-gray-300">
                  <Link id="signin" to={`/${UILanguage}/signIn`} className="block text-md text-gray-800 hover:bg-gray-100 p-1" role="menuitem">
                    <div className="flex items-center pl-1 pb-1 ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span className="pl-2 text-sm">{getSigninLabel()}</span>
                    </div>
                  </Link>
                  <Link id="signup" to={`/${UILanguage}/signUp`} className="block text-md text-gray-800 hover:bg-gray-100 pl-1 pt-1 pb-1" role="menuitem">
                    <div className="flex items-center pl-1 pt-1 ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span className="pl-2 text-sm">{getSignupLabel()}</span>
                    </div>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
        <div style={mobileMenu} className="md:hidden border-t pt-2 pb-2">
          <div className="space-y-3">
            <Link to={`/${UILanguage}/home`} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 rounded-md text-base font-medium">{'Jane\'s Total Wellness'}</Link>
            <Link to={`/${UILanguage}/exercises`} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 rounded-md text-base font-medium">{getLibLabel()}</Link>
            {loggedUser ?
              <Link to={`/${UILanguage}/myprogram`} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 rounded-md text-base font-medium">{getProgamLabel()}</Link>
              : null}
            {loggedUser && loggedUser.userType === 'admin' ?
              <Link to={`/${UILanguage}/myclients`} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 rounded-md text-base font-medium">{getClientsLabel()}</Link> :
              null
            }
          </div>
        </div>
      </div>
      <Modal />
    </div>
  )
}

export default MainMenu