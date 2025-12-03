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

const OrganizationDetails = () => {
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
    

        <Grid
          container
          spacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
        >
          {/* Left column */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            {/* Organization Name */}
            <Box sx={{ mb: 2 }}>
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
                  Organization Name
                </Typography>
                <TextField
                  label="Enter Organization name"
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

            {/* Contact person */}
            <Box sx={{ mb: 2 }}>
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
                  Contact person
                </Typography>
                <TextField
                  label="Enter name"
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

            {/* Contact Phone Number */}
            <Box>
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
                  Contact Phone Number
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

          {/* Middle column */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            {/* Contact Email ID */}
            <Box sx={{ mb: 2 }}>
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
                  Contact Email ID
                </Typography>
                <TextField
                  label="Enter contact email"
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

            {/* Address */}
            <Box sx={{ mb: 2 }}>
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
                  Address
                </Typography>
                <TextField
                  label="Enter address"
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

            {/* Billing Email ID */}
            <Box>
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
                  Billing Email ID
                </Typography>
                <TextField
                  label="Enter billing email"
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

          {/* Notes (full width on small, tall box on large like your UI) */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} sx={{ mt: 2 }}>
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
                Client Notes
              </Typography>
              <TextField
                label="Enter Client Notes"
                multiline
                minRows={4}
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
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default OrganizationDetails;
