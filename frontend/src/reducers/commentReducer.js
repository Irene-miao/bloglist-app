import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'



// Define reducer and action creators via 'createSlice'
const initialState = []


const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createComment(state, action) {
      const comment = action.payload
      state.comments.push(comment)
    },
    initComments(state, action) {
      const comments = action.payload
      return comments
    }
  }
})



// Destructure the plain action creators
export const { createComment, initComments } = commentSlice.actions

// Define the thunks that dispatches the action creators
export const fetchComments = (id) => async (dispatch) => {
  const comments = await commentService.getAll(id)
  console.log(comments)
  dispatch(initComments(comments))
}


export default commentSlice.reducer