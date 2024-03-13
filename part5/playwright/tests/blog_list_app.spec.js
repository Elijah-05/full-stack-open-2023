const { test, expect, beforeEach, describe } = require("@playwright/test");

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
      const inputs = await page.getByRole("textbox").all();
      await inputs[0].fill("mluukkai");
      await inputs[1].fill("salainen");

      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      const inputs = await page.getByRole("textbox").all();
      await inputs[0].fill("mluukkai");
      await inputs[1].fill("wrong pass");

      await page.getByRole("button", { name: "Login" }).click();
      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      const inputs = await page.getByRole("textbox").all();
      await inputs[0].fill("mluukkai");
      await inputs[1].fill("salainen");

      await page.getByRole("button", { name: "Login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      const inputs = await page.getByRole("textbox").all();
      const blogTitle = "testing with playright";
      const author = "playright tester";
      await inputs[0].fill(blogTitle);
      await inputs[1].fill(author);
      await inputs[2].fill("playright.com/docs");

      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText(`a new blog ${blogTitle} by ${author}`)
      ).toBeVisible();
    });
  });
});
