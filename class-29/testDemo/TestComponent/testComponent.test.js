import { render, screen } from "@testing-library/react";
import TestComponent from ".";

// const roles = [
//   'link',
//   'contentinfo',
//   'heading',
//   'banner',
//   'img',
//   'checkbox',
//   'spinbutton',
//   'radio',
//   'textbox',
//   'listitem',
//   'list'
// ]

test("can find elements by role", () => {
  render(<TestComponent />);

  const linkEl = screen.getByRole("link");
  expect(linkEl).toBeInTheDocument();

  const contentinfoEl = screen.getByRole("contentinfo");
  expect(contentinfoEl).toBeInTheDocument();
});

// accessible name is text content within the `opening and closing brackets of the elem
test("can find elements by accessible name", () => {
  render(<TestComponent />);
  const submitButton = screen.getByRole("button", { name: "Submit" });
  expect(submitButton).toBeInTheDocument();
});

// find multiple elements
test("can find multiple elements with the same role", () => {
  render(<TestComponent />);
  const buttons = screen.getAllByRole("button");
  expect(buttons[0]).toBeInTheDocument();
  expect(buttons[1]).toBeInTheDocument();
  expect(buttons).toHaveLength(2);
});
