"use client";

import React from "react";
import {
  Card,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const RowRadioButtonsGroup = () => {
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
          Row Radio Buttons Group
        </Typography>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio className="dark-radio" />}
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={<Radio className="dark-radio" />}
              label="Male"
            />
            <FormControlLabel
              value="other"
              control={<Radio className="dark-radio" />}
              label="Other"
            />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio className="dark-radio" />}
              label="other"
            />
          </RadioGroup>
        </FormControl>
      </Card>
    </>
  );
};

export default RowRadioButtonsGroup;
