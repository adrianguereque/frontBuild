import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  Button,
  SideNavigation,
  SideNavigationItem,
  Title,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/contacts.js";

const Layout = ({ pageTitle, children }) => {
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/users/logoutUser", {
        method: "POST",
        credentials: "include",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSettingsClick = () => {
    setShowSettingsMenu((prev) => !prev);
  };

  const handleSettingsOption = async (action) => {
  setShowSettingsMenu(false);

  try {
    if (action === "change-name") {
      const newName = prompt("Enter your new name:");
      if (!newName) return;

      const res = await fetch("http://localhost:5000/users/changeName", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName }),
      });

      if (!res.ok) throw new Error("Failed to change name");
      alert("Name changed successfully!");
    }

    else if (action === "change-password") {
      const newPassword = prompt("Enter your new password:");
      if (!newPassword) return;

      const res = await fetch("http://localhost:5000/users/changePassword", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      if (!res.ok) throw new Error("Failed to change password");
      alert("Password changed successfully!");
    }

    else if (action === "delete-account") {
      const confirmed = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
      if (!confirmed) return;

      const res = await fetch("http://localhost:5000/users/deleteAccount", {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete account");
      alert("Account deleted successfully!");
      navigate("/", { replace: true });
    }
  } catch (error) {
    console.error(error);
    alert(error.message || "Action failed.");
  }
};


  

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Top Navbar */}
      <Bar design="Header" style={{ width: "100%", flexShrink: 0 }}>
        <Title>{pageTitle}</Title>
        <div slot="endContent" style={{ position: "relative" }}>
          <Button icon="settings" onClick={handleSettingsClick} />

          {showSettingsMenu && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                borderRadius: "4px",
                zIndex: 1000,
                minWidth: "160px",
              }}
            >
              <div
                style={{ padding: "10px", cursor: "pointer", color: "black"}}
                onClick={() => handleSettingsOption("change-name")}
              >
                Change Name
              </div>
              <div
                style={{ padding: "10px", cursor: "pointer", color: "black "}}
                onClick={() => handleSettingsOption("change-password")}
              >
                Change Password
              </div>
              <div
                style={{ padding: "10px", cursor: "pointer", color: "red" }}
                onClick={() => handleSettingsOption("delete-account")}
              >
                Delete Account
              </div>
            </div>
          )}
        </div>
      </Bar>

      {/* Main Layout: Sidebar + Content */}
      <div style={{ display: "flex", flex: 1 }}>
        <SideNavigation style={{ width: "250px" }}>
          <SideNavigationItem text="Dashboard" icon="home" onClick={() => handleNavigation("/home")} />
          <SideNavigationItem text="Contacto" icon="contacts" onClick={() => handleNavigation("/contacto")} />
          <SideNavigationItem text="Usuarios" onClick={() => handleNavigation("/usuarios")} />
          <SideNavigationItem text="Logout" onClick={handleLogout} />
        </SideNavigation>

        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
