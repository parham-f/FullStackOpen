const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require("./models/book")
const User = require("./models/user")
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenres: [String!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    recommendedBooks: [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book!

    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author

    createUser(
      username: String!
      ): User

    login(
      username: String!
      password: String!
    ): Token

    setFavoriteGenres(genres: [String!]!): User!
    addFavoriteGenre(genre: String!): User!
    removeFavoriteGenre(genre: String!): User!
  }
`

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
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})