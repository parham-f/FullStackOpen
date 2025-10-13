import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, expect, test } from 'vitest'
import BlogForm from './BlogForm'

vi.mock('../services/blogs', () => {
  const updateBlog = vi.fn().mockResolvedValue({})
  const newBlog = vi.fn().mockResolvedValue({ id: 'new1' })
  const deleteBlog = vi.fn().mockResolvedValue({})
  const setToken = vi.fn()
  const getAll = vi.fn()
  return { default: { updateBlog, newBlog, deleteBlog, setToken, getAll } }
})
import blogService from '../services/blogs'

test('Form calls handler with the right details when creating a blog', async () => {
  const user = userEvent.setup()

  const setBlogs = vi.fn()
  const notifyWith = vi.fn()
  const blogs = []
  const loggedUser = { id: 'u1', name: 'Tester', username: 'tester' }
  const blogFormRef = { current: { toggleVisibility: vi.fn() } }

  render(
    <BlogForm
      setBlogs={setBlogs}
      blogs={blogs}
      notifyWith={notifyWith}
      blogFormRef={blogFormRef}
      user={loggedUser}
    />
  )

  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'Testing Title')
  await user.type(inputs[1], 'Testing Author')
  await user.type(inputs[2], 'https://example.com')
  await user.click(screen.getByRole('button', { name: /create/i }))

  expect(blogService.newBlog).toHaveBeenCalledTimes(1)
  const payload = blogService.newBlog.mock.calls[0][0]
  expect(payload).toMatchObject({
    title: 'Testing Title',
    author: 'Testing Author',
    url: 'https://example.com',
  })
})
