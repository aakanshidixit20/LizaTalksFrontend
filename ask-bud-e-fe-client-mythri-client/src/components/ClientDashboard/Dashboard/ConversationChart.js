"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { Card, Box, Typography } from "@mui/material";

// Import JSON file
import dashboardData from "../../../data/dashboard_overview_success.json";

// ✅ Lazy load Chart only when needed
const Chart = lazy(() => import("react-apexcharts"));

const ConversationChart = () => {
  const [isChartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  // Extract months and counts from JSON
  const months = dashboardData.data.monthly_conversation_chart.map(
    (item) => item.month
  );
  const counts = dashboardData.data.monthly_conversation_chart.map(
    (item) => item.count
  );

  const series = [
    {
      name: "Conversations",
      data: counts,
    },
  ];

  const options = {
    chart: {
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -25,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: months,
      position: "bottom",
      axisTicks: { show: false, color: "#ECEEF2" },
      axisBorder: { show: false, color: "#ECEEF2" },
      labels: {
        show: true,
        style: { colors: "#8695AA", fontSize: "12px" },
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        offsetY: -35,
      },
    },
    colors: ["#605DFF"],
    yaxis: {
  axisBorder: { show: false, color: "#ECEEF2" },
  axisTicks: { show: false, color: "#ECEEF2" },
  labels: {
    show: true,
    formatter: function (val) {
      return val;
    },
    style: { colors: "#64748B", fontSize: "12px" },
  },
  // ✅ Add this line
  max: Math.max(...counts) + 50,  // gives space above highest bar
},
    title: {
      text: "Monthly Conversations",
      align: "left",
      offsetX: -9,
      style: {
        fontWeight: "500",
        fontSize: "14px",
        color: "#64748B",
      },
    },
    grid: { show: true, borderColor: "#ECEEF2" },
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "7px",
        mb: "25px",
        padding: { xs: "18px", sm: "20px", lg: "25px" },
      }}
      className="rmui-card"
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "16px", md: "18px" },
          fontWeight: 700,
          mb: "25px",
        }}
        className="text-black"
      >
        Monthly Conversation Chart
      </Typography>

      <Box sx={{ marginBottom: "-15px" }}>
        {isChartLoaded && (
          <Suspense fallback={<div>Loading chart...</div>}>
            <Chart
              options={options}
              series={series}
              type="bar"
              height={345}
              width={"100%"}
            />
          </Suspense>
        )}
      </Box>
    </Card>
  );
};

export default ConversationChart;
