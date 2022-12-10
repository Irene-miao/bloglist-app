import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog  } from '../reducers/blogReducer'
import { notify, stopNotify } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { fetchComments } from '../reducers/commentReducer'
import blogService from '../services/blogs'
import Comment from './Comment'


const Blog = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id

  useEffect(() => {
    dispatch(fetchComments(id))
    const interval=setInterval(() => {
      dispatch(fetchComments(id))
    }, 10000)

    return () => clearInterval(interval)

  }, [dispatch, id])
  //const blogsSort = blogs.sort((a,b) => b.likes - a.likes)
  //console.log(blogsSort)
  const blog = blogs.find(b => b.id === id)
  console.log(blog)
  console.log(loginUser)
  if (!blog) {
    return null
  }
  if (!loginUser) {
    dispatch(notify('Log in first'))
    setTimeout(function(){
      dispatch(stopNotify())
    }, 10000)
  }

  const addLikes = async(event) => {
    event.preventDefault()
    if (blog.user[0].author !== loginUser.name) {
      dispatch(notify('Only the blog creator can add like'))
      setTimeout(function(){
        dispatch(stopNotify())
      }, 10000)
    }

    try {
      const blogToChange = {
        id: blog.id,
        user: blog.user,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      }
      const updatedBlog = await blogService.update(blogToChange)
      dispatch(updateBlog(updatedBlog))
      dispatch(notify( `Updated the blog ${updatedBlog.title} by ${updatedBlog.author} added`, 5))
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

  console.log(id)
  console.log(blog.id)


  return (
    <div>
      <h2 data-testid="title">
        <span>Title: {blog.title}</span>
      </h2>
      <br/>
      <p>url: <a href={`${blog.url}`}>{blog.url}</a></p>
      <p className='likes'>
        <span data-testid='likes'>{blog.likes}</span><Button variant='outline-info' size='sm' id='like' data-testid='likeBtn' onClick={addLikes}>like</Button>
      </p>
      <p data-testid='author'>added by {blog.author}</p>
      <br/>
      <div>
        <Comment id={id} />
      </div>
    </div>

  )
}

export default Blog