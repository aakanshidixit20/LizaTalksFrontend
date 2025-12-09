import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { Card, Box, Typography } from "@mui/material";
import ViewDetailsBtn from "../ViewDetailsBtn/ViewDetailsBtn";


const productsData = [
  { name: "Sleep Gummies", value: 360 },
  { name: "Pain Relief Balm", value: 330 },
  { name: "Calm Tincture", value: 300 },
  { name: "Focus Capsules", value: 270 },
  { name: "Relax Vape", value: 140 },
];

const TopConvertingProductsMain = () => {
  const navigate = useNavigate();

  const chartState = {
    series: [{ data: productsData.map((d) => d.value) }],
    options: {
      chart: { type: "bar", height: 300, toolbar: { show: false } },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true,
          endingShape: "rounded",
          barHeight: "60%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: productsData.map((d) => d.name),
        labels: { style: { fontSize: "12px", fontWeight: 500, colors: "#6A6A6A" } },
      },
      yaxis: {
        labels: { style: { fontSize: "12px", fontWeight: 600, colors: "#4A4A4A" } },
      },
      grid: { strokeDashArray: 4, borderColor: "#E6E6E6" },
      colors: ["#6D5DD2"],
      tooltip: { theme: "dark" },
    },
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        paddingTop: "10px",
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingBottom: "0px",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mb={"4px"}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
    color: "#6D5DD2",
    marginBottom: "4px",
    whiteSpace: "nowrap",
    flexGrow: 1,     
    flexShrink: 0   
  }}
        >
          Top Converting Products
        </Typography>

        {/* ⭐ Reusable Button Here */}
        <ViewDetailsBtn 
          redirectTo="/analytics/top-products/details"
          align="right"
        />
      </Box>

      {/* Chart */}
      <Box px={2}>
        <ReactApexChart
          options={chartState.options}
          series={chartState.series}
          type="bar"
          height={300}
        />
      </Box>
    </Card>
  );
};

export default TopConvertingProductsMain;


// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import { Card, Box, Typography, Button } from "@mui/material";

// const productsData = [
//   { name: "Sleep Gummies", value: 360 },
//   { name: "Pain Relief Balm", value: 330 },
//   { name: "Calm Tincture", value: 300 },
//   { name: "Focus Capsules", value: 270 },
//   { name: "Relax Vape", value: 140 },
// ];

// const TopConvertingProductsMain = () => {
//   const navigate = useNavigate();

//   const chartState = {
//     series: [{ data: productsData.map((d) => d.value) }],
//     options: {
//       chart: { type: "bar", height: 300, toolbar: { show: false } },
//       plotOptions: {
//         bar: {
//           borderRadius: 6,
//           horizontal: true,
//           endingShape: "rounded",
//           barHeight: "60%",
//         },
//       },
//       dataLabels: { enabled: false },
//       xaxis: {
//         categories: productsData.map((d) => d.name),
//         labels: { style: { fontSize: "12px", fontWeight: 500, colors: "#6A6A6A" } },
//       },
//       yaxis: {
//         labels: { style: { fontSize: "12px", fontWeight: 600, colors: "#4A4A4A" } },
//       },
//       grid: { strokeDashArray: 4, borderColor: "#E6E6E6" },
//       colors: ["#6D5DD2"],
//       tooltip: { theme: "dark" },
//     },
//   };

//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         boxShadow: 3,
//         paddingTop: "10px",      // ⭐ same as Dropoff full mode
//         paddingLeft: "0px",
//         paddingRight: "0px",
//         paddingBottom: "0px",
//       }}
//     >
//       {/* Header */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         px={2}                // ⭐ same content padding as Dropoff inner text
//         mb={"4px"}           // ⭐ matches h3 margin-bottom: 4px
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           sx={{ color: "#6D5DD2", marginBottom: "4px" }}
//         >
//           Top Converting Products
//         </Typography>

//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => navigate("/analytics/top-products/details")}
//           sx={{ textTransform: "none", borderRadius: 2 }}
//         >
//           View Details →
//         </Button>
//       </Box>

//       {/* Chart */}
//       <Box px={2}>
//         <ReactApexChart
//           options={chartState.options}
//           series={chartState.series}
//           type="bar"
//           height={300}     // ⭐ Dropoff height 350, but preview 220 → this matches baseline
//         />
//       </Box>
//     </Card>
//   );
// };

// export default TopConvertingProductsMain;




// import React from "react";
// import { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const TopConvertingProducts = () => {
//   const [state, setState] = React.useState({
//     series: [
//       {
//         data: [360, 330, 300, 270, 140],
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
//           "Sleep Gummies",
//           "Pain Relief Balm",
//           "Calm Tincture",
//           "Focus Capsules",
//           "Relax Vape",
//         ],
//       },
//     },
//   });

//   return (
//     <div>
//       <h3>Top Converting Products</h3>
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

// export default TopConvertingProducts;



///////////////////////////////////////////////////////////////////////////////////////////
// TopConvertingProductsMain.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import { Card, CardContent, Box, Typography, Button, Breadcrumbs, Link, useTheme } from "@mui/material";

// const productsData = [
//   { name: "Sleep Gummies", value: 360, category: "Edibles" },
//   { name: "Pain Relief Balm", value: 330, category: "Topicals" },
//   { name: "Calm Tincture", value: 300, category: "Tinctures" },
//   { name: "Focus Capsules", value: 270, category: "Capsules" },
//   { name: "Relax Vape", value: 140, category: "Vapes" },
// ];

// const TopConvertingProductsMain = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const chartState = {
//     series: [{ data: productsData.map((d) => d.value) }],
//     options: {
//       chart: { type: "bar", height: 350 },
//       plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: "end", horizontal: true } },
//       dataLabels: { enabled: false },
//       xaxis: { categories: productsData.map((d) => d.name) },
//       colors: [theme.palette.primary.main],
//     },
//   };

//   return (
//     <Box p={3}>
//       <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
//         <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics")}>
//           Analytics
//         </Link>
//         <Typography color={theme.palette.text.primary}>Top Converting Products</Typography>
//       </Breadcrumbs>

//       <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
//         <CardContent>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h6" fontWeight="bold">Top Converting Products</Typography>

//             {/* Navigate to Details */}
//             <Button
//               variant="contained"
//               size="small"
//               onClick={() => navigate("/analytics/top-products/details")}
//               sx={{ textTransform: "none", borderRadius: "8px" }}
//             >
//               View Details →
//             </Button>
//           </Box>

//           <ReactApexChart
//             options={chartState.options}
//             series={chartState.series}
//             type="bar"
//             height={350}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TopConvertingProductsMain;

/////////////////////////////////////////////////////////////////////////////////////////

