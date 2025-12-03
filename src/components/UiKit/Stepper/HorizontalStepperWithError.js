"use client";

import React from "react";
import { Card, Typography, Box, Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Select campaign settings", "Create an ad group", "Create an ad"];

const HorizontalStepperWithError = () => {
  const isStepFailed = (step) => {
    return step === 1;
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
          Horizontal Stepper With Error
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={1}>
            {steps.map((label, index) => {
              const labelProps = {};
              if (isStepFailed(index)) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    Alert message
                  </Typography>
                );
                labelProps.error = true;
              }

              return (
                <Step key={label}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Card>
    </>
  );
};

export default HorizontalStepperWithError;
