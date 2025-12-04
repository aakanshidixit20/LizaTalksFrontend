// import React from "react";
// import Chart from "react-apexcharts";

// const DonutChart = ({ labels, data, colors }) => {
//   const options = {
//     chart: {
//       type: "donut",
//       toolbar: { show: false }
//     },
//     labels,
//     colors: colors || ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"],
//     legend: {
//       position: "bottom",
//     //   fontSize: "14px",
//       markers: {
//         radius: 4
//       }
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: "65%",
//           labels: {
//             show: true,
//             total: {
//               show: true,
//               label: "Total",
//               fontSize: "16px",
//               fontWeight: 600,
//               color: "#111827"
//             }
//           }
//         }
//       }
//     },
//     dataLabels: {
//       enabled: true
//     }
//   };

//   return <Chart options={options} series={data} type="donut" height={320} />;
// };

// export default DonutChart;


// import React from "react";
// import Chart from "react-apexcharts";

// const DonutChart = ({labels,data,title}) => {
//   const series = [35, 25, 20, 10, 10];

//   const options = {
//     labels: ["General Chat", "Orders", "Inquiry", "Returns", "Locator"],
//     colors: ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"],
//     legend: { position: "bottom" },
//   };

//   return <Chart options={options} series={series} type="donut" height={350} />;
// };

// export default DonutChart;


import React from "react";
import Chart from "react-apexcharts";

export default function DonutChart({ labels, data, title }) {
  const options = {
    labels: labels,
    legend: {
      position: "bottom",
      fontSize: "14px",
    },

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: (w) => {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
            value: {
              formatter: (value) => value
            }
          }
        }
      }
    },

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%";
      },
      style: {
        fontSize: "14px",
        fontWeight: "600",
        colors: ["#000"],
      },
    },

    tooltip: {
      y: {
        formatter: (value) => value
      },
    },

    colors: ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"]
  };

  const series = data;

  return <Chart options={options} series={series} type="donut" height={350} />;
}
