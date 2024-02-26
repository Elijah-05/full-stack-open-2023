const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const User = require("../models/usersModel");
const mongoose = require("mongoose");
const app = require("./../app");
const supertest = require("supertest");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  await User.insertMany(helper.initialUsers);
});

describe("Test for user API end point", () => {
  describe("Creating Users Test Group", () => {
    test("New user is created and the database user number should be increased", async () => {
      const newUser = {
        username: "JonhyGo",
        name: "Jonnny",
        password: "JONyi@123",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const getUsers = await helper.usersInDb();

      assert.strictEqual(getUsers.length, helper.initialUsers.length + 1);
    });

    test("Invalid data of user can not be created", async () => {
      const invalidUserData = {
        username: "el",
        name: "Elijah Abebe",
        password: "Elli123",
      };

      api
        .post("/api/users")
        .send(invalidUserData)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const getUsers = await helper.usersInDb();

      assert.strictEqual(getUsers.length, helper.initialUsers.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
