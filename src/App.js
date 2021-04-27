import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { getUser } from './reducers/userReducer'
import { getAllNotes } from './reducers/noteReducer'
import localdb from './utils/localdb'

import UserProfile from './components/UserProfile'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import Editform from './components/EditForm'
import MainMenu from './components/MainMenu'
import Footer from './components/Footer'
import Frontpage from './components/Frontpage'
import Programs from './components/Programs'
import Exercises from './components/Exercises'
import Recipes from './components/Recipes'
import MyClients from './components/MyClients'
import Client from './components/Client'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localdb.loadUser()) {
      dispatch(getUser(localdb.loadUser().id))
      dispatch(initializeUsers())
      dispatch(getAllNotes())
    }
  }, [dispatch])

  return (
    <div >
      <Router>
        <MainMenu />
        <Switch>
          <Route path="/clients/:id">
            <Client />
          </Route>
          <Route path="/signUp" >
            <SignUpForm />
          </Route>
          <Route path="/signIn" >
            <SignInForm />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route path="/editForm">
            <Editform />
          </Route>
          <Route path="/frontpage">
            <Frontpage />
          </Route>
          <Route path="/programs">
            <Programs />
          </Route>
          <Route path="/exercises">
            <Exercises />
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/clients">
            <MyClients />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div >
  )
}

export default App