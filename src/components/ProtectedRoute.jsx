// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return null;
};

const ProtectedRoute = ({ children }) => {
  const userCookie = getCookie("UserData");

  if (!userCookie) {
    return <Navigate to="/" replace />; // Redirect to login if no cookie
  }

  try {
    JSON.parse(userCookie); // Optional: validate JSON
    return children;
  } catch {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
