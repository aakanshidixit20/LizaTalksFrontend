"use client";

import React, { useState, useEffect } from "react";

const HorizontalLayout = () => {
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
        htmlElement.classList.add("with-horizontal-navbar");
      } else {
        htmlElement.classList.remove("with-horizontal-navbar");
      }
    }
  }, [isCompactSidebar]);

  return (
    <>
      <span className="title">Horizontal Layout</span>
      <button
        className={`switch-btn horizontal-layout-btn bg-transparent border-none p-0 ${
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
            <span style={{ display: "block", fontWeight: "600" }}>Sidebar</span>
          </div>
        </div>

        <div className="second">
          <div className="box">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="sub-title">
            <div className="dot-checkbox"></div>
            <span style={{ display: "block", fontWeight: "600" }}>Navbar</span>
          </div>
        </div>
      </button>
    </>
  );
};

export default HorizontalLayout;
