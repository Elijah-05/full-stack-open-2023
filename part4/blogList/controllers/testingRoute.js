const router = require("express").Router();
const Blog = require("../models/blogsModel");
const User = require("../models/usersModel");

router.post("/reset", async (req, res) => {
  await User.deleteMany();
  await Blog.deleteMany();

  res.status(204).end();
});

module.exports = router;
