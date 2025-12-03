"use client";

import React, { useState } from "react";
import { Card, Box, Typography, Radio } from "@mui/material";
import { pink } from "@mui/material/colors";

const ColorRadioButtons = () => {
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

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
          Color Radio Buttons
        </Typography>

        <Box>
          <Radio {...controlProps("a")} />
          <Radio {...controlProps("b")} color="secondary" />
          <Radio {...controlProps("c")} color="success" />
          <Radio {...controlProps("d")} color="default" />
          <Radio
            {...controlProps("e")}
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

export default ColorRadioButtons;
