"use client";

import React from "react";
import { Card, Typography, CircularProgress, Box } from "@mui/material";

const CircularColor = () => {
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
          Circular Color
        </Typography>

        <Box
          sx={{
            display: "flex",
            alingItems: "center",
            gap: "20px",
          }}
        >
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </Box>
      </Card>
    </>
  );
};

export default CircularColor;
