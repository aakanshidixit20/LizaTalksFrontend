import React from "react";
import AnalyticsNavigation from "./AnalyticsNavigation";
import { Box } from "@mui/material";

const AnalyticsLayout = ({ children }) => {
  return (
    <Box sx={{ p: 3 }}>
      <AnalyticsNavigation />
      {children}
    </Box>
  );
};

export default AnalyticsLayout;
