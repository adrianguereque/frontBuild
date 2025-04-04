import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@ui5/webcomponents-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // New state for email during registration
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(""); // Error state to display any errors
  const navigate = useNavigate();

  // Check for existing token and redirect if found
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  // Register handler
  const handleRegister = async () => {
    setError(""); // Reset error state before submitting
    const registerData = { name: username, email, password };

    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! You can now log in.");
        setIsRegistering(false); // Switch to login after successful registration
      } else {
        setError(data.error || "An error occurred during registration.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Server error, please try again.");
    }
  };

  const handleLogin = async () => {
    setError(""); // Reset error state before submitting
    const loginData = { email: username, password };
  
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Save the token in localStorage
        localStorage.setItem("token", data.token); // Store token in localStorage
  
        navigate("/home"); // Redirect to Home page
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error, please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "250px", margin: "auto" }}>
          <ui5-title level="H2">{isRegistering ? "Register" : "Login"}</ui5-title>
          
          {isRegistering && (
            <ui5-input placeholder="Email" value={email} onInput={(e) => setEmail(e.target.value)} required></ui5-input>
          )}
          
          <ui5-input placeholder="Username" value={username} onInput={(e) => setUsername(e.target.value)} required></ui5-input>
          <ui5-input type="Password" placeholder="Password" value={password} onInput={(e) => setPassword(e.target.value)} required></ui5-input>
          
          {error && <p style={{ color: "red" }}>{error}</p>}
          
          {isRegistering ? (
            <Button design="Emphasized" onClick={handleRegister}>Register</Button>
          ) : (
            <Button design="Emphasized" onClick={handleLogin}>Login</Button>
          )}
          
          <Button design="Transparent" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Login" : "No account? Register"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
