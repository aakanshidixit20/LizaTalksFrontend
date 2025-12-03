"use client";

import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";

const ButtonSizes = () => {
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
          Button Sizes
        </Typography>

        <Box sx={{ "& button": { m: 1 } }}>
          <div>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
          <div>
            <Button variant="outlined" size="small">
              Small
            </Button>
            <Button variant="outlined" size="medium">
              Medium
            </Button>
            <Button variant="outlined" size="large">
              Large
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              size="small"
              sx={{ color: "#fff !important" }}
            >
              Small
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{ color: "#fff !important" }}
            >
              Medium
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ color: "#fff !important" }}
            >
              Large
            </Button>
          </div>
        </Box>
      </Card>
    </>
  );
};

export default ButtonSizes;
