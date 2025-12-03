"use client";

import React from "react";
import { Card, Box, Typography, Radio } from "@mui/material";

const SizeRadioButtons = () => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
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
          Size Radio Buttons
        </Typography>

        <Box>
          <Radio {...controlProps("a")} size="small" className="dark-radio" />
          <Radio {...controlProps("b")} className="dark-radio" />
          <Radio
            {...controlProps("c")}
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 28,
              },
            }}
            className="dark-radio"
          />
        </Box>
      </Card>
    </>
  );
};

export default SizeRadioButtons;
