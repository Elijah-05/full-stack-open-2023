const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const Blog = require("./../models/blogsModel");

blogRouter.get("/", async (req, res) => {
  const result = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.send(result);
});

blogRouter.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  try {
    const decodedToken = jwt.verify(req.token, process.env.TOKEN_SECRET);
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id);
      const newBlog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: decodedToken.id,
      });

      const response = await newBlog.save();
      user.blogs = user.blogs.concat(response.id);
      await user.save();
      res.status(201).send(response);
    }
  } catch (err) {
    console.log("error: ", err);
    return next(err);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res, next) => {
  const findBlog = await Blog.findById(req.params.id);
  if (findBlog) {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).end();
  } else res.status(204).end();
});

module.exports = blogRouter;
