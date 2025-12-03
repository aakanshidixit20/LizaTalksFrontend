// import React from "react";
// import AnalyticsNavigation from "../components/AnalyticsNavigation";
// import ProductSyncChart from "../charts/ProductSyncChart";
// import { Typography, Box } from "@mui/material";

// const DataHealthAndReliability = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       {/* 🔹 Add Navigation */}
//       <AnalyticsNavigation />

//       {/* 🔹 Page Title */}
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Product Sync Frequency
//       </Typography>

//       {/* 🔹 Chart */}
//       <ProductSyncChart />
//     </Box>
//   );
// };

// export default DataHealthAndReliability;


import React from "react";
import AnalyticsLayout from "./AnalyticsLayout";
import HorizontalBarOne from "./Charts/HorizontalBarOne";
import { Typography, Box } from "@mui/material";

import { analyticsData } from "./Data/AnalyticsData";

export default function DataHealthAndReliability() {
  const labels = analyticsData.clients;
  const latency = analyticsData.trainingPerformanceInsights.apiResponseLatency.map(i => i.avgLatencyMs);
  console.log("latency",latency);
  return (

   <>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Product Sync Frequency
      </Typography>

      <Box sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: "10px", background: "#fff" }}>
        <Typography sx={{ fontWeight: 500, mb: 2 }}>Monthly Sync Volume</Typography>
        <HorizontalBarOne  labels={labels} latency={latency} title="Avg Latency (ms)" />
      </Box>
    </>
  );
}
