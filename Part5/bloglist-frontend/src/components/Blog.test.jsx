import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, expect, test } from 'vitest'
import Blog from './Blog'

// mock the exact module Blog.jsx imports
vi.mock('../services/blogs', () => {
  const updateBlog = vi.fn().mockResolvedValue({})
  const newBlog = vi.fn().mockResolvedValue({})
  const deleteBlog = vi.fn().mockResolvedValue({})
  const setToken = vi.fn()
  const getAll = vi.fn()
  return { default: { updateBlog, newBlog, deleteBlog, setToken, getAll } }
})
import blogService from '../services/blogs'

test('Display only title and author', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test URL'
    }

    render(<Blog blog={blog}/>)
    const titleAndAuthor = screen.getByText('test title - test author')
    expect(titleAndAuthor).toBeDefined()
    const url = screen.queryByText('test URL')
    expect(url).not.toBe()
    const likes = screen.queryByText('Likes')
    expect(likes).not.toBe()
})

test('Display URL and Likes when pressing View button', async () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test URL',
        user: {
            username: 'admin',
            name: 'superUser'
        }
    }

    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    expect(screen.findByText('test URL')).toBeDefined()
    expect(screen.findByText('Likes:')).toBeDefined()
})

test('Clicking the like button twice calls the handler twice', async () => {
  const blog = {
    id: 'abc123',
    title: 'test title',
    author: 'test author',
    url: 'https://example.com',
    likes: 7,
    user: { id: 'u1', name: 'Tester', username: 'tester' },
  }

  const user = userEvent.setup()

  const setBlogs = vi.fn()
  const notifyWith = vi.fn()
  const blogs = [blog]
  const loggedUser = { id: 'u1', name: 'Tester', username: 'tester' }

  render(
    <Blog
      blog={blog}
      blogs={blogs}
      setBlogs={setBlogs}
      notifyWith={notifyWith}
      user={loggedUser}
    />
  )

  await user.click(screen.getByRole('button', { name: /view/i }))
  const likeBtn = screen.getByRole('button', { name: /like/i })
  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(blogService.updateBlog).toHaveBeenCalledTimes(2)
})