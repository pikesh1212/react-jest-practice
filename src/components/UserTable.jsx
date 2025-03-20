import { useState, useMemo } from "react";
import React from "react";
import useFetch from "../hooks/useFetch";

function UserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useFetch("https://dummyjson.com/users/?limit=0&delay=2000");


  const users = data?.users || [];

  
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      [user.firstName, user.email, user.company.name, user.address.city]
        .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [users, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3 w-25"
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First</th>
            <th>Email</th>
            <th>Company Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
