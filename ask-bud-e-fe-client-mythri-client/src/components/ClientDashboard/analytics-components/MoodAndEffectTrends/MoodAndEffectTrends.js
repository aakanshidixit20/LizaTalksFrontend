import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const MoodAndEffectTrends = () => {
  const [state, setState] = React.useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart" style={{ width: "350px", margin: "0 auto" }}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          width="100%"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default MoodAndEffectTrends;
