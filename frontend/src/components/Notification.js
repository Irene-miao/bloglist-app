import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)

  if (notification === null ) {
    return null
  }

  return (
    <div className={notification.type}>
      {(notification &&
      <Alert variant='success'>{notification}</Alert>)}
    </div>
  )
}

export default Notification
