import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

// Define reducer and action creators via 'createSlice'
const initialState = []

const userSlice =  createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser(state, action) {
      const user = action.payload
      state.push(user)
    },
    initUsers(state, action) {
      const users = action.payload
      let data = []
      users.forEach((user) => {
        data.push({
          id:user.id,
          name: user.name,
          username: user.username,
          blogs : user.blogs
        })
      })
      return data
    },
    deleteUser(state, action) {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    }
  }
})



//  Destructure and export action creators
export const { createUser, initUsers, deleteUser } = userSlice.actions

// Define thunks that dispatches those action creators
export const fetchUsers = () => async (dispatch) => {
  const users = await userService.getAll()
  dispatch(initUsers(users))
}


export default userSlice.reducer