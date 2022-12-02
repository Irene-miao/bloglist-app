import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { createBlog } from '../reducers/blogReducer'
import { notify, stopNotify } from '../reducers/notificationReducer'
import blogService from '../services/blogs'



const Blogs = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  console.log(user)
  if (!blogs && !user) {
    return null
  }
  //const blogsSort = blogs.sort((a,b) => { return b.likes - a.likes})
  //console.log(blogsSort)
  //const userBlogs = blogsSort.filter((blog) => blog.data?.user[0]?.username === user.username)

  const addBlog = async (blogObject) => {
    console.log(blogObject)
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(user.token,blogObject)
      console.log(blog)
      dispatch(createBlog(blog))
      dispatch(notify( `a new blog ${blog.title} by ${blog.author} added`, 5))
      setTimeout(function(){
        dispatch(stopNotify())
      }, 10000)
    } catch (error) {
      dispatch(notify(`${error} `, 'error', 5))
      setTimeout(function(){
        dispatch(stopNotify())
      }, 10000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      {blogs.map((blog) =>
        <div key={blog.id} className='contact'>
          <p><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
        </div>
      )}
    </div>
  )
}

export default Blogs

