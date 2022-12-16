import React from 'react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { renderWithProviders } from '../utils/for-tests'
import Comment from './Comment'

test('renders blog', () => {
  const initialBlog = [
    {
      id: '1',
      title: 'Monday',
      author: 'poppy',
      url: 'www.flower.com',
      likes: '2',
    },
  ]

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id: '1',
    }),
  }))

  renderWithProviders(<Blog />, {
    preloadedState: {
      blogs: initialBlog
    }
  })
  const title = screen.getByText('Monday')
  const author = screen.getByText('poppy')
  expect(title).toBeInTheDocument()
  expect(author).toBeVisible()
})

test('add comment by clicking button', () => {

  renderWithProviders(<Comment />)
  const input = screen.getByLabelText('Comment')
  const comment = screen.getByTestId('comment')
  const button = screen.getByText(/add comments/i)


  userEvent.type(input, 'Hello')
  userEvent.click(button)

  expect(comment).toHaveValue('Hello')
})
