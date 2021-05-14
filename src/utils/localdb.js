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
export default {
  saveUser,
  loadUser,
  removeUser,
  setUserLanguage,
  loadUserLanguage,
}
