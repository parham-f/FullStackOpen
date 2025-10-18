const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),

    bookCount: async () => Book.collection.countDocuments(),

    allBooks: async (root, args) => {
      const filter = {}

      if (args.genre) {
        filter.genres = args.genre
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return []
        }
        filter.author = author._id
      }

      return Book.find(filter).populate('author')
    },

    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,

    recommendedBooks: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' }})
      }
      if (!currentUser.favoriteGenres?.length) return []
      return Book
        .find({ genres: { $in: currentUser.favoriteGenres } })
        .populate('author')
    },
  },

  Book: {
    author: async (book) => {
      if (book.author && book.author.name) return book.author
      return Author.findById(book.author)
    }
  },

  Author: {
    bookCount: async (author) => Book.countDocuments({ author: author._id })
  },

  Mutation: {
    addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }

        let author = await Author.findOne({ name: args.author })
        if (!author) {
          try {
            author = await new Author({ name: args.author }).save()
          } catch (error) {
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }})}
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        })
        try {
          await book.save()
        } catch (error) {
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }})}

        pubsub.publish('BOOK_ADDED', {bookAdded: book})

        return book.populate('author')
    },

    editAuthor: async (root, { name, setBornTo }, context) => {
      const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        
      try {
        const updated = await Author.findOneAndUpdate(
          { name },
          { born: setBornTo })

        if(!updated) {
          throw new GraphQLError('Author not found', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }})
        }

        return updated

      } catch (error) {
            throw new GraphQLError('Editing author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: name,
                error
              }})}
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if(!user || args.password !== 'sekret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },

    setFavoriteGenres: async (root, { genres }, { currentUser }) => {
      if (!currentUser) throw new GraphQLError('Not authenticated')
      currentUser.favoriteGenres = Array.from(new Set(genres.map(g => g.trim()).filter(Boolean)))
      await currentUser.save()
      return currentUser
    },

    addFavoriteGenre: async (root, { genre }, { currentUser }) => {
      if (!currentUser) throw new GraphQLError('Not authenticated')
      const g = genre.trim()
      if (g && !currentUser.favoriteGenres.includes(g)) {
        currentUser.favoriteGenres.push(g)
        await currentUser.save()
      }
      return currentUser
    },

    removeFavoriteGenre: async (root, { genre }, { currentUser }) => {
      if (!currentUser) throw new GraphQLError('Not authenticated')
      const g = genre.trim()
      currentUser.favoriteGenres = currentUser.favoriteGenres.filter(x => x !== g)
      await currentUser.save()
      return currentUser
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers