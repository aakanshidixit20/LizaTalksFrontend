import React from "react";
import Chart from "react-apexcharts";

export default function DropOffLineChart() {

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      width: [3, 3],
      curve: "smooth",
      dashArray: [0, 6], // second line will be dotted
    },
    markers: {
      size: 5,
      hover: { size: 7 },
    },
    colors: ["#6366F1", "#F59E0B"], // Blue + Orange
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      labels: { style: { fontSize: "13px" } },
    },
    yaxis: {
      title: { text: "Avg. Duration between sessions (sec)" },
      labels: { style: { fontSize: "13px" } },
    },
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
  };

  // Example Data (Replace later with real analyticsData)
  const series = [
    {
      name: "Alpha Retail - Flagship",
      data: [48, 45, 42, 40, 38],
    },
    {
      name: "Beta Corp - Online",
      data: [62, 58, 55, 53, 49],
    },
  ];

  return (
    <Chart options={options} series={series} type="line" height={350} />
  );
}
