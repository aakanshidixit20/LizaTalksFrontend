"use client";

import React from "react";
import { Card, Typography, Box } from "@mui/material";

const TypographyTypes = () => {
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
          Typography Types
        </Typography>

        <Box 
          sx={{ 
            width: "100%", 
            maxWidth: 500,

            'h1, h2, h3, h4, h5, h6': {
              fontWeight: 600
            }, 
          }}
        >
          <Typography variant="h1" gutterBottom>
            h1. Heading
          </Typography>

          <Typography variant="h2" gutterBottom>
            h2. Heading
          </Typography>

          <Typography variant="h3" gutterBottom>
            h3. Heading
          </Typography>

          <Typography variant="h4" gutterBottom>
            h4. Heading
          </Typography>

          <Typography variant="h5" gutterBottom>
            h5. Heading
          </Typography>

          <Typography variant="h6" gutterBottom>
            h6. Heading
          </Typography>

          <Typography variant="subtitle1" mb={2}>
            subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>

          <Typography variant="subtitle2" mb={2}>
            subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur
          </Typography>

          <Typography variant="body1" mb={2}>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>

          <Typography variant="body2" mb={2}>
            body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>

          <Typography variant="button" display="block" mb={2}>
            button text
          </Typography>

          <Typography variant="caption" display="block" mb={2}>
            caption text
          </Typography>

          <Typography variant="overline" display="block" mb={2}>
            overline text
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default TypographyTypes;
