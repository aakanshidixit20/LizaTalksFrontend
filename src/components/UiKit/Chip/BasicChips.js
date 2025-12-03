"use client";

import React from "react";
import { Card, Typography, Chip, Box } from "@mui/material";

const BasicChips = () => {
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
          Basic Chips
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Chip label="Chip Filled" />
          <Chip label="Chip Outlined" variant="outlined" />
        </Box>
      </Card>
    </>
  );
};

export default BasicChips;
