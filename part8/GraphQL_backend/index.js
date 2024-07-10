const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

mongoose.set("strictQuery", false);
require("dotenv").config();

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to... ", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

console.log("processArgv: ", process.argv);

const typeDefs = `
  type Book {
    title: String!
    published: Int
    author: Author
    genres: [String!]!
    id: ID!
  }
  
  type Author {
    name: String
    id: String
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
  value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(title: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(title: String! author: String! published: Int! genres: [String!]!): Book
    editAuthor(name: String! setBornTo: Int!): Author
    createUser(username: String! favoriteGenre: String!): User
    login(username: String! password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.title && !args.genre) {
        return await Book.find({}).populate("author");
      }

      return await Book.find(
        args.title
          ? { title: args.title, genres: { $regex: args.genre } }
          : { genres: { $regex: args.genre } }
      ).populate("author");
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      return await Book.find({ author: root._id }).countDocuments();
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const bookData = { ...args, id: uuid() };
      const authorData = { name: args.author };
      const findBook = await Book.findOne({ title: args.title });
      let findAuthor = await Author.findOne({ name: args.author });

      if (findBook || !currentUser) {
        return null;
      }

      if (!findAuthor) {
        const newAuthor = new Author(authorData);
        try {
          findAuthor = await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Creating Author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      bookData.author = findAuthor._id;
      const newBook = new Book(bookData);
      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      return newBook.populate("author");
    },
    editAuthor: async (root, args, { currentUser }) => {
      const findAuthor = await Author.findOne({ name: args.name });
      if (!findAuthor || !currentUser) {
        return null;
      }

      const update = await Author.findOneAndUpdate(
        { name: findAuthor.name },
        { born: args.setBornTo },
        { returnOriginal: false }
      );
      return update;
    },
    createUser: async (root, args) => {
      const user = new User(args);

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "myPass") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const tokenObject = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(tokenObject, process.env.JWT_SECRET_KEY) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET_KEY
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
