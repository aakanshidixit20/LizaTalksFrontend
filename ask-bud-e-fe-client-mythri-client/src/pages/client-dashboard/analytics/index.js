import { Tabs, Tab, Box } from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function Analytics() {
  const tabs = [
    { label: "Product Performance", path: "product-performance" },
    { label: "Mood and Effect Trend", path: "mood-trend" },
    { label: "Conversation Analytics", path: "conversation-analytics" },
    { label: "Sales and Conversion Insight", path: "sales-insight" },
    { label: "Engagement Timing", path: "engagement-timing" },
  ];

  const location = useLocation();

  // Determine active tab by matching current path
  const activeTab = tabs.findIndex(tab =>
    location.pathname.includes(tab.path)
  );

  return (
    <Box sx={{ width: "100%", bgcolor: "#fff" }}>
      {/* Tabs Navbar */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 10,
        }}
      >
        <Tabs
          value={activeTab === -1 ? 0 : activeTab}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Analytics Tabs"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
            },
            "& .Mui-selected": {
              color: "#1976d2 !important",
              fontWeight: "600",
            },
          }}
        >
          {tabs.map(tab => (
            <Tab
              key={tab.path}
              label={tab.label}
              component={NavLink}
              to={tab.path}
              sx={{
                "&.Mui-selected": {
                  borderBottom: "2px solid #1976d2",
                },
                "&:hover": {
                  color: "#1565c0",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Nested Pages Render Area */}
      <Box sx={{ padding: "24px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
