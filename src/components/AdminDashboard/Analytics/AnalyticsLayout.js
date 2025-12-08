import React from "react";
import { Outlet } from "react-router-dom";
import AnalyticsNavigation from "./AnalyticsNavigation";
import { Box } from "@mui/material";

const AnalyticsLayout = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Tabs */}
      <AnalyticsNavigation />

      {/* This will render nested pages like BotEffectiveness, ViewDetails, etc */}
      <Outlet />
    </Box>
  );
};

export default AnalyticsLayout;
