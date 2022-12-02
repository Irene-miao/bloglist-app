import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import userService from '../services/users'
import { notify, stopNotify } from '../reducers/notificationReducer'
import useField from '../hooks/useField'
import { createUser } from '../reducers/userReducer'

const UserForm = () => {
  const username = useField('username')
  const password = useField('password')
  const name = useField('name')
  const dispatch = useDispatch()


  const handleCreate = async (event) => {
    event.preventDefault()
    console.log(username.value, password.value, name.value)
    try {
      const user = {
        username: username.value,
        name: name.value,
        password: password.value
      }
      const newUser = await userService.create(user)
      dispatch(createUser(newUser))
      dispatch(notify(`${newUser.name} successfully created`, 5))
      setTimeout(function () {
        dispatch(stopNotify())
      }, 10000)
    } catch (error) {
      dispatch(notify(`${error.response.data.error}`, 'error', 5))
      setTimeout(function () {
        dispatch(stopNotify())
      }, 10000)
    }
  }


  return (
    <div>
      <h3>Create User</h3>

      <form onSubmit={handleCreate}>
        <div>
          <div>username
            <input
              id='username'
              type='username'
              {...username} />
          </div>
          <div>name
            <input
              id='name'
              type='name'
              {...name} />
          </div>
          <div>
          password
            <input
              id='password'
              type='password'
              {...password}
            />
          </div>
        </div>
        <Button size='sm' id='login-button' type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default UserForm