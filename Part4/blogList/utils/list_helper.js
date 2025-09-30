const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const likesList = blogs.map(blog => blog.likes)
    return likesList.reduce((sum, item) => sum + item, 0)
}

module.exports = {
  dummy,
  totalLikes
}