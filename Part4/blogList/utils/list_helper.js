const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const likesList = blogs.map(blog => blog.likes)
    return likesList.reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
  const likesList = blogs.map(blog => blog.likes)
  return blogs[likesList.indexOf(Math.max(...likesList))]
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(counts), (author) => counts[author])
  return { 
    author: topAuthor,
    blogs: counts[topAuthor] 
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}