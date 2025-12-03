"use client";

import React, { useState, useEffect } from "react";

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
    <>
      <span className="title">Light/Dark Mode</span>

      <button
        className={`switch-btn light-dark-btn bg-transparent border-none ${
          isDarkMode ? "active" : ""
        }`} // Add active class when dark mode is enabled
        onClick={handleToggle}
      >
        <div className="first">
          <div className="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="sub-title">
            <div className="dot-checkbox"></div>
            <span style={{ display: "block", fontWeight: "600" }}>Light</span>
          </div>
        </div>

        <div className="second">
          <div className="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="sub-title">
            <div className="dot-checkbox"></div>
            <span style={{ display: "block", fontWeight: "600" }}>Dark</span>
          </div>
        </div>
      </button>
    </>
  );
};

export default DarkMode;
