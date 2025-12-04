import React from "react";
import ReactApexChart from "react-apexcharts";

const ProductRecommendationPurchaseFunnel = () => {
  const [state] = React.useState({
    series: [
      {
        name: "Funnel Series",
        data: [1200, 600, 150], // 12%, 6%, 1.5%
      },
    ],

    options: {
      chart: {
        type: "bar",
        height: 350,
        dropShadow: { enabled: false },
        toolbar: { show: false },
      },

      plotOptions: {
        bar: {
          horizontal: true,
          isFunnel: true,
          barHeight: "45%", // creates spacing
          borderRadius: 4,
        },
      },

      fill: {
        type: "solid",
        colors: ["#4285F4", "#4285F4", "#4285F4"], // same color as your image
      },

      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          const percentages = ["12.0%", "6.0%", "1.5%"];
          return percentages[opt.dataPointIndex];
        },
        style: {
          fontSize: "18px",
          fontWeight: 700,
          colors: ["#fff"],
        },
      },

      xaxis: {
        categories: [
          "Product Page Views",
          "Added to Cart",
          "Completed Purchase",
        ],

        max: 1500, // scales bars proportionally
        labels: { show: false }, // hide axis labels
      },

      yaxis: {
        labels: { show: false }, // remove left labels
      },

      grid: { show: false },
      legend: { show: false },

      tooltip: { enabled: false },

      title: {
        text: "Product Recommendation → Purchase Funnel",
        align: "center",
        style: { fontSize: "18px", fontWeight: 600 },
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />

      {/* Labels below the funnels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "10px",
          fontSize: "14px",
          color: "#444",
        }}
      >
        <span>Product Page Views</span>
        <span>Added to Cart</span>
        <span>Completed Purchase</span>
      </div>
    </div>
  );
};

export default ProductRecommendationPurchaseFunnel;
