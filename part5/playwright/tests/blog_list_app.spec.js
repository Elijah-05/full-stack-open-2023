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
          author: "mluukkai salainen",
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

  describe("Deleting the Blog", () => {
    beforeEach(async ({ page, request }) => {
      await loginWith(page, userName, password);
      await createBlog(page, {
        title: "created to be deleted",
        author: "elijah abebe",
        url: "example.com/blog",
      });
    });

    test("user can delete his own blog", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await page.getByRole("button", { name: "remove" }).click();
      await expect(page.getByText("created to be deleted")).not.toBeVisible();
    });

    test("another user can't see the delete button", async ({
      page,
      request,
    }) => {
      await request.post("/api/users", {
        data: {
          name: "elyas abebe",
          username: "ellayAb",
          password: "myPass",
        },
      });
      await page.getByRole("button", { name: "Log out" }).click();
      await loginWith(page, "ellayAb", "myPass");

      // await expect(page.getByText("created to be deleted")).toBeVisible();
      await page.getByRole("button", { name: "view" }).click();
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });
  });

  describe("Blogs list order", () => {
    test.only("blogs are listed by amount of likes in order", async ({
      page,
    }) => {
      await loginWith(page, userName, password);
      await createBlog(page, {
        title: "First blog Test A",
        author: "elijah abebe",
        url: "example.com/blog",
      });
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();

      await createBlog(page, {
        title: "Second blog Test B",
        author: "elijah abebe",
        url: "example.com/blog",
      });
      await page.getByRole("button", { name: "view" }).click();

      await createBlog(page, {
        title: "Third blog Test C",
        author: "elijah abebe",
        url: "example.com/blog",
      });
      await page.getByRole("button", { name: "view" }).click();

      const likes = await page.getByTestId("like-amount").allInnerTexts();
      console.log("like Array:", likes);
      await page.pause();
    });
  });
});
