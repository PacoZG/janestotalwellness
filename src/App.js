import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UserProfile from './components/UserProfile'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import Editform from './components/EditForm'
import MainMenu from './components/MainMenu'
import Footer from './components/Footer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
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
        </Switch>
      </Router>
      <Footer />
    </div >
  )
}

export default App