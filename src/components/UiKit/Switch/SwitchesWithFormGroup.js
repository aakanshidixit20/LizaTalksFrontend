"use client";

import React from "react";
import { Card, Typography, Box, Switch } from "@mui/material";
const label = { inputProps: { "aria-label": "Switch demo" } };

const SwitchesWithFormGroup = () => {
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
          Switches With Form Group
        </Typography>

        <Box>
          <Switch {...label} defaultChecked />
          <Switch {...label} />
          <Switch {...label} disabled defaultChecked />
          <Switch {...label} disabled />
        </Box>
      </Card>
    </>
  );
};

export default SwitchesWithFormGroup;
