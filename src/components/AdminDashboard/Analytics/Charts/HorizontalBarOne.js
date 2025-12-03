// import React from "react";
// import Chart from "react-apexcharts";

// const HorizontalBarOne = ({ labels, latency, title}) => {
//   const series = [{ name: title, data: latency }];

//   const options = {
//     chart: { stacked: true },
//     plotOptions: { bar: { horizontal: true } },
//     xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
//     colors: ["#4F46E5", "#EC4899", "#14B8A6"],
//     legend: { position: "bottom" },
//   };

//   return <Chart options={options} series={series} type="bar" height={350} />;
// };

// export default HorizontalBarOne;

// import React from "react";
// import Chart from "react-apexcharts";

// const HorizontalBarOne = ({ labels, latency, title }) => {

  
//   const series = [
//     {
//       name: title,
//       data:latency
//     }
//   ];

//   const options = {
//     chart: {
//       type: "bar",
//       toolbar: { show: false }
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         borderRadius: 6,
//         dataLabels: {
//           position: "right"
//         }
//       }
//     },
//     xaxis: {
//       categories: labels
//     },
//     colors: ["#4F46E5"],
//     dataLabels: {
//       enabled: true,
//       formatter: function (val, { dataPointIndex }) {
//         return `${val}`;
//       }
//     }
//   };

//   return <Chart options={options} series={series} type="bar" height={350} />;
// };

// export default HorizontalBarOne;


import React from "react";
import Chart from "react-apexcharts";

const HorizontalBarOne = ({ labels, latency, title }) => {
  
  const maxValue = Math.max(...latency);

  const series = [
    {
      name: title,
      data: latency
    }
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        dataLabels: {
          position: "right",
        },
      },
    },
    xaxis: {
      categories: labels,
      min: 0,
      max: maxValue + 100, // Auto scale close to actual values
      labels: {
        formatter: (val) => `${val} ms`,
        style: { fontSize: "13px" },
      },
    },
    colors: ["#6A5BFF"],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val} ms`, // show real metric clearly
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value} ms`
      }
    },
    legend: { show: false },
  };

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default HorizontalBarOne;
