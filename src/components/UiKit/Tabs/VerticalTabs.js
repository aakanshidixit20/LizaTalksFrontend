"use client";

import React, { useState } from "react";
import { Card, Typography, Box, Tabs, Tab } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const VerticalTabs = () => {
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
          Vertical Tabs
        </Typography>

        <Box
          sx={{ flexGrow: 1, display: "flex", height: 224 }}
          className="bg-white"
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Item One" {...a11yProps(0)} sx={{ fontWeight: "600" }} />
            <Tab label="Item Two" {...a11yProps(1)} sx={{ fontWeight: "600" }} />
            <Tab label="Item Three" {...a11yProps(2)} sx={{ fontWeight: "600" }} />
            <Tab label="Item Four" {...a11yProps(3)} sx={{ fontWeight: "600" }} />
            <Tab label="Item Five" {...a11yProps(4)} sx={{ fontWeight: "600" }} />
            <Tab label="Item Six" {...a11yProps(5)} sx={{ fontWeight: "600" }} />
            <Tab label="Item Seven" {...a11yProps(6)} sx={{ fontWeight: "600" }} />
          </Tabs>

          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </Box>
      </Card>
    </>
  );
};

export default VerticalTabs;
