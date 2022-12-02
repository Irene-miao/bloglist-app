import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import { deleteUser } from '../reducers/userReducer'



const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  console.log(users)
  if (!users) {
    return null
  }
  const uniqueUsers = users.filter((v, i , a) => a.findIndex(t => (t.id === v.id)) === i)
  console.log(uniqueUsers)

  const handleClick = async (id) => {
    await userService.remove(id)
    dispatch(deleteUser(id))
  }

  return (
    <div>
      <h2>Users</h2>
      <Table size="sm">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {uniqueUsers.map((user) =>
            ( <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.map((blog) => (
                <ul key={blog.id}>
                  <li>{blog.title}</li>
                </ul>
              ))}</td>
              <td>
                <Button variant='danger' size='sm' onClick={() => handleClick(user.id)}>delete user</Button>
              </td>
            </tr>)
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
