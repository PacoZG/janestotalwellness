const saveUser = (user) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user))
}

const loadUser = () => {
  return JSON.parse(localStorage.getItem('loggedInUser'))
}

const removeUser = () => {
  localStorage.removeItem('loggedInUser')
  localStorage.clear()
}

export default { saveUser, loadUser, removeUser }
