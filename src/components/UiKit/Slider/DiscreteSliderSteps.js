"use client";

import React from "react";
import { Card, Typography, Box, Slider } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

const DiscreteSliderSteps = () => {
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
          Discrete Slider Steps
        </Typography>

        <Box>
          <Slider
            aria-label="Small steps"
            defaultValue={0.00000005}
            getAriaValueText={valuetext}
            step={0.00000001}
            marks
            min={-0.00000005}
            max={0.0000001}
            valueLabelDisplay="auto"
          />
        </Box>
      </Card>
    </>
  );
};

export default DiscreteSliderSteps;
