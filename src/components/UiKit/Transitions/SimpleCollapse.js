"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Switch,
  Paper,
  Collapse,
  FormControlLabel,
} from "@mui/material";

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);

const SimpleCollapse = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

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
          Simple Collapse
        </Typography>

        <Box sx={{ height: 300 }}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show"
          />
          <Box
            sx={{
              "& > :not(style)": {
                display: "flex",
                justifyContent: "space-around",
                height: 120,
                width: 250,
              },
            }}
          >
            <div>
              <Collapse in={checked}>{icon}</Collapse>
              <Collapse in={checked} collapsedSize={40}>
                {icon}
              </Collapse>
            </div>
            <div>
              <Box sx={{ width: "50%" }}>
                <Collapse orientation="horizontal" in={checked}>
                  {icon}
                </Collapse>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Collapse
                  orientation="horizontal"
                  in={checked}
                  collapsedSize={40}
                >
                  {icon}
                </Collapse>
              </Box>
            </div>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default SimpleCollapse;
