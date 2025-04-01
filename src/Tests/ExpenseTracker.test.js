import { screen, render, fireEvent } from "@testing-library/react";
import { ExpenseProvider } from "../components/ExpenseTracker/ExpenseContext";
import Header from "../components/ExpenseTracker/Header";
import { act } from "react";

describe("Expense Tracker Test suite", () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    render(
      <ExpenseProvider>
        <Header />
      </ExpenseProvider>
    );
  });
  test("Component Should Load", () => {
    const headerText = screen.getByText(/Expense Tracker/i);
    expect(headerText).toBeInTheDocument();
  });
  //test add expense
  test("Add Expense", () => {
    const addExpenseButton = screen.getByText(/Add Expense/i);
    expect(addExpenseButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(addExpenseButton);
    });
    const addExpenseText = screen.getByText(/Submit/i);
    expect(addExpenseText).toBeInTheDocument();

    // fill the form date, categoty, amount and description
    const inputs = [
      { testId: "date-input", value: "2025-03-30" },
      { testId: "category-input", value: "Food" },
      { testId: "amount-input", value: "100" },
      { testId: "description-input", value: "Test" },
    ];
    inputs.forEach(({ testId, value }) => {
      const input = screen.getByTestId(testId);
      fireEvent.change(input, { target: { value } });
      expect(input.value).toBe(value);
    });

    const form = screen.getByTestId("popup-form");
    //fireEvent.submit(form);

    fireEvent.submit(form);
    // check the expense is added to the list
    const rows = screen
      .getAllByRole("row")
      .map((row) =>
        Array.from(row.querySelectorAll("td")).map((cell) =>
          cell.textContent.trim()
        )
      );
    expect(rows[1]).toEqual([
      "2025-03-30",
      "Food",
      "₹ 100",
      "Test",
      "EditDelete",
    ]);
  });
  //test edit expense
  test("Edit Expense", () => {
    const addExpenseButton = screen.getByText(/Add Expense/i);
    expect(addExpenseButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(addExpenseButton);
    });
    const addExpenseText = screen.getByText(/Submit/i);
    expect(addExpenseText).toBeInTheDocument();

    // fill the form date, categoty, amount and description
    const inputs = [
      { testId: "date-input", value: "2025-03-30" },
      { testId: "category-input", value: "Food" },
      { testId: "amount-input", value: "100" },
      { testId: "description-input", value: "Test" },
    ];
    inputs.forEach(({ testId, value }) => {
      const input = screen.getByTestId(testId);
      fireEvent.change(input, { target: { value } });
      expect(input.value).toBe(value);
    });

    const form = screen.getByTestId("popup-form");
    fireEvent.submit(form);

    const editButton = screen.getByTestId("edit-button");
    expect(editButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(editButton);
    });
    const editExpenseText = screen.getByText(/Update/i);
    expect(editExpenseText).toBeInTheDocument();

    // fill the form date, categoty, amount and description
    const editInputs = [
      { testId: "date-input", value: "2025-03-30" },
      { testId: "category-input", value: "Food" },
      { testId: "amount-input", value: "200" },
      { testId: "description-input", value: "Test" },
    ];
    editInputs.forEach(({ testId, value }) => {
      const input = screen.getByTestId(testId);
      fireEvent.change(input, { target: { value } });
      expect(input.value).toBe(value);
    });

    const editForm = screen.getByTestId("popup-form");
    fireEvent.submit(editForm);

    // check the expense is added to the list
    const rows = screen
      .getAllByRole("row")
      .map((row) =>
        Array.from(row.querySelectorAll("td")).map((cell) =>
          cell.textContent.trim()
        )
      );
    expect(rows[1]).toEqual([
      "2025-03-30",
      "Food",
      "₹ 200",
      "Test",
      "EditDelete",
    ]);
  });
});
