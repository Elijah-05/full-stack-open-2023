const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const { v1: uuid } = require("uuid");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

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
      console.log("add Book is called");
      const bookData = { ...args, id: uuid() };
      const authorData = { name: args.author };
      const findBook = await Book.findOne({ title: args.title });
      let findAuthor = await Author.findOne({ name: args.author });
      if (findBook || !currentUser) {
        if (findBook) {
          throw new GraphQLError("Existing Book", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.username,
            },
          });
        }
        if (!currentUser) {
          throw new GraphQLError("Authorization required", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.username,
            },
          });
        }
        return;
      }

      if (!findAuthor) {
        const newAuthor = new Author(authorData);
        try {
          findAuthor = await newAuthor.save();
        } catch (error) {
          console.log("error while creating author");
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
        console.log("book is Saved");
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish("PERSON_ADDED", { bookAdded: newBook.populate("author") });
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
      const findUser = await User.findOne({ username: args.username });
      console.log({ findUser });
      if (findUser) {
        throw new GraphQLError("Existing User", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
        return;
      }

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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("PERSON_ADDED"),
    },
  },
};

module.exports = resolvers;
