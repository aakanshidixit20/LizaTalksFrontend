// import React from "react";
// import AnalyticsNavigation from "../Analytics/AnalyticsNavigation";

// const TrainingAndPerformance = () => {
//   return (
//     <>
//       <AnalyticsNavigation />
//       <h3>Training Performance Charts Coming...</h3>
//     </>
//   );
// };

// export default TrainingAndPerformance;


import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import BarChart from "./Charts/BarChart";
import LineChart from "./Charts/LineChart";
import DonutChart from "./Charts/DonutChart";

import {
  latencyLabels,
  latencyValues,
  featureDonutLabels,
  featureDonutValues,
  dropOffLabels,
  dropOffClient1,
  dropOffClient2
} from "../data/analyticsData";

export default function TrainingAndPerformance() {
  return (
    <Box sx={{ p: 3 }}>
      
      {/* ----- API Latency Chart ----- */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography fontWeight={600}>API Response Latency</Typography>
        <Typography sx={{ mb: 2, fontSize: 14, color: "gray" }}>
          Average latency per client store endpoint (ms)
        </Typography>

        <BarChart labels={latencyLabels} data={latencyValues} title="Latency (ms)" />
      </Paper>

      {/* ----- Feature Donut + Drop-off Chart Side by Side ----- */}
      <Grid container spacing={3}>
        
        {/* Donut Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={600}>Feature Performance</Typography>
            <Typography sx={{ fontSize: 14, color: "gray", mb: 3 }}>
              Distribution of user intents
            </Typography>
            <DonutChart labels={featureDonutLabels} data={featureDonutValues} />
          </Paper>
        </Grid>

        {/* Drop Off Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={600}>Drop-Off per Feature</Typography>
            <Typography sx={{ fontSize: 14, color: "gray", mb: 3 }}>
              Avg. duration between sessions over time
            </Typography>

            <LineChart
              labels={dropOffLabels}
              data={dropOffClient1}
              title="Alpha Retail - Flagship"
            />

            <LineChart
              labels={dropOffLabels}
              data={dropOffClient2}
              title="Beta Corp - Online"
            />

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
