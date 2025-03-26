import { useExpense } from "./ExpenseContext";

function ExpenseList() {
  const { expenses, removeExpense, handleEditExpense, handleShow } =
    useExpense();

  return (
    <div className="card p-4 shadow-sm">
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <h3 className="mb-3">Expense List</h3>
        <h3 className="mb-3">
          Total: ₹ 
          {expenses?.reduce((acc, expense) => acc + Number(expense.amount), 0)}
        </h3>
      </div>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length>0 ?
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>₹ {expense.amount}</td>
                <td>{expense.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      handleEditExpense(expense);
                      handleShow();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeExpense(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )):<tr><td colSpan={5} className="text-center">No Expenses Found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
