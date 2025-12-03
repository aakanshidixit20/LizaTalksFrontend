"use client";

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const DarkMode = () => {
   // Initialize state based on localStorage
   const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem("theme");
    return storedPreference === "dark";
  });

  const applyTheme = (darkMode) => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (darkMode) {
        htmlElement.classList.add("dark-theme");
      } else {
        htmlElement.classList.remove("dark-theme");
      }
    }
  };

  useEffect(() => {
    // Apply theme based on isDarkMode state
    applyTheme(isDarkMode);
    // Save user preference in localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]); // Dependency array includes isDarkMode

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Box>
      <div
        className={`th-toggle-mode ${isDarkMode ? "active" : ""}`}
        onClick={handleToggle}
      >
        <i className="ri-sun-line"></i>
        <i className="ri-moon-line"></i>
      </div>
    </Box>
  );
};

export default DarkMode;
