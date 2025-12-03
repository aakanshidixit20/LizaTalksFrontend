"use client";

import React from "react";
import { Card, Typography, Box, Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ColorCheckboxes = () => {
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
          Color Checkboxes
        </Typography>

        <Box>
          <Checkbox {...label} defaultChecked />
          <Checkbox {...label} defaultChecked color="secondary" />
          <Checkbox {...label} defaultChecked color="success" />
          <Checkbox {...label} defaultChecked color="default" />
          <Checkbox
            {...label}
            defaultChecked
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
        </Box>
      </Card>
    </>
  );
};

export default ColorCheckboxes;
