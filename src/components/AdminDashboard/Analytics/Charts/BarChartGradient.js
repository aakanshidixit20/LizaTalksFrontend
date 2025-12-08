import React from "react";
import Chart from "react-apexcharts";

export default function BarChartGradient({ labels, data, title }) {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
      },
      tickPlacement: "on",
    },
    yaxis: {
      title: {
        text: title,
        style: { fontSize: "13px", fontWeight: 500 },
      }
    },
    colors: ["#8B5CF6"], // Base color
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#C084FC"], // Ending lighter shade
        stops: [0, 100],
        opacityFrom: 0.9,
        opacityTo: 0.3
      }
    },
    grid: {
      strokeDashArray: 4,
    },
    scrollbar: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  };

  const series = [
    {
      name: title,
      data: data,
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
}
