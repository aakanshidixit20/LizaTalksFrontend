"use client";

import React from "react";
import {
  Card,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";

const ClientCredentials = ({ email, password, loginId, credentialsReady }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/client-login/${loginId}`
    );
  };

  return (
    <Box component="form">
      <p style={{ color: 'light-red' }}><b>This information can be accessed after adding client in the system.</b></p>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        {/* Client Email */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px" }}>
              Client Email
            </Typography>
            <TextField
              value={email || ""}
              placeholder="Client email will appear here"
              InputProps={{ readOnly: true }}
              variant="filled"
              sx={{
                "& .MuiInputBase-root": {
                  border: "1px solid #D5D9E2",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "7px",
                },
              }}
            />
          </FormControl>
        </Box>

        {/* Client Password */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px" }}>
              Client Password
            </Typography>
            <TextField
              value={password || ""}
              placeholder="Generated after client creation"
              InputProps={{ readOnly: true }}
              variant="filled"
              sx={{
                "& .MuiInputBase-root": {
                  border: "1px solid #D5D9E2",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "7px",
                },
              }}
            />
          </FormControl>
        </Box>

        {/* Client Login ID */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px" }}>
              Client Login ID
            </Typography>
            <TextField
              value={loginId || ""}
              placeholder="Generated after client creation"
              InputProps={{ readOnly: true }}
              variant="filled"
              sx={{
                "& .MuiInputBase-root": {
                  border: "1px solid #D5D9E2",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "7px",
                },
              }}
            />
          </FormControl>
        </Box>

        {/* Copy Link + Send Email */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            Copy Login Link
          <Tooltip title="Copy Login Link">
            <IconButton color="primary" onClick={copyLink} disabled={!credentialsReady}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>

         
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
         <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            disabled={!credentialsReady}
          >
            Send Email to Client
          </Button>
          </Box>
      </Card>
    </Box>
  );
};

export default ClientCredentials;
