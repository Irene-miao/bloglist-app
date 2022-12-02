import { createSlice } from '@reduxjs/toolkit'




// Define reducer and action creators via 'createSlice'
const initialState = null


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin(state, action) {
      return action.payload
    }
  }
})



// Destructure the plain action creators
export const { setLogin } = loginSlice.actions

// Define the thunks that dispatches the action creators



export default loginSlice.reducer