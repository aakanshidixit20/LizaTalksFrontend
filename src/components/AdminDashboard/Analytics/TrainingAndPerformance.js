// // // import React from "react";
// // // import AnalyticsNavigation from "../Analytics/AnalyticsNavigation";

// // // const TrainingAndPerformance = () => {
// // //   return (
// // //     <>
// // //       <AnalyticsNavigation />
// // //       <h3>Training Performance Charts Coming...</h3>
// // //     </>
// // //   );
// // // };

// // // export default TrainingAndPerformance;

// // // import React from "react";
// // // import { Box, Paper, Typography, Grid } from "@mui/material";
// // // import BarChart from "./Charts/BarChart";
// // // import LineChart from "./Charts/LineChart";
// // // import DonutChart from "./Charts/DonutChart";

// // // import {
// // //   latencyLabels,
// // //   latencyValues,
// // //   featureDonutLabels,
// // //   featureDonutValues,
// // //   dropOffLabels,
// // //   dropOffClient1,
// // //   dropOffClient2
// // // } from "../data/analyticsData";

// // // export default function TrainingAndPerformance() {
// // //   return (
// // //     <Box sx={{ p: 3 }}>

// // //       {/* ----- API Latency Chart ----- */}
// // //       <Paper sx={{ p: 3, mb: 3 }}>
// // //         <Typography fontWeight={600}>API Response Latency</Typography>
// // //         <Typography sx={{ mb: 2, fontSize: 14, color: "gray" }}>
// // //           Average latency per client store endpoint (ms)
// // //         </Typography>

// // //         <BarChart labels={latencyLabels} data={latencyValues} title="Latency (ms)" />
// // //       </Paper>

// // //       {/* ----- Feature Donut + Drop-off Chart Side by Side ----- */}
// // //       <Grid container spacing={3}>

// // //         {/* Donut Chart */}
// // //         <Grid item xs={12} md={6}>
// // //           <Paper sx={{ p: 3 }}>
// // //             <Typography fontWeight={600}>Feature Performance</Typography>
// // //             <Typography sx={{ fontSize: 14, color: "gray", mb: 3 }}>
// // //               Distribution of user intents
// // //             </Typography>
// // //             <DonutChart labels={featureDonutLabels} data={featureDonutValues} />
// // //           </Paper>
// // //         </Grid>

// // //         {/* Drop Off Line Chart */}
// // //         <Grid item xs={12} md={6}>
// // //           <Paper sx={{ p: 3 }}>
// // //             <Typography fontWeight={600}>Drop-Off per Feature</Typography>
// // //             <Typography sx={{ fontSize: 14, color: "gray", mb: 3 }}>
// // //               Avg. duration between sessions over time
// // //             </Typography>

// // //             <LineChart
// // //               labels={dropOffLabels}
// // //               data={dropOffClient1}
// // //               title="Alpha Retail - Flagship"
// // //             />

// // //             <LineChart
// // //               labels={dropOffLabels}
// // //               data={dropOffClient2}
// // //               title="Beta Corp - Online"
// // //             />

// // //           </Paper>
// // //         </Grid>
// // //       </Grid>
// // //     </Box>
// // //   );
// // // }

// // import React from "react";
// // import AnalyticsLayout from "../layout/AnalyticsLayout";
// // import ApiLatencyChart from "../charts/ApiLatencyChart";
// // import { Typography, Box } from "@mui/material";

// // export default function TrainingAndPerformance() {
// //   return (
// //     <AnalyticsLayout>
// //       {/* Page Title */}
// //       <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
// //         API Response Latency
// //       </Typography>

// //       {/* Chart Container */}
// //       <Box
// //         sx={{
// //           p: 3,
// //           borderRadius: "10px",
// //           border: "1px solid #E5E7EB",
// //           backgroundColor: "#fff",
// //           boxShadow: "0px 1px 3px rgba(0,0,0,0.06)",
// //         }}
// //       >
// //         <Typography sx={{ mb: 2, fontWeight: 500 }}>Latency by Client</Typography>
// //         <ApiLatencyChart />
// //       </Box>
// //     </AnalyticsLayout>
// //   );
// // }

// import React, { useEffect } from "react";
// import AnalyticsLayout from "./AnalyticsLayout";
// import BarChart from "./Charts/BarChart";
// import { Typography, Box } from "@mui/material";
// import { analyticsData } from "./Data/AnalyticsData";

// export default function TrainingAndPerformance() {
//   const labels = analyticsData.clients;
//   const latency = analyticsData.trainingPerformanceInsights.apiResponseLatency.map(i => i.avgLatencyMs);
//   useEffect(()=>{
//     console.log("latency",latency);
//   })

//   return (
//     <>
//       <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
//         API Response Latency
//       </Typography>

//       <Box sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: "10px", background: "#fff" }}>
//         <Typography sx={{ fontWeight: 500, mb: 2 }}>Latency by Client</Typography>
//         <BarChart   labels={labels} data={latency} title="Avg Latency (ms)" />
//       </Box>
//     </>
//   );
import React, { useEffect } from "react";
import AnalyticsLayout from "./AnalyticsLayout";
import BarChart from "./Charts/BarChart";
import { Typography, Box, Button } from "@mui/material";
import DateFilter from "./DateFilter";
import { analyticsData } from "./Data/AnalyticsData";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TrainingAndPerformance() {
  const labels = analyticsData.clients;
  const latency =
    analyticsData.trainingPerformanceInsights.apiResponseLatency.map(
      (i) => i.avgLatencyMs
    );

  useEffect(() => {
    console.log("latency", latency);
  }, [latency]);

  return (
    <>
      {/* Page title */}
    <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      width: "fit-content",
      whiteSpace: "nowrap",
    }}
  >
    {/* 🔥 Apna heading name yaha change karna */}
    API Response Latency
  </Typography>

  <DateFilter />
</Box>


      {/* Card wrapper */}
      <Box
        sx={{
          p: 3,
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        {/* Header row */}
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>Latency by Client</Typography>

          {/* View Details button — Solid Purple Always */}
          <Button
            component={RouterLink}
            to="/analytics/training-performance/details"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              padding: "6px 12px",
              borderRadius: "8px",
              minWidth: "auto",
              backgroundColor: "#6A5BFF",
              color: "#fff",
              border: "1.5px solid #6A5BFF",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#5A4DE0",
                borderColor: "#5A4DE0",
                color: "#fff",
              },
            }}
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
          >
            View Details
          </Button>
        </Box>

        {/* Chart */}
        <BarChart labels={labels} data={latency} title="Avg Latency (ms)" />
      </Box>
    </>
  );
}
