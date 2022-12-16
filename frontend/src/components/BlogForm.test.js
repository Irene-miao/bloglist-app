import React from 'react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'



describe('BlogForm', () => {

  test('form calls event handler receive right new blog details as props', () => {
    const handleAdd = jest.fn()

    render(
      <BlogForm
        createBlog={handleAdd}
      />
    )


    const inputTitle = screen.getByTestId('title')
    const inputLikes = screen.getByTestId('likes')
    const inputAuthor = screen.getByTestId('author')
    const inputUrl = screen.getByTestId('url')
    const button = screen.getByTestId('create')

    userEvent.type(inputTitle, { target: { value:'Blog Title' },
    })
    userEvent.type(inputLikes, { target: { value:'2' },
    })
    userEvent.type(inputAuthor, { target: { value:'timmy' },
    })
    userEvent.type(inputUrl,  { target: { value:'www.testing.com' },
    })
    userEvent.click(button)

    console.log(handleAdd)
    expect(handleAdd).toBeCalled()
    expect(handleAdd.mock.calls).toHaveLength(1)
    expect(handleAdd.mock.calls[0][0].author).toBe('Author')
    expect(handleAdd.mock.calls[0][0].url).toBe('www.testing.com')
  })
})