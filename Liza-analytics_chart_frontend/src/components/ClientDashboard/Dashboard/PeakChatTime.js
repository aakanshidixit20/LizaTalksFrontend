"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { Card, Box, Typography } from "@mui/material";

const Chart = lazy(() => import("react-apexcharts"));

const PeakChatTimes = () => {
  const [isChartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  const options = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['9AM', '11AM', '1PM', '3PM', '5PM', '7PM', '9PM'],
      labels: { style: { colors: '#64748B' } }
    },
    yaxis: {
      labels: { style: { colors: '#64748B' } }
    },
    colors: ['#605DFF', '#605DFF', '#605DFF', '#FF6B6B', '#FF6B6B', '#605DFF', '#605DFF'],
    grid: { borderColor: '#ECEEF2' }
  };

  const series = [{
    name: 'Interactions',
    data: [30, 40, 35, 50, 49, 60, 70]
  }];

  return (
    <Card sx={{ boxShadow: "none", borderRadius: "7px", p: 3, height: "100%" }}>
      <Typography variant="h6" fontWeight={700} mb={2} className="text-black">
        Peak Chat Times
      </Typography>
      <Box sx={{ height: 300 }}>
        {isChartLoaded && (
          <Suspense fallback={<div>Loading...</div>}>
            <Chart options={options} series={series} type="bar" height={300} />
          </Suspense>
        )}
      </Box>
    </Card>
  );
};

export default PeakChatTimes;