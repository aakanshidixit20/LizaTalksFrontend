"use client";

import React, { useRef, useState } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UserInfo = () => {
  const fileRef = useRef(null);
  const [logoName, setLogoName] = useState("");
  const [logo, setLogo] = useState(null);

  const openPicker = () => fileRef.current?.click();
  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setLogoName(f.name);
  };

  return (
    <Box component="form">
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
            User Information
          </Typography>
        </Box>

        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          {/* Left: fields */}


          {/* Right: Logo upload (same pattern as Add Client) */}
          <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>

            <Box
              sx={{

                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 220,
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "#fafafa",
                },
              }}
            >

              {logo ? (
                <Avatar
                  src={logo}
                  alt="Logo"
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    bgcolor: "#f0f0f0",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 50, color: "primary.main" }} />
                </Avatar>
              )}

              <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
                Click or drag to upload logo
              </Typography>

              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                sx={{ textTransform: "none", borderRadius: "7px" }}
              >
                Upload
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }}>
            {/* Username */}
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <Typography
                  component="label"
                  sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }}
                  className="text-black"
                >
                  Username <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  label="Enter Username"
                  variant="filled"
                  required
                  sx={{
                    "& .MuiInputBase-root": {
                      border: "1px solid #D5D9E2",
                      backgroundColor: "#fff",
                      borderRadius: "7px",
                    },
                    "& .MuiInputBase-root::before": { border: "none" },
                    "& .MuiInputBase-root:hover::before": { border: "none" },
                  }}
                />
              </FormControl>
            </Box>

            {/* User Email ID */}
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <Typography
                  component="label"
                  sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }}
                  className="text-black"
                >
                  User Email ID <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  label="Enter User Email ID"
                  variant="filled"
                  required
                  sx={{
                    "& .MuiInputBase-root": {
                      border: "1px solid #D5D9E2",
                      backgroundColor: "#fff",
                      borderRadius: "7px",
                    },
                    "& .MuiInputBase-root::before": { border: "none" },
                    "& .MuiInputBase-root:hover::before": { border: "none" },
                  }}
                />
              </FormControl>
            </Box>

            {/* Phone */}
            <Box>
              <FormControl fullWidth>
                <Typography
                  component="label"
                  sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }}
                  className="text-black"
                >
                  User Phone Number
                </Typography>
                <TextField
                  label="Enter Phone Number"
                  variant="filled"
                  sx={{
                    "& .MuiInputBase-root": {
                      border: "1px solid #D5D9E2",
                      backgroundColor: "#fff",
                      borderRadius: "7px",
                    },
                    "& .MuiInputBase-root::before": { border: "none" },
                    "& .MuiInputBase-root:hover::before": { border: "none" },
                  }}
                />
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default UserInfo;
