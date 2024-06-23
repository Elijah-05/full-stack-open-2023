import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
`;

const LOG_IN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const GET_AUTHOR = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const FIND_BOOKS = gql`
  query findBooks($title: String, $genre: String) {
    allBooks(title: $title, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const GET_ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const EDIT_AUTHOR = gql`
  mutation editAuthorPhone($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export {
  LOG_IN,
  GET_AUTHOR,
  GET_ALL_BOOKS,
  ADD_BOOK,
  EDIT_AUTHOR,
  BOOK_ADDED,
  FIND_BOOKS,
};
