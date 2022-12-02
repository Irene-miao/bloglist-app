import blogReducer from './reducers/blogReducer'
import commentReducer from './reducers/commentReducer'
import { configureStore } from '@reduxjs/toolkit'



const createTestStore = () => {
    const store = configureStore({
        reducer: {
          blogs: blogReducer,
          comments: commentReducer
        }
      })
      return store
}





export default createTestStore