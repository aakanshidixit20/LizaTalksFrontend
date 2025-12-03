"use client";

import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";

const ContainedButton = () => {
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
          Contained Button
        </Typography>

        <Box
          sx={{
            display: "flex",
            alingItems: "center",
            gap: "10px",
          }}
        >
          <Button variant="contained" sx={{ color: "#fff !important" }}>
            Contained
          </Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button
            variant="contained"
            href="#contained-buttons"
            sx={{ color: "#fff !important" }}
          >
            Link
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default ContainedButton;
