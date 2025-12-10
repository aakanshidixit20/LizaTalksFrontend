import React from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MostRepeatedUserQueries = () => {
  const navigate = useNavigate();

  const [state] = React.useState({
    series: [
      {
        name: "Query Count",
        data: [400, 370, 348, 270, 250, 180, 150],
      },
    ],

    options: {
      chart: { type: "bar", height: 350, toolbar: { show: false } },
      colors: ["#6D5DD2"],
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          "Dispensary near me",
          "Sativa vs Indica",
          "THC percentage",
          "Medical card requirements",
          "Edible dosage",
          "Delivery options",
          "California weed laws",
        ],
      },
    },
  });

  return (
    <div>
      <h3 style={{ marginBottom: "8px", color: "#6D5DD2" }}>
        Most Repeated User Queries
      </h3>

      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />

      {/* VIEW DETAILS BUTTON */}
      <Button
        onClick={() =>
          navigate("most-repeated-user-queries/details")
        }
        variant="outlined"
        sx={{
          mt: 1.5,
          borderColor: "#6D5DD2",
          color: "#6D5DD2",
          textTransform: "none",
          width: "100%",
        }}
      >
        View Details →
      </Button>
    </div>
  );
};

export default MostRepeatedUserQueries;
