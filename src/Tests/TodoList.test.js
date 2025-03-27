import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";
afterEach(() => {
  localStorage.clear();
});
describe("TodoList Component", () => {
  test("renders todo list component", () => {
    render(<TodoList />);
    expect(screen.getByText("Todo App")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);

    const titleInput = screen.getByPlaceholderText("Title");
    const saveButton = screen.getByText("Save");

    fireEvent.change(titleInput, { target: { value: "Test Todo" } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  test("edits a todo", () => {
    render(<TodoList />);

    const titleInput = screen.getByPlaceholderText("Title");
    const saveButton = screen.getByText("Save");

    fireEvent.change(titleInput, { target: { value: "Old Todo" } });
    fireEvent.click(saveButton);

    const editButton = screen.getAllByText("Edit")[0]; // First Edit Button
    fireEvent.click(editButton);

    fireEvent.change(titleInput, { target: { value: "Updated Todo" } });
    fireEvent.click(screen.getByText("Update"));

    expect(screen.getByText("Updated Todo")).toBeInTheDocument();
  });

  test("toggles completion of a todo", () => {
    render(<TodoList />);

    const titleInput = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "Test Toggle" } });
    fireEvent.click(screen.getByText("Save"));

    const checkbox = screen.getAllByRole("checkbox")[0]; // First checkbox
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("deletes a todo", () => {
    render(<TodoList />);

    const titleInput = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "Test Delete" } });
    fireEvent.click(screen.getByText("Save"));

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);
    console.log(screen.queryByText("Test Delete"));

    expect(screen.queryByText("Test Delete")).not.toBeInTheDocument();
  });
  test("filters active and completed todos", () => {
    render(<TodoList />);

    const titleInput = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "Active Todo" } });
    fireEvent.click(screen.getByText("Save"));

    const titleInput2 = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput2, { target: { value: "Completed Todo" } });
    fireEvent.click(screen.getByText("Save"));

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]); // Mark second todo as completed

    fireEvent.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.getByText("Active Todo")).toBeInTheDocument();
    //expect(screen.queryByText("Completed Todo")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getByText("Completed Todo")).toBeInTheDocument();
    expect(screen.queryByText("Active Todo")).not.toBeInTheDocument();
  });
});
