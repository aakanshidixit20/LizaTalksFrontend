"use client";

import React, { useRef, useState, useEffect } from "react";
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

const UserInfo = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  profilePicture,
  setProfilePicture
}) => {
  const fileRef = useRef(null);
  const [logoName, setLogoName] = useState("");
  const [logo, setLogo] = useState(null);
  const [imageError, setImageError] = useState(false);

    useEffect(() => {
    let objectUrl;
    setImageError(false); // Reset error state

    if (!profilePicture) {
      setLogo(null);
      setLogoName("");
      return;
    }
    if (typeof profilePicture === "string") {
      // prefilled URL from backend (avatar endpoint)
      setLogo(profilePicture);
      // Optional: show the tail of the URL as "Selected"
      try {
        const last = profilePicture.split("/").pop();
        if (last) setLogoName(last);
      } catch {
        setLogoName("");
      }
    } else if (profilePicture instanceof File) {
      objectUrl = URL.createObjectURL(profilePicture);
      setLogo(objectUrl);
      setLogoName(profilePicture.name || "selected-image");
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [profilePicture]);



  const openPicker = () => {
    console.log("Opening file picker...");
    fileRef.current?.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, GIF, etc.)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please select an image smaller than 5MB.");
        return;
      }

      setLogoName(file.name);
      setLogo(URL.createObjectURL(file));
      setProfilePicture(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, GIF, etc.)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please select an image smaller than 5MB.");
        return;
      }

      setLogoName(file.name);
      setLogo(URL.createObjectURL(file));
      setProfilePicture(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
          {/* Left: Logo upload */}
          <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }}>
            <input
              type="file"
              ref={fileRef}
              onChange={onFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />

            <Box
              onClick={openPicker}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
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
              {logo && !imageError ? (
                <Avatar
                  src={logo}
                  alt="Profile Picture"
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                  }}
                  slotProps={{
                    img: {
                      onError: () => {
                        console.error("Failed to load profile picture:", logo);
                        setImageError(true);
                      }
                    }
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
                onClick={(e) => {
                  e.stopPropagation();
                  openPicker();
                }}
              >
                Upload
              </Button>

              {logoName && (
                <Typography
                  variant="caption"
                  sx={{ mt: 1, display: "block" }}
                  className="text-black"
                >
                  Selected: {logoName}
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Right: Input fields */}
          <Grid size={{ xs: 12, sm: 12, md: 7, lg: 7, xl: 7 }}>
            {/* First Name */}
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <Typography
                  component="label"
                  sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }}
                  className="text-black"
                >
                  First Name <span style={{ color: "red" }}>*</span>
                </Typography>

                <TextField
                  label="Enter First Name"
                  variant="filled"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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

            {/* Last Name */}
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <Typography
                  component="label"
                  sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }}
                  className="text-black"
                >
                  Last Name <span style={{ color: "red" }}>*</span>
                </Typography>

                <TextField
                  label="Enter Last Name"
                  variant="filled"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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

            {/* User Email */}
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
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            {/* Password */}
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <Typography
                  component="label"
                  sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }}
                  className="text-black"
                >
                  Password <span style={{ color: "red" }}>*</span>
                </Typography>

                <TextField
                  label="Enter Password"
                  variant="filled"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
