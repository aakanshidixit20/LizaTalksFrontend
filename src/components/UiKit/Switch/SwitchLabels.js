"use client";

import React from "react";
import {
  Card,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const SwitchLabels = () => {
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
          Switch Labels
        </Typography>

        <FormGroup>
          <FormControlLabel control={<Switch defaultChecked />} label="Label" />
          <FormControlLabel required control={<Switch />} label="Required" />
          <FormControlLabel disabled control={<Switch />} label="Disabled" />
        </FormGroup>
      </Card>
    </>
  );
};

export default SwitchLabels;
