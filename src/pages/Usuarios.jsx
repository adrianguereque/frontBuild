import { useEffect, useState } from "react";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/Label.js";
import Layout from "../components/Layout";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return null;
};

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //const cookie = getCookie("Auth");
        //if (!cookie) throw new Error("No Auth cookie found");

        //const { token } = JSON.parse(cookie);

        const response = await fetch("http://localhost:5000/users/getUsers", {
          method: "GET",
          //headers: {
           // "Authorization": `Bearer ${token}`,
            //"Content-Type": "application/json",
          //},
          //credentials: "include",
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

    fetchUsers();
  }, []);

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
        <ui5-table-header-row slot="headerRow">
          <ui5-table-header-cell>ID</ui5-table-header-cell>
          <ui5-table-header-cell>Name</ui5-table-header-cell>
          <ui5-table-header-cell>Email</ui5-table-header-cell>
          <ui5-table-header-cell>Password</ui5-table-header-cell>
          <ui5-table-header-cell>Role</ui5-table-header-cell>
          <ui5-table-header-cell>Created At</ui5-table-header-cell>
        </ui5-table-header-row>

        {users.map((user) => (
          <ui5-table-row key={user.id}>
            <ui5-table-cell><ui5-label>{user.id}</ui5-label></ui5-table-cell>
            <ui5-table-cell><ui5-label>{user.name}</ui5-label></ui5-table-cell>
            <ui5-table-cell><ui5-label>{user.email}</ui5-label></ui5-table-cell>
            <ui5-table-cell><ui5-label>{user.password}</ui5-label></ui5-table-cell>
            <ui5-table-cell><ui5-label>{user.role}</ui5-label></ui5-table-cell>
            <ui5-table-cell><ui5-label>{new Date(user.createdAt).toLocaleString()}</ui5-label></ui5-table-cell>
          </ui5-table-row>
        ))}
      </ui5-table>
    </Layout>
  );
};

export default Usuarios;
