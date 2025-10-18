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

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs