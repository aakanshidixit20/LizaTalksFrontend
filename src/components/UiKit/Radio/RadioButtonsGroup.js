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

const RadioButtonsGroup = () => {
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
          Radio Buttons Group
        </Typography>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              className="dark-radio"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
              className="dark-radio"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other"
              className="dark-radio"
            />
          </RadioGroup>
        </FormControl>
      </Card>
    </>
  );
};

export default RadioButtonsGroup;
