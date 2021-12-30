import { render, screen } from "@testing-library/react";
import Todo from "./index";

describe("Initial Render", () => {
  test("renders without Crashing", () => {
    render(<Todo />);
    const title = screen.getByText(/React Todo List/i);
    expect(title).toBeInTheDocument();
  });
  it("Renders two default todo items", () => {
    render(<Todo />);
    expect(screen.getByText("cooking")).toBeInTheDocument();
    expect(screen.getByText("playing")).toBeInTheDocument();
  });
});
