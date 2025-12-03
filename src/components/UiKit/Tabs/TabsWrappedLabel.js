"use client";

import React, { useState } from "react";
import { Card, Typography, Box, Tabs, Tab } from "@mui/material";

const TabsWrappedLabel = () => {
  const [value, setValue] = useState("one");

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
          Tabs Wrapped Label
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              value="one"
              label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
              wrapped
              sx={{ fontWeight: "600" }}
            />
            <Tab value="two" label="Item Two" sx={{ fontWeight: "600" }} />
            <Tab value="three" label="Item Three" sx={{ fontWeight: "600" }} />
          </Tabs>
        </Box>
      </Card>
    </>
  );
};

export default TabsWrappedLabel;
