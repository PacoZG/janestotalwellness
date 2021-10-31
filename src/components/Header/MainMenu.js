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
          dropdown={dropdown}
          setDropdown={setDropdown}
          setLanguage={setLanguage}
          handleSetLanguage={handleSetLanguage}
          handleLogout={handleLogout}
        />

        {/* Mobile menu, show/hide based on menu state. */}
        <MobileView
          showLanguageMenu={showLanguageMenu}
          handleLanguageDropdwon={handleLanguageDropdwon}
          language={language}
          dropdown={dropdown}
          setDropdown={setDropdown}
          handleSetLanguage={handleSetLanguage}
          handleLogout={handleLogout}
          handleMobileMenu={handleMobileMenu}
          visibleMobileMenu={visibleMobileMenu}
          setVisibleMobileMenu={setVisibleMobileMenu}
          handleMobileDropdown={handleMobileDropdown}
        />
      </div>
      <Modal />
    </div>
  )
}

export default MainMenu
