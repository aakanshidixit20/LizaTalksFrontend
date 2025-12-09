// import React from "react";
// import { Paper, Typography, Box, Grid } from "@mui/material";

// import BarChart from "./Charts/BarChart";
// import LineChart from "./Charts/LineChart";
// import HorizontalBar from "./Charts/HorizontalBar";

// import { analyticsData } from "./Data/AnalyticsData";

// // Dummy Data
// // const labels = ["Alpha Retail", "Beta Corp", "Gamma Styles", "Delta Home", "Epsilon Tech"];

// // const engagementRate = [75, 68, 82, 55, 72];
// // const creditsSpent = [4500, 3200, 4800, 2900, 3800];
// // const conversionRate = [12, 8, 15, 5, 9];
// // const fallbackRate = [30, 55, 20, 90, 45];

// export default function BotEffectiveness() {
//   const labels = analyticsData.clients;

//   const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(i => i.engagementRate);
//   const creditsSpent = analyticsData.botEffectiveness.engagementRatePerClient.map(i => i.creditsSpent);
//   const conversionRate = analyticsData.botEffectiveness.conversionRatePerClient.map(i => i.conversionRate);
//   const fallbackRate = analyticsData.botEffectiveness.fallbackErrorRatePerClient.map(i => i.errorCount);

//   return (
//     <Box sx={{ mt: 3 }}>

//       {/* ------- Engagement Rate Mixed Chart (Line + Bar) ------- */}
//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>Engagement Rate per Client</Typography>
//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Credits spent vs engagement rate per client.
//         </Typography>

//         {/* We manually combine two charts here */}
//         <Box sx={{ position: "relative", height: 350 }}>
//           <LineChart labels={labels} data={engagementRate} title="Engagement Rate (%)" />
//           <Box sx={{ position: "absolute", top: 0, width: "100%", opacity: 0.3 }}>
//             <BarChart labels={labels} data={creditsSpent} title="Credits Spent" />
//           </Box>
//         </Box>
//       </Paper>

//       {/* ------- Conversion Rate ------- */}
//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>Conversion Rate per Client</Typography>
//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Percentage of successful conversions per client.
//         </Typography>

//         <LineChart labels={labels} data={conversionRate} title="Conversion Rate (%)" />
//       </Paper>

//       {/* ------- Fallback / Error Rate ------- */}
//       <Paper sx={{ p: 3 }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>Fallback/Error Rate per Client</Typography>
//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Errors and fallback triggers observed for each client.
//         </Typography>

//         <HorizontalBar labels={labels} data={fallbackRate} title="Fallback/Error Rate" />
//       </Paper>

//     </Box>
//   );
// }

// BotEffectiveness.js
// import React from "react";
// import { Paper, Typography, Box, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// import BarChartGradient from "./Charts/BarChartGradient";
// import LineChart from "./Charts/LineChart";
// import HorizontalBar from "./Charts/HorizontalBar";

// import { analyticsData } from "./Data/AnalyticsData";
// import { Paper, Typography, Box, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import BarChart from "../Analytics/Charts/BarChart";
// import LineChart from "../Analytics/Charts/LineChart";
// import HorizontalBar from "../Analytics/Charts/HorizontalBar";

// import { analyticsData } from "../Analytics/Data/AnalyticsData";

// export default function BotEffectiveness() {
//   const navigate = useNavigate();

//   const labels = analyticsData.clients;
//   const navigate = useNavigate();

//   const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(
//     (i) => i.engagementRate
//   );
//   const creditsSpent = analyticsData.botEffectiveness.engagementRatePerClient.map(
//     (i) => i.creditsSpent
//   );
//   const conversionRate = analyticsData.botEffectiveness.conversionRatePerClient.map(
//     (i) => i.conversionRate
//   );
//   const fallbackRate = analyticsData.botEffectiveness.fallbackErrorRatePerClient.map(
//     (i) => i.errorCount
//   );

//   // 👉 Calculate Total Credits
//   const totalCredits = creditsSpent.reduce((a, b) => a + b, 0);

//   return (
//     <Box sx={{ mt: 3 }}>

//       {/* ------- Engagement Rate ------- */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: "12px", position: "relative" }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>
//           Engagement Rate per Client
//         </Typography>

