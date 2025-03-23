import { useState, useMemo, useEffect } from "react";
import React from "react";
import useFetch from "../hooks/useFetch";

function UserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { users, loading } = useFetch(
    "https://dummyjson.com/users/?limit=0&delay=3000"
  );
  //const users = data?.users || [];

  useEffect(() => {
    console.log("loading",loading)
  }, [loading])

  // Filtering Users
  const filteredUsers = useMemo(() => {
    return  users?users.filter((user) =>
      [user.firstName, user.email, user.company.name, user.address.city].some(
        (field) => field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) : [];
  }, [users, searchTerm]);

  // Sorting Users
  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return filteredUsers;
    return [...filteredUsers].sort((a, b) => {
      const valueA = a[sortConfig.key].toLowerCase();
      const valueB = b[sortConfig.key].toLowerCase();
      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };



  return (
    <div className="container">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3 d-none d-md-block w-25"
      />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3 d-md-none"
      />

      {/* Table View */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-bordered">
          <thead>
            <tr>
              {[
                { key: "firstName", label: "First" },
                { key: "email", label: "Email" },
                { key: "company.name", label: "Company" },
                { key: "address.city", label: "City" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  style={{ cursor: "pointer" }}
                >
                  {label}{" "}
                  {sortConfig.key === key
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : "↑↓"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                  <td>{user.company.name}</td>
                  <td>{user.address.city}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan="4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View for Small Screens */}
      <div className="d-md-none">
        {paginatedUsers.map((user) => (
          <div className="card mb-3" key={user.id}>
            <div className="card-body">
              <p className="card-text"><strong>Name:</strong> {user.firstName}</p>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
              <p className="card-text"><strong>Company:</strong> {user.company.name}</p>
              <p className="card-text"><strong>City:</strong> {user.address.city}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="btn btn-primary me-2"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
        <select
          className="form-select w-auto"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size} rows per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UserTable;
