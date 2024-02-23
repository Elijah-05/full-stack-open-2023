const { test, beforeEach, after, describe } = require("node:test");
const asser = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogsModel");

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

describe("When blog lists are initially seted and Start tesd for each", () => {
  describe("test the returned value type of blog", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("Check if the returned data of unique identifier is modified", async () => {
      const result = await api.get("/api/blogs");
      asser.deepStrictEqual(typeof result.body[0].id, "string");
    });
  });

  describe("Post request tests", () => {
    test("Check blogs are saved to database by post method", async () => {
      const newBlog = {
        title: "I am a new Blog test",
        author: "Tester",
        url: "https://sampleurl.test",
        likes: 1000,
      };
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsData = await Blog.find({});
      // console.log("blogData ", blogsData);

      asser.strictEqual(blogsData.length, initialBlogs.length + 1);
    });

    test("test if like property is missed in post request, set it to zero", async () => {
      const likeMissing = {
        title: "Like Missing Blog",
        author: "Missing",
        url: "https://missinglike.test",
      };

      const response = await api
        .post("/api/blogs")
        .send(likeMissing)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      // console.log("response of missing like: ", response.body);
      asser.strictEqual(response.body.likes, 0);
    });

    test("Title missing blog post, expected to 400 response", async () => {
      const titleMissingBlog = {
        author: "Missing",
        url: "https://missinglike.test",
      };
      await api.post("/api/blogs").send(titleMissingBlog).expect(400);
    });
  });

  describe("Deleting Bloglist Test", () => {
    test("Deleting a blog by id", async () => {
      const blogListBeforeDeletion = await Blog.find({});
      const blogIdToDelete = blogListBeforeDeletion[0].id;
      await api.delete(`/api/blogs/${blogIdToDelete}`).expect(204);

      const blogListAfterDeletion = await Blog.find({});

      asser.strictEqual(
        blogListBeforeDeletion.length,
        blogListAfterDeletion.length + 1
      );
    });
  });

  describe("Updating an existing bloglist data", () => {
    test("Update a specific bloglist data by its id", async () => {
      const updatedBlog = {
        ...initialBlogs[1],
        title: "I am updated of RWD",
        likes: 500000000,
      };
      // console.log("updatedBlog: ", updatedBlog);

      const updatingID = await Blog.find({});

      await api
        .put(`/api/blogs/${updatingID[1].id}`)
        .send(updatedBlog)
        .expect(201);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
