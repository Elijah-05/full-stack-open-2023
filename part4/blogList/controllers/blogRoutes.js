const blogRouter = require("express").Router();
const Blog = require("./../models/blogsModel");

blogRouter.get("/", async (req, res) => {
  const result = await Blog.find({});
  res.send(result);
});

blogRouter.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });

  if (title) {
    const response = await newBlog.save();
    res.status(201).send(response);
  } else res.status(400).end();
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
