"use client";

import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";

const ColorButton = () => {
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
          Color Button
        </Typography>

        <Box
          sx={{
            display: "flex",
            alingItems: "center",
            gap: "10px",
          }}
        >
          <Button color="secondary">Secondary</Button>
          <Button variant="contained" color="success" sx={{ color: "#fff !important" }}>
            Success
          </Button>
          <Button variant="outlined" color="error">
            Error
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default ColorButton;
