import React from "react";
import Chart from "react-apexcharts";

const DonutChart = ({ labels, data, colors }) => {
  const options = {
    chart: {
      type: "donut",
      toolbar: { show: false }
    },
    labels,
    colors: colors || ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"],
    legend: {
      position: "bottom",
      fontSize: "14px",
      markers: {
        radius: 4
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "16px",
              fontWeight: 600,
              color: "#111827"
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true
    }
  };

  return <Chart options={options} series={data} type="donut" height={320} />;
};

export default DonutChart;
