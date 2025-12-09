import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ViewDetailsBtn from "../ViewDetailsBtn/ViewDetailsBtn";   // ⭐ Reusable button

const RevenueDrivenbyAIChatbot = () => {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    series: [44, 55, 69, 16],
    options: {
      chart: { type: "donut" },
      labels: ["Product A", "Product B", "Product C", "Product D"],

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
    setState((prev) => ({
      ...prev,
      series: [...prev.series, Math.floor(Math.random() * 100) + 1],
    }));
  }

  function removeData() {
    if (state.series.length === 1) return;
    setState((prev) => ({ ...prev, series: prev.series.slice(0, -1) }));
  }

  function randomize() {
    setState((prev) => ({
      ...prev,
      series: prev.series.map(() => Math.floor(Math.random() * 100) + 1),
    }));
  }

  function reset() {
    setState({ ...state, series: [44, 55, 69, 16] });
  }

  return (
    <Box width="100%" p={0}>
      <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>

          {/* ⭐ Header (Heading + Reusable Button) */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                flexGrow: 1,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Revenue Driven by AI Chatbot
            </Typography>

            <ViewDetailsBtn
              redirectTo="/revenue-ai-detail"
              align="right"
            />
          </Box>

          {/* Donut Chart */}
          <Box display="flex" justifyContent="center">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="donut"
              width={380}
            />
          </Box>

          {/* Action Buttons */}
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
