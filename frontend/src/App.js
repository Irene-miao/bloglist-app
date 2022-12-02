import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { fetchBlogs } from './reducers/blogReducer'
import { fetchUsers } from './reducers/userReducer'
import { setLogin } from './reducers/loginReducer'
import User from './components/User'
import Blogs from './components/Blogs'
import { Navbar, Nav, Button } from 'react-bootstrap'
import UserForm from './components/UserForm'
import userStorage from './utils/storage'



const App = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.login)
  console.log(loginUser)


  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(fetchUsers())
    const interval = setInterval(() => {
      dispatch(fetchBlogs())
      dispatch(fetchUsers())
    }, 10000)
    return () => clearInterval(interval)
  }, [dispatch])

  useEffect(() => {
    const loggedUser = userStorage.loadUser()
    if (loggedUser) {
      dispatch(setLogin(loggedUser))
      console.log(loggedUser)
    }
  }, [dispatch])


  const loginForm = () => (
    <Togglable buttonLabel="login to application">
      <LoginForm />
    </Togglable>
  )

  const removeUser =  async () => {
    userStorage.logoutUser()
    dispatch(setLogin(null))
  }



  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand={true} bg="dark" variant='dark'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link to="/blogs">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/create-user">Create user</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {loginUser === null ?
                  (
                    loginForm()
                  )
                  : (
                    <div>
                      <p>{loginUser.name} logged in</p>
                      <Button variant='light' size='sm' id='logout' onClick={() => removeUser()}>logout</Button>
                    </div>
                  )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Notification />
        </div>


        <br></br>
        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/blogs">
            <Blogs />
          </Route>
          <Route path="/create-user">
            <UserForm />
          </Route>
        </Switch>
      </Router>
    </div>

  )
}

export default App