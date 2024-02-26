const Blog = require("../models/blogsModel");
const User = require("./../models/usersModel");

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
  blogsInDb,
  usersInDb,
};
