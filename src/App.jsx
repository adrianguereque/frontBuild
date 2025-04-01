import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contacto from "./pages/contacto";
import Usuarios from "./pages/Usuarios";

// ProtectedRoute component that checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if a token exists (adjust based on your auth flow)

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children; // Otherwise, render the protected route
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Login />} />*/}
        <Route path="/" element={<Home />} /> {/**Para la actividad que no haya autenticacion */}
        {/* Recomiendo editar pages/Home para el build*/}

        {/* Protected routes */} {/* Not protected for now */}
        <Route 
          path="/home" 
          element={
              <Home />
          } 
        />
        <Route 
          path="/contacto" 
          element={
              <Contacto />
          } 
        />
        <Route 
          path="/usuarios" 
          element={
              <Usuarios />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