//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Credits spent vs engagement rate per client.
//         </Typography>

//         <Box sx={{ position: "relative", height: 350 }}>
//           <LineChart labels={labels} data={engagementRate} title="Engagement Rate (%)" />
//           <Box sx={{ position: "absolute", top: 0, width: "100%", opacity: 0.35 }}>
//             <BarChartGradient labels={labels} data={creditsSpent} title="Credits Spent" />
//           </Box>
//         </Box>
//       </Paper>

//       {/* ------- Conversion Rate ------- */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: "12px", position: "relative" }}>

//         {/* 🔥 COLOR SYNCED BUTTON */}
//         <Button
//           variant="contained"
//           onClick={() => navigate("/analytics/bot-effectiveness/details")}
//           sx={{
//             position: "absolute",
//             right: 20,
//             top: 20,
//             borderRadius: "8px",
//             fontWeight: 600,
//             textTransform: "none",
//             background: "#8B5CF6",
//             boxShadow: "0px 4px 12px rgba(139,92,246,0.25)",
//             transition: "0.2s",
//             "&:hover": {
//               background: "#7C3AED",
//               boxShadow: "0px 6px 16px rgba(124,58,237,0.35)",
//             },
//           }}
//         >
//           View Details →
//         </Button>

//         <Typography fontWeight={600} sx={{ mb: 1 }}>
//           Conversion Rate per Client

//       {/* ---------------------------------------------------------------- */}
//       {/*         Engagement Rate (TABLE UI + TOTAL CREDITS ADDED)        */}
//       {/* ---------------------------------------------------------------- */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>

//         {/* Title + View Details */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <Typography fontWeight={600} fontSize="16px">
//             Engagement Rate per Client
//           </Typography>

//           <Typography
//             sx={{
//               fontSize: "14px",
//               color: "#6559F5",
//               cursor: "pointer",
//               fontWeight: 500,
//             }}
//               onClick={() => navigate("/bot-effectiveness/details")}
//           >
//             View Details →
//           </Typography>
//         </Box>

//         <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
//           Credits spent per client
//         </Typography>

//         {/* Header */}
//         <Grid container sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
//           <Grid item xs={6}>Client</Grid>
//           <Grid item xs={6} textAlign="right">Credits</Grid>
//         </Grid>

//         {/* Rows */}
//         {analyticsData.botEffectiveness.engagementRatePerClient.map(
//           (item, index) => (
//             <Grid
//               container
//               key={index}
//               sx={{
//                 py: 1.3,
//                 borderBottom:
//                   index !==
//                   analyticsData.botEffectiveness.engagementRatePerClient.length - 1
//                     ? "1px solid #eee"
//                     : "none",
//               }}
//             >
//               <Grid item xs={6}>
//                 <Typography fontSize="15px" fontWeight={500}>
//                   {item.client}
//                 </Typography>
//               </Grid>

//               {/* RIGHT SIDE CREDITS FIXED */}
//               <Grid item xs={6}>
//                 <Typography
//                   fontSize="15px"
//                   fontWeight={600}
//                   color="#6559F5"
//                   textAlign="right"
//                   display="block"
//                 >
//                   {item.creditsSpent.toLocaleString()}
//                 </Typography>
//               </Grid>
//             </Grid>
//           )
//         )}

//         {/* TOTAL CREDITS */}
//         <Grid
//           container
//           sx={{
//             py: 1.5,
//             mt: 1.5,
//             borderTop: "2px solid #ddd",
//           }}
//         >
//           <Grid item xs={6}>
//             <Typography fontSize="15px" fontWeight={700}>
//               Total
//             </Typography>
//           </Grid>

//           {/* RIGHT SIDE TOTAL FIXED */}
//           <Grid item xs={6}>
//             <Typography
//               fontSize="15px"
//               fontWeight={800}
//               color="#4a3ef5"
//               textAlign="right"
//               display="block"
//             >
//               {totalCredits.toLocaleString()}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* ---- Conversion Rate ---- */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>
//           Conversion Rate per Client
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Percentage of successful conversions per client.
//         </Typography>

//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Scroll to view all clients
//         </Typography>

//         <BarChartGradient labels={labels} data={conversionRate} title="Conversion Rate (%)" />
//       </Paper>

