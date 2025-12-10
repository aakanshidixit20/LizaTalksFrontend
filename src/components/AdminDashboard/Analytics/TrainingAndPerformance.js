import React from "react";
import { Typography, Box, Button } from "@mui/material";
import DateFilter from "./DateFilter";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BarChart from "./Charts/BarChart";
 
export default function TrainingAndPerformance() {
  // Dummy synced dataset (same on Details page)
  const rows = [
    { client: "Alpha Retail", store: "Flagship Store", latency: 250 },
    { client: "Beta Corp", store: "Online Store", latency: 310 },
    { client: "Gamma Styles", store: "Kiosk K2", latency: 180 },
    { client: "Delta Home", store: "Mobile App", latency: 450 },
    { client: "Epsilon Tech", store: "Web Portal", latency: 290 },
    { client: "Zeta App", store: "Main App", latency: 220 },
    { client: "Eta Direct", store: "Direct API", latency: 350 },
  ];
 
  const labels = rows.map((r) => `${r.client} - ${r.store}`);
  const latency = rows.map((r) => r.latency);
 
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
     <Typography
  variant="h6"
  sx={{
    fontWeight: 600,
    whiteSpace: "nowrap",     // ⭐ Prevent break
    display: "inline-block",  // ⭐ Keep in one line
  }}
>
  API Response Latency
</Typography>

        <DateFilter />
      </Box>
 
      <Box
        sx={{
          p: 3,
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={{ fontWeight: 500 }}>Latency by Client</Typography>
 
          <Button
            component={RouterLink}
            to="/analytics/training-performance/details"
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
            sx={{
              backgroundColor: "#6A5BFF",
              color: "#fff",
              borderRadius: "8px",
              px: 2,
              "&:hover": { backgroundColor: "#5A4DE0" },
            }}
          >
            View Details
          </Button>
        </Box>
 
        <BarChart labels={labels} data={latency} title="Avg Latency (ms)" />
      </Box>
    </>
  );
}
 