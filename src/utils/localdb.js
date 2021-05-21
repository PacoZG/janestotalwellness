const saveUser = user => {
  localStorage.setItem('loggedInUser', JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(localStorage.getItem('loggedInUser'))
}

const removeUser = () => {
  localStorage.removeItem('loggedInUser')
}

const setUserLanguage = language => {
  localStorage.setItem('userLanguage', JSON.stringify(language))
}

const loadUserLanguage = () => {
  return JSON.parse(localStorage.getItem('userLanguage'))
}

const setCookies = () => {
  localStorage.setItem('cookies', true)
}

const getCookies = () => {
  return localStorage.getItem('cookies')
}

const rememberUser = user => {
  localStorage.setItem(`credentials:${user.username}`, JSON.stringify(user))
}

const loadUserInfo = username => {
  return JSON.parse(localStorage.getItem(`credentials:${username}`))
}

const forgetSettings = username => {
  localStorage.removeItem('userLanguage')
  localStorage.removeItem(`credentials:${username}`)
  localStorage.removeItem('cookies')
}

export default {
  saveUser,
  loadUser,
  removeUser,
  setUserLanguage,
  loadUserLanguage,
  setCookies,
  getCookies,
  rememberUser,
  loadUserInfo,
  forgetSettings,
}
