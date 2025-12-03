"use client";

import React from "react";
import { Card, Typography, Chip, Box } from "@mui/material";

const ClickableChips = () => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

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
          Clickable Chips
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Chip label="Clickable" onClick={handleClick} />
          <Chip label="Clickable" variant="outlined" onClick={handleClick} />
        </Box>
      </Card>
    </>
  );
};

export default ClickableChips;
