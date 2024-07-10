import { gql } from "@apollo/client";

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

const GET_BOOKS = gql`
  query findBooks($title: String, $genre: String) {
    allBooks(title: $title, genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
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
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthorPhone($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

export { LOG_IN, GET_AUTHOR, GET_BOOKS, ADD_BOOK, EDIT_AUTHOR };
