import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router";
import TodoList from "./components/TodoList";
import ShoppingCart from "./components/ShoppingCartComponent/ShoppingCart";
import UserTable from "./components/UserTable";
import ExpenseTracker from "./components/ExpenseTracker";
import Home from "./components/Home";


function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-bs-theme", newTheme);
  };
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todo">Todo List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/usertable">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Shopping Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/expensetracker">Expenses</Link>
              </li>
            </ul>
            <button className="btn btn-outline-primary" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="card shadow-sm">
          <div className="card-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="/usertable" element={<UserTable />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/expensetracker" element={<ExpenseTracker />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
