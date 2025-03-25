import React from "react";
import { ExpenseProvider } from "./ExpenseContext";
import Header from "./Header";

export default function ExpenseTracker() {
  return (
    <ExpenseProvider>
      <Header/>
    </ExpenseProvider>
  );
}
