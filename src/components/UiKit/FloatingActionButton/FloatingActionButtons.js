"use client";

import React from "react";
import { Card, Typography, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";

const FloatingActionButtons = () => {
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
          Floating Action Buttons
        </Typography>

        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab color="primary" aria-label="add">
            <AddIcon sx={{ color: "#fff !important" }} />
          </Fab>
          <Fab color="secondary" aria-label="edit">
            <EditIcon sx={{ color: "#fff !important" }} />
          </Fab>
          <Fab variant="extended" sx={{ color: "#fff !important" }}>
            <NavigationIcon sx={{ mr: 1, color: "#fff !important" }} />
            Navigate
          </Fab>
          <Fab disabled aria-label="like">
            <FavoriteIcon sx={{ color: "#fff !important" }} />
          </Fab>
        </Box>
      </Card>
    </>
  );
};

export default FloatingActionButtons;
