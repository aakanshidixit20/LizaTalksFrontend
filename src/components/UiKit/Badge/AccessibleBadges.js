"use client";

import React from "react";
import { Card, Typography, Badge, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}

const AccessibleBadges = () => {
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
          Accessible Badges
        </Typography>

        <IconButton aria-label={notificationsLabel(100)}>
          <Badge badgeContent={100} color="primary">
            <MailIcon sx={{ fontSize: "25px" }} />
          </Badge>
        </IconButton>
      </Card>
    </>
  );
};

export default AccessibleBadges;
