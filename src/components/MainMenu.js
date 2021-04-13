import React, { useState } from 'react'
import threes from '../img/threes.png'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import me from '../img/me.jpg'
import Modal from './Modal'

const MainMenu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.loggedUser)
  const [dropdown, setDropdown] = useState(false)
  const [background, setBackground] = useState(false)
  const visibleDrop = { display: dropdown ? '' : 'none' }
  const backgroundVisible = { display: background ? '' : 'none' }

  //console.log('LOGGED USER: ', user)

  const handleDropdown = () => {
    setDropdown(!dropdown)
    setBackground(!background)
  }
  const handleBrackground = () => {
    setDropdown(!dropdown)
    setBackground(!background)
  }

  const handleLogout = async () => {
    dispatch(userLogout())
    history.push('/signIn')
  }

  return (
    // <!-- This example requires Tailwind CSS v2.0+ -->
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={threes} alt="Workflow" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">


                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  <Link to="/frontpage" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    <i className="text-gray-300">Jane's Total Wellness</i>
                  </Link>

                  <Link to="/programs" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Programs</Link>

                  <Link to="/exercises" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Exercises</Link>

                  <Link to="/recipes" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Recipes</Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* <!-- Profile dropdown --> */}
                <div className="ml-3 relative">
                  <div>
                    <button type="button" tabIndex="-1" className="relative z-10 block max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={handleDropdown}
                    >
                      <img className="h-8 w-8 rounded-full" src={me} alt="" />
                    </button>
                    <button style={backgroundVisible} onClick={handleBrackground} className="fixed inset-0 w-full bg-black opacity-50 z-5"></button>
                  </div>
                  <div style={visibleDrop} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu" >
                    {user ?
                      <div>
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">Profile</Link>
                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" role="menuitem">Settings</Link>
                        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 mr-20" role="menuitem" >Sign out</button>
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
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. -->
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>

            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>

            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Reports</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={me} alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
              </div>
              <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <!-- Heroicon name: outline/bell -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Your Profile</a>

              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Settings</a>

              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign out</a>
            </div>
          </div>
        </div> */}
      </nav>
      <Modal />
    </div>
  )
}

export default MainMenu