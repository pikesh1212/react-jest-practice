import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addUpdateTodo = () => {
    if (!title) return;
    const newTodo = {
      title,
      description,
      dueDate,
      completed: false,
    };

    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = newTodo;
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  const editTodo = (index) => {
    const todo = todos[index];
    setTitle(todo.title);
    setDescription(todo.description);
    setDueDate(todo.dueDate);
    setEditingIndex(index);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };
const filteredTodos = todos.filter((todo) => {
  if (filter === "active") return !todo.completed;
  if (filter === "completed") return todo.completed;
  return true;
});
  return (
    <div className="container mt-2 w-50">
      <h2 className="text-center">Todo App</h2>
      <div className="card p-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="date"
          className="form-control mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addUpdateTodo}>
          {editingIndex !== null ? "Update" : "Save"}
        </button>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-secondary mx-1"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="list-group mt-3">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong style={{textDecoration: todo.completed?"line-through":"none"}}>{todo.title}</strong> <br />
              {todo.description && <small>{todo.description}</small>} <br />
              {todo.dueDate && <small>Due: {todo.dueDate}</small>}
              <br />
              <input
                type="checkbox"
                className="me-2"
                checked={todo.completed}
                onChange={() => toggleCompletion(index)}
              />
              {todo.completed ? (
                <span className="text-success">Completed</span>
              ) : (
                <span className="text-warning">Active</span>
              )}
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => editTodo(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
