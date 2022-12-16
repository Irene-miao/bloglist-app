import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/blogs'


// Define reducer and action creators via 'createSlice'
const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createBlog(state, action) {
      console.log('ACTION:', action)
      console.log('STATE NOW:', state)
      const blog = action.payload
      state.push(blog)
    },
    initBlogs(state, action) {
      const blogs = action.payload
      let data = []
      blogs.forEach((blog) => {
        data.push({
          id:blog.id,
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes,
          user: blog.user
        })
      })
      return data
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) => blog.data.id !== updatedBlog.id ? blog : updatedBlog)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.data.id !== id)
    }

  }
})

// Destructure and export plain action creators
export const { createBlog, initBlogs, updateBlog, deleteBlog } = blogSlice.actions

// Define thunks that dispatch those action creators
export const fetchBlogs = () => async (dispatch) => {
  const blogs = await getAll()
  console.log(blogs)
  dispatch(initBlogs(blogs))
}






export default blogSlice.reducer