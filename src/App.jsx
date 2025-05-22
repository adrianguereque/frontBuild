// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contacto from "./pages/contacto";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contacto"
        element={
          <ProtectedRoute>
            <Contacto />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Usuarios />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
