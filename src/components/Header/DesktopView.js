import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

const DesktopView = ({
  showLanguageMenu,
  handleLanguageDropdwon,
  language,
  dropdown,
  setDropdown,
  handleSetLanguage,
  handleLogout,
}) => {
  const { t } = useTranslation()
  const loggedUser = useSelector(state => state.loggedUser)
  const handleDropdown = () => {
    setDropdown(!dropdown)
  }

  return (
    <div className="flex items-top justify-between ">
      <div className="hidden md:flex md:items-center md:pb-1 md:pt-1">
        <div className="flex items-stretch ">
          <Link id="home" to={'/home'} className="web-link">
            <i className="web-link text-base">Jane&lsquo;s Total Wellness</i>
          </Link>
          <Link id="salon" to={'/salon'} className="web-link">
            {t('MainMenu.ForumLabel')}
          </Link>
          <Link id="blogs" to={'/blogs'} className="web-link">
            {t('MainMenu.BlogLabel')}
          </Link>
          {/* {loggedUser ? (
                <Link id="myprogram" to={'/myprogram'} className="web-link">
                  {t('MainMenu.ProgramLabel')}
                </Link>
              ) : null} */}
          {loggedUser && loggedUser.userType === 'admin' ? (
            <div className="flex items-stretch">
              <Link id="create-blog" to={'/createblog'} className="web-link">
                {t('MainMenu.CreateBlogLabel')}
              </Link>
              <Link id="myclients" to={'/myclients'} className="web-link">
                {t('MainMenu.ClientsLabel')}
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <div className="hidden md:block py-3 pr-3">
        <div className="ml-1 flex items-center md:ml-3">
          <Transition
            show={showLanguageMenu}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="absolute bg-gray-200 top-13 right-22 h-auto w-auto rounded-sm z-40 origin-top-right mt-2
                            shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-500"
            >
              <p
                id="ENG"
                className="text-center p-1 hover:bg-gray-500 cursor-pointer "
                onClick={() => handleSetLanguage('EN')}
              >
                <img src="https://flagcdn.com/40x30/gb.png" className="h-6 w-8" width="80" height="60" alt="UK" />
              </p>
              <p
                id="FIN"
                className="text-center p-1 hover:bg-gray-500 cursor-pointer "
                onClick={() => handleSetLanguage('FI')}
              >
                <img src="https://flagcdn.com/80x60/fi.png" className="h-6 w-8" width="80" height="60" alt="Finland" />
              </p>
              <p
                id="ESP"
                className="text-center p-1 hover:bg-gray-500 cursor-pointer "
                onClick={() => handleSetLanguage('ES')}
              >
                <img src="https://flagcdn.com/40x30/es.png" className="h-6 w-8" width="80" height="60" alt="Spain" />
              </p>
            </div>
            <button
              id="langBackground-button"
              onClick={handleLanguageDropdwon}
              className="fixed inset-0 w-full bg-black opacity-25 z-30 cursor-wait"
            ></button>
          </Transition>
          <label className="text-base text-gray-300 pt-2 pr-1">{language ? language : 'EN'}</label>
          <button
            id="language-menuShow"
            className="transition duration-1000 pr-1 text-xl text-gray-300 hover:text-gray-400 rounded-full focus:outline-none z-40 "
            type="button"
            onClick={handleLanguageDropdwon}
          >
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
          </button>

          <div className="ml-3 relative">
            <button
              type="button"
              tabIndex="-1"
              className="relative z-50 max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300"
              id="user-menu"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={handleDropdown}
            >
              {loggedUser && loggedUser.imageURL ? (
                <img
                  className="h-14 w-14 rounded-full p-1 bg-gray-200 transform hover:rotate-6 transition"
                  src={loggedUser.imageURL}
                  alt=""
                />
              ) : (
                <span className="inline-block rounded-full h-12 w-12 md:rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
            </button>

            <Transition
              show={dropdown}
              enter="transition-opacity duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="origin-top-right absolute right-0 z-50 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                {loggedUser ? (
                  <div className=" divide-y divide-gray-300 ">
                    <Link
                      id="profile-button"
                      to={'/profile'}
                      className="block text-base text-gray-800 hover:bg-gray-100 p-1 "
                      role="menuitem"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <div className="flex items-center pl-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="pl-2 text-sm">{t('MainMenu.ProfileLabel')}</span>
                      </div>
                    </Link>
                    <Link
                      id="editprofile-button"
                      to={'/editForm'}
                      className="block text-base text-gray-800 hover:bg-gray-100 p-1"
                      role="menuitem"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <div className="flex items-center pl-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span className="pl-2 text-sm">{t('MainMenu.EditProfileLabel')}</span>
                      </div>
                    </Link>
                    <div
                      id="signout-button"
                      onClick={handleLogout}
                      className="block text-base text-gray-800 hover:bg-gray-100 p-1 cursor-pointer"
                      role="menuitem"
                    >
                      <div className="flex items-center pl-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="pl-2 text-sm">{t('MainMenu.SignoutLabel')}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" divide-y divide-gray-300">
                    <Link
                      id="signin-button"
                      to={'/signIn'}
                      className="block text-base text-gray-800 hover:bg-gray-100 p-1"
                      role="menuitem"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <div className="flex items-center pl-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="pl-2 text-sm">{t('MainMenu.SigninLabel')}</span>
                      </div>
                    </Link>
                    <Link
                      id="signup-button"
                      to={'/signUp'}
                      className="block text-base text-gray-800 hover:bg-gray-100 pl-1 pt-1 pb-1"
                      role="menuitem"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      <div className="flex items-center pl-1 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        </svg>
                        <span className="pl-2 text-sm">{t('MainMenu.SignupLabel')}</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <button
                id="background-button"
                onClick={handleDropdown}
                className="transition duration-500 fixed inset-0 w-full bg-black opacity-25 z-40 cursor-wait"
              ></button>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesktopView
