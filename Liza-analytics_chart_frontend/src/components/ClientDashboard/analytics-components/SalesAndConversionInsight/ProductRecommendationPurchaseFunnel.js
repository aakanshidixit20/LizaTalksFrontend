// import React from "react";
// import ReactApexChart from "react-apexcharts";

// import { codepenEmbed } from "react-syntax-highlighter/dist/esm/styles/hljs"

// const ProductRecommendationPurchaseFunnel = () => {
//   const [state] = React.useState({
//     series: [
//       {
//         name: "Funnel Series",
//         data: [1200, 600, 150], // 12%, 6%, 1.5%
//       },
//     ],

//     options: {
//       chart: {
//         type: "bar",
//         height: 350,
//         dropShadow: { enabled: false },
//         toolbar: { show: false },
//       },

//       plotOptions: {
//         bar: {
//           horizontal: true,
//           isFunnel: true,
//           barHeight: "45%", // creates spacing
//           borderRadius: 4,
//         },
//       },

//       fill: {
//         type: "solid",
//         colors: ["#4285F4", "#4285F4", "#4285F4"], // same color as your image
//       },

//       dataLabels: {
//         enabled: true,
//         formatter: function (val, opt) {
//           const percentages = ["12.0%", "6.0%", "1.5%"];
//           return percentages[opt.dataPointIndex];
//         },
//         style: {
//           fontSize: "18px",
//           fontWeight: 700,
//           colors: ["#fff"],
//         },
//       },

//       xaxis: {
//         categories: [
//           "Product Page Views",
//           "Added to Cart",
//           "Completed Purchase",
//         ],

//         max: 1500, // scales bars proportionally
//         labels: { show: false }, // hide axis labels
//       },

//       yaxis: {
//         labels: { show: false }, // remove left labels
//       },

//       grid: { show: false },
//       legend: { show: false },

//       tooltip: { enabled: false },

//       title: {
//         text: "Product Recommendation → Purchase Funnel",
//         align: "center",
//         style: { fontSize: "18px", fontWeight: 600 },
//       },
//     },
//   });

//   return (
//     <div>
//       <ReactApexChart
//         options={state.options}
//         series={state.series}
//         type="bar"
//         height={350}
//       />

//       {/* Labels below the funnels */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           marginTop: "10px",
//           fontSize: "14px",
//           color: "#444",
//         }}
//       >
//         <span>Product Page Views</span>
//         <span>Added to Cart</span>
//         <span>Completed Purchase</span>
//       </div>
//     </div>
//   );
// };

// export default ProductRecommendationPurchaseFunnel;


// #Palak code
// import React from "react";
// import { Card, Typography, Box } from "@mui/material";
// import ReactApexChart from "react-apexcharts";

// const ProductRecommendationPurchaseFunnel = () => {

//   const options = {
//     chart: {
//       type: "bar",
//       toolbar: { show: false }
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         isFunnel: true,
//         barHeight: "70%",
//         borderRadius: 12,
//       },
//     },
//     fill: {
//       type: "solid",
//       colors: ["#6366F1", "#A5B4FC", "#6366F1"],
//     },
//     dataLabels: {
//       enabled: true,
//       formatter: (val, opt) => ["12%", "6%", "1.5%"][opt.dataPointIndex],
//       style: {
//         fontSize: "16px",
//         fontWeight: 700,
//         color: "#fff",
//       },
//     },
//     xaxis: { labels: { show: false } },
//     yaxis: { show: false },
//     grid: { show: false },
//     legend: { show: false },
//     tooltip: { enabled: false },
//   };

//   const series = [{ data: [12, 6, 1.5] }];

//   return (
//     <Card sx={{ p: 3, borderRadius: 4, mt: 3 }}>
//       <Typography variant="h6" fontWeight={600} mb={2}>
//         Product Recommendation → Purchase Funnel
//       </Typography>

//       <ReactApexChart options={options} series={series} type="bar" height={350} />

//       <Box display="flex" justifyContent="space-between" px={2} mt={1}>
//         <Typography variant="body2">Viewed Product</Typography>
//         <Typography variant="body2">Added to Cart</Typography>
//         <Typography variant="body2">Completed Purchase</Typography>
//       </Box>
//     </Card>
//   );
// };

// export default ProductRecommendationPurchaseFunnel;


import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const ProductRecommendationPurchaseFunnel = () => {

  const navigate = useNavigate();

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        isFunnel: true,
        barHeight: "70%",
        borderRadius: 12,
      },
    },
    fill: {
      type: "solid",
      colors: ["#6366F1", "#A5B4FC", "#6366F1"],
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opt) => ["12%", "6%", "1.5%"][opt.dataPointIndex],
      style: {
        fontSize: "16px",
        fontWeight: 700,
        color: "#fff",
      },
    },
    xaxis: { labels: { show: false } },
    yaxis: { show: false },
    grid: { show: false },
    legend: { show: false },
    tooltip: { enabled: false },
  };

  const series = [{ data: [12, 6, 1.5] }];

  return (
    <Card sx={{ p: 3, borderRadius: 4, mt: 3 }}>
      
      {/* Top Row: Title + View Details Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Product Recommendation → Purchase Funnel
        </Typography>

        {/* VIEW DETAILS BUTTON */}
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "none", backgroundColor: "#6366F1" }}
          onClick={() => navigate("/client-dashboard/analytics/product-purchase-funnel")}
        >
          View Details →
        </Button>
      </Box>

      {/* Chart */}
      <ReactApexChart options={options} series={series} type="bar" height={350} />

      {/* X-axis Labels */}
      <Box display="flex" justifyContent="space-between" px={2} mt={1}>
        <Typography variant="body2">Viewed Product</Typography>
        <Typography variant="body2">Added to Cart</Typography>
        <Typography variant="body2">Completed Purchase</Typography>
      </Box>
    </Card>
  );
};

export default ProductRecommendationPurchaseFunnel;

