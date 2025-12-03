"use client";

import React from "react";
import { Card, Typography, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NavigationIcon from "@mui/icons-material/Navigation";

const FloatingActionButtonSize = () => {
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
          Floating Action Button Size
        </Typography>

        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab size="small" color="secondary" aria-label="add">
            <AddIcon sx={{ color: "#fff !important" }} />
          </Fab>
          <Fab size="medium" color="secondary" aria-label="add">
            <AddIcon sx={{ color: "#fff !important" }} />
          </Fab>
          <Fab color="secondary" aria-label="add">
            <AddIcon sx={{ color: "#fff !important" }} />
          </Fab>
        </Box>

        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            sx={{ color: "#fff !important" }}
          >
            <NavigationIcon sx={{ mr: 1, color: "#fff !important" }} />
            Extended
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            sx={{ color: "#fff !important" }}
          >
            <NavigationIcon sx={{ mr: 1, color: "#fff !important" }} />
            Extended
          </Fab>
          <Fab
            variant="extended"
            color="primary"
            sx={{ color: "#fff !important" }}
          >
            <NavigationIcon sx={{ mr: 1, color: "#fff !important" }} />
            Extended
          </Fab>
        </Box>
      </Card>
    </>
  );
};

export default FloatingActionButtonSize;
