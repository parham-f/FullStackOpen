import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
    }
    id
  }
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
        id
    }
}
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        title
    published
    genres
    author {
      name
    }
    id
  }
}
`

export const ALL_BOOK_GENRE = gql`
query ($genre: String) {
  allBooks(genre: $genre) {
    ...BookDetails
  }
}
  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
        title
        author {
            name
        }
        published
        genres
        id
    }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
        bookCount
        id
    }
}
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const ME = gql`
  query Me {
    me {
      id
      username
      favoriteGenres
    }
  }
`

export const RECOMMENDED_BOOKS = gql`
  query RecommendedBooks {
    recommendedBooks {
      id
      title
      published
      genres
      author { id name }
    }
  }
`

export const SET_FAVORITE_GENRES = gql`
  mutation SetFavoriteGenres($genres: [String!]!) {
    setFavoriteGenres(genres: $genres) {
      id
      username
      favoriteGenres
    }
  }
`

export const ADD_FAVORITE_GENRE = gql`
  mutation AddFavoriteGenre($genre: String!) {
    addFavoriteGenre(genre: $genre) {
      id
      favoriteGenres
    }
  }
`

export const REMOVE_FAVORITE_GENRE = gql`
  mutation RemoveFavoriteGenre($genre: String!) {
    removeFavoriteGenre(genre: $genre) {
      id
      favoriteGenres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      id
      title
      published
      genres
      author { id name }
    }
  }
`