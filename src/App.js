import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { getUser } from './reducers/userReducer'
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
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  //console.log('USER: ', userId)

  useEffect(() => {
    if (localdb.loadUser()) {
      dispatch(getUser(localdb.loadUser().id))
    }
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(initializeUsers())
  // }, [dispatch])

  return (
    <div >
      <Router>
        <MainMenu />
        <Switch>
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
          <Router path="/myclients">
            <MyClients />
          </Router>
        </Switch>
      </Router>
      <Footer />
    </div >
  )
}

export default App