import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog Component Test", () => {
  let container;
  const blog = {
    id: "uniqueID-1",
    title: "Test Blog Title",
    author: "Mussie Tester",
    likes: 10,
    url: "example.com/blogs/how-to-test-with-jest",
    user: {
      username: "testUser",
      name: "Test User",
      id: "lkf923uifayhfiuy379i",
    },
  };

  const mockHandler = jest.fn();
  const mockHandleLike = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={blog.user}
        handleDeleteBlog={mockHandler}
        handleLike={mockHandleLike}
      />
    ).container;
  });

  test("The Blog Component renders title & author on first", () => {
    const title = container.querySelector(".blog-title");
    const author = container.querySelector(".blog-author");
    const url = container.querySelector(".blog-rul");
    expect(title).toHaveTextContent(blog.title);
    expect(author).toHaveTextContent(blog.author);
    expect(url).toBeNull();
  });

  test("Url and author is rendered after show button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(container).toHaveTextContent(blog.url);
    expect(container).toHaveTextContent(blog.likes);
  });

  test("When Like button is clicked twice the function is also called twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const like = screen.getByText("like");
    await user.click(like);
    await user.click(like);

    expect(mockHandleLike.mock.calls).toHaveLength(2);
  });
});
