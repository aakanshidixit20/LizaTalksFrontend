// import React from "react";
// import AnalyticsNavigation from "../Analytics/AnalyticsNavigation";

// const FeaturePerformance = () => {
//   return (
//     <>
//       <AnalyticsNavigation />
//       <h3>Feature Performance Charts Here</h3>
//     </>
//   );
// };

// export default FeaturePerformance;


import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import HorizontalBar from "./Charts/HorizontalBar";
import LineChart from "./Charts/LineChart";
import DonutChart from "./Charts/DonutChart";
import BarChart from "./Charts/BarChart";

import {
  syncLabels,
  syncData,
  featureDonutLabels,
  featureDonutValues
} from "../data/analyticsData";

export default function FeaturePerformance() {
  return (
    <Box sx={{ p: 3 }}>
      
      {/* Stacked Bar Chart */}
      <Paper sx={{ p: 3 }}>
        <Typography fontWeight={600}>Product Sync Frequency</Typography>
        <Typography sx={{ mb: 2, color: "gray", fontSize: 14 }}>
          Sync count per month per client & store (stacked)
        </Typography>

        <BarChart labels={syncLabels} data={syncData} title="Sync Count" />
      </Paper>
    </Box>
  );
}
