import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

describe("Create Blog Form Component Test", () => {
  test("The form calls the event handler with the right details", async () => {
    const blogData = {
      title: "Test Title Mock",
      author: "Mock Author",
      url: "example.com/blog/jest_test",
    };
    const mockHandler = jest.fn();
    render(<CreateBlog handleSubmitBlog={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("create");
    const inputs = screen.getAllByRole("textbox");

    await user.type(inputs[0], blogData.title);
    await user.type(inputs[1], blogData.author);
    await user.type(inputs[2], blogData.url);
    await user.click(button);

    // screen.debug();

    // console.log("test mock passed: ", mockHandler.mock.calls[0][0]);
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe(blogData.title);
    expect(mockHandler.mock.calls[0][0].author).toBe(blogData.author);
    expect(mockHandler.mock.calls[0][0].url).toBe(blogData.url);
  });
});
