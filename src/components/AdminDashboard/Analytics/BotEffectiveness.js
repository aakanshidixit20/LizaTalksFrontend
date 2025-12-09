import React from "react";
import { Paper, Typography, Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import LineChart from "../Analytics/Charts/LineChart";
import BarChartGradient from "../Analytics/Charts/BarChartGradient";
import HorizontalBar from "../Analytics/Charts/HorizontalBar";
import DateFilter from "./DateFilter";

import { analyticsData } from "../Analytics/Data/AnalyticsData";

export default function BotEffectiveness() {
  const navigate = useNavigate();

  const labels = analyticsData.clients;

  const engagementRate =
    analyticsData.botEffectiveness.engagementRatePerClient.map(
      (i) => i.engagementRate
    );
  const creditsSpent =
    analyticsData.botEffectiveness.engagementRatePerClient.map(
      (i) => i.creditsSpent
    );
  const conversionRate =
    analyticsData.botEffectiveness.conversionRatePerClient.map(
      (i) => i.conversionRate
    );
  const fallbackRate =
    analyticsData.botEffectiveness.fallbackErrorRatePerClient.map(
      (i) => i.errorCount
    );

  const totalCredits = creditsSpent.reduce((a, b) => a + b, 0);

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
      margin: 0,  
    }}
  >
    {/* 🔥 Apna heading name yaha change karna */}
    Enagement Rate per Client
  </Typography>

  <DateFilter />
</Box>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
  variant="h6"
  sx={{
    mb: 3,
    fontWeight: 600,
    width: "fit-content",
    display: "inline-block",
    whiteSpace: "nowrap"
  }}
>
  API Response Latency
</Typography>

          <Button
            onClick={() => navigate("/analytics/bot-effectiveness/table")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              color: "white",
              borderRadius: "8px",
              px: 2,
              py: "6px",
              border: "1px solid #CBC4FF",
              background: "#6A5BFF",
              "&:hover": {
                // // background: "#5444ff",
                // borderColor: "#8B82FF",
              },
            }}
          >
            View Details →
          </Button>
          {/* <Button
          variant="contained"
          onClick={() => navigate("/analytics/bot-effectiveness/details")}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "#6A5BFF",
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          View Details →
        </Button> */}
          {/* <Button
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
                    onClick={() => navigate("/analytics/bot-effectiveness/table")}
                  >
                    View Details →
                  </Button> */}
        </Box>

        <Grid
          container
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6}>
            Client
          </Grid>
          <Grid item xs={6} textAlign="right">
            Credits
          </Grid>
        </Grid>

        {analyticsData.botEffectiveness.engagementRatePerClient.map(
          (item, index) => (
            <Grid
              container
              key={index}
              sx={{
                py: 1.3,
                borderBottom:
                  index !==
                  analyticsData.botEffectiveness.engagementRatePerClient
                    .length -
                    1
                    ? "1px solid #EEE"
                    : "none",
                  display: "flex",
                  justifyContent: "space-between",
              }}
            >
              <Grid item xs={6}>
                <Typography fontSize="15px" fontWeight={500}>
                  {item.client}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  fontSize="15px"
                  fontWeight={600}
                  color="grey"
                  textAlign="right"
                >
                  {item.creditsSpent.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          )
        )}

        <Grid container sx={{ py: 1.5, mt: 1.5, borderTop: "2px solid #ddd" , display: "flex", justifyContent: "space-between"}}>
          <Grid item xs={6}>
            <Typography fontSize="15px" fontWeight={700}>
              Total
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              fontSize="15px"
              fontWeight={800}
              color="grey"
              textAlign="right"
            >
              {totalCredits.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, position: "relative" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/analytics/bot-effectiveness/details")}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "#6A5BFF",
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          View Details →
        </Button>

        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Conversion Rate per Client
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Percentage of successful conversions per client.
        </Typography>

        <BarChartGradient
          labels={labels}
          data={conversionRate}
          title="Conversion Rate (%)"
        />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, position: "relative" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/analytics/bot-effectiveness/fallback-details")}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            background: "#6A5BFF",
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          View Details →
        </Button>

        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Fallback / Error Rate per Client
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Errors and fallback triggers observed for each client.
        </Typography>

        <HorizontalBar
          labels={labels}
          data={fallbackRate}
          title="Fallback/Error Rate"
        />
      </Paper>
    </Box>
  );
}
