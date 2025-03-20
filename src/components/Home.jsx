import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="container">
        <h1 className="text-center">React Assignments</h1>
        <ul>
          <li><Link to="/todo">Todo List</Link></li>
          <li><Link to="/usertable">User Data Table</Link></li>
          <li><Link to="/cart">Shopping Cart with context API</Link></li>
          <li><Link to="/expensetracker">Expense Tracker</Link></li>
        </ul>
      </div>
    );
  }
  
export default Home