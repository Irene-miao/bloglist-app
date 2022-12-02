import { createSlice } from '@reduxjs/toolkit'



// Define the reducer and action creators via 'createSlice'
const initialState = []

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    stopNotify(state, action) {
      return null
    }
  }
})



// Destructure the plain action creators
export const { notify, stopNotify } = notificationSlice.actions

// Define the thunks that dispatch the action creators


export default notificationSlice.reducer
