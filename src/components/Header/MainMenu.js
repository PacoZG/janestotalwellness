import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import i18n from 'i18next'
import { userLogout } from '../../reducers/loginReducer'
import localDB from '../../utils/localdb'
import Modal from '../Modal'
import DesktopView from './DesktopView'
import MobileView from './MobileView'

const MainMenu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [language, setLanguage] = useState(localDB.loadUserLanguage())
  const [dropdown, setDropdown] = useState(false)
  const [visibleMobileMenu, setVisibleMobileMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [languageBackground, setLanguageBackground] = useState(false)

  const handleLanguageDropdwon = () => {
    setShowLanguageMenu(!showLanguageMenu)
  }

  const handleMobileDropdown = () => {
    setDropdown(!dropdown)
    if (visibleMobileMenu) {
      setVisibleMobileMenu(!visibleMobileMenu)
    }
  }

  const handleMobileMenu = () => {
    setVisibleMobileMenu(!visibleMobileMenu)
  }

  const handleLogout = () => {
    dispatch(userLogout())
    setDropdown(!dropdown)
    history.push('/home')
  }

  const handleSetLanguage = lang => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
    localDB.setUserLanguage(lang)
    setShowLanguageMenu(!showLanguageMenu)
    setLanguageBackground(!languageBackground)
  }

  return (
    <div>
      <div className="fixed z-40 bg-gray-600 w-full">
        {/* Desktop menu,. */}
        <DesktopView
          showLanguageMenu={showLanguageMenu}
          handleLanguageDropdwon={handleLanguageDropdwon}
          language={language}
          setLanguage={setLanguage}
          dropdown={dropdown}
          setDropdown={setDropdown}
          handleLogout={handleLogout}
          handleSetLanguage={handleSetLanguage}
        />

        {/* Mobile menu, show/hide based on menu state. */}
        <MobileView
          handleMobileMenu={handleMobileMenu}
          visibleMobileMenu={visibleMobileMenu}
          dropdown={dropdown}
          language={language}
          handleLanguageDropdwon={handleLanguageDropdwon}
          setVisibleMobileMenu={setVisibleMobileMenu}
          showLanguageMenu={showLanguageMenu}
          handleMobileDropdown={handleMobileDropdown}
          handleLogout={handleLogout}
          handleSetLanguage={handleSetLanguage}
        />
      </div>
      <Modal />
    </div>
  )
}

export default MainMenu
