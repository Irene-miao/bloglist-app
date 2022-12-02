import React from 'react'
import { Button, Form } from 'react-bootstrap'


const BlogForm = ({ createBlog }) => {

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value ,
      likes: event.target.likes.value,
    })
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    event.target.likes.value = ''
  }

  return (
    <div>
      <h4>Create New Blog</h4>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label> title:</Form.Label>
          <Form.Control data-testid='title' type='text' name='title'  />
          <Form.Label> author: </Form.Label>
          <Form.Control data-testid='author' name='author' type='text'  />
          <Form.Label>url:</Form.Label>
          <Form.Control data-testid='url' name='url'  />
          <Form.Label>likes:</Form.Label>
          <Form.Control data-testid='likes' name='likes'  />
          <br></br>
          <Button size='sm' variant='primary' data-testid='create' type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm