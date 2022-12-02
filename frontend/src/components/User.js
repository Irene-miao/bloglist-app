import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  if (!users && !id) {
    return null
  }

  const user = users.filter(user => user.id === id)


  return (
    <div>
      <h2>{user[0].username}</h2>
      <br/>
      <h5>Profile</h5>
      <br/>
      <p>
        Username : &nbsp;<span>{user[0].name}</span>
      </p>
      <p>
        Number of blogs : &nbsp;<span>{user[0].blogs.length}</span>
      </p>
    </div>
  )
}

export default User
