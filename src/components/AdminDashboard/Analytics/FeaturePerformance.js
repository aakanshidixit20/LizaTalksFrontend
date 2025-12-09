import React from "react";
import DropOffLineChart from "./Charts/DropOffLineChart"; 
import DonutChart from "./Charts/DonutChart";
import { Typography, Box, Button } from "@mui/material";
import { analyticsData } from "./Data/AnalyticsData";
import { useNavigate } from "react-router-dom";
import DateFilter from "./DateFilter";

export default function FeaturePerformance() {

  const navigate = useNavigate();

  const donutLabels = analyticsData.featurePerformance.featureUsageBreakdown.map(i => i.client);
  const donutData = analyticsData.featurePerformance.featureUsageBreakdown.map(
    i => i.usage.generalChat + i.usage.storeInquiry + i.usage.productSuggestion
  );

  return (
    <Box sx={{ mt: 3 }}>

     
    <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      width: "fit-content",
      whiteSpace: "nowrap",
    }}
  >
    {/* 🔥 Apna heading name yaha change karna */}
    Feature Drop-Off Trends 
  </Typography>

  <DateFilter />
</Box>

      {/* ▪ Line Chart Section */}
      <Box sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: "10px", background: "#fff", position: "relative" }}>
        
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "#6A5BFF",
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { background: "#5444ff" },
          }}
          onClick={() => navigate("/analytics/feature-performance/line-details")}
        >
          View Details →
        </Button>

        <Typography sx={{ fontWeight: 500, mb: 2 }}>
          Avg. duration between sessions over time
        </Typography>

        <DropOffLineChart />
      </Box>


      {/* ▪ Donut Chart Section */}
      <Box sx={{ mt: 5 }}>
        <Box sx={{ p: 3, border: "1px solid #E5E7EB", borderRadius: "10px", background: "#fff", position: "relative" }}>
          
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              right: 20,
              top: 20,
              background: "#6A5BFF",
              borderRadius: "8px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { background: "#5444ff" },
            }}
            onClick={() => navigate("/analytics/feature-performance/donut-details")}
          >
            View Details →
          </Button>

          <Typography sx={{ fontWeight: 500, mb: 2 }}>Feature Usage Overview</Typography>

          <DonutChart labels={donutLabels} data={donutData} title="Feature Usage Breakdown" />
        </Box>
      </Box>
    </Box>
  );
}
