"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      className="footer-area"
      sx={{
        textAlign: "center",
        bgcolor: "#fff",
        borderRadius: "7px 7px 0 0",
        padding: "20px 25px",
        marginTop: "auto", // 👈 pushes footer to bottom if space is left
      }}
    >
      <Typography>
        © 2025 <span className="text-purple">Liza Talks</span> | For informational purposes only — Not Medical Advice
      </Typography>
    </Box>
  );
};

export default Footer;
