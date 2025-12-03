import ReactApexChart from "react-apexcharts";

const HorizontalBar = ({ labels, data, title }) => {
  const chartData = {
    series: [{ name: title, data }],
    chart: { type: "bar" },
    plotOptions: { bar: { horizontal: true } },
    xaxis: { categories: labels },
  };

  return <ReactApexChart options={chartData} series={chartData.series} type="bar" height={350} />;
};

export default HorizontalBar;


// import React from "react";
// import Chart from "react-apexcharts";

// const HorizontalBar = () => {
//   const series = [
//     { name: "Alpha", data: [2000, 2200, 2500, 2800, 3000, 3200] },
//     { name: "Beta", data: [1500, 2000, 2300, 2600, 2900, 3100] },
//     { name: "Gamma", data: [1000, 1300, 1600, 1900, 2300, 2600] },
//   ];

//   const options = {
//     chart: { stacked: true },
//     plotOptions: { bar: { horizontal: true } },
//     xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
//     colors: ["#4F46E5", "#EC4899", "#14B8A6"],
//     legend: { position: "bottom" },
//   };

//   return <Chart options={options} series={series} type="bar" height={350} />;
// };

// export default HorizontalBar;
