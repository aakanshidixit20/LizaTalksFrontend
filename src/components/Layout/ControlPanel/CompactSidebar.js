"use client";

import React, { useState, useEffect } from "react";

const CompactSidebar = () => {
  const [isCompactSidebar, setIsCompactSidebar] = useState(false);

  useEffect(() => {
    // Retrieve the user's preference from local storage
    const storedPreference = localStorage.getItem("main-wrapper-content");
    if (storedPreference === "main-wrapper-content") {
      setIsCompactSidebar(true);
    }
  }, []);

  const handleToggle = () => {
    setIsCompactSidebar((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem(
      "main-wrapper-content",
      isCompactSidebar ? "main-wrapper-content" : "default"
    );

    // Update the class on the .main-wrapper-content element to apply the selected mode
    const htmlElement = document.querySelector(".main-wrapper-content");
    if (htmlElement) {
      if (isCompactSidebar) {
        htmlElement.classList.add("compact-sidebar");
      } else {
        htmlElement.classList.remove("compact-sidebar");
      }
    }
  }, [isCompactSidebar]);

  return (
    <>
      <span className="title">Compact Sidebar</span>
      <button
        className={`switch-btn compact-sidebar-btn bg-transparent border-none p-0 ${
          isCompactSidebar ? "active" : ""
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
            <span style={{ display: "block", fontWeight: "600" }}>Show</span>
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
            <span style={{ display: "block", fontWeight: "600" }}>Hide</span>
          </div>
        </div>
      </button>
    </>
  );
};

export default CompactSidebar;
