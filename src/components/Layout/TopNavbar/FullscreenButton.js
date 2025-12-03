"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";

const FullscreenButton = () => {
  const [setIsFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error(
            `Error attempting to disable full-screen mode: ${err.message} (${err.name})`
          );
        });
    }
  };

  return (
    <>
      <Button
        variant="text"
        sx={{
          width: "30px",
          height: "30px",
          padding: "5px",
          minWidth: "auto",
        }}
        className="fullscreen-btn text-body"
        onClick={handleToggleFullscreen}
      >
        <i className="material-symbols-outlined">fullscreen</i>
      </Button>
    </>
  );
};

export default FullscreenButton;
