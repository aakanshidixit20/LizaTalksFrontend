import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const HighClicksLowConversions = () => {
  const [state, setState] = React.useState({
    series: [
      {
        data: [350, 300, 248, 200, 140],
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
       colors: ["#FF0000"],
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
        <h3>High Clicks, Low Conversions</h3>
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

export default HighClicksLowConversions;
