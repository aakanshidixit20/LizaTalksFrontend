"use client";

import React from "react";
import { Card, Typography, Chip, Box } from "@mui/material";

const ClickableAndDeletableChips = () => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
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
          Clickable And Deletable Chips
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Chip
            label="Clickable Deletable"
            onClick={handleClick}
            onDelete={handleDelete}
          />
          <Chip
            label="Clickable Deletable"
            variant="outlined"
            onClick={handleClick}
            onDelete={handleDelete}
          />
        </Box>
      </Card>
    </>
  );
};

export default ClickableAndDeletableChips;
