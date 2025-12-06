"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { Grid, Card, Box, Typography } from "@mui/material";

const Chart = lazy(() => import("react-apexcharts"));

const EngagementGrowth = () => {
  const [isChartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  // Line Chart Data
  const lineOptions = {
    chart: { type: 'line', toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#605DFF'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: { style: { colors: '#64748B' } }
    },
    yaxis: {
      labels: { style: { colors: '#64748B' } }
    },
    grid: { borderColor: '#ECEEF2' }
  };

  const lineSeries = [{
    name: 'Conversations',
    data: [30, 40, 35, 50, 49, 60]
  }];

  // Donut Chart Data
  const donutSeries = [65, 35]; // Returning vs New Users
  const donutOptions = {
    chart: { type: 'donut' },
    labels: ['Returning Users', 'New Users'],
    colors: ['#605DFF', '#4ECDC4'],
    legend: {
      position: 'bottom'
    },
    dataLabels: { enabled: true }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 3, height: "100%" }}>
          <Typography variant="h6" fontWeight={700} mb={2} className="text-black">
            Conversations Over Time
          </Typography>
          <Box sx={{ height: 300 }}>
            {isChartLoaded && (
              <Suspense fallback={<div>Loading...</div>}>
                <Chart options={lineOptions} series={lineSeries} type="line" height={300} />
              </Suspense>
            )}
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 3, height: "100%" }}>
          <Typography variant="h6" fontWeight={700} mb={2} className="text-black">
            User Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            {isChartLoaded && (
              <Suspense fallback={<div>Loading...</div>}>
                <Chart options={donutOptions} series={donutSeries} type="donut" height={300} />
              </Suspense>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EngagementGrowth;