//       {/* ------- Fallback/Error Rate ------- */}
//       <Paper sx={{ p: 3, borderRadius: "12px" }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>
//           Fallback/Error Rate per Client
//         </Typography>

//       {/* ---- Fallback/Error Rate ---- */}
//       <Paper sx={{ p: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>
//           Fallback/Error Rate per Client
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Errors and fallback triggers observed for each client.
//         </Typography>

//         <HorizontalBar labels={labels} data={fallbackRate} title="Fallback/Error Rate" />
//       </Paper>

//     </Box>
//   );
// }

// ---------------------------------------------------------------------
// import React from "react";
// import { Paper, Typography, Box, Button, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// import LineChart from "../Analytics/Charts/LineChart";
// import BarChartGradient from "../Analytics/Charts/BarChartGradient";
// import HorizontalBar from "../Analytics/Charts/HorizontalBar";

// import { analyticsData } from "../Analytics/Data/AnalyticsData";

// export default function BotEffectiveness() {
//   const navigate = useNavigate();

//   const labels = analyticsData.clients;

//   const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(
//     (i) => i.engagementRate
//   );
//   const creditsSpent = analyticsData.botEffectiveness.engagementRatePerClient.map(
//     (i) => i.creditsSpent
//   );
//   const conversionRate = analyticsData.botEffectiveness.conversionRatePerClient.map(
//     (i) => i.conversionRate
//   );
//   const fallbackRate = analyticsData.botEffectiveness.fallbackErrorRatePerClient.map(
//     (i) => i.errorCount
//   );

//   const totalCredits = creditsSpent.reduce((a, b) => a + b, 0);

//   return (
//     <Box sx={{ mt: 3 }}>

//       {/* ------------------------------------------------------ */}
//       {/* ENGAGEMENT RATE — CHART + DETAILS LINK */}
//       {/* ------------------------------------------------------ */}
//       {/* <Paper sx={{ p: 3, mb: 3, borderRadius: 3, position: "relative" }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>
//           Engagement Rate per Client
//         </Typography>

//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Credits spent vs engagement rate per client.
//         </Typography>

//         <Box sx={{ position: "relative", height: 350 }}>
//           <LineChart
//             labels={labels}
//             data={engagementRate}
//             title="Engagement Rate (%)"
//           />

//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               width: "100%",
//               opacity: 0.35,
//             }}
//           >
//             <BarChartGradient
//               labels={labels}
//               data={creditsSpent}
//               title="Credits Spent"
//             />
//           </Box>
//         </Box>
//       </Paper> */}

//       {/* ------------------------------------------------------ */}
//       {/* ENGAGEMENT RATE — TABLE + TOTAL CREDITS */}
//       {/* ------------------------------------------------------ */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             mb: 2,
//             alignItems: "center",
//           }}
//         >
//           <Typography fontWeight={600}>Engagement Rate (Credits Table)</Typography>

//           <Typography
//             sx={{
//               fontSize: "14px",
//               color: "#6559F5",
//               fontWeight: 500,
//               cursor: "pointer",
//             }}
//             onClick={() => navigate("/analytics/bot-effectiveness/details")}
//           >
//             View Details →
//           </Typography>
//         </Box>

//         <Grid container sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
//           <Grid item xs={6}>Client</Grid>
//           <Grid item xs={6} textAlign="right">Credits</Grid>
//         </Grid>

//         {analyticsData.botEffectiveness.engagementRatePerClient.map(
//           (item, index) => (
//             <Grid
//               container
//               key={index}
//               sx={{
//                 py: 1.3,
//                 borderBottom:
//                   index !==
//                   analyticsData.botEffectiveness.engagementRatePerClient.length - 1
//                     ? "1px solid #eee"
//                     : "none",
//               }}
//             >
//               <Grid item xs={6}>
//                 <Typography fontSize="15px" fontWeight={500}>
//                   {item.client}
//                 </Typography>
//               </Grid>

//               <Grid item xs={6}>
//                 <Typography
//                   fontSize="15px"
//                   fontWeight={600}
//                   color="#6559F5"
//                   textAlign="right"
//                 >
//                   {item.creditsSpent.toLocaleString()}
//                 </Typography>
//               </Grid>
//             </Grid>
//           )
//         )}

