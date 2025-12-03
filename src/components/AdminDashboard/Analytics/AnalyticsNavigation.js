import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const tabConfig = [
  { label: "Bot Effectiveness", path: "../Analytics/BotEffectiveness.js" },
  { label: "Training & Performance", path: "../Analytics/Training&Performance.js" },
  { label: "Data Health & Reliability", path: "../Analytics/Data Health&Reliability.js" },
  { label: "Feature Performance", path: "../Analytics/FeaturePerformance.js" },
];

const AnalyticsNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeTab = tabConfig.findIndex((tab) =>
    pathname.startsWith(tab.path)
  );

  return (
    <Box sx={{ borderBottom: "1px solid #E5E7EB", mb: 2 }}>
      <Tabs
        value={activeTab !== -1 ? activeTab : 0}
        onChange={(e, newValue) => navigate(tabConfig[newValue].path)}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "15px",
            color: "#6B7280",
            paddingBottom: "14px",
          },
          "& .Mui-selected": {
            color: "#6366F1 !important", // Purple color as in screenshot
            fontWeight: 600,
          },
          "& .MuiTabs-indicator": {
            height: "3px",
            borderRadius: "3px",
          },
        }}
      >
        {tabConfig.map((tab) => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default AnalyticsNavigation;
