import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BarChartGradient from "./Charts/BarChartGradient";
import LineChart from "./Charts/LineChart";
import HorizontalBar from "./Charts/HorizontalBar";

import { analyticsData } from "./Data/AnalyticsData";

export default function BotEffectiveness() {
  const navigate = useNavigate();

  const labels = analyticsData.clients;

  const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(i => i.engagementRate);
  const creditsSpent = analyticsData.botEffectiveness.engagementRatePerClient.map(i => i.creditsSpent);
  const conversionRate = analyticsData.botEffectiveness.conversionRatePerClient.map(i => i.conversionRate);
  const fallbackRate = analyticsData.botEffectiveness.fallbackErrorRatePerClient.map(i => i.errorCount);

  return (
    <Box sx={{ mt: 3 }}>

      {/* ------- Engagement Rate ------- */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: "12px", position: "relative" }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Engagement Rate per Client
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Credits spent vs engagement rate per client.
        </Typography>

        <Box sx={{ position: "relative", height: 350 }}>
          <LineChart labels={labels} data={engagementRate} title="Engagement Rate (%)" />
          <Box sx={{ position: "absolute", top: 0, width: "100%", opacity: 0.35 }}>
            <BarChartGradient labels={labels} data={creditsSpent} title="Credits Spent" />
          </Box>
        </Box>
      </Paper>

      {/* ------- Conversion Rate ------- */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: "12px", position: "relative" }}>
        
        {/* 🔥 COLOR SYNCED BUTTON */}
        <Button
          variant="contained"
          onClick={() => navigate("/analytics/bot-effectiveness/details")}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            background: "#8B5CF6",
            boxShadow: "0px 4px 12px rgba(139,92,246,0.25)",
            transition: "0.2s",
            "&:hover": {
              background: "#7C3AED",
              boxShadow: "0px 6px 16px rgba(124,58,237,0.35)",
            },
          }}
        >
          View Details →
        </Button>

        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Conversion Rate per Client
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Scroll to view all clients
        </Typography>

        <BarChartGradient labels={labels} data={conversionRate} title="Conversion Rate (%)" />
      </Paper>

      {/* ------- Fallback/Error Rate ------- */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Fallback/Error Rate per Client
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Errors and fallback triggers observed for each client.
        </Typography>

        <HorizontalBar labels={labels} data={fallbackRate} title="Fallback/Error Rate" />
      </Paper>

    </Box>
  );
}
