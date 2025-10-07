import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
    expect(screen.findByText('Likes: 1')).toBeDefined()
})