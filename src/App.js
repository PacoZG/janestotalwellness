import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import { getAllNotes } from './reducers/noteReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeDiscussions } from './reducers/discussionReducer'
import { initializeComments } from './reducers/commentReducers'

// Components in english
import About from './components/About'
import Blog from './components/blogs/Blog'
import CreateBlog from './components/blogs/CreateBlog'
import BlogList from './components/blogs/BlogList'
import Client from './components/Client'
import CodeOfConduct from './components/CodeOfConduct'
import CookiesPolicy from './components/CookiesPolicy'
import Editform from './components/EditForm'
import ExerciseLibrary from './components/ExerciseLibrary'
import Footer from './components/Footer'
import Home from './components/Home'
import MainMenu from './components/Header/MainMenu'
import MyClients from './components/MyClients'
// import MyProgram from './components/MyProgram'
import Salon from './components/Forum/Salon'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import UserProfile from './components/UserProfile'
import TermsConditions from './components/TermsConditions'
import WarningLogout from './components/WarningLogout'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(getAllNotes())
    dispatch(initializeBlogs())
    dispatch(initializeDiscussions())
    dispatch(initializeComments())
  }, [dispatch])

  return (
    <div>
      <Router>
        <MainMenu />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/myclients/:id">
            <Client />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/blogs">
            <BlogList />
          </Route>
          <Route path="/createblog">
            <CreateBlog />
          </Route>
          <Route path="/cookiespolicy">
            <CookiesPolicy />
          </Route>
          <Route path="/editForm">
            <Editform />
          </Route>
          <Route path="/exercises">
            <ExerciseLibrary />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/myclients">
            <MyClients />
          </Route>
          {/* <Route path="/myprogram">
            <MyProgram />
          </Route> */}
          <Route path="/salon">
            <Salon />
          </Route>
          <Route path="/signUp">
            <SignUpForm />
          </Route>
          <Route path="/signIn">
            <SignInForm />
          </Route>
          <Route path="/terms">
            <TermsConditions />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
          <Route patch="/codeofconduct">
            <CodeOfConduct />
          </Route>
        </Switch>
        <Route>
          <WarningLogout />
        </Route>
        <Footer />
      </Router>
    </div>
  )
}

export default App
