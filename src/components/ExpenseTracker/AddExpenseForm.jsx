import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useExpense } from "./ExpenseContext";

function AddExpenseForm() {
  const { addExpense, editingExpense, updateExpense } = useExpense();
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const categories = ["Food", "Travel", "Shopping", "Bills", "Others"];

  useEffect(() => {
    if (editingExpense) {
      setDate(editingExpense.date);
      setCategory(editingExpense.category);
      setAmount(editingExpense.amount);
      setDescription(editingExpense.description);
    }
  }, [editingExpense]);

  const validateForm = () => {
    let tempErrors = {};
    if (!date) tempErrors.date = "Date is required";
    if (!category) tempErrors.category = "Category is required";
    if (!amount || isNaN(amount) || amount <= 0)
      tempErrors.amount = "Valid amount is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editingExpense) {
        updateExpense({
          ...editingExpense,
          date,
          category,
          amount,
          description,
        });
      } else {
        addExpense({ id: Date.now(), date, category, amount, description });
      }
      setDate("");
      setCategory("");
      setAmount("");
      setDescription("");
      setErrors({});
    }
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h2 className="mb-3">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <small className="text-danger">{errors.date}</small>}
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <small className="text-danger">{errors.category}</small>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount && (
            <small className="text-danger">{errors.amount}</small>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {editingExpense ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
export default AddExpenseForm;
