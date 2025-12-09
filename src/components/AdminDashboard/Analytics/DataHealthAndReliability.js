import React from "react";
import HorizontalBarOne from "./Charts/HorizontalBarOne";
import { Typography, Box, Button } from "@mui/material";
import { analyticsData } from "./Data/AnalyticsData";
import { useNavigate } from "react-router-dom";
import DateFilter from "./DateFilter";

export default function DataHealthAndReliability() {

  // 🚀 Navigation hook (important)
  const navigate = useNavigate();

  const labels = analyticsData.clients;
  const latency = analyticsData.trainingPerformanceInsights.apiResponseLatency.map(
    i => i.avgLatencyMs
  );

  return (
    <>
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
    Product Sync Frequency
  </Typography>

  <DateFilter />
</Box>

      <Box
        sx={{
          p: 3,
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          background: "#fff",
          position: "relative",
        }}
      >
        {/* 🔹 View Details Button */}
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "#6A5BFF",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { background: "#5444ff" },
          }}
          onClick={() => {
            console.log("View Details clicked");
            navigate("/analytics/data-health/details");
          }}
        >
          View Details →
        </Button>

        <Typography sx={{ fontWeight: 500, mb: 2 }}>
          Monthly Sync Volume
        </Typography>

        {/* 🔹 Chart Component */}
        <HorizontalBarOne
          labels={labels}
          latency={latency}
          title="Avg Latency (ms)"
        />
      </Box>
    </>
  );
}
