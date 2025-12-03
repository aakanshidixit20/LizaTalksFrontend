import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { label: "Bot Effectiveness", path: "/analytics/bot-effectiveness" },
  { label: "Training & Performance", path: "/analytics/training-performance" },
  { label: "Data Health & Reliability", path: "/analytics/data-health-reliability" },
  { label: "Feature Performance", path: "/analytics/feature-performance" },
];

const AnalyticsNavigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeTab = tabs.findIndex((t) => pathname.startsWith(t.path));

  return (
    <Box sx={{ borderBottom: "1px solid #E5E7EB", mb: 3 }}>
      <Tabs
        value={activeTab !== -1 ? activeTab : 0}
        onChange={(e, index) => navigate(tabs[index].path)}
        indicatorColor="primary"
        textColor="primary"
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "15px",
            color: "#6B7280",
          },
          "& .Mui-selected": {
            fontWeight: "bold",
            color: "#6366F1 !important",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default AnalyticsNavigation;
