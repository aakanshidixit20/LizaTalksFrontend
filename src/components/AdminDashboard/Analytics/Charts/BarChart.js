// import ReactApexChart from "react-apexcharts";

// const BarChart = ({ labels, data, title }) => {
//   const chartData = {
//     series: [{ name: title, data }],
//     chart: { type: "bar" },
//     xaxis: { categories: labels },
//   };

//   return <ReactApexChart options={chartData} series={chartData.series} type="bar" height={350} />;
// };

// export default BarChart;


import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({labels, data}) => {
  const series = [{ name: "Avg Latency (ms)", data: [...data]}];

  const options = {
    chart: { type: "bar" },
    xaxis: {
      categories: [...labels],
      labels: { rotate: -45 },
    },
    colors: ["#5B6BF3"],
  };

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default BarChart;
