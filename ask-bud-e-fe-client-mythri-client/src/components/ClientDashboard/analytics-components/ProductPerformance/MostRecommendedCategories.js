import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const MostRecommendedCategories = () => {
  const [state, setState] = React.useState({
    series: [
      {
        data: [400, 380, 348, 270, 240],
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
      <div id="chart">
        <h3>Most Recommended Categories</h3>
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

export default MostRecommendedCategories;
