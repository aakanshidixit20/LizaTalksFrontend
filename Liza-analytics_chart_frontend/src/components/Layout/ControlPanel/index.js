"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import RTLMode from "./RTLMode";
import DarkMode from "./DarkMode";
import OnlySidebarDarkMode from "./OnlySidebarDarkMode";
import OnlyHeaderDarkMode from "./OnlyHeaderDarkMode";
import CompactSidebar from "./CompactSidebar";
import HorizontalLayout from "./HorizontalLayout";

const ControlPanel = () => {
  const [isControlPanel, setControlPanel] = useState(false);

  const handleToggleControlPanel = () => {
    setControlPanel(!isControlPanel);
  };

  return (
    <>
      <Button
        onClick={handleToggleControlPanel}
        className="t-settings-btn text-body"
        sx={{ minWidth: "auto", padding: 0 }}
      >
        <i className="material-symbols-outlined">settings</i>
      </Button>

      <div
        className={`settings-sidebar bg-white transition ${
          isControlPanel ? "active" : ""
        }`}
      >
        <div className="settings-header bg-primary">
          <h4 className="text-white">Theme Settings</h4>
          <button
            className="close-btn text-white"
            type="button"
            onClick={handleToggleControlPanel}
          >
            <i className="material-symbols-outlined">close</i>
          </button>
        </div>

        <div className="settings-body">
          <RTLMode />

          <div className="border-bottom" style={{ margin: "15px 0" }}></div>

          <DarkMode />

          <div className="border-bottom" style={{ margin: "15px 0" }}></div>

          <HorizontalLayout />

          <div className="border-bottom" style={{ margin: "15px 0" }}></div>

          <CompactSidebar />

          <div className="border-bottom" style={{ margin: "15px 0" }}></div>

          <OnlySidebarDarkMode />

          <div className="border-bottom" style={{ margin: "15px 0" }}></div>

          <OnlyHeaderDarkMode />

          <div className="border-bottom" style={{ margin: "15px 0" }}></div>

          <a href="https://1.envato.market/QyqV6P" target="_blank" rel="noreferrer">
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "capitalize",
                color: "#fff !important",
              }}
            >
              Buy Trezo
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
