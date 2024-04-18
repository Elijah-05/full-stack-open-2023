const blogRouter = require("express").Router();
const Blog = require("./../models/blogsModel");
const { userExtractor } = require("../utils/middlewares");
const Comment = require("../models/commentModel");

blogRouter.get("/", async (req, res) => {
  const result = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.send(result);
});

blogRouter.post("/", userExtractor, async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const passedUser = req.user;
  try {
    if (!req.token) {
      res.status(401).send({ error: "Unauthorized user!" });
    } else if (!title || !author || !url)
      res.status(400).send({ error: "blog properties are missed!" });
    else {
      const newBlog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: passedUser?.id,
      });

      const response = await newBlog.save();
      passedUser.blogs = passedUser?.blogs.concat(response.id);
      await passedUser.save();
      res.status(201).send(response);
    }
  } catch (err) {
    console.log("error: ", err);
    return next(err);
  }
});

blogRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);

    const isOwner = blog?.user.toString() === user.id;
    console.log("isOwner: ", isOwner, blog?.user.toString(), user.id);
    if (isOwner) {
      await Blog.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } else res.status(400).send({ message: "blog creater is different" });
  } catch (err) {
    next(err);
  }
});

blogRouter.put("/:id", userExtractor, async (req, res, next) => {
  const findBlog = await Blog.findById(req.params.id);
  if (findBlog) {
    if (!req.token) {
      res.status(401).send({ error: "Unauthorized user! or Invalid token" });
    } else {
      const response = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: "query",
      });
      res.status(201).send(response);
    }
  } else res.status(204).end();
});

blogRouter.get("/:id/comments", async (req, res) => {
  const comment = await Comment.findOne({ blogID: req.params.id });
  if (comment) {
    res.send(comment);
  } else res.status(204).end();
});

blogRouter.post("/:id/comments", async (req, res) => {
  const blogID = req.params.id;
  const comment = req.body.text.trim();
  // console.log("blogIDDD: ", blogID);
  // console.log("comment req: ", comment);
  const isThereBlog = await Blog.findById(blogID);
  // console.log("isThereBlog: ", isThereBlog);
  if (comment && isThereBlog) {
    const findCommentByID = await Comment.findOne({ blogID });
    const commentID = findCommentByID ? findCommentByID._id.toString() : false;

    if (findCommentByID) {
      const response = await Comment.findByIdAndUpdate(
        commentID,
        {
          blogID,
          comments: commentID
            ? findCommentByID.comments.concat(comment)
            : [comment],
        },
        { new: true, runValidators: true, context: "query" }
      );
      console.log("comment found response: ", response);
    } else {
      const newComment = new Comment({
        blogID,
        comments: findCommentByID ? findCommentByID.concat(comment) : [comment],
      });
      const response = await newComment.save();
      console.log("comment new response: ", response);
    }
  }
  res.end();
});

module.exports = blogRouter;
