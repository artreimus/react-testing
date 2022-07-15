import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { jest } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import App from "./App";
import Input from "./components/Input";

test("renders hello world", () => {
  render(<App />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
test("list contains 5 animals", () => {
  render(<App />);
  const listElement = screen.getByRole("list");
  const listItems = screen.getAllByRole("listitem");
  expect(listElement).toBeInTheDocument();
  expect(listElement).toHaveClass("animals");
  expect(listItems.length).toEqual(5);
});

describe("Testing APP Counter", () => {
  test("counter is incremented on button click", () => {
    render(<App />);
    const counter = screen.getByTestId("counter");
    const incrementBtn = screen.getByText("Increment");

    userEvent.click(incrementBtn);
    userEvent.click(incrementBtn);
    expect(counter.textContent).toEqual("2");
  });

  test("counter is decremented on button click", () => {
    render(<App />);
    const counter = screen.getByTestId("counter");
    const decrementBtn = screen.getByText("Decrement");

    userEvent.click(decrementBtn);
    userEvent.click(decrementBtn);
    expect(counter.textContent).toEqual("-2");
  });
});

describe("Test form input", () => {
  test("input value is updated on input change", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "Hello");
    expect(input.value).toEqual("Hello");
  });

  test("call the bacllback every time input value is changed", () => {
    const handleChange = jest.fn();
    render(<Input handleChange={handleChange} inputValue="" />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "Hello");
    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});

describe("Testing App Component API", () => {
  test("loading text is shown while fetching data", async () => {
    window.fetch = jest.fn(() => {
      const user = { name: "John Doe", email: "john@email.com" };

      return Promise.resolve({
        json: () => Promise.resolve(user),
      });
    });
    render(<App />);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  test("user is shown after fetching data", async () => {
    window.fetch = jest.fn(() => {
      const user = { name: "John Doe", email: "john@email.com" };

      return Promise.resolve({
        json: () => Promise.resolve(user),
      });
    });
    render(<App />);
    const userName = await screen.findByText("John Doe");
    expect(userName).toBeInTheDocument();
  });

  test("error is shown after fetching data", async () => {
    window.fetch.mockImplementationOnce(() => {
      return Promise.reject({ message: "API is down" });
    });

    render(<App />);
    const error = await screen.findByText(/down/i);
    expect(error).toBeInTheDocument();
  });
});
