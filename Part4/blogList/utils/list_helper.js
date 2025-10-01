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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}