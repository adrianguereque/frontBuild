import React, { useEffect, useState } from "react";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/Label.js";
import Layout from "../components/Layout"; // Reusing the layout

const Usuarios = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Function to fetch user data
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/getUsers", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Attach token from localStorage
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Store the fetched users in state
        } else {
          setError("Failed to load users");
        }
      } catch (err) {
        setError("An error occurred while fetching users");
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUsers(); // Call the fetchUsers function when the component mounts
  }, []); // Empty dependency array to only run once when the component mounts

  // Handle loading and error states
  if (loading) {
    return <Layout><p>Loading...</p></Layout>;
  }

  if (error) {
    return <Layout><p>{error}</p></Layout>;
  }

  return (
    <Layout pageTitle="Usuarios">
      <h2>Usuarios</h2>
      <ui5-table id="userTable" overflow-mode="Popin">
        {/* Table Header */}
        <ui5-table-header-row slot="headerRow">
          <ui5-table-header-cell id="nameCol" width="200px">Name</ui5-table-header-cell>
          <ui5-table-header-cell id="emailCol" width="300px">Email</ui5-table-header-cell>
          <ui5-table-header-cell id="createdAtCol" width="200px">Created At</ui5-table-header-cell>
        </ui5-table-header-row>

        {/* Table Rows - Mapping users */}
        {users.map((user) => (
          <ui5-table-row key={user.Id}>
            <ui5-table-cell>
              <ui5-label><b>{user.Name}</b></ui5-label>
            </ui5-table-cell>
            <ui5-table-cell>
              <ui5-label>{user.Email}</ui5-label>
            </ui5-table-cell>
            <ui5-table-cell>
              <ui5-label>{new Date(user.CreatedAt).toLocaleString()}</ui5-label>
            </ui5-table-cell>
          </ui5-table-row>
        ))}
      </ui5-table>
    </Layout>
  );
};

export default Usuarios;
