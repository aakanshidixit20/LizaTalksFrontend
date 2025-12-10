import React from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserAcquisitionRetentionTrends = () => {
  const navigate = useNavigate();

  const series = [
    { name: "New Users", data: [31, 40, 28, 51, 42, 109, 100] },
    { name: "Returning Users", data: [11, 32, 45, 32, 34, 52, 41] },
  ];

  const options = {
    chart: { type: "area", height: 350, toolbar: { show: false } },
    colors: ["#6D5DD2", "#33D6A6"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.35, opacityTo: 0.1 },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    grid: { strokeDashArray: 4 },
  };

  return (
    <div>
      <h3 style={{ color: "#6D5DD2", marginBottom: "6px" }}>
        User Acquisition & Retention Trends
      </h3>
      <p style={{ marginTop: 0, opacity: 0.6 }}>
        New vs Returning Users Daily Volume
      </p>

      <ReactApexChart options={options} series={series} type="area" height={350} />

      {/* 🔗 View Details Button */}
      <Button
        onClick={() => navigate("user-acquisition-retention-trends/details")}
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "#6D5DD2",
          textTransform: "none",
          "&:hover": { backgroundColor: "#5A4BCB" },
        }}
      >
        View Details
      </Button>
    </div>
  );
};

export default UserAcquisitionRetentionTrends;
