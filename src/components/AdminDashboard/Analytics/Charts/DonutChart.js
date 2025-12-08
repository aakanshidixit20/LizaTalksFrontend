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
              color: "#FFFFFF", // 🔥 text white
              formatter: (w) => {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
            value: {
              color: "#FFFFFF", // 🔥 white inner number
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
        colors: ["#fff"], // optional white % text
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
