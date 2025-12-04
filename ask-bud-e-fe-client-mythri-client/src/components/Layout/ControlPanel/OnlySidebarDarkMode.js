"use client";

import React, { useState, useEffect } from "react";

const OnlySidebarDarkMode = () => {
   // Light/Dark Mode
   const [isDarkMode, setIsDarkMode] = useState(false);

   useEffect(() => {
     // Retrieve the user's preference from local storage
     const storedPreference = localStorage.getItem("left-sidebar-theme");
     if (storedPreference === "left-sidebar-dark") {
       setIsDarkMode(true);
     }
   }, []);
 
   const handleToggle = () => {
     setIsDarkMode((prevMode) => !prevMode);
   };
 
   useEffect(() => {
     // Update the user's preference in local storage
     localStorage.setItem(
       "left-sidebar-theme",
       isDarkMode ? "left-sidebar-dark" : "light"
     );
 
     // Update the class on the <left-sidebar-dark> element to apply the selected mode
     const sidebarElement = document.querySelector(".leftSidebarDark");
     if (sidebarElement) {
       if (isDarkMode) {
         sidebarElement.classList.add("dark-theme");
       } else {
         sidebarElement.classList.remove("dark-theme");
       }
     }
   }, [isDarkMode]);

  return (
    <>
      <span className="title">Sidebar</span>

      <button
        className={`switch-btn sidebar-btn bg-transparent border-none p-0 ${
          isDarkMode ? "active" : ""
        }`} 
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

export default OnlySidebarDarkMode;
