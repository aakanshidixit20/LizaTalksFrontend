"use client";

import React from "react";
import { Card, Typography, Box, Checkbox } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BasicCheckboxes = () => {
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
          Basic Checkboxes
        </Typography>

        <Box>
          <Checkbox {...label} defaultChecked />
          <Checkbox {...label} className="dark-check" />
          <Checkbox {...label} disabled className="dark-check" />
          <Checkbox {...label} disabled checked className="dark-check" />
        </Box>
      </Card>
    </>
  );
};

export default BasicCheckboxes;
