"use client";

import React from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";

const StoreInfo = ({
  numLocations,
  setNumLocations,
  storeData,
  isEdit,
  storeName,
  setStoreName,
  storeTypes,
  setStoreTypes,
  zipCodes,
  setZipCodes,
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  storeUrl,
  setStoreUrl,
}) => {
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
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
            }}
            className="text-black"
          >
            Store Information
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Store Name */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
                className="text-black"
              >
                Store Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                label="Enter store name"
                variant="filled"
                required
                value={storeName}
                onChange={(e) => {
                  const val = e.target.value.slice(0, 100);
                  setStoreName(val);
                }}
                slotProps={{
                  htmlInput: {
                    maxLength: 100,
                  },
                }}
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
          </Grid>

          {/* Contact Person Name */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
                className="text-black"
              >
                Contact Person Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                label="Enter contact person name"
                variant="filled"
                required
                value={contactName}
                onChange={(e) => {
                  const val = e.target.value.slice(0, 100);
                  setContactName(val);
                }}
                slotProps={{
                  htmlInput: {
                    maxLength: 100,
                  },
                }}
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
          </Grid>

          {/* Contact Email ID */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
                className="text-black"
              >
                Contact Email ID <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                label="Enter contact email ID"
                type="email"
                variant="filled"
                required
                value={contactEmail}
                onChange={(e) => {
                  const val = e.target.value.slice(0, 100);
                  setContactEmail(val);
                }}
                slotProps={{
                  htmlInput: {
                    maxLength: 100,
                  },
                }}
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
          </Grid>

          {/* Store URL */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "10px",
                  display: "block",
                }}
                className="text-black"
              >
                Store URL <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                label="Enter store URL"
                type="url"
                variant="filled"
                required
                value={storeUrl}
                onChange={(e) => {
                  const val = e.target.value.slice(0, 100);
                  setStoreUrl(val);
                }}
                slotProps={{
                  htmlInput: {
                    maxLength: 100,
                  },
                }}
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
          </Grid>

          {/* Number of Locations - Only show in CREATE mode */}
          {!isEdit && (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <FormControl fullWidth>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Number of Locations <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  type="number"
                  label="Enter number of locations"
                  variant="filled"
                  required
                  inputProps={{ min: 1, max: 50 }}
                  value={
                    numLocations ||
                    (isEdit ? storeData?.locations?.length || "" : "")
                  }
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1 && value <= 50) {
                      setNumLocations(value);
                    } else if (e.target.value === "") {
                      setNumLocations(0);
                    }
                  }}
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
            </Grid>
          )}

          {/* Dynamic fields based on number of locations - Only show in CREATE mode */}
          {!isEdit && Array.from({ length: numLocations }, (_, index) => (
            <React.Fragment key={index}>
              {/* Store Type */}
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 6,
                  lg: 6,
                  xl: 6,
                }}
              >
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Store Type {index + 1}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    label={`Enter store type ${index + 1}`}
                    variant="filled"
                    required
                    value={storeTypes[index] ?? ""}
                    onChange={(e) => {
                      const val = e.target.value.slice(0, 100);
                      const next = [...storeTypes];
                      next[index] = val;
                      setStoreTypes(next);
                    }}
                    slotProps={{
                      htmlInput: {
                        maxLength: 100,
                      },
                    }}
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
              </Grid>

              {/* Location Zip Code */}
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 6,
                  lg: 6,
                  xl: 6,
                }}
              >
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Location Zip Code {index + 1}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    label={`Enter zip code ${index + 1}`}
                    variant="filled"
                    required
                    value={zipCodes[index] ?? ""}
                    onChange={(e) => {
                      let val = e.target.value.trim().toUpperCase();

                      // Strict US ZIP pattern (5 or 5-4)
                      const zipPattern = /^[0-9]{0,5}(-[0-9]{0,4})?$/;

                      if (zipPattern.test(val)) {
                        const next = [...zipCodes];
                        next[index] = val;
                        setZipCodes(next);
                      }
                    }}
                    slotProps={{
                      htmlInput: {
                        inputMode: "numeric",
                        maxLength: 10,
                        pattern: "^[0-9]{5}(?:-[0-9]{4})?$",
                        title:
                          "Enter a valid US ZIP Code (12345 or 12345-6789)",
                      },
                    }}
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
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default StoreInfo;