import React from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { Box, Typography } from "@mui/material";

import ViewDetailsBtn from "../ViewDetailsBtn/ViewDetailsBtn";

const HighClicksLowConversions = () => {
  const navigate = useNavigate();

  const chartState = {
    series: [{ data: [350, 300, 248, 200, 140] }],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        fontFamily: "Inter, sans-serif",
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true,
          endingShape: "rounded",
        },
      },
      dataLabels: { enabled: false },
      colors: ["#6f42c1"],
      xaxis: {
        categories: [
          "Mystery Box",
          "High Potency Oil",
          "Sample Pack",
          "Merch Hoodie",
          "Bath Bomb",
        ],
        labels: { style: { colors: "#495057", fontSize: "14px" } },
      },
      yaxis: {
        labels: { style: { colors: "#495057", fontSize: "14px" } },
      },
      tooltip: { theme: "dark" },
      grid: {
        show: true,
        borderColor: "#e9ecef",
        row: { colors: ["transparent"], opacity: 0.5 },
      },
    },
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="600" sx={{ flexGrow: 1, whiteSpace: "nowrap" }}>
          High Clicks, Low Conversions
        </Typography>

        <ViewDetailsBtn
          redirectTo="/analytics/high-clicks/details"
          align="right"
        />
      </Box>
    
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={350}
      />
    </Box>
  );
};

export default HighClicksLowConversions;


// HighClicksLowConversiond.js
// import React from "react";
// import { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const HighClicksLowConversions = () => {
//   const [state, setState] = React.useState({
//     series: [
//       {
//         data: [350, 300, 248, 200, 140],
//       },
//     ],
//     options: {
//       chart: {
//         type: "bar",
//         height: 350,
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 4,
//           borderRadiusApplication: "end",
//           horizontal: true,
//         },
//       },
//        colors: ["#FF0000"],
//       dataLabels: {
//         enabled: false,
//       },
//       xaxis: {
//         categories: [
//           // "South Korea",
//           // "Canada",
//           // "United Kingdom",
//           // "Netherlands",
//           // "Italy",
//           "Mystery Box",
//           "High Potency Oil",
//           "Sample Pack",
//           "Merch Hoodie",
//           "Bath Bomb",
//         ],
//       },
//     },
//   });

//   return (
//     <div>
//         <h3>High Clicks, Low Conversions</h3>
//       <div id="chart">
//         <ReactApexChart
//           options={state.options}
//           series={state.series}
//           type="bar"
//           height={350}
//         />
//       </div>
//     </div>
//   );
// };

// export default HighClicksLowConversions;


/////////////////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import { Box, Button, Typography } from "@mui/material";

// const HighClicksLowConversions = () => {
//   const navigate = useNavigate();

//   const chartState = {
//     series: [
//       { data: [350, 300, 248, 200, 140] },
//     ],
//     options: {
//       chart: { type: "bar", height: 350 },
//       plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: "end", horizontal: true } },
//       colors: ["#FF0000"],
//       dataLabels: { enabled: false },
//       xaxis: {
//         categories: ["Mystery Box", "High Potency Oil", "Sample Pack", "Merch Hoodie", "Bath Bomb"],
//       },
//     },
//   };

//   return (
//     <Box p={3}>
//       {/* Header with title and button */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight="600">
//           High Clicks, Low Conversions
//         </Typography>

//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => navigate("/analytics/high-clicks/details")}
//           sx={{ borderRadius: "8px", textTransform: "none" }}
//         >
//           View Details →
//         </Button>
//       </Box>

//       {/* Chart */}
//       <ReactApexChart
//         options={chartState.options}
//         series={chartState.series}
//         type="bar"
//         height={350}
//       />
//     </Box>
//   );
// };

// export default HighClicksLowConversions;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import { Box, Button, Typography } from "@mui/material";

// const HighClicksLowConversions = () => {
//   const navigate = useNavigate();

//   const chartState = {
//     series: [
//       { data: [350, 300, 248, 200, 140] },
//     ],
//     options: {
//       chart: {
//         type: "bar",
//         height: 350,
//         toolbar: { show: false },
//         fontFamily: 'Inter, sans-serif',
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 6,
//           horizontal: true,
//           distributed: false,
//           endingShape: "rounded",
//         },
//       },
//       dataLabels: { enabled: false },
//       colors: ["#6f42c1"], // Trezo purple
//       xaxis: {
//         categories: ["Mystery Box", "High Potency Oil", "Sample Pack", "Merch Hoodie", "Bath Bomb"],
//         labels: { style: { colors: "#495057", fontSize: '14px' } },
//       },
//       yaxis: {
//         labels: { style: { colors: "#495057", fontSize: '14px' } },
//       },
//       tooltip: { theme: 'dark' },
//       grid: {
//         show: true,
//         borderColor: "#e9ecef",
//         row: { colors: ["transparent"], opacity: 0.5 },
//       },
//     },
//   };

//   return (
//     <Box p={3}>
//       {/* Header with title and button */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight="600">
//           High Clicks, Low Conversions
//         </Typography>

//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => navigate("/analytics/high-clicks/details")}
//           sx={{ borderRadius: "8px", textTransform: "none" }}
//         >
//           View Details →
//         </Button>
//       </Box>

//       {/* Chart */}
//       <ReactApexChart
//         options={chartState.options}
//         series={chartState.series}
//         type="bar"
//         height={350}
//       />
//     </Box>
//   );
// };

// export default HighClicksLowConversions;
