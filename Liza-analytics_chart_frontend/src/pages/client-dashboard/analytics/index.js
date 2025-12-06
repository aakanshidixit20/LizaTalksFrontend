// import { Tabs, Tab, Box, useTheme } from "@mui/material";
// import { NavLink, Outlet, useLocation } from "react-router-dom";

// export default function Analytics() {
//   const theme = useTheme();

//   const tabs = [
//     { label: "Product Performance", path: "product-performance" },
//     { label: "Mood and Effect Trend", path: "mood-trend" },
//     { label: "Conversation Analytics", path: "conversation-analytics" },
//     { label: "Sales and Conversion Insight", path: "sales-insight" },
//     { label: "Engagement Timing", path: "engagement-timing" },
//   ];

//   const location = useLocation();
//   const activeTab = tabs.findIndex(tab =>
//     location.pathname.includes(tab.path)
//   );

//   return (
//     <Box sx={{ width: "100%" }}>

//       {/* Tabs Navbar */}
//       <Box
//         sx={{
//           borderBottom: `1px solid ${theme.palette.divider}`,
//           position: "sticky",
//           top: 0,
//           backgroundColor: theme.palette.background.paper,
//           zIndex: 10,
//         }}
//       >
//         <Tabs
//           value={activeTab === -1 ? 0 : activeTab}
//           variant="scrollable"
//           scrollButtons={false} // 👈 correct fix to hide arrows
//           aria-label="Analytics Tabs"
//           sx={{
//             minHeight: "44px",

//             "& .MuiTabs-indicator": {
//               height: "3px",
//               borderRadius: "2px",
//               backgroundColor: theme.palette.primary.main,
//               transition: "all 0.25s ease",
//             },

//             "& .MuiTab-root": {
//               textTransform: "none",
//               fontSize: "13px", // 👈 smaller font to fit on screen
//               fontWeight: 500,
//               padding: "6px 10px", // 👈 tightened padding
//               minHeight: "44px",
//               color: theme.palette.text.secondary,

//               "&:hover": {
//                 color: theme.palette.primary.main,
//                 opacity: 0.8,
//               }
//             },

//             "& .Mui-selected": {
//               color: theme.palette.primary.main + " !important",
//               fontWeight: 600,
//               fontSize: "14px", // 👈 slight highlight when active
//             },
//           }}
//         >
//           {tabs.map(tab => (
//             <Tab
//               key={tab.path}
//               label={tab.label}
//               component={NavLink}
//               to={tab.path}
//               sx={{
//                 transition: "0.25s ease",
//                 minWidth: "auto" // 👈 allows tabs to shrink more
//               }}
//             />
//           ))}
//         </Tabs>
//       </Box>

//       {/* Nested Page Content */}
//       <Box sx={{ padding: "24px" }}>
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }
// import { Tabs, Tab, Box, useTheme } from "@mui/material";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import DateFilter from "../../../components/ClientDashboard/analytics-components/DateFilter";


// export default function Analytics() {
//   const theme = useTheme();

//   const tabs = [
//     { label: "Product Performance", path: "product-performance" },
//     { label: "Mood and Effect Trend", path: "mood-trend" },
//     { label: "Conversation Analytics", path: "conversation-analytics" },
//     { label: "Sales and Conversion Insight", path: "sales-insight" },
//     { label: "Engagement Timing", path: "engagement-timing" },
//   ];

//   const location = useLocation();
//   const activeTab = tabs.findIndex(tab => location.pathname.includes(tab.path));

//   return (
//     <Box sx={{ width: "100%" }}>

//       {/* Tab Bar */}
//       <Box
//         sx={{
//           borderBottom: `1px solid ${theme.palette.divider}`,
//           position: "sticky",
//           top: 0,
//           backgroundColor: theme.palette.background.paper,
//           zIndex: 50,
//         }}
//       >
//         <Tabs
//           value={activeTab === -1 ? 0 : activeTab}
//           variant="scrollable"
//           scrollButtons={false}
//           aria-label="Analytics Tabs"
//           sx={{
//             minHeight: "40px",

//             "& .MuiTabs-indicator": {
//               height: "3px",
//               borderRadius: "2px",
//               backgroundColor: theme.palette.primary.main,
//             },

//             "& .MuiTab-root": {
//               textTransform: "none",
//               fontSize: "13px",
//               padding: "4px 8px",
//               minHeight: "40px",
//               minWidth: "auto",
//               color: theme.palette.text.secondary,

//               "&:hover": {
//                 color: theme.palette.primary.main,
//               },
//             },

