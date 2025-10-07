import { render, screen } from '@testing-library/react'
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