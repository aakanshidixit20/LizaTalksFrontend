"use client";

import React from "react";
import { Card, Typography, Badge, Box } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

const MaximumValue = () => {
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
          Maximum Value
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Badge color="primary" badgeContent={99}>
            <MailIcon sx={{ fontSize: "25px" }} />
          </Badge>
          <Badge color="primary" badgeContent={100}>
            <MailIcon sx={{ fontSize: "25px" }} />
          </Badge>
          <Badge color="primary" badgeContent={1000} max={999}>
            <MailIcon sx={{ fontSize: "25px" }} />
          </Badge>
        </Box>
      </Card>
    </>
  );
};

export default MaximumValue;
