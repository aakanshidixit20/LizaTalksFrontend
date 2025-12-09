 import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Typography } from "@mui/material";
import ViewDetailsBtn from "../ViewDetailsBtn/ViewDetailsBtn";

const MoodAndEffectTrends = ({ hideButton }) => {
  const state = {
    series: [32, 25.6, 23.8, 9.9, 8.7],
    options: {
      chart: { type: "donut" },
      labels: ["Happy", "Neutral", "Calm", "Sad", "Stressed"],
      colors: ["#6366F1", "#22C55E", "#818CF8", "#F59E0B", "#EF4444"],
      legend: { position: "right" },
    },
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      
      <Box 
        display="flex" 
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography
          variant="h6"
          fontWeight="600"
          sx={{
            flexGrow: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Mood & Effect Trends
        </Typography>

        {!hideButton && (
          <ViewDetailsBtn 
            redirectTo="/analytics/mood-and-effect/details"
            align="right"
          />
        )}
      </Box>

   
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        height={350}
      />
    </Box>
  );
};

export default MoodAndEffectTrends;


// import React from "react";
// import { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const MoodAndEffectTrends = () => {
//   const [state, setState] = React.useState({
//     series: [44, 55, 41, 17, 15],
//     options: {
//       chart: {
//         type: "donut",
//       },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200,
//             },
//             legend: {
//               position: "bottom",
//             },
//           },
//         },
//       ],
//     },
//   });

//   return (
//     <div>
//       <div id="chart" style={{ width: "350px", margin: "0 auto" }}>
//         <ReactApexChart
//           options={state.options}
//           series={state.series}
//           type="donut"
//           width="100%"
//         />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default MoodAndEffectTrends;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";

// const MoodAndEffectTrends = () => {
//   const navigate = useNavigate();

//   const [state] = React.useState({
//     series: [32, 25.6, 23.8, 9.9, 8.7],
//     options: {
//       labels: ["Happy", "Neutral", "Calm", "Sad", "Stressed"],
//       legend: { position: "right" },
//       colors: ["#4F46E5", "#10B981", "#6366F1", "#F59E0B", "#EF4444"]
//     },
//   });

//   return (
//     <div style={{ textAlign: "center" }}>
//       <ReactApexChart type="donut" width="100%" height="300" series={state.series} options={state.options} />

//       <button
//         onClick={() => navigate("details")}
//         style={{
//           marginTop: "15px",
//           padding: "8px 18px",
//           background: "#6366F1",
//           color: "#fff",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontSize: "14px",
//         }}
//       >
//         View Details →
//       </button>
//     </div>
//   );
// };

// export default MoodAndEffectTrends;


// import React from "react";
// import ReactApexChart from "react-apexcharts";
// import ViewDetailsBtn from "../ViewDetailsBtn/ViewDetailsBtn";

// const MoodAndEffectTrends = ({ hideButton }) => {
//   const state = {
//     series: [32, 25.6, 23.8, 9.9, 8.7],
//     options: {
//       chart: { type: "donut" },
//       labels: ["Happy", "Neutral", "Calm", "Sad", "Stressed"],
//       colors: ["#6366F1", "#22C55E", "#818CF8", "#F59E0B", "#EF4444"],
//       legend: { position: "right" },
//     },
//   };

//   return (
//     <div style={{ width: "400px" }}>
//       <ReactApexChart
//         options={state.options}
//         series={state.series}
//         type="donut"
//         height={350}
//       />

//       {!hideButton && (
//         <button style={{ marginTop: "15px", display: "block" }}>
//           View Details →
//         </button>
//       )}
//     </div>
//   );
// };

// export default MoodAndEffectTrends;