//         {/* TOTAL */}
//         <Grid container sx={{ py: 1.5, mt: 1.5, borderTop: "2px solid #ddd" }}>
//           <Grid item xs={6}>
//             <Typography fontSize="15px" fontWeight={700}>
//               Total
//             </Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <Typography
//               fontSize="15px"
//               fontWeight={800}
//               color="#4a3ef5"
//               textAlign="right"
//             >
//               {totalCredits.toLocaleString()}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* ------------------------------------------------------ */}
//       {/* CONVERSION RATE */}
//       {/* ------------------------------------------------------ */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: 3, position: "relative" }}>
//         <Button
//           variant="contained"
//           onClick={() => navigate("/analytics/bot-effectiveness/details")}
//           sx={{
//             position: "absolute",
//             right: 20,
//             top: 20,
//             background: "#8B5CF6",
//             textTransform: "none",
//             borderRadius: "8px",
//           }}
//         >
//           View Details →
//         </Button>

//         <Typography fontWeight={600} sx={{ mb: 1 }}>
//           Conversion Rate per Client
//         </Typography>

//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Percentage of successful conversions per client.
//         </Typography>

//         <BarChartGradient
//           labels={labels}
//           data={conversionRate}
//           title="Conversion Rate (%)"
//         />
//       </Paper>

//       {/* ------------------------------------------------------ */}
//       {/* FALLBACK / ERROR RATE */}
//       {/* ------------------------------------------------------ */}
//       <Paper sx={{ p: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} sx={{ mb: 1 }}>
//           Fallback / Error Rate per Client
//         </Typography>

//         <Typography variant="body2" sx={{ mb: 2 }}>
//           Errors and fallback triggers observed for each client.
//         </Typography>

//         <HorizontalBar
//           labels={labels}
//           data={fallbackRate}
//           title="Fallback/Error Rate"
//         />
//       </Paper>
//     </Box>
//   );
// }

