import { gql } from "@apollo/client";

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
  query {
    allBooks {
      title
      author
      published
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
      author
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

export { GET_AUTHOR, GET_BOOKS, ADD_BOOK, EDIT_AUTHOR };
