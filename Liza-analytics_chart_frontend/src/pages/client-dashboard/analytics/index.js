import { Tabs, Tab, Box, useTheme } from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import DateFilter from "../../../components/ClientDashboard/analytics-components/DateFilter";

export default function Analytics() {
  const theme = useTheme();
  const location = useLocation();
  const [dateFilterValue, setDateFilterValue] = useState("This month");

  const tabs = [
    { label: "Product Performance", path: "product-performance" },
    { label: "Mood and Effect Trend", path: "mood-trend" },
    { label: "Conversation Analytics", path: "conversation-analytics" },
    { label: "Sales and Conversion Insight", path: "sales-insight" },
    { label: "Engagement Timing", path: "engagement-timing" },
  ];

  const activeTab = tabs.findIndex(tab => location.pathname.includes(tab.path));

  return (
    <Box sx={{ width: "100%" }}>

      {/* ---- TOP TAB BAR ---- */}
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.paper,
          zIndex: 50,
          padding: "4px 10px", // reduced padding
        }}
      >
        <Tabs
          value={activeTab === -1 ? 0 : activeTab}
          variant="scrollable"
          scrollButtons={false}
          aria-label="Analytics Tabs"
          sx={{
            minHeight: "38px",
            "& .MuiTabs-indicator": {
              height: "3px",
              borderRadius: "2px",
              backgroundColor: theme.palette.primary.main,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "13px",
              padding: "4px 8px",
              minHeight: "38px",
              minWidth: "auto",
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.primary.main },
            },
            "& .Mui-selected": {
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: "14px",
            },
          }}
        >
          {tabs.map(tab => (
            <Tab key={tab.path} label={tab.label} component={NavLink} to={tab.path} />
          ))}
        </Tabs>
      </Box>

      {/* ---- DATE FILTER ---- */}
      <Box sx={{ px: 2, pt: 0.5, mb: 0 }}>
        <DateFilter onChange={(value) => setDateFilterValue(value)} />
      </Box>

      {/* ---- PAGE CONTENT (Reduced gap) ---- */}
      <Box sx={{ px: 2, pt: 0.5, pb: 3 }}>
        <Outlet context={{ dateFilterValue }} />
      </Box>
    </Box>
  );
}


