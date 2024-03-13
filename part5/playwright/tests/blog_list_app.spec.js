const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./test_helper");

const userName = "mluukkai";
const password = "salainen";

describe("Blog List app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByText("Login to application");
    await expect(locator).toBeVisible();
  });

  describe("Login Test", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, userName, password);
      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "wrongUser", "wrongPass");
      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      loginWith(page, userName, password);
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      const newBlog = {
        title: "testing with playright",
        author: "playright tester",
        url: "playright.com/docs",
      };
      await createBlog(page, newBlog);

      await expect(
        page.getByText(`a new blog ${newBlog.title} by ${newBlog.author}`)
      ).toBeVisible();
    });
  });

  describe("Create Blog and Edit", () => {
    beforeEach(async ({ page, request }) => {
      const login = await request.post("/api/login", {
        data: {
          username: "mluukkai",
          password: "salainen",
        },
      });

      const loginResponse = await login.json();

      const blog = await request.post("/api/blogs", {
        headers: {
          Authorization: `Bearer ${loginResponse.token}`,
        },
        data: {
          title: "new blog created with cypress",
          author: "cypress",
          url: "example.com/blog",
        },
      });

      const blogResponse = await blog.json();

      await request.put(`/api/blogs/${blogResponse.id}`, {
        headers: {
          Authorization: `Bearer ${loginResponse.token}`,
        },
        data: {
          title: "new blog updated with playright",
          author: "playright",
          url: "example.com/blogs/testing/playright",
        },
      });
    });

    test("Blog can be edited", async ({ page }) => {
      await page.goto("/");
      await loginWith(page, userName, password);

      await expect(
        page.getByText("new blog updated with playright")
      ).toBeVisible();
    });
  });
});
