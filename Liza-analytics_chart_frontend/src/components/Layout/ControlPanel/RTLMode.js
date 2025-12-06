"use client";

import React, { useState, useEffect } from "react";

const RTLMode = () => {
  const [dirAttribute, setDirAttribute] = useState("ltr");

  useEffect(() => {
    // Check localStorage for saved direction
    const storedDirAttribute = localStorage.getItem("dirAttribute");
    if (storedDirAttribute) {
      setDirAttribute(storedDirAttribute);
      document.documentElement.setAttribute("dir", storedDirAttribute);
    }
  }, []);

  const handleButtonClick = () => {
    const newDirAttribute = dirAttribute === "ltr" ? "rtl" : "ltr";
    setDirAttribute(newDirAttribute);
    localStorage.setItem("dirAttribute", newDirAttribute);
    document.documentElement.setAttribute("dir", newDirAttribute);
  };

  return (
    <>
      <span className="title">LTR/RTL Mode</span>

      <button
        className={`switch-btn ltr-rtl-btn bg-transparent border-none ${
          dirAttribute === "rtl" ? "active" : ""
        }`}
        onClick={handleButtonClick}
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
            <span style={{ display: "block", fontWeight: "600" }}>LTR</span>
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
            <span style={{ display: "block", fontWeight: "600" }}>RTL</span>
          </div>
        </div>
      </button>
    </>
  );
};

export default RTLMode;
