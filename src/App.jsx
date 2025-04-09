import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contacto from "./pages/contacto";
import Usuarios from "./pages/Usuarios";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/usuarios" element={<Usuarios />} />
    </Routes>
  );
};

export default App;
