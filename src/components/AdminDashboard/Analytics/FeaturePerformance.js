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


// import React from "react";
// import { Grid, Typography, Box } from "@mui/material";

// import AnalyticsNavigation from "../components/AnalyticsNavigation";
// import FeaturePieChart from "../charts/FeaturePieChart";
// import DropOffLineChart from "../charts/DropOffLineChart";

// const FeaturePerformance = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       {/* 🔹 Navigation Bar */}
//       <AnalyticsNavigation />

//       {/* 🔹 Page Heading */}
//       <Typography variant="h6" sx={{ mb: 3 }}>
//         Feature Performance & Drop-off Trends
//       </Typography>

//       {/* 🔹 Chart Layout */}
//       <Grid container spacing={3}>
//         {/* Pie Chart */}
//         <Grid item xs={12} md={5}>
//           <Box
//             sx={{
//               p: 2,
//               borderRadius: "10px",
//               border: "1px solid #E5E7EB",
//               background: "#fff",
//             }}
//           >
//             <Typography sx={{ mb: 2, fontWeight: 600 }}>
//               Feature Usage Distribution
//             </Typography>
//             <FeaturePieChart />
//           </Box>
//         </Grid>

//         {/* Line Chart */}
//         <Grid item xs={12} md={7}>
//           <Box
//             sx={{
//               p: 2,
//               borderRadius: "10px",
//               border: "1px solid #E5E7EB",
//               background: "#fff",
//             }}
//           >
//             <Typography sx={{ mb: 2, fontWeight: 600 }}>
//               Drop-Off Trend Across Features
//             </Typography>
//             <DropOffLineChart />
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default FeaturePerformance;

import React from "react";
import AnalyticsLayout from "./AnalyticsLayout";
import LineChart from "./Charts/LineChartOne";
import DonutChart from "./Charts/DonutChart";
import { Typography, Box } from "@mui/material";
import { analyticsData } from "./Data/AnalyticsData";

export default function FeaturePerformance() {
  const labels = analyticsData.clients;
  const dropOff = analyticsData.featurePerformance.dropOffPerFeature.map(i => i.avgSessionDurationSec);

  // for donut → total usage count per client
  const donutData = analyticsData.featurePerformance.featureUsageBreakdown.map(
    i => i.usage.generalChat + i.usage.storeInquiry + i.usage.productSuggestion
  );

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Feature Drop-Off Trends
      </Typography>

      <Box sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: "10px", background: "#fff" }}>
        <Typography sx={{ fontWeight: 500, mb: 2 }}>Engagement Over Time</Typography>
        <LineChart labels={labels} data={dropOff} title="Avg Session Duration (sec)"  />
      </Box>
        <Box sx={{ mt: 5 }}>
      <Box sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: "10px", background: "#fff" }}>
        <Typography sx={{ fontWeight: 500, mb: 2 }}>Engagement Over Time</Typography>
        <DonutChart labels={labels} data={donutData} title="Feature Usage Breakdown"/>
      </Box>
      </Box>
    </Box>
  );
}
