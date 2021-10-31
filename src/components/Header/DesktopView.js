import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as LanguageIcon } from '../../assets/language-icon.svg'
import { ReactComponent as NoPicIcon } from '../../assets/no-pic-icon.svg'
import { ReactComponent as EditIcon } from '../../assets/edit-icon.svg'
import { ReactComponent as LogoutIcon } from '../../assets/logout-icon.svg'
import { ReactComponent as LoginIcon } from '../../assets/login-icon.svg'
import { ReactComponent as SignupIcon } from '../../assets/signup-icon.svg'
import SignMenuIcon from '../../assets/sign-menu-icon.png'

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
              <LanguageIcon className="h-7 w-7" />
            </div>
          </button>

          <div className="ml-3 relative">
            <button
              type="button"
              tabIndex="-1"
              className="relative rounded-full z-50 bg-gray-800 flex items-center focus:outline-none border-0"
              id="user-menu"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={handleDropdown}
            >
              {loggedUser && (
                <img
                  className="h-12 w-12 md:h-16 md:w-16 rounded-full p-0.5 bg-gray-400 transform hover:rotate-6 transition"
                  src={loggedUser.imageURL ? loggedUser.imageURL : loggedUser.avatarPic}
                  alt="profile"
                />
              )}
              {!loggedUser && (
                <span className="h-14 w-14 rounded-full border-0">
                  <img
                    className="h-16 w-16 border-0 bg-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    src={SignMenuIcon}
                    alt="sign-menu-icon"
                  />
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
                        <NoPicIcon />
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
                        <EditIcon />
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
                        <LogoutIcon />
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
                        <LoginIcon />
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
                        <SignupIcon />
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
