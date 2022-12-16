import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notify, stopNotify } from '../reducers/notificationReducer'
import { createComment } from '../reducers/commentReducer'
import { Button } from 'react-bootstrap'
import commentService from '../services/comments'

const Comment = (id) => {
  const dispatch = useDispatch()
  const blogComments = useSelector((state) => state.comments)
  console.log(blogComments)
  console.log(id.id)
  if (!blogComments) {
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const comment = event.target.content.value
    const newComment = await commentService.create(id.id, comment)
    console.log(newComment)
    dispatch(createComment(newComment))
    dispatch(
      notify(
        `Created a new comment ${comment} for blog ${blogComments.title}`,
        5
      )
    )
    event.target.content.value = ''
    setTimeout(function () {
      dispatch(stopNotify())
    }, 10000)
  }

  return (
    <div>
      <h5>Comments:</h5>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="content">Comment</label>
            <input
              id="content"
              className="form"
              name="content"
              placeholder="More than 5 characters"
            />
            <Button data-testid="commentBtn" size="sm" type="submit">
              add comments
            </Button>
          </div>
        </form>
      </div>
      <div>
        <br />
        <ul>
          {blogComments.comments?.map((comment) => (
            <div key={comment.id}>
              <li data-testid="comment">{comment.content}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Comment
