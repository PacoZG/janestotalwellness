import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CloseMenuIcon } from '../../assets/close-menu-icon.svg'
import { ReactComponent as OpenMenuIcon } from '../../assets/open-menu-icon.svg'
import { ReactComponent as LanguageIcon } from '../../assets/language-icon.svg'
import { ReactComponent as NoPicIcon } from '../../assets/no-pic-icon.svg'
import { ReactComponent as EditIcon } from '../../assets/edit-icon.svg'
import { ReactComponent as LogoutIcon } from '../../assets/logout-icon.svg'
import { ReactComponent as LoginIcon } from '../../assets/login-icon.svg'
import { ReactComponent as SignupIcon } from '../../assets/signup-icon.svg'
import SignMenuIcon from '../../assets/sign-menu-icon.png'

const MobileView = ({
  handleMobileMenu,
  visibleMobileMenu,
  showLanguageMenu,
  handleMobileDropdown,
  handleLanguageDropdwon,
  language,
  dropdown,
  setDropdown,
  handleSetLanguage,
  handleLogout,
}) => {
  const { t } = useTranslation()
  const loggedUser = useSelector(state => state.loggedUser)
  return (
    <div>
      <div className="flex flex-row relative mt-0 p-2 pt-3 pb-3 md:hidden " id="mobile-menu">
        <div>
          <div className="flex-shrink-0 ml-3 mt-0 mb-2">
            <button
              onClick={handleMobileMenu}
              className="relative z-10 max-w-xs bg-gray-800 flex items-center text-sm focus:outline-none focus:border-transparent"
            >
              {visibleMobileMenu ? <OpenMenuIcon /> : <CloseMenuIcon />}
            </button>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 border-gray-700 p-2 pt-3 pb-3">
          <div className="flex items-center px-3 right-0">
            <Transition
              show={showLanguageMenu}
              enter="transition-opacity duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="absolute bg-gray-200 top-14 right-26 h-auto w-auto rounded-sm z-40 origin-top-right mt-2
              shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-300"
              >
                <p className="p-1 " onClick={() => handleSetLanguage('EN')}>
                  <img src="https://flagcdn.com/40x30/gb.png" className="h-6 w-8" width="80" height="60" alt="UK" />
                </p>
                <p className="p-1 " onClick={() => handleSetLanguage('FI')}>
                  <img
                    src="https://flagcdn.com/80x60/fi.png"
                    className="h-6 w-8"
                    width="80"
                    height="60"
                    alt="Finland"
                  />
                </p>
                <p className="p-1 " onClick={() => handleSetLanguage('ES')}>
                  <img src="https://flagcdn.com/40x30/es.png" className="h-6 w-8" width="80" height="60" alt="Spain" />
                </p>
              </div>
              <button
                onClick={handleLanguageDropdwon}
                className="fixed inset-0 w-full bg-black opacity-20 z-30"
              ></button>
            </Transition>
            <label className="text-base text-gray-300 pt-2 pr-1">{language ? language : 'EN'}</label>
            <button
              className="pr-3 text-xl text-gray-300 rounded-full focus:outline-none "
              type="button"
              onClick={handleLanguageDropdwon}
            >
              <LanguageIcon className="h-7 w-7" />
            </button>

            <button
              type="button"
              tabIndex="-1"
              id="user-menu"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={handleMobileDropdown}
              className="relative z-50 max-w-xs bg-gray-800 rounded-full flex items-center
                text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300"
            >
              {loggedUser && (
                <img
                  className="h-14 w-14 rounded-full"
                  src={loggedUser.imageURL ? loggedUser.imageURL : loggedUser.avatarPic}
                  alt="profile"
                />
              )}
              {!loggedUser && (
                <img
                  className="h-16 w-16 border-0 bg-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  src={SignMenuIcon}
                  alt="sign-menu-icon"
                />
              )}
            </button>
          </div>

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
              className="origin-top-right absolute right-2 z-50 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              {loggedUser ? (
                <div className=" divide-y divide-gray-300 ">
                  <Link
                    to={'/profile'}
                    className="block text-base text-gray-800 hover:bg-gray-100 pl-2 p-1"
                    role="menuitem"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <div id="profile" className="flex items-center pl-1 pb-1">
                      <NoPicIcon />
                      <span id="profile" className="pl-2 text-sm">
                        {t('MainMenu.ProfileLabel')}
                      </span>
                    </div>
                  </Link>
                  <Link
                    id="edit-profile"
                    to={'/editForm'}
                    className="block text-base text-gray-800 hover:bg-gray-100 pl-2 p-1"
                    role="menuitem"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <div id="edit-profile" className="flex items-center pl-1 p-1">
                      <EditIcon />
                      <span className="pl-2 text-sm">{t('MainMenu.EditProfileLabel')}</span>
                    </div>
                  </Link>
                  <div
                    id="signout"
                    onClick={handleLogout}
                    className="block text-base text-gray-800 hover:bg-gray-100 pl-2  p-1"
                    role="menuitem"
                  >
                    <div className="flex items-center pl-1 pt-1">
                      <LogoutIcon />
                      <span className="pl-2 text-sm">{t('MainMenu.SignoutLabel')}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" divide-y divide-gray-300">
                  <Link
                    id="signin"
                    to={'/signIn'}
                    className="block text-base text-gray-800 hover:bg-gray-100 p-1"
                    role="menuitem"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <div className="flex items-center pl-1 pb-1 ">
                      <LoginIcon />
                      <span className="pl-2 text-sm">{t('MainMenu.SigninLabel')}</span>
                    </div>
                  </Link>
                  <Link
                    id="signup"
                    to={'/signUp'}
                    className="block text-base text-gray-800 hover:bg-gray-100 pl-1 pt-1 pb-1"
                    role="menuitem"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <div className="flex items-center pl-1 pt-1 ">
                      <SignupIcon />
                      <span className="pl-2 text-sm">{t('MainMenu.SignupLabel')}</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <button onClick={handleMobileDropdown} className="fixed inset-0 w-full bg-black opacity-25 z-30"></button>
          </Transition>
        </div>
      </div>
      <Transition
        show={visibleMobileMenu}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="md:hidden border-t pt-2 pb-2">
          <div className="space-y-3">
            <Link to={'/home'} className="mobile-link">
              Jane&lsquo;s Total Wellness
            </Link>
            <Link to={'/salon'} className="mobile-link">
              {t('MainMenu.ForumLabel')}
            </Link>
            <Link to={'/blogs'} className="mobile-link">
              {t('MainMenu.BlogLabel')}
            </Link>
            {/* {loggedUser ? (
                <Link to={'/myprogram'} className="mobile-link">
                  {t('MainMenu.ProgramLabel')}
                </Link>
              ) : null} */}
            {loggedUser && loggedUser.userType === 'admin' ? (
              <div className="space-y-3">
                <Link to={'/createblog'} className="mobile-link">
                  {t('MainMenu.CreateBlogLabel')}
                </Link>
                <Link to={'/myclients'} className="mobile-link">
                  {t('MainMenu.ClientsLabel')}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default MobileView
