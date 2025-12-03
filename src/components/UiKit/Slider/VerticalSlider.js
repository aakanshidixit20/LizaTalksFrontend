"use client";

import React from "react";
import { Card, Typography, Stack, Slider } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 37,
    label: "37°C",
  },
  {
    value: 100,
    label: "100°C",
  },
];

const VerticalSlider = () => {
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
          Vertical Slider
        </Typography>

        <Stack sx={{ height: 300 }} spacing={1} direction="row">
        <Slider
            aria-label="Temperature"
            orientation="vertical"
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            defaultValue={30}
          />
          <Slider
            aria-label="Temperature"
            orientation="vertical"
            defaultValue={30}
            valueLabelDisplay="auto"
            disabled
          />
          <Slider
            getAriaLabel={() => "Temperature"}
            orientation="vertical"
            getAriaValueText={valuetext}
            defaultValue={[20, 37]}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </Stack>
      </Card>
    </>
  );
};

export default VerticalSlider;
