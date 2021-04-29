import React, { useState } from 'react'
import threes from '../img/threes.png'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import Modal from './Modal'

const MainMenu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const [dropdown, setDropdown] = useState(false)
  const [background, setBackground] = useState(false)
  const [visibleMenu, setVisibleMenu] = useState(false)
  const visibleDrop = { display: dropdown ? '' : 'none' }
  const visibleMobileDrop = { display: dropdown ? '' : 'none' }
  const mobileMenu = { display: visibleMenu ? '' : 'none' }
  const backgroundVisible = { display: background ? '' : 'none' }

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
    history.push('/frontpage')
  }

  return (
    <div>
      <div className="bg-gray-600 w-full">
        {/* Desktop menu,. */}
        <div className="flex items-center justify-between px-2 pl-4 pr-4 pt-3 md:pt-6 md:pb-5">
          <div className="flex items-center">
            <div className="hidden md:flex">
              <div className="flex-shrink-0">
                <img className="h-12 w-12 rounded-full" src={threes} alt="Workflow" />
              </div>
              <div className="ml-10 flex items-baseline space-x-3 pt-2">
                <Link to="/frontpage" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <i className="text-gray-300">Jane's Total Wellness</i>
                </Link>

                <Link to="/programs" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Programs</Link>

                <Link to="/exercises" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Exercise library</Link>

                <Link to="/recipes" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Recipes</Link>

                {loggedUser && loggedUser.userType === 'admin' ?
                  <Link to="/clients" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My clients</Link> :
                  null
                }
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div>
                  <button type="button" tabIndex="-1" className="relative z-10 max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={handleDropdown}
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
                  <button style={backgroundVisible} onClick={handleBrackground} className="fixed inset-0 w-full bg-black opacity-25 z-40"></button>
                </div>
                <div style={visibleDrop} className="origin-top-right absolute right-0 z-40 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu" aria-orientation="vertical" aria-labelledby="user-menu" >
                  {loggedUser ?
                    <div>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">Profile</Link>
                      <Link to="/editForm" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">Edit profile</Link>
                      <Link to="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem" >Sign out</Link>
                    </div>
                    :
                    <div>
                      <Link to="/signIn" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">Sign in</Link>
                      <Link to="/signUp" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">Sign up</Link>
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
                className="relative z-10 max-w-xs bg-gray-800 flex items-center text-sm">
                {visibleMenu ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>}
              </button>
            </div>
            
            <div style={mobileMenu} className="border-t">

              <div className="px-1 pt-0 pb-1 space-y-0">
                <Link to="/frontpage" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Jane's Total Wellness</Link>

                <Link to="/programs" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Programs</Link>

                <Link to="/exercises" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Exercise library</Link>

                <Link to="/recipes" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Recipes</Link>

                {loggedUser && loggedUser.userType === 'admin' ?
                  <Link to="/clients" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My clients</Link> :
                  null
                }
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 border-gray-700">
            <div className="flex items-center px-4 right-0">
              <button type="button" tabIndex="-1" className="relative z-10 max-w-xs bg-gray-800 rounded-full flex items-center
                text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={handleDropdown}
              >
                {loggedUser && loggedUser.imageURL ?
                  <img className="ml-0 h-12 w-12 rounded-full" src={loggedUser.imageURL} alt="" /> :
                  <span className="inline-block rounded-full h-10 w-10 md:rounded-full overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>}
              </button>
              <button style={backgroundVisible} onClick={handleBrackground} className="fixed inset-0 w-full bg-black opacity-25 z-40"></button>
            </div>
            <div style={visibleMobileDrop} className="origin-top-right absolute right-2 z-40 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu" aria-orientation="vertical" aria-labelledby="user-menu" >
              {loggedUser ?
                <div>
                  <Link to="/profile" className="block px-4 py-2 text-md text-gray-800 hover:bg-gray-100" role="menuitem">Profile</Link>
                  <Link to="/editForm" className="block px-4 py-2 text-md text-gray-800 hover:bg-gray-100" role="menuitem">Edit profile</Link>
                  <Link to="#" onClick={handleLogout} className="block px-4 py-2 text-md text-gray-800 hover:bg-gray-100" role="menuitem" >Sign out</Link>
                </div>
                :
                <div>
                  <Link to="/signIn" className="block px-4 py-2 text-md text-gray-800 hover:bg-gray-100" role="menuitem">Sign in</Link>
                  <Link to="/signUp" className="block px-4 py-2 text-md text-gray-800 hover:bg-gray-100" role="menuitem">Sign up</Link>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </div>
  )
}

export default MainMenu