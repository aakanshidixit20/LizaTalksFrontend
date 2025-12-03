"use client";
import React from "react";
import { Dialog, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SuccessDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: "12px", p: 2 } }}
    >
      <Box sx={{ position: "relative", textAlign: "center", py: 3 }}>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          Client Added Successfully
        </Typography>

        <CheckCircleOutlineIcon sx={{ fontSize: 48, color: "#22c55e" }} />
      </Box>
    </Dialog>
  );
};

export default SuccessDialog;
