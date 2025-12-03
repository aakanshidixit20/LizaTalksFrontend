"use client";

import React from "react";
import { Card, Typography, Tooltip, Button } from "@mui/material";

const ArrowTooltips = () => {
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
          Arrow Tooltips
        </Typography>

        <Tooltip title="Add" arrow>
          <Button>Arrow</Button>
        </Tooltip>
      </Card>
    </>
  );
};

export default ArrowTooltips;
