import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('blog', () => {
  let container
  const likeBlog = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'Master air bending',
      author: 'Avatar Aang',
      url: 'www.avatar.com',
      likes: 100
    }
    container  = render(<Blog blog={blog} likeBlog={likeBlog}/>).container
  })

  test('renders only title and author by default', () => {
    expect(container).toHaveTextContent('Master air bending')
    expect(container).toHaveTextContent('Avatar Aang')
    expect(container).not.toHaveTextContent('www.avatar.com')
    expect(container).not.toHaveTextContent('likes 100')
  })

  test('renders url and number of likes when view button is clicked', async () => {
    const viewbutton = screen.getByRole('button', { name: 'view' })
    const user = userEvent.setup()
    await user.click(viewbutton)
    expect(container).toHaveTextContent('www.avatar.com')
    expect(container).toHaveTextContent('likes 100')
  })

  test('likeButton event handler is called twice if like button is clicked twice', async () => {
    const viewbutton = screen.getByRole('button', { name: 'view' })
    const user = userEvent.setup()
    await user.click(viewbutton)

    const likebutton = screen.getByRole('button', { name: 'like' })
    await user.click(likebutton)
    await user.click(likebutton)
    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})

test('BlogForm calls handleCreate with right details when new blog is created', async () => {
  const handleCreate = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleCreate={handleCreate}/>)

  const titleinput = screen.getByTestId('titleinput')
  const authorinput = screen.getByTestId('authorinput')
  const urlinput = screen.getByTestId('urlinput')
  const createbutton = screen.getByRole('button', { name: 'create' })

  const newBlog = {
    title: 'Write clear programs',
    author: 'Jenny Benz',
    url: 'www.learntocode.com'
  }

  await user.type(titleinput, newBlog.title)
  await user.type(authorinput, newBlog.author)
  await user.type(urlinput, newBlog.url)
  await user.click(createbutton)

  expect(handleCreate.mock.calls).toHaveLength(1)
  expect(handleCreate.mock.calls[0][0]).toEqual(newBlog)
})