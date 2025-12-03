"use client";

import React from "react";
import { Card, Typography, Box, Slider } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

const DiscreteSlider = () => {
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
          Discrete Slider
        </Typography>

        <Box>
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={110}
          />
          <Slider
            defaultValue={30}
            step={10}
            marks
            min={10}
            max={110}
            disabled
          />
        </Box>
      </Card>
    </>
  );
};

export default DiscreteSlider;
