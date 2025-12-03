"use client";

import React, { useState } from "react";
import { Card, Box, Typography, Button, Snackbar } from "@mui/material";

const AutohideSnackbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
          Autohide Snackbar
        </Typography>

        <Box>
          <Button onClick={handleClick}>Open Snackbar</Button>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message="This Snackbar will be dismissed in 5 seconds."
          />
        </Box>
      </Card>
    </>
  );
};

export default AutohideSnackbar;
