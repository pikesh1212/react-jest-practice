import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoList from "./components/TodoList";
import ShoppingCart from "./components/ShoppingCart";
import UserTable from "./components/UserTable";
import ExpenseTracker from "./components/ExpenseTracker";

function Home() {
  return (
    <div>
      <h1>React Assignments</h1>
      <ul>
        <li><Link to="/todo">Todo List</Link></li>
        <li><Link to="/usertable">User Data Table</Link></li>
        <li><Link to="/cart">Shopping Cart with context API</Link></li>
        <li><Link to="/expensetracker">Expense Tracker</Link></li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/usertable" element={<UserTable />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/expensetracker" element={<ExpenseTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
