import React from "react";
import Chart from "react-apexcharts";

// const LineChartOne = (labels,data,title) => {
//   // const series = [
//   //   { name: "Alpha", data: [50, 46, 42, 39, 37] },
//   //   { name: "Beta", data: [62, 59, 55, 52, 50] },
//   // ];

//   // const options = {
//   //   chart: { type: "line" },
//   //   stroke: { curve: "smooth" },
//   //   xaxis: { categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"] },
//   //   colors: ["#6366F1", "#F59E0B"],
//   // };

//   const series = [{ name:title, data: [...data]}];
//    const options = {
//     chart: { type: "bar" },
//     xaxis: {
//       categories: [...labels],
//       labels: { rotate: -45 },
//     },
//     colors: ["#5B6BF3"],
//   };


//   return <Chart options={options} series={series} type="line" height={350} />;
// };

// export default LineChartOne;

// import React from "react";
// import Chart from "react-apexcharts";

// const LineChartOne = ({ labels, data, title }) => {
//   const series = [
//     { name: title, data: data }
//   ];

//   const options = {
//     chart: {
//       type: "line",
//       toolbar: { show: false }
//     },
//     stroke: {
//       curve: "smooth",
//       width: 3
//     },
//     xaxis: {
//       categories: labels,
//       labels: { rotate: -45 }
//     },
//     colors: ["#6366F1"],
//     markers: {
//       size: 4,
//       colors: ["#6366F1"],
//       strokeColors: "#fff",
//       strokeWidth: 2
//     },
//     dataLabels: {
//       enabled: false
//     }
//   };

//   return (
//     <Chart
//       options={options}
//       series={series}
//       type="line"
//       height={350}
//     />
//   );
// };

// export default LineChartOne;


const LineChartOne = ({ labels, data, title }) => {
  const series = [
    { name: title, data: data }
  ];

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    xaxis: {
      categories: labels
    },
    colors: ["#6366F1"],
    markers: {
      size: 4
    },
    dataLabels: {
      enabled: false
    }
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};
export default LineChartOne;