//import React from "react";
import { useNavigate } from "react-router-dom";
import { Bar, SideNavigation, SideNavigationItem, Title } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/contacts.js";

const Layout = ({ pageTitle, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Top Navbar (Full Width) */}
      <Bar design="Header" style={{ width: "100%", flexShrink: 0 }}>
        <Title>{pageTitle}</Title>
      </Bar>

      {/* Main Layout: Sidebar + Content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar (Fixed Width) */}
        <SideNavigation style={{ width: "250px" }}>
          <SideNavigationItem text="Dashboard" icon="home" onClick={() => handleNavigation("/home", "Home")} />
          <SideNavigationItem text="Contacto" icon="contacts" onClick={() => handleNavigation("/contacto", "Contacto")} />
          <SideNavigationItem text="Usuarios" onClick={() => handleNavigation("/usuarios", "Usuarios")} />
          <SideNavigationItem text="Logout" onClick={handleLogout} />
        </SideNavigation>

        {/* Main Content (Takes Remaining Space) */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
