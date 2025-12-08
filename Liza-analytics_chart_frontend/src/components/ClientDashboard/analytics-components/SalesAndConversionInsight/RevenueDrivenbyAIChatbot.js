import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
 
const RevenueDrivenbyAIChatbot = () => {
  const navigate = useNavigate();
 
  const [state, setState] = React.useState({
    series: [44, 55, 69, 16],
    options: {
      chart: { type: "donut" },
      labels: ["Product A", "Product B", "Product C", "Product D"],
 
      // NO CHANGE IN GRAPH COLORS
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
        style: {
          colors: ["#fff"],
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
 
      legend: { position: "right" },
 
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 260 },
            legend: { show: false },
          },
        },
      ],
    },
  });
 
  function appendData() {
    const arr = [...state.series, Math.floor(Math.random() * 100) + 1];
    setState({ ...state, series: arr });
  }
 
  function removeData() {
    if (state.series.length === 1) return;
    const arr = state.series.slice(0, -1);
    setState({ ...state, series: arr });
  }
 
  function randomize() {
    setState({
      ...state,
      series: state.series.map(() => Math.floor(Math.random() * 100) + 1),
    });
  }
 
  function reset() {
    setState({ ...state, series: [44, 55, 69, 16] });
  }
 
  return (
    <Box width="100%" p={0}>
      <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>
 
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>
              Revenue Driven by AI Chatbot
            </Typography>
 
            {/* View Details Button (Purple) */}
            <Button
              variant="contained"
              onClick={() => navigate("/revenue-ai-detail")}
              sx={{
                backgroundColor: "#6f42c1",
                "&:hover": { backgroundColor: "#5a32a3" },
              }}
            >
              View Details
            </Button>
          </Box>
 
          {/* Donut Chart (NOT CHANGED) */}
          <Box display="flex" justifyContent="center">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="donut"
              width={380}
            />
          </Box>
 
          {/* Action Buttons — Purple */}
          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              variant="contained"
              size="small"
              onClick={appendData}
              sx={{
                backgroundColor: "#6f42c1",
                "&:hover": { backgroundColor: "#5a32a3" },
              }}
            >
              + ADD
            </Button>
 
            <Button
              variant="contained"
              size="small"
              onClick={removeData}
              sx={{
                backgroundColor: "#6f42c1",
                "&:hover": { backgroundColor: "#5a32a3" },
              }}
            >
              - REMOVE
            </Button>
 
            <Button
              variant="contained"
              size="small"
              onClick={randomize}
              sx={{
                backgroundColor: "#6f42c1",
                "&:hover": { backgroundColor: "#5a32a3" },
              }}
            >
              RANDOMIZE
            </Button>
 
            <Button
              variant="contained"
              size="small"
              onClick={reset}
              sx={{
                backgroundColor: "#6f42c1",
                "&:hover": { backgroundColor: "#5a32a3" },
              }}
            >
              RESET
            </Button>
          </Box>
 
        </CardContent>
      </Card>
    </Box>
  );
};
 
export default RevenueDrivenbyAIChatbot;
 