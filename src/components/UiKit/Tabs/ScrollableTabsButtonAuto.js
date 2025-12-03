"use client";

import React, { useState } from "react";
import { Card, Typography, Box, Tabs, Tab } from "@mui/material";

const ScrollableTabsButtonAuto = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          Scrollable Tabs Button Auto
        </Typography>

        <Box sx={{ maxWidth: { xs: 320, sm: 480 } }} className="bg-white">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Item One" sx={{ fontWeight: "600" }} />
            <Tab label="Item Two" sx={{ fontWeight: "600" }} />
            <Tab label="Item Three" sx={{ fontWeight: "600" }} />
            <Tab label="Item Four" sx={{ fontWeight: "600" }} />
            <Tab label="Item Five" sx={{ fontWeight: "600" }} />
            <Tab label="Item Six" sx={{ fontWeight: "600" }} />
            <Tab label="Item Seven" sx={{ fontWeight: "600" }} />
          </Tabs>
        </Box>
      </Card>
    </>
  );
};

export default ScrollableTabsButtonAuto;
