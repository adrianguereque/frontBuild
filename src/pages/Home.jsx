import { useState, useEffect } from "react";
import Layout from "../components/Layout";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return null;
};

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookieData = getCookie("UserData");
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        setUser(parsedData);
        console.log("User loaded from cookie:", parsedData);
      } catch (e) {
        console.error("Invalid JSON in UserData cookie:", e);
      }
    }
  }, []);

  return (
    <Layout pageTitle="Home">
      <h2>Welcome!</h2>
      {user ? (
        <div>
          <p>Name: {user.name || user.usuario || "Unknown"}</p>
          <p>Email: {user.email || user.correo || "Unknown"}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </Layout>
  );
};

export default Home;
