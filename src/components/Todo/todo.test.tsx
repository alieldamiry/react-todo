import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Todo from "./index";

describe("Initial Render", () => {
  test("renders without Crashing", () => {
    render(<Todo />);
    const title = screen.getByText(/React Todo List/i);
    expect(title).toBeInTheDocument();
  });
  it("Renders two default todo items", () => {
    render(<Todo />);
    const addButton = screen.getByRole("button", { name: /Add a todo/i });
    expect(screen.getByText("cooking")).toBeInTheDocument();
    expect(screen.getByText("playing")).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(screen.getAllByTestId("todo-item")).toHaveLength(2);
  });
});

describe("Add an item", () => {
  it("prevent item from being added, if the input field is empty", () => {
    render(<Todo />);
    const addButton = screen.getByRole("button", { name: /Add a todo/i });
    const input: HTMLInputElement = screen.getByLabelText("todo-input");
    const event = { target: { value: "" } };
    fireEvent.change(input, event);
    fireEvent.click(addButton);
    expect(screen.getAllByTestId("todo-item")).toHaveLength(2);
  });
  it("creates a new todo item, if the add button is pressed", () => {
    render(<Todo />);
    const addButton = screen.getByRole("button", { name: /Add a todo/i });
    const input: HTMLInputElement = screen.getByLabelText("todo-input");
    const event = { target: { value: "new todo" } };
    fireEvent.change(input, event);
    expect(input.value).toBe("new todo");
    fireEvent.click(addButton);
    expect(screen.getByText("new todo")).toBeInTheDocument();
    expect(screen.getAllByTestId("todo-item")).toHaveLength(3);
  });
});
describe("remove an item", () => {
  it("remove an item, if the remove button is pressed", () => {
    render(<Todo />);
    const removeButtons = screen.getAllByTestId("remove-btn");
    fireEvent.click(removeButtons[0]);
    expect(screen.getAllByTestId("todo-item")).toHaveLength(1);
  });
  it("if all items has been deleted a text should be displayed", () => {
    render(<Todo />);
    const removeButtons = screen.getAllByTestId("remove-btn");
    expect(screen.queryByText(/your list is empty/i)).not.toBeInTheDocument();
    fireEvent.click(removeButtons[0]);
    fireEvent.click(removeButtons[1]);

    expect(screen.queryByTestId("todo-item")).not.toBeInTheDocument();
    expect(screen.getByText(/your list is empty/i)).toBeInTheDocument();
  });
});

describe("Edit an item", () => {
  it("render the modal without crashing when clicking on edit button", () => {
    render(<Todo />);
    const editButtons = screen.getAllByTestId("edit-btn");
    fireEvent.click(editButtons[0]);
    expect(screen.getByLabelText("todo-input-edit")).toBeInTheDocument();
  });
  it("change todo item text when submitting an edit", () => {
    render(<Todo />);
    const editButtons = screen.getAllByTestId("edit-btn");
    const event = { target: { value: "new edit" } };
    fireEvent.click(editButtons[0]);
    const editInput = screen.getByLabelText("todo-input-edit");
    fireEvent.change(editInput, event);
    fireEvent.submit(screen.getByTestId("edit-form"));
    expect(screen.getByText("new edit")).toBeInTheDocument();
  });
});
