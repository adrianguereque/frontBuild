import { useEffect, useState } from "react";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/Label.js";
import Layout from "../components/Layout";

const API_HOST = import.meta.env.VITE_API_HOST;

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Track which user is being edited and temp edits
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", password: "" });

  const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_HOST}/users/getUsers`, {
      method: "GET",
      credentials: "include", 
    });

    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      setError("Failed to load users");
    }
  } catch (err) {
    console.error(err);
    setError("An error occurred while fetching users");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUsers();
}, []);


  // Handle edit button click
  const startEditing = (user) => {
    setEditUserId(user.id);
    setEditForm({ name: user.name, password: "" }); // password empty initially
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditUserId(null);
    setEditForm({ name: "", password: "" });
  };

  // Handle input changes during editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Update user API call
  const saveUser = async (id) => {
    try {
      const response = await fetch(`${API_HOST}/users/updateUser/${id}`, {
        method: "PUT",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (response.ok) {
        await fetchUsers();     
        cancelEditing();
      } else {
        alert("Failed to update user");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  // Delete user API call
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${API_HOST}/users/deleteUser/${id}`, {
        method: "DELETE",
        credentials: "include", 
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  if (loading) return <Layout><p>Loading...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout pageTitle="Usuarios">
      <h2>Usuarios</h2>
      <ui5-table id="userTable" overflow-mode="Popin">
        <ui5-table-header-row slot="headerRow">
          <ui5-table-header-cell>ID</ui5-table-header-cell>
          <ui5-table-header-cell>Name</ui5-table-header-cell>
          <ui5-table-header-cell>Email</ui5-table-header-cell>
          <ui5-table-header-cell>Password</ui5-table-header-cell>
          <ui5-table-header-cell>Actions</ui5-table-header-cell>
        </ui5-table-header-row>

        {users.map((user) => (
          <ui5-table-row key={user.id}>
            <ui5-table-cell><ui5-label>{user.id}</ui5-label></ui5-table-cell>

            {/* Name: editable if editing */}
            <ui5-table-cell>
              {editUserId === user.id ? (
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                />
              ) : (
                <ui5-label>{user.name}</ui5-label>
              )}
            </ui5-table-cell>

            <ui5-table-cell><ui5-label>{user.email}</ui5-label></ui5-table-cell>

            {/* Password: editable if editing, masked otherwise */}
            <ui5-table-cell>
              {editUserId === user.id ? (
                <input
                  type="password"
                  name="password"
                  placeholder="New password"
                  value={editForm.password}
                  onChange={handleInputChange}
                />
              ) : (
                <ui5-label>{user.password ? "********" : ""}</ui5-label>
              )}
            </ui5-table-cell>

            {/* Actions */}
            <ui5-table-cell>
              {editUserId === user.id ? (
                <>
                  <button onClick={() => saveUser(user.id)}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditing(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)} style={{ marginLeft: "8px" }}>Delete</button>
                </>
              )}
            </ui5-table-cell>
          </ui5-table-row>
        ))}
      </ui5-table>
    </Layout>
  );
};

export default Usuarios;
