import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import { notify, stopNotify } from '../reducers/notificationReducer'
import  useField  from '../hooks/useField'
import { setLogin } from '../reducers/loginReducer'
import userStorage from '../utils/storage'


const LoginForm = () => {
  const username = useField('username')
  const password = useField('password')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username.value, password.value)
    try {
      const user = await loginService.login(username.value, password.value)
      userStorage.saveUser(user)
      dispatch(setLogin(user))
      console.log(user.token)
      dispatch(notify(`${user.username} successfully logged in`, 5))
      setTimeout(function(){
        dispatch(stopNotify())
      }, 10000)
    } catch (error) {
      dispatch(notify(`${error}`, 'error', 5))
      setTimeout(function(){
        dispatch(stopNotify())
      }, 10000)
    }
  }





  return (
    <div>
      <h3>Log in to application</h3>

      <form  onSubmit={handleLogin}>
        <div>
          <div>username
            <input
              id='username'
              type='username'
              {...username} />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              {...password}
            />
          </div>
        </div>
        <Button size='sm'  variant='outline-primary' id='login-button' type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default LoginForm