const blogRouter = require("express").Router();
const Blog = require("./../models/blogsModel");

blogRouter.get("/", (req, res) => {
  Blog.find().then((response) => res.send(response));
});

blogRouter.post("/", (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
  });

  newBlog
    .save()
    .then((saveRes) => {
      res.status(201).send(newBlog);
    })
    .catch((err) => next(err));
});

module.exports = blogRouter;
