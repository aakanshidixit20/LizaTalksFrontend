import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopConvertingProducts = () => {
  const [state, setState] = React.useState({
    series: [
      {
        data: [360, 330, 300, 270, 140],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
         
        ],
      },
    },
  });

  return (
    <div>
      <h3>Top Converting Products</h3>
      <div id="chart">
           
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default TopConvertingProducts;
