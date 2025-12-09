import React from "react";
import ReactApexChart from "react-apexcharts";

const HorizontalBar = ({ labels, data, title }) => {
  const chartData = {
    series: [{ name: title, data }],
    chart: { type: "bar", toolbar: { show: false }},
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
      },
    },
    colors: ["#6A5BFF"], // 💜 Main color
    xaxis: {
      categories: labels,
      labels: {
        style: { color: "#111", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { color: "#111", fontSize: "12px" },
      },
    },
  };

  return (
    <ReactApexChart
      options={chartData}
      series={chartData.series}
      type="bar"
      height={350}
    />
  );
};

export default HorizontalBar;
