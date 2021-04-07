import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UserProfile from './components/UserProfile'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import MainMenu from './components/MainMenu'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(initializeUsers())
  // }, [dispatch])

  return (
    < div className="" >
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
        </Switch>
      </Router>
    </div >
  )
}

export default App