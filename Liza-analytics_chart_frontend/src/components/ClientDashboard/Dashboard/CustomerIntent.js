"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { Card, Box, Typography } from "@mui/material";

const Chart = lazy(() => import("react-apexcharts"));

const CustomerIntentChart = () => {
  const [isChartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  const series = [35, 25, 20, 20]; // Sleep, Anxiety, Relax, Energy Boost
  const options = {
    chart: { type: 'donut' },
    labels: ['Sleep', 'Anxiety', 'Relax', 'Energy Boost'],
    colors: ['#605DFF', '#FF6B6B', '#4ECDC4', '#FFD166'],
    legend: {
      position: 'bottom',
      labels: { colors: '#64748B' }
    },
    dataLabels: { enabled: true },
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    }
  };

  return (
    <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 3, height: "100%" }}>
      <Typography variant="h6" fontWeight={700} mb={2} className="text-black">
        Top Customer Intents
      </Typography>
      <Box sx={{ height: 300 }}>
        {isChartLoaded && (
          <Suspense fallback={<div>Loading...</div>}>
            <Chart options={options} series={series} type="donut" height={300} />
          </Suspense>
        )}
      </Box>
    </Card>
  );
};

export default CustomerIntentChart;