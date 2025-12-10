import React from "react";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const PRIMARY_PURPLE = "#6D5DD2";
const SECONDARY_PURPLE = "#9B8BFF";
const GREEN = "#33D6A6";

const DropoffKeywordInsights = ({ filter, preview, full }) => {
  const navigate = useNavigate();

  // -- existing dataset code --
  const datasets = {
    week: [12, 20, 14, 10, 6, 18, 9],
    month: [44, 55, 41, 37, 22, 43, 21],
    "3months": [120, 140, 110, 98, 90, 130, 95],
  };

  const resumedSessions = {
    week: [15, 18, 11, 17, 4, 14, 10],
    month: [53, 32, 33, 52, 13, 43, 32],
    "3months": [150, 130, 125, 160, 70, 140, 120],
  };

  const labels = [
    "Effects of Indica vs Sativa",
    "CBD oil for anxiety dosage",
    "Dispensary near me THC &CBD",
    "Difference between THC &CBD",
    "How to get a medical card",
    "[State] weed laws",
    "Best vape pens 2024",
  ];

  const chartData = datasets[filter] || datasets.month;
  const resumeData = resumedSessions[filter] || resumedSessions.month;

  const series = [
    { name: "Permanent Drop-off", data: chartData },
    { name: "Resumed Session", data: resumeData },
  ];

  const options = {
    chart: {
      stacked: true,
      toolbar: { show: false },
    },
    colors: [PRIMARY_PURPLE, GREEN],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
        borderRadius: 1,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: 600,
        colors: ["#fff"],
      },
    },
    xaxis: { categories: labels },
  };

  return (
    <div style={{ paddingTop: full ? "4px" : "0px" }}>
      {full && (
        <>
          <h3 style={{ color: PRIMARY_PURPLE, marginBottom: "4px" }}>
            Drop-off Keyword Insights
          </h3>
          <p style={{ opacity: 0.6, marginTop: 0 }}>
            User drop-offs vs resumed sessions by keyword.
          </p>

          {/* ⭐ VIEW DETAILS BUTTON */}
          <button
            onClick={() =>
              navigate("/analytics/conversation-analytics/drop-off-keyword-insights/details")
            }
            style={{
              marginTop: "6px",
              padding: "6px 12px",
              background: PRIMARY_PURPLE,
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            View Details →
          </button>
        </>
      )}

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={preview ? 220 : 350}
      />
    </div>
  );
};

export default DropoffKeywordInsights;


