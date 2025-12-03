"use client";

import React from "react";
import { Card, Typography, Box, Avatar } from "@mui/material";

const ImageAvatars = () => {
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
          Image Avatars
        </Typography>

        <Box
          sx={{
            display: "flex",
            alingItems: "center",
            gap: "10px",
          }}
        >
          <Avatar alt="Remy Sharp" src="/images/users/user1.jpg" />
          <Avatar alt="Travis Howard" src="/images/users/user2.jpg" />
          <Avatar alt="Cindy Baker" src="/images/users/user3.jpg" />
        </Box>
      </Card>
    </>
  );
};

export default ImageAvatars;
