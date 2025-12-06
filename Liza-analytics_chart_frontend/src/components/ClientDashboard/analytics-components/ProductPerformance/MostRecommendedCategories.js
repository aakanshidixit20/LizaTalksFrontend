// // MostRecommendedCategories.js
// import React from "react";
// import { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const MostRecommendedCategories = () => {
//   const [state, setState] = React.useState({
//     series: [
//       {
//         data: [400, 380, 348, 270, 240],
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
//           "Edibles",
//           "Flower",
//           "Vapes",
//           "Topicals",
//           "Tinctures",
//         ],
//       },
//     },
//   });

//   return (
//     <div>
//       <div id="chart">
//         <h3>Most Recommended Categories</h3>
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

// export default MostRecommendedCategories;


/////////////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import { Box, Button, Typography } from "@mui/material";

// const MostRecommendedCategories = () => {
//   const navigate = useNavigate();

//   const chartState = {
//     series: [{ data: [400, 380, 348, 270, 240] }],
//     options: {
//       chart: { type: "bar", height: 350 },
//       plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: "end", horizontal: true } },
//       dataLabels: { enabled: false },
//       xaxis: { categories: ["Edibles", "Flower", "Vapes", "Topicals", "Tinctures"] },
//     },
//   };

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6" fontWeight="600">Most Recommended Categories</Typography>
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => navigate("/analytics/most-recommended/details")}
//           sx={{ borderRadius: "8px", textTransform: "none" }}
//         >
//           View Details →
//         </Button>
//       </Box>

//       <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={350} />
//     </Box>
//   );
// };

// export default MostRecommendedCategories;




import React from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { Box, Button, Typography } from "@mui/material";

const MostRecommendedCategories = () => {
  const navigate = useNavigate();

  const chartState = {
    series: [{ data: [400, 380, 348, 270, 240] }],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        fontFamily: 'Inter, sans-serif',
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true,
          endingShape: "rounded",
        },
      },
      dataLabels: { enabled: false },
      colors: ["#6f42c1"], // Trezo purple
      xaxis: {
        categories: ["Edibles", "Flower", "Vapes", "Topicals", "Tinctures"],
        labels: { style: { colors: "#495057", fontSize: '14px' } },
      },
      yaxis: {
        labels: { style: { colors: "#495057", fontSize: '14px' } },
      },
      tooltip: { theme: 'dark' },
      grid: {
        show: true,
        borderColor: "#e9ecef",
        row: { colors: ["transparent"], opacity: 0.5 },
      },
    },
  };

  return (
    <Box p={3}>
      {/* Header with title and button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="600">
          Most Recommended Categories
        </Typography>

        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/analytics/most-recommended/details")}
          sx={{ borderRadius: "8px", textTransform: "none" }}
        >
          View Details →
        </Button>
      </Box>

      {/* Chart */}
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={350}
      />
    </Box>
  );
};

export default MostRecommendedCategories;
