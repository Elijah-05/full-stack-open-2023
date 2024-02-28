const Blog = require("../models/blogsModel");
const User = require("./../models/usersModel");

const initialBlogs = [
  {
    title: "ALX Software Engineering",
    author: "ALX Bootcamp",
    url: "https://learn-react-fromzero.com/blogs/express",
    likes: 1862,
  },
  {
    title: "Responsive Web Design",
    author: "FreeCodeCamp",
    url: "https://freecodecamp.com/blogs/responsive_web_design",
    likes: 543421,
  },
];

const initialUsers = [
  {
    username: "Ellay5",
    name: "Elyas Abebe",
    password: "Ellay@123",
  },
  {
    username: "AbeKeb",
    name: "Abebe Kebede",
    password: "Abe@Kebe123",
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

module.exports = {
  initialUsers,
  initialBlogs,
  blogsInDb,
  usersInDb,
};
