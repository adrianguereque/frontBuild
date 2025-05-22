import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Title.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // For registration
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const hasCheckedSession = useRef(false);

  useEffect(() => {
    if (hasCheckedSession.current) return;
    hasCheckedSession.current = true;

    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/getSession", {
          credentials: "include",
        });

        if (!response.ok) return;

        const data = await response.json();
        const token = data.token;
        if (!token) return;

        const decoded = jwtDecode(token);
        // console.log("name ya autenticado:", decoded);
        navigate("/home");
      } catch (error) {
        console.error("No se pudo verificar la sesión:", error);
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
      window.location.reload(); // Triggers useEffect to redirect
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, name: username, password: password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");

      window.location.reload(); // Same as login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "250px" }}>
        <ui5-title level="H2">{isRegistering ? "Register" : "Login"}</ui5-title>

        <ui5-input
          placeholder="Email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          required
        ></ui5-input>

        {isRegistering && (
          <ui5-input
            placeholder="Username"
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            required
          ></ui5-input>
        )}

        <ui5-input
          type="Password"
          placeholder="Password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          required
        ></ui5-input>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {isRegistering ? (
          <ui5-button design="Emphasized" onClick={handleRegister}>Register</ui5-button>
        ) : (
          <ui5-button design="Emphasized" onClick={handleLogin}>Login</ui5-button>
        )}

        <ui5-button design="Transparent" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Login" : "No account? Register"}
        </ui5-button>
      </div>
    </div>
  );
};

export default Login;
