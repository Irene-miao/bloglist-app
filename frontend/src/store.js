import blogReducer from './reducers/blogReducer'
import commentReducer from './reducers/commentReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'



const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer,
    comments: commentReducer,
    login: loginReducer
  }
})


console.log(store.getState())

export default store