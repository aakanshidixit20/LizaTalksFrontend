"use client";

import React from "react";
import { Card, Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";

const IconButtonColors = () => {
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
          Icon Button Colors
        </Typography>

        <Box
          sx={{
            display: "flex",
            alingItems: "center",
            gap: "10px",
          }}
        >
          <IconButton aria-label="fingerprint" color="secondary">
            <Fingerprint />
          </IconButton>
          <IconButton aria-label="fingerprint" color="success">
            <Fingerprint />
          </IconButton>
        </Box>
      </Card>
    </>
  );
};

export default IconButtonColors;
