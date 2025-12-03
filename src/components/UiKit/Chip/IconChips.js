"use client";

import React from "react";
import { Card, Typography, Chip, Box } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

const IconChips = () => {
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
          Icon Chips
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Chip icon={<FaceIcon />} label="With Icon" />
          <Chip icon={<FaceIcon />} label="With Icon" variant="outlined" />
        </Box>
      </Card>
    </>
  );
};

export default IconChips;