import React from "react";
import { Paper, Typography, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import LineChart from "../Analytics/Charts/LineChart";
import BarChartGradient from "../Analytics/Charts/BarChartGradient";
import HorizontalBar from "../Analytics/Charts/HorizontalBar";

import { analyticsData } from "../Analytics/Data/AnalyticsData";

export default function BotEffectiveness() {
  const navigate = useNavigate();

  const labels = analyticsData.clients;

  const engagementRate =
    analyticsData.botEffectiveness.engagementRatePerClient.map(
      (i) => i.engagementRate
    );
  const creditsSpent =
    analyticsData.botEffectiveness.engagementRatePerClient.map(
      (i) => i.creditsSpent
    );
  const conversionRate =
    analyticsData.botEffectiveness.conversionRatePerClient.map(
      (i) => i.conversionRate
    );
  const fallbackRate =
    analyticsData.botEffectiveness.fallbackErrorRatePerClient.map(
      (i) => i.errorCount
    );

  const totalCredits = creditsSpent.reduce((a, b) => a + b, 0);

  return (
    <Box sx={{ mt: 3 }}>
      {/* ⭐ ⭐ ⭐ NEW PURPLE THEME PREVIEW CARD ⭐ ⭐ ⭐ */}
      {/* <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography fontWeight={600} fontSize="18px">
              Engagement Rate per Client
            </Typography>
            <Typography fontSize="13px" color="text.secondary">
              Credits spent per client
            </Typography>
          </Box> */}

          {/* View Details Button */}
          {/* <Button
            onClick={() => navigate("/analytics/bot-effectiveness/details")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              color: "#6559F5",
              borderRadius: "25px",
              px: 2,
              border: "1px solid #DAD8FF",
              "&:hover": { background: "#F4F2FF" },
            }}
          >
            View Details →
          </Button>
        </Box> */}

        {/* Table Header */}
        {/* <Grid
          container
          sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}
        >
          <Grid item xs={6}>
            Client
          </Grid>
          <Grid item xs={6} textAlign="right">
            Credits
          </Grid>
        </Grid> */}

        {/* Table Rows
        {analyticsData.botEffectiveness.engagementRatePerClient.map(
          (item, index) => (
            <Grid
              container
              key={index}
              sx={{
                py: 1.3,
                borderBottom:
                  index !==
                  analyticsData.botEffectiveness.engagementRatePerClient
                    .length -
                    1
                    ? "1px solid #eee"
                    : "none",
              }}
            >
              <Grid item xs={6}>
                <Typography fontSize="15px" fontWeight={500}>
                  {item.client}
                </Typography>
              </Grid> */}

              {/* <Grid item xs={6}>
                <Typography
                  fontSize="15px"
                  fontWeight={600}
                  color="#6559F5"
                  textAlign="right"
                >
                  {item.creditsSpent.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          )
        )} */}

        {/* Total */}
        {/* <Grid container sx={{ py: 1.5, mt: 1.5, borderTop: "2px solid #ddd" }}>
          <Grid item xs={6}>
            <Typography fontSize="15px" fontWeight={700}>
              Total
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              fontSize="15px"
              fontWeight={800}
              color="#4A3EF5"
              textAlign="right"
            >
              {totalCredits.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper> */}
      {/* ⭐ END OF NEW CARD ⭐ */}

      {/* ⭐ ---- Engagement Section ---- ⭐ */}
      <Box sx={{ mb: 1.5 }}>
        <Typography fontWeight={600} fontSize="18px" sx={{ color: "#000" }}>
          Engagement Rate per Client
        </Typography>

        <Typography fontSize="13px" sx={{ color: "#7A7A7A", mb: 2 }}>
          Credits spent per client
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        {/* Header Row inside Card */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            fontWeight={600}
            sx={{ fontSize: "15px", color: "#3B3B3B" }}
          >
            Client Credits Summary
          </Typography>

          {/* Purple View Details Button */}
          <Button
            onClick={() => navigate("/analytics/bot-effectiveness/table")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              color: "#6559F5",
              borderRadius: "50px",
              px: 2,
              py: "6px",
              border: "1px solid #CBC4FF",
              background: "#F7F6FF",
              "&:hover": {
                background: "#EDEBFF",
                borderColor: "#8B82FF",
              },
            }}
          >
            View Details →
          </Button>
        </Box>

        {/* Table Header */}
        <Grid
          container
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6}>
            Client
          </Grid>
          <Grid item xs={6} textAlign="right">
            Credits
          </Grid>
        </Grid>

        {/* Dynamic Data */}
        {analyticsData.botEffectiveness.engagementRatePerClient.map(
          (item, index) => (
            <Grid
              container
              key={index}
              sx={{
                py: 1.3,
                borderBottom:
                  index !==
                  analyticsData.botEffectiveness.engagementRatePerClient
                    .length -
                    1
                    ? "1px solid #EEE"
                    : "none",
                  display: "flex",
                  justifyContent: "space-between",
              }}
            >
              <Grid item xs={6}>
                <Typography fontSize="15px" fontWeight={500}>
                  {item.client}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  fontSize="15px"
                  fontWeight={600}
                  color="#6559F5"
                  textAlign="right"
                >
                  {item.creditsSpent.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          )
        )}

        {/* Total */}
        <Grid container sx={{ py: 1.5, mt: 1.5, borderTop: "2px solid #ddd" , display: "flex", justifyContent: "space-between"}}>
          <Grid item xs={6}>
            <Typography fontSize="15px" fontWeight={700}>
              Total
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              fontSize="15px"
              fontWeight={800}
              color="#4A3EF5"
              textAlign="right"
            >
              {totalCredits.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* ------------------------------------------------------ */}
      {/* CONVERSION RATE */}
      {/* ------------------------------------------------------ */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, position: "relative" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/analytics/bot-effectiveness/details")}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "#8B5CF6",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          View Details →
        </Button>

        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Conversion Rate per Client
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Percentage of successful conversions per client.
        </Typography>

        <BarChartGradient
          labels={labels}
          data={conversionRate}
          title="Conversion Rate (%)"
        />
      </Paper>

      {/* ------------------------------------------------------ */}
      {/* FALLBACK / ERROR RATE */}
      {/* ------------------------------------------------------ */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>

        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Fallback / Error Rate per Client
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Errors and fallback triggers observed for each client.
        </Typography>
         <Button
          variant="contained"
          onClick={() => navigate("/analytics/bot-effectiveness/details")}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "#8B5CF6",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          View Details →
        </Button>

        <HorizontalBar
          labels={labels}
          data={fallbackRate}
          title="Fallback/Error Rate"
        />
      </Paper>
    </Box>
  );
}
