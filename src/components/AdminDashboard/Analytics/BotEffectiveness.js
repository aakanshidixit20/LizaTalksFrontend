import React from "react";
import { Paper, Typography, Box, Grid } from "@mui/material";

import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";
import HorizontalBar from "./Charts/HorizontalBar";

import { analyticsData } from "./Data/AnalyticsData";

// Dummy Data
// const labels = ["Alpha Retail", "Beta Corp", "Gamma Styles", "Delta Home", "Epsilon Tech"];

// const engagementRate = [75, 68, 82, 55, 72];
// const creditsSpent = [4500, 3200, 4800, 2900, 3800];
// const conversionRate = [12, 8, 15, 5, 9];
// const fallbackRate = [30, 55, 20, 90, 45];

export default function BotEffectiveness() {
  const labels = analyticsData.clients;

  const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(i => i.engagementRate);
  const creditsSpent = analyticsData.botEffectiveness.engagementRatePerClient.map(i => i.creditsSpent);
  const conversionRate = analyticsData.botEffectiveness.conversionRatePerClient.map(i => i.conversionRate);
  const fallbackRate = analyticsData.botEffectiveness.fallbackErrorRatePerClient.map(i => i.errorCount);

  return (
    <Box sx={{ mt: 3 }}>
      
      {/* ------- Engagement Rate Mixed Chart (Line + Bar) ------- */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>Engagement Rate per Client</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Credits spent vs engagement rate per client.
        </Typography>

        {/* We manually combine two charts here */}
        <Box sx={{ position: "relative", height: 350 }}>
          <LineChart labels={labels} data={engagementRate} title="Engagement Rate (%)" />
          <Box sx={{ position: "absolute", top: 0, width: "100%", opacity: 0.3 }}>
            <BarChart labels={labels} data={creditsSpent} title="Credits Spent" />
          </Box>
        </Box>
      </Paper>

      {/* ------- Conversion Rate ------- */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>Conversion Rate per Client</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Percentage of successful conversions per client.
        </Typography>

        <LineChart labels={labels} data={conversionRate} title="Conversion Rate (%)" />
      </Paper>

      {/* ------- Fallback / Error Rate ------- */}
      <Paper sx={{ p: 3 }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>Fallback/Error Rate per Client</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Errors and fallback triggers observed for each client.
        </Typography>

        <HorizontalBar labels={labels} data={fallbackRate} title="Fallback/Error Rate" />
      </Paper>

    </Box>
  );
}


// import React from "react";
// import AnalyticsLayout from "./AnalyticsLayout";
// import DonutChart from "./Charts/DonutChart";
// import { Typography, Box } from "@mui/material";

// export default function BotEffectiveness() {
//   return (
//     <>
//       <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
//         Bot Effectiveness Overview
//       </Typography>

//       <Box
//         sx={{
//           p: 3,
//           border: "1px solid #E5E7EB",
//           borderRadius: "10px",
//           background: "#fff",
//         }}
//       >
//         <Typography sx={{ fontWeight: 500, mb: 2 }}>
//           User Intent Breakdown
//         </Typography>

//         <DonutChart />
//       </Box>
//     </>
//   );
// }
