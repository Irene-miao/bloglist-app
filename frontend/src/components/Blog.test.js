import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Comment from './Comment'
import { Provider } from 'react-redux'
import createTestStore from '../createTestStore'


let store

describe('Blog', () => {

  beforeEach(() => {
    store = createTestStore()
  })


  test('renders blog title, author, url and likes', async () => {



    render(
      <Provider store={store}>
        <Blog />
      </Provider>
    )

    expect(screen.getByTestId('title')).toHaveTextContent('Test 1')
    expect(screen.getByTestId('author')).toHaveTextContent('Testing')
    expect(screen.getByText('2')).toBeVisible()
    expect(screen.getByText('www.testing.com')).toBeVisible()
  })


  test('render content after input added by clicking button', () => {
   

    render(
      <Provider store={store}>
        <Comment />
      </Provider>
    )

    const input = screen.getByTestId('input')
    const button = screen.getByTestId('commentBtn')

    userEvent.type(input, 'Hello')
    userEvent.click(button)

    expect(screen.getByText('Hello')).toBeVisible()
  })

})


