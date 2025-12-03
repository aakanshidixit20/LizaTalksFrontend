"use client";

import React from "react";
import { Card, Typography, Chip, Box, Avatar } from "@mui/material";

const AvatarChips = () => {
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
          Avatar Chips
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
          <Chip
            avatar={<Avatar alt="Natacha" src="/images/users/user1.jpg" />}
            label="Avatar"
            variant="outlined"
          />
        </Box>
      </Card>
    </>
  );
};

export default AvatarChips;
