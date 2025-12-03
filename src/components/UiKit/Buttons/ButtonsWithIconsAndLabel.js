"use client";

import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const ButtonsWithIconsAndLabel = () => {
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
          Buttons With Icons And Label
        </Typography>

        <Box
          sx={{
            display: "flex",
            alingItems: "center",
            gap: "10px",
          }}
        >
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ color: "#fff !important" }}
          >
            Send
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default ButtonsWithIconsAndLabel;
