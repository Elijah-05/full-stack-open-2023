const loginWith = async (page, username, password) => {
  const inputs = await page.getByRole("textbox").all();
  await inputs[0].fill(username);
  await inputs[1].fill(password);

  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, blogObject) => {
  await page.getByRole("button", { name: "Create new blog" }).click();

  const inputs = await page.getByRole("textbox").all();
  await inputs[0].fill(blogObject.title);
  await inputs[1].fill(blogObject.author);
  await inputs[2].fill(blogObject.url);

  await page.getByRole("button", { name: "create" }).click();
};

export { loginWith, createBlog };
