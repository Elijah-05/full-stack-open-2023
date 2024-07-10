const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogsModel");
const { blogsInDb, initialBlogs } = require("./test_helper");
const User = require("../models/usersModel");

const api = supertest(app);

let Auth_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXBsZXVzZXIiLCJpZCI6IjY1ZGVjYzRlYmRjZDJiNGY1ZWMxY2VmMCIsImlhdCI6MTcwOTEwMDE0OH0.qIdm2ABywARZakzFm5sOtHjStVav5twKbx6Ch4yedgQ";

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const testerUser1 = {
    username: "Tester1",
    name: "Sample User",
    password: "tester@123",
  };

  const createResponse = await api
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send(testerUser1)
    .expect(201);

  delete createResponse.body.id;
  delete createResponse.body.name;

  // console.log("createResponse: ", createResponse.body);

  const loginResponse = await api
    .post("/api/login")
    .set("Content-Type", "application/json")
    .send(createResponse.body);

  Auth_token = loginResponse.body.token;
  // console.log("Auth_token: ", Auth_token);

  await api
    .post("/api/blogs")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${Auth_token}`)
    .send(initialBlogs[0]);

  await api
    .post("/api/blogs")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${Auth_token}`)
    .send(initialBlogs[1]);
});

describe("When blog lists are initially setted and Start test for each", () => {
  describe("test the returned value type of blog", () => {
    test("blogs are returned as json", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("Check if the returned data of unique identifier is modified", async () => {
      const result = await api.get("/api/blogs");
      assert.deepStrictEqual(typeof result.body[0].id, "string");
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
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${Auth_token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const blogsData = await blogsInDb();
      assert.strictEqual(blogsData.length, initialBlogs.length + 1);
    });

    test("Blog is created with Zero like when like property is missing", async () => {
      const likeMissing = {
        title: "Like Missing Blog",
        author: "Missing",
        url: "https://missinglike.test",
      };
      const response = await api
        .post("/api/blogs")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${Auth_token}`)
        .send(likeMissing)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(response.body.likes, 0);
    });

    test("Title missing blog post, expected to 400 response", async () => {
      const titleMissingBlog = {
        author: "Missing",
        url: "https://missinglike.test",
      };
      await api
        .post("/api/blogs")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${Auth_token}`)
        .send(titleMissingBlog)
        .expect(400);
    });
  });

  describe("Deleting Bloglist Test", () => {
    test("Deleting a blog by id", async () => {
      const blogListBeforeDeletion = await Blog.find({});
      const blogIdToDelete = blogListBeforeDeletion[0].id;
      await api
        .delete(`/api/blogs/${blogIdToDelete}`)
        .set("Authorization", `Bearer ${Auth_token}`)
        .expect(204);

      const blogListAfterDeletion = await Blog.find({});

      assert.strictEqual(
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
        .set("Authorization", `Bearer ${Auth_token}`)
        .send(updatedBlog)
        .expect(201);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
