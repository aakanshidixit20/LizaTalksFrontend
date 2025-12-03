"use client";

import React from "react";
import { Card, Typography, Alert, Stack } from "@mui/material";

const FilledAlerts = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
          }}
          className="text-black"
        >
          Filled Alerts
        </Typography>

        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            variant="filled"
            severity="success"
            sx={{ color: "#fff", fontSize: "14px" }}
          >
            This is a filled success Alert.
          </Alert>

          <Alert
            variant="filled"
            severity="info"
            sx={{ color: "#fff", fontSize: "14px" }}
          >
            This is a filled info Alert.
          </Alert>

          <Alert
            variant="filled"
            severity="warning"
            sx={{ color: "#fff", fontSize: "14px" }}
          >
            This is a filled warning Alert.
          </Alert>

          <Alert variant="filled" severity="error" sx={{ fontSize: "14px" }}>
            This is a filled error Alert.
          </Alert>
        </Stack>
      </Card>
    </>
  );
};

export default FilledAlerts;
