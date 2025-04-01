import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/users/getUserData", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Attach token
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Store user details in state
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Layout pageTitle="Home">
      <h2>Welcome!</h2>
      {user && (
        <div>
          <p>Name: {user.Name}</p>
          <p>Email: {user.Email}</p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
