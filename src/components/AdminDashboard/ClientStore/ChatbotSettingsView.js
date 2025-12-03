// ChatbotSettingsView.js
"use client";

import React from "react";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  TextField,
  Card,
} from "@mui/material";

const ChatbotSettingsView = ({ chatbotData }) => {
  return (
    <Box>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        {/* Header */}
        <Box sx={{ mb: "25px" }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700 }}
            className="text-black"
          >
            Chatbot Settings
          </Typography>
        </Box>

        <Grid container spacing={3} direction="column">
          {/* Chatbot Name */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: 500,
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
                className="text-black"
              >
                Chatbot Name
              </Typography>
              <TextField
                value={chatbotData?.chatbot_name || ""}
                variant="filled"
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    border: "1px solid #D5D9E2",
                    backgroundColor: "#fff",
                    borderRadius: "7px",
                  },
                }}
              />
            </FormControl>
          </Grid>

          {/* Welcome Message */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: 500,
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
                className="text-black"
              >
                Welcome Message
              </Typography>
              <TextField
                value={chatbotData?.chatbot_welcome_message || ""}
                variant="filled"
                multiline
                rows={3}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    border: "1px solid #D5D9E2",
                    backgroundColor: "#fff",
                    borderRadius: "7px",
                  },
                }}
              />
            </FormControl>
          </Grid>

          {/* Disclaimer Text */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: 500,
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
                className="text-black"
              >
                Disclaimer Text
              </Typography>
              <TextField
                value={chatbotData?.chatbot_disclaimer || ""}
                variant="filled"
                multiline
                rows={3}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    border: "1px solid #D5D9E2",
                    backgroundColor: "#fff",
                    borderRadius: "7px",
                  },
                }}
              />
            </FormControl>
          </Grid>

          {/* Note */}
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Note: If no text is entered, default disclaimer and welcome
              message will be applied.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ChatbotSettingsView;
