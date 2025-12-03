"use client";

import React from "react";
import {
  Card,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

const IntroDivider = () => {
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
          Intro Divider
        </Typography>

        <Card variant="outlined" sx={{ maxWidth: 360 }}>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="text-black"
              >
                Toothbrush
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="text-black"
              >
                $4.50
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              Pinstriped cornflower blue cotton blouse takes you on a walk to
              the park or just down the hall.
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="body2">
              Select type
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip color="primary" label="Soft" size="small" />
              <Chip label="Medium" size="small" />
              <Chip label="Hard" size="small" />
            </Stack>
          </Box>
        </Card>
      </Card>
    </>
  );
};

export default IntroDivider;
