import React from "react";
import Chart from "react-apexcharts";

const LineChart = () => {
  const series = [
    { name: "Alpha", data: [50, 46, 42, 39, 37] },
    { name: "Beta", data: [62, 59, 55, 52, 50] },
  ];

  const options = {
    chart: { type: "line" },
    stroke: { curve: "smooth" },
    xaxis: { categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"] },
    colors: ["#6366F1", "#F59E0B"],
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default LineChart;