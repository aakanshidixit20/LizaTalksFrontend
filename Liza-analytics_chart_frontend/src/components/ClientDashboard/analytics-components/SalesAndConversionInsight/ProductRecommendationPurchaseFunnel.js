import React from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
 
const ProductRecommendationPurchaseFunnel = () => {
  const navigate = useNavigate();
 
  const [state] = React.useState({
    series: [
      {
        name: "Funnel Series",
        data: [1200, 600, 150],
      },
    ],
 
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
 
      plotOptions: {
        bar: {
          horizontal: true,
          isFunnel: true,
          barHeight: "48%",
          borderRadius: 6,
        },
      },
 
      // ⭐ Updated Graph Color (Trezo Purple)
      fill: {
        type: "solid",
        colors: ["#6f42c1", "#6f42c1", "#6f42c1"],
      },
 
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          const percentages = ["12.0%", "6.0%", "1.5%"];
          return percentages[opt.dataPointIndex];
        },
        style: {
          fontSize: "16px",
          fontWeight: 700,
          colors: ["#ffffff"],
        },
      },
 
      xaxis: {
        categories: [
          "Product Page Views",
          "Added to Cart",
          "Completed Purchase",
        ],
        max: 1500,
        labels: { show: false },
      },
 
      yaxis: {
        labels: { show: false },
      },
 
      grid: { show: false },
      legend: { show: false },
      tooltip: { enabled: false },
    },
  });
 
  return (
    <Box width="100%" p={0} display="flex" flexDirection="column" gap={3}>
     
      <Card sx={{ width: "100%", borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
        <CardContent>
         
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
           
            <Typography variant="h6" fontWeight={700} sx={{ color: "#1E1E1E" }}>
              Product Recommendation → Purchase Funnel
            </Typography>
 
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate("/analytics/product-funnel/details")}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "#6f42c1",
                "&:hover": { backgroundColor: "#5b34a0" },
              }}
            >
              View Details →
            </Button>
          </Box>
 
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
 
          <Box
            display="flex"
            justifyContent="space-around"
            mt={1.5}
            sx={{ fontSize: "14px", color: "#525252", fontWeight: 600 }}
          >
            <span>Product Page Views</span>
            <span>Added to Cart</span>
            <span>Completed Purchase</span>
          </Box>
 
        </CardContent>
      </Card>
 
    </Box>
  );
};
 
export default ProductRecommendationPurchaseFunnel;