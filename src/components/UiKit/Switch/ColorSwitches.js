"use client";

import React from "react";
import { Card, Typography, Switch, Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

const ColorSwitches = () => {
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
          Color Switches
        </Typography>

        <Box>
          <Switch {...label} defaultChecked />
          <Switch {...label} defaultChecked color="secondary" />
          <Switch {...label} defaultChecked color="warning" />
          <Switch {...label} defaultChecked color="default" />
          <PinkSwitch {...label} defaultChecked />
        </Box>
      </Card>
    </>
  );
};

export default ColorSwitches;
