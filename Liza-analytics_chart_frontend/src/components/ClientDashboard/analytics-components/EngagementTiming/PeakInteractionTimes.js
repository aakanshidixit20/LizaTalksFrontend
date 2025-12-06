// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReactApexChart from 'react-apexcharts';

// const PeakInteractionTimes = () => {
//   const navigate = useNavigate();

//   const [state] = React.useState({
//     series: [
//       {
//         name: 'Browsing Volume',
//         type: 'column',
//         data: [440, 505, 414, 671, 227, 413, 201, 352]
//       },
//       {
//         name: 'Sales-Weighted Rate',
//         type: 'line',
//         data: [23, 42, 35, 27, 43, 22, 17, 31]
//       }
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: 'line',
//       },
//       stroke: { width: [0, 4] },
//       title: { text: 'Peak Interaction Times (Sales-Weighted)' },
//       dataLabels: {
//         enabled: true,
//         enabledOnSeries: [1]
//       },
//       labels: [
//         '8:00-10:00','10:00-12:00','12:00-14:00','14:00-16:00',
//         '16:00-18:00','18:00-20:00','20:00-22:00','22:00-24:00'
//       ],
//       yaxis: [
//         { title: { text: 'Browsing Volume (Units)' } },
//         { opposite: true, title: { text: 'Sales-Weighted Rate' } }
//       ]
//     },
//   });

//   return (
//     <div 
//       className="chart-card" 
//       style={{ padding: "15px", background: "#fff", borderRadius: "10px" }}
//     >
//       {/* Header */}
//       <div 
//         style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
//       >
//         <h3 style={{ margin: 0 }}>Peak Interaction Times</h3>

//         {/* Updated Button Navigation Path */}
//         <button 
//           onClick={() => navigate("peak-interaction-details")}
//           style={{ 
//             padding: "6px 12px",
//             background: "#4F46E5",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer",
//             fontSize: "14px"
//           }}
//         >
//           View Details →
//         </button>
//       </div>

//       {/* Chart */}
//       <ReactApexChart 
//         options={state.options} 
//         series={state.series} 
//         type="line" 
//         height={350} 
//       />
//     </div>
//   );
// };

// export default PeakInteractionTimes;
import React from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent, Box, Typography, Button, useTheme } from "@mui/material";

const PeakInteractionTimes = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [state] = React.useState({
    series: [
      {
        name: "Browsing Volume",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352],
      },
      {
        name: "Sales-Weighted Rate",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: { show: false },
        // background: "transparent",
      },
      stroke: { width: [0, 4] },
      dataLabels: { enabled: true, enabledOnSeries: [1] },
      labels: [
        "08:00-10:00",
        "10:00-12:00",
        "12:00-14:00",
        "14:00-16:00",
        "16:00-18:00",
        "18:00-20:00",
        "20:00-22:00",
        "22:00-24:00",
      ],
      yaxis: [
        { title: { text: "Browsing Volume (Units)" } },
        { opposite: true, title: { text: "Sales-Weighted Rate (%)" } },
      ],
      // Use Trezo / custom theme colors
      colors: [theme.palette.primary.main, theme.palette.success.main],
      theme: {
        mode: theme.palette.mode,  // light/dark based on MUI theme — helps if you use dark mode
      },
      grid: {
        borderColor: theme.palette.divider,
      },
      tooltip: {
        theme: theme.palette.mode, // match light/dark tooltip
      },
    },
  });

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Peak Interaction Times
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("peak-interaction-details")}
            sx={{ textTransform: "none", borderRadius: "8px" }}
          >
            View Details →
          </Button>
        </Box>

        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </CardContent>
    </Card>
  );
};

export default PeakInteractionTimes;
