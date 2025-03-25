import { createContext, useContext, useEffect, useState } from "react";
const expenseContext = createContext();

export function useExpense() {
  return useContext(expenseContext);
}

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    setFormOpen(false);
  };

  const removeExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };
  const updateExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
    setFormOpen(false);
  };

  const handleAddExpButton = () => {
    setEditingExpense(null);
    setFormOpen(true);
  };

  
  const handleClose = () => setFormOpen(false);
  const handleShow = () => setFormOpen(true);

  return (
    <expenseContext.Provider
      value={{
        expenses,
        addExpense,
        removeExpense,
        handleEditExpense,
        updateExpense,
        editingExpense,
        isExpenseOpen,
        setIsExpenseOpen,
        isFormOpen,
        handleShow,
        handleClose,
        handleAddExpButton
      }}
    >
      {children}
    </expenseContext.Provider>
  );
}
