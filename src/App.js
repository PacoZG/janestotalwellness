import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { getAllNotes } from './reducers/noteReducer'

// Components in english
import About from './components/English/About'
import Client from './components/English/Client'
import Editform from './components/English/EditForm'
import ExerciseLibrary from './components/English/ExerciseLibrary'
import Footer from './components/English/Footer'
import Home from './components/English/Home'
import MainMenu from './components/English/MainMenu'
import MyClients from './components/English/MyClients'
import MyProgram from './components/English/MyProgram'
import SignInForm from './components/English/SignInForm'
import SignUpForm from './components/English/SignUpForm'
import UserProfile from './components/English/UserProfile'
import TermsConditions from './components/English/TermsConditions'
import WarningLogout from './components/English/WarningLogout'

// Components in Finnish
import AboutFin from './components/Finnish/AboutFin'
import ClientFin from './components/Finnish/ClientFin'
import EditformFin from './components/Finnish/EditFormFin'
import ExerciseLibraryFin from './components/Finnish/ExerciseLibraryFin'
import HomeFin from './components/Finnish/HomeFin'
import MyClientsFin from './components/Finnish/MyClientsFin'
import MyProgramFin from './components/Finnish/MyProgramFin'
import SignInFormFin from './components/Finnish/SignInFormFin'
import SignUpFormFin from './components/Finnish/SignUpFormFin'
// import TermsConditionsFin from './components/Finnish/TermsConditions'
import UserProfileFin from './components/Finnish/UserProfileFin'

// Components in Spanish
import AboutEsp from './components/Spanish/AboutEsp'
import ClientEsp from './components/Spanish/ClientEsp'
import EditformEsp from './components/Spanish/EditFormEsp'
import ExerciseLibraryEsp from './components/Spanish/ExerciseLibraryEsp'
import HomeEsp from './components/Spanish/HomeEsp'
import MyClientsEsp from './components/Spanish/MyClientsEsp'
import MyProgramEsp from './components/Spanish/MyProgramEsp'
import SignInFormEsp from './components/Spanish/SignInFormEsp'
import SignUpFormEsp from './components/Spanish/SignUpFormEsp'
// import TermsConditionsEsp from './components/Spanish/TermsConditions'
import UserProfileEsp from './components/Spanish/UserProfileEsp'

const App = () => {
  const dispatch = useDispatch()
  const userLanguage = useSelector(state => state.language)
  // console.log('USER LANGUAGE: ', userLanguage)
  const UILanguage = userLanguage ? userLanguage : 'eng'
  // console.log('UI LANGUAGE: ', UILanguage)
  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(getAllNotes())
  }, [dispatch])
  if (!UILanguage) {
    null
  }

  return (
    <div >
      <Router>
        <MainMenu />
        <Switch>

          {/* English UI*/}
          <Route exact path='/'>
            <Redirect to='/eng/home' />
          </Route>
          <Route path='/eng/myclients/:id'>
            <Client />
          </Route>
          <Route path='/eng/about' >
            <About />
          </Route>
          <Route path='/eng/editForm'>
            <Editform />
          </Route>
          <Route path="/eng/exercises">
            <ExerciseLibrary />
          </Route>
          <Route path='/eng/home'>
            <Home />
          </Route>
          <Route path='/eng/myclients/'>
            <MyClients />
          </Route>
          <Route path='/eng/myprogram'>
            <MyProgram />
          </Route>
          <Route path='/eng/signUp' >
            <SignUpForm />
          </Route>
          <Route path='/eng/signIn' >
            <SignInForm />
          </Route>
          <Route path='/eng/terms'>
            <TermsConditions />
          </Route>
          <Route path='/eng/profile'>
            <UserProfile />
          </Route>

          {/* Finnish UI */}
          <Route path="/fin/myclients/:id">
            <ClientFin />
          </Route>
          <Route path='/fin/about' >
            <AboutFin />
          </Route>
          <Route path="/fin/editForm">
            <EditformFin />
          </Route>
          <Route path="/fin/exercises">
            <ExerciseLibraryFin />
          </Route>
          <Route path="/fin/home">
            <HomeFin />
          </Route>
          <Route path="/fin/myclients">
            <MyClientsFin />
          </Route>
          <Route path="/fin/myprogram">
            <MyProgramFin />
          </Route>
          <Route path="/fin/signUp" >
            <SignUpFormFin />
          </Route>
          <Route path="/fin/signIn" >
            <SignInFormFin />
          </Route><Route path='/fin/terms'>
            <TermsConditions />
          </Route>
          <Route path="/fin/profile">
            <UserProfileFin />
          </Route>

          {/* Spanish UI */}
          <Route path="/esp/myclients/:id">
            <ClientEsp />
          </Route>
          <Route path='/esp/about' >
            <AboutEsp />
          </Route>
          <Route path="/esp/editForm">
            <EditformEsp />
          </Route>
          <Route path="/esp/exercises">
            <ExerciseLibraryEsp />
          </Route>
          <Route path="/esp/home">
            <HomeEsp />
          </Route>
          <Route path="/esp/myclients">
            <MyClientsEsp />
          </Route>
          <Route path="/esp/myprogram">
            <MyProgramEsp />
          </Route>
          <Route path="/esp/signUp" >
            <SignUpFormEsp />
          </Route>
          <Route path="/esp/signIn" >
            <SignInFormEsp />
          </Route><Route path='/esp/terms'>
            <TermsConditions />
          </Route>
          <Route path="/esp/profile">
            <UserProfileEsp />
          </Route>

        </Switch>
        <Route >
          <WarningLogout />
        </Route>
        <Footer />
      </Router>
    </div >
  )
}

export default App