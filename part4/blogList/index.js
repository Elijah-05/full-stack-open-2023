require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

morgan.token(
  "req-body",
  (req) => req.method !== "GET" && JSON.stringify(req.body)
);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

app.use(cors());
app.use(express.json());

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to MONGODB"))
  .catch(() => console.log("unable to connect to MONGODB"));

app.get("/api/blogs", (req, res) => {
  Blog.find({})
    .then((mongoRes) => {
      res.send(mongoRes);
    })
    .catch((err) => console.error("unable to get blog: ", err));
});

app.post("/api/blogs", (req, res) => {
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
    .catch((err) => console.log("unable to save: ", err));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
