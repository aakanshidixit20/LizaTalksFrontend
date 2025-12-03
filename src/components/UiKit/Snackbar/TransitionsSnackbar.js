"use client";

import React, { useState } from "react";
import { Card, Box, Typography, Button, Snackbar, Fade, Slide, Grow } from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

const TransitionsSnackbar = () => {
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
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
          Transitions Snackbar
        </Typography>

        <Box>
          <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
          <Button onClick={handleClick(Fade)}>Fade Transition</Button>
          <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
          <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            message="I love snacks"
            key={state.Transition.name}
            autoHideDuration={1200}
          />
        </Box>
      </Card>
    </>
  );
};

export default TransitionsSnackbar;