//             "& .Mui-selected": {
//               color: theme.palette.primary.main,
//               fontWeight: 600,
//               fontSize: "14px",
//             },
//           }}
//         >
//           {tabs.map(tab => (
//             <Tab
//               key={tab.path}
//               label={tab.label}
//               component={NavLink}
//               to={tab.path}
//             />
//           ))}
//         </Tabs>
//       </Box>

//       {/* Page Content */}
//       <Box sx={{ padding: "20px", mt: 1 }}>
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }


// import { Tabs, Tab, Box, useTheme } from "@mui/material";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { useState } from "react";
// import DateFilter from "../../../components/ClientDashboard/analytics-components/DateFilter";

// export default function Analytics() {
//   const theme = useTheme();
//   const location = useLocation();
//   const [dateFilterValue, setDateFilterValue] = useState("This month");

//   const tabs = [
//     { label: "Product Performance", path: "product-performance" },
//     { label: "Mood and Effect Trend", path: "mood-trend" },
//     { label: "Conversation Analytics", path: "conversation-analytics" },
//     { label: "Sales and Conversion Insight", path: "sales-insight" },
//     { label: "Engagement Timing", path: "engagement-timing" },
//   ];

//   const activeTab = tabs.findIndex(tab => location.pathname.includes(tab.path));

//   return (
//     <Box sx={{ width: "100%" }}>
      
//       {/* ---- TOP TAB BAR ---- */}
//       <Box
//         sx={{
//           borderBottom: `1px solid ${theme.palette.divider}`,
//           position: "sticky",
//           top: 0,
//           backgroundColor: theme.palette.background.paper,
//           zIndex: 50,
//           padding: "6px 10px",
//         }}
//       >
//         <Tabs
//           value={activeTab === -1 ? 0 : activeTab}
//           variant="scrollable"
//           scrollButtons={false}
//           aria-label="Analytics Tabs"
          
//           sx={{
//             minHeight: "40px",

//             "& .MuiTabs-indicator": {
//               height: "3px",
//               borderRadius: "2px",
//               backgroundColor: theme.palette.primary.main,
//             },

//             "& .MuiTab-root": {
//               textTransform: "none",
//               fontSize: "13px",
//               padding: "4px 8px",
//               minHeight: "40px",
//               minWidth: "auto",
//               color: theme.palette.text.secondary,

//               "&:hover": {
//                 color: theme.palette.primary.main,
//               },
//             },

//             "& .Mui-selected": {
//               color: theme.palette.primary.main,
//               fontWeight: 600,
//               fontSize: "14px",
//             },
//           }}
//         >
//           {tabs.map(tab => (
//             <Tab key={tab.path} label={tab.label} component={NavLink} to={tab.path} />
//           ))}
//         </Tabs>
//       </Box>

//       {/* ---- DATE FILTER (below tabs) ---- */}
//       <Box sx={{ px: 2, pt: 2 }}>
//         <DateFilter onChange={(value) => setDateFilterValue(value)} />
//       </Box>

//       {/* ---- PAGE CONTENT ---- */}
//       <Box sx={{ padding: "20px", pt: 1 }}>
//         <Outlet context={{ dateFilterValue }} />
//       </Box>
//     </Box>
//   );
// }


import { Tabs, Tab, Box, useTheme } from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import DateFilter from "../../../components/ClientDashboard/analytics-components/DateFilter";

export default function Analytics() {
  const theme = useTheme();
  const location = useLocation();
  const [dateFilterValue, setDateFilterValue] = useState("This month");

  const tabs = [
    { label: "Product Performance", path: "product-performance"},
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
          padding: "6px 10px",
        }}
      >
        <Tabs
          value={activeTab === -1 ? 0 : activeTab}
          variant="scrollable"
          scrollButtons={false}
          aria-label="Analytics Tabs"
          
          sx={{
            minHeight: "40px",

            "& .MuiTabs-indicator": {
              height: "3px",
              borderRadius: "2px",
              backgroundColor: theme.palette.primary.main,
            },

            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "13px",
              padding: "4px 8px",
              minHeight: "40px",
              minWidth: "auto",
              color: theme.palette.text.secondary,

              "&:hover": {
                color: theme.palette.primary.main,
              },
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

      {/* ---- DATE FILTER (below tabs) ---- */}
      <Box sx={{ px: 2, pt: 2 }}>
        <DateFilter onChange={(value) => setDateFilterValue(value)} />
      </Box>

      {/* ---- PAGE CONTENT ---- */}
      <Box sx={{ padding: "20px", pt: 1 }}>
        <Outlet context={{ dateFilterValue }} />
      </Box>
    </Box>
  );
}
