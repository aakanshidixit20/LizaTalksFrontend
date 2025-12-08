// // BotEffectivenessTablePage.js
// import React from "react";
// import { Box, Paper, Typography, Grid } from "@mui/material";

// import BarChart from "./Charts/BarChart"; // your existing chart
// import { analyticsData } from "./Data/AnalyticsData";

// export default function BotEffectivenessTablePage() {
//   const labels = analyticsData.clients;

//   const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(
//     (i) => i.engagementRate
//   );

//   const tableData = analyticsData.botEffectiveness.engagementRatePerClient;

//   const totalCredits = tableData.reduce((sum, item) => sum + item.creditsSpent, 0);

//   return (
//     <Box sx={{ p: 3 }}>

//       {/* ---------------------- TOP GRAPH ---------------------- */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
//           Engagement Rate per Client
//         </Typography>

//         <BarChart
//           labels={labels}
//           data={engagementRate}
//           title="Engagement Rate (%)"
//         />
//       </Paper>

//       {/* ---------------------- BOTTOM TABLE ---------------------- */}
//       <Paper sx={{ p: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
//           Credits Spent Per Client
//         </Typography>

//         {/* Table Header */}
//         <Grid container sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
//           <Grid item xs={6}>Client</Grid>
//           <Grid item xs={6} textAlign="right">Credits</Grid>
//         </Grid>

//         {/* Table Rows */}
//         {tableData.map((item, index) => (
//           <Grid
//             container
//             key={index}
//             sx={{
//               py: 1.2,
//               borderBottom: index !== tableData.length - 1 ? "1px solid #eee" : "none",
//             }}
//           >
//             <Grid item xs={6}>
//               <Typography fontSize="15px" fontWeight={500}>
//                 {item.client}
//               </Typography>
//             </Grid>

//             <Grid item xs={6} textAlign="right">
//               <Typography
//                 fontSize="15px"
//                 fontWeight={600}
//                 color="#6559F5"
//               >
//                 {item.creditsSpent.toLocaleString()}
//               </Typography>
//             </Grid>
//           </Grid>
//         ))}

//         {/* TOTAL ROW */}
//         <Grid container sx={{ py: 1.5, mt: 2, borderTop: "2px solid #ddd" }}>
//           <Grid item xs={6}>
//             <Typography fontSize="15px" fontWeight={700}>Total</Typography>
//           </Grid>

//           <Grid item xs={6} textAlign="right">
//             <Typography
//               fontSize="15px"
//               fontWeight={800}
//               color="#4a3ef5"
//             >
//               {totalCredits.toLocaleString()}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Paper>

//     </Box>
//   );
// }


// BotEffectivenessTablePage.js
import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";

import BarChart from "./Charts/BarChart"; 
import { analyticsData } from "../Analytics/Data/AnalyticsData";

export default function BotEffectivenessTablePage() {
  const labels = analyticsData.clients;

  const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(
    (i) => i.engagementRate
  );

  const tableData = analyticsData.botEffectiveness.engagementRatePerClient;

  const totalCredits = tableData.reduce(
    (sum, item) => sum + item.creditsSpent,
    0
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* ---------------------- TOP GRAPH ---------------------- */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
          Engagement Rate per Client
        </Typography>

        <BarChart
          labels={labels}
          data={engagementRate}
          title="Engagement Rate (%)"
        />
      </Paper>

      {/* ---------------------- BOTTOM TABLE ---------------------- */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
          Credits Spent Per Client
        </Typography>

        {/* Table Header */}
        <Grid container sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
          <Grid item xs={6}>Client</Grid>
          <Grid item xs={6} textAlign="right">Credits</Grid>
        </Grid>

        {/* Table Rows */}
        {tableData.map((item, index) => (
          <Grid
            container
            key={index}
            sx={{
              py: 1.2,
              borderBottom:
                index !== tableData.length - 1 ? "1px solid #eee" : "none",
            }}
          >
            <Grid item xs={6}>
              <Typography fontSize="15px" fontWeight={500}>
                {item.client}
              </Typography>
            </Grid>

            <Grid item xs={6} textAlign="right">
              <Typography fontSize="15px" fontWeight={600} color="#6559F5">
                {item.creditsSpent.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        ))}

        {/* TOTAL ROW */}
        <Grid container sx={{ py: 1.5, mt: 2, borderTop: "2px solid #ddd" }}>
          <Grid item xs={6}>
            <Typography fontSize="15px" fontWeight={700}>
              Total
            </Typography>
          </Grid>

          <Grid item xs={6} textAlign="right">
            <Typography fontSize="15px" fontWeight={800} color="#4a3ef5">
              {totalCredits.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
