"use client";

import React, { useState } from "react";
import { Card, Typography, Box, FormControlLabel, Switch } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";

const LoadingButtons = () => {
  const [loading, setLoading] = useState(true);

  function handleClick() {
    setLoading(true);
  }

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
          Loading Buttons
        </Typography>

        <div>
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                checked={loading}
                onChange={() => setLoading(!loading)}
                name="loading"
                color="primary"
              />
            }
            label="Loading"
          />
          <Box sx={{ "& > button": { m: 1 } }}>
            <LoadingButton
              size="small"
              onClick={handleClick}
              loading={loading}
              variant="outlined"
              disabled
            >
              <span>disabled</span>
            </LoadingButton>
            <LoadingButton
              size="small"
              onClick={handleClick}
              loading={loading}
              loadingIndicator="Loading…"
              variant="outlined"
            >
              <span>Fetch data</span>
            </LoadingButton>
            <LoadingButton
              size="small"
              onClick={handleClick}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
            <LoadingButton
              size="small"
              color="secondary"
              onClick={handleClick}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </LoadingButton>
          </Box>

          <Box sx={{ "& > button": { m: 1 } }}>
            <LoadingButton
              onClick={handleClick}
              loading={loading}
              variant="outlined"
              disabled
            >
              <span>disabled</span>
            </LoadingButton>
            <LoadingButton
              onClick={handleClick}
              loading={loading}
              loadingIndicator="Loading…"
              variant="outlined"
            >
              <span>Fetch data</span>
            </LoadingButton>
            <LoadingButton
              onClick={handleClick}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
            <LoadingButton
              color="secondary"
              onClick={handleClick}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </LoadingButton>
          </Box>
        </div>
      </Card>
    </>
  );
};

export default LoadingButtons;
