import React from "react";
import { useExpense } from "./ExpenseContext";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import { Modal, Button } from "react-bootstrap";
import ExpenseSummary from "./ExpenseSummary";

function Header() {
  const {
    isFormOpen,
    handleAddExpButton,
    handleClose,
    handleLoadDummy,
    clearDummyData,
    expenses,
    editingExpense,
  } = useExpense();

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
        <div>
          <Button
            className="btn btn-sm"
            variant="primary"
            onClick={handleAddExpButton}
          >
            Add Expense
          </Button>
          {expenses.length ? (
            <Button
              className="btn btn-sm ms-2"
              variant="danger"
              onClick={clearDummyData}
            >
              Clear Data
            </Button>
          ) : (
            <Button
              className="btn btn-sm ms-2"
              variant="primary"
              onClick={handleLoadDummy}
            >
              Load Data
            </Button>
          )}
        </div>
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
            <Modal.Title>
              {" "}
              <h3 className="mb-2">
                {editingExpense ? "Edit Expense" : "Add Expense"}
              </h3>
            </Modal.Title>
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
      {expenses.length > 0 && <ExpenseSummary />}
      <ExpenseList />
    </>
  );
}

export default Header;
