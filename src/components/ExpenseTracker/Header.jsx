import React from "react";
import { useExpense } from "./ExpenseContext";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import { Modal, Button } from "react-bootstrap";
import ExpenseSummary from "./ExpenseSummary";

function Header() {
  const { isFormOpen ,handleAddExpButton, handleClose} = useExpense();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <h1>Expense Tracker</h1>
        <Button variant="primary" onClick={handleAddExpButton}>
          Add Expense
        </Button>
      </div>

      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={isFormOpen}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddExpenseForm />
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      </div>
      <ExpenseSummary/>
      <ExpenseList />
    </>
  );
}

export default Header;
