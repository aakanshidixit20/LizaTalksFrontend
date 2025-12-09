import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AnalyticsNavigation from "./AnalyticsNavigation";
import { Box } from "@mui/material";

const AnalyticsLayout = () => {

  // ---- Global Filter State (shared across all analytics pages) ----
  const [selectedDateRange, setSelectedDateRange] = useState("This month");

  return (
    <Box sx={{ p: 3 }}>
      
      {/* Tabs */}
      <AnalyticsNavigation />

      {/* 🔥 Global Section Header: Left = Page title, Right = Filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        {/* ⚠ IMPORTANT: Page headings will appear here dynamically */}
        <Box sx={{ width: "fit-content", display: "inline-block" }} id="page-title-container"></Box>

        {/* Global Date Filter */}
     
      </Box>

      {/* Nested Page Content */}
      <Outlet context={{ selectedDateRange }} />
    </Box>
  );
};

export default AnalyticsLayout;
