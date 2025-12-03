"use client";

import React from "react";
import { Card, Typography, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const SimpleAlert = () => {
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
          Simple Alert
        </Typography>

        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          sx={{ fontSize: "14px", color: "success.main" }}
        >
          Here is a gentle confirmation that your action was successful.
        </Alert>
      </Card>
    </>
  );
};

export default SimpleAlert;
