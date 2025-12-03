"use client";

import React from "react";
import {
  Card,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const FormControlLabelPosition = () => {
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
          Form Control Label Position
        </Typography>

        <FormControl component="fieldset">
          <FormLabel component="legend">Label placement</FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="top"
              control={<Checkbox className="dark-check" />}
              label="Top"
              labelPlacement="top"
            />
            <FormControlLabel
              value="start"
              control={<Checkbox className="dark-check" />}
              label="Start"
              labelPlacement="start"
            />
            <FormControlLabel
              value="bottom"
              control={<Checkbox className="dark-check" />}
              label="Bottom"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="end"
              control={<Checkbox className="dark-check" />}
              label="End"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>
      </Card>
    </>
  );
};

export default FormControlLabelPosition;
