import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import App from "./App";

test("test input field for url", async () => {
  render(<App />);
  const dummyUrl = "http://sararules.com";
  const formInput = screen.getByTestId("formInput");
  const goButton = screen.getByTestId("goButton");

  fireEvent.change(formInput, { target: { value: dummyUrl } });
  fireEvent.submit(goButton);
  const testValue = `URL: ${dummyUrl}`;
  const badTest = `URL: Pizza Rules`;
  // await screen.findByText(testValue);
  await waitFor(() => {
    expect(screen.queryByText(testValue)).toBeInTheDocument();
    expect(screen.queryByText(badTest)).not.toBeInTheDocument();
  });
});
