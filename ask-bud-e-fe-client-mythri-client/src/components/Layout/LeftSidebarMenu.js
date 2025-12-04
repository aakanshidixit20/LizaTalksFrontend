import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../authentication/AuthContext";
import themeTitleConfig from "../../themeTitle";

const menuItems = [
  { path: "/", icon: "home", label: "Dashboard" },
  { path: "/store-management", icon: "shopping_cart", label: "Store Management" },
  { path: "/pos-sync", icon: "cloud_sync", label: "POS Management" },
  { path: "/orders", icon: "attach_money", label: "Orders" },
  { path: "/products", icon: "package_2", label: "Products" },
  { path: "/chat-transcripts", icon: "article", label: "Chat Transcripts" },
  { path: "/document-management", icon: "clarify", label: "Document Management" },
  { path: "/invoices", icon: "receipt", label: "Invoices" },
  { path: "/chat-problems-report", icon: "warning", label: "Chat Problems Report" },
  { path: "/analytics", icon: "finance_mode", label: "Analytics" },
  { path: "/user-management", icon: "person", label: "User Management", roles: ["admin"] },
  { path: "/notifications", icon: "notifications", label: "Notifications" },
];

const LeftSidebarMenu = ({ toggleActive }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext); // get the logged-in user
  const [isDark, setIsDark] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActiveLink = (path) => (location.pathname === path ? "active" : "");

  useEffect(() => {
    if (location.pathname === "/dashboard/beauty-salon/") {
      const storedTheme = localStorage.getItem("beautySalonSidebarTheme");
      if (storedTheme) {
        setIsDark(storedTheme === "dark-theme");
      } else {
        setIsDark(true);
        localStorage.setItem("beautySalonSidebarTheme", "dark-theme");
      }
    } else {
      setIsDark(false);
    }
  }, [location.pathname]);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
    toggleActive();
  };

  return (
    <Box
      className={`leftSidebarDark hide-for-horizontal-nav ${
        location.pathname === "/dashboard/beauty-salon/" && isDark
          ? "dark-theme"
          : ""
      }`}
    >
      <Box className="left-sidebar-menu">
        <Box className="logo">
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <img src="/images/Bud-e-logo.png" alt="logo-icon" width={35} height={35} />
            {!isCollapsed && (
              <Typography
                component="span"
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  color: "var(--blackColor) !important",
                  ml: 1,
                }}
              >
                {themeTitleConfig.title}
              </Typography>
            )}
          </Link>
        </Box>

        <Box className="burger-menu" onClick={toggleActive}>
          <Typography component={"span"} className="top-bar"></Typography>
          <Typography component={"span"} className="middle-bar"></Typography>
          <Typography component={"span"} className="bottom-bar"></Typography>
        </Box>

        <Box className="sidebar-inner">
          <Box className="sidebar-menu">
            {menuItems
              .filter((item) => {
                // If roles are defined, only show if user.role is allowed
                if (item.roles && user) {
                  return item.roles.includes(user.role);
                }
                return true; // no roles defined → show for everyone
              })
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-menu-link ${isActiveLink(item.path)}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 16px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  <i className="material-symbols-outlined">{item.icon}</i>
                  {!isCollapsed && (
                    <Typography component="span" className="title" sx={{ ml: 2 }}>
                      {item.label}
                    </Typography>
                  )}
                </Link>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSidebarMenu;
