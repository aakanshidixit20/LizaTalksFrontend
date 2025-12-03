// StoreInfoView.js
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

const StoreInfoView = ({ storeData }) => {
  console.log("storeData", storeData);
  return (
    <Box component="form">
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          mb: "30px",
          padding: { xs: "18px", sm: "22px", lg: "28px" },
          border: "1px solid #E6E8EB",
          background: "#FFFFFF",
        }}
      >
        <Box sx={{ mb: "25px" }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Store Information
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Store Name */}
          <Grid size={{xs: 12, sm: 12, md: 12, lg: 12, xl: 12}}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  fontSize: "14px",
                  mb: "8px",
                }}
              >
                Store Name <span style={{ color: "red" }}>*</span>
              </Typography>

              <TextField
                variant="filled"
                value={storeData?.store_name}
                InputProps={{ readOnly: true, disableUnderline: true }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    border: "1px solid #D5D9E2",
                    height: "48px",
                  },

                  // ⭐⭐ FIX — text left + vertical center ⭐⭐
                  "& .MuiInputBase-input": {
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                  },
                }}
              />
            </FormControl>
          </Grid>

          {/* Contact Person Name */}
          <Grid size ={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  fontSize: "14px",
                  mb: "8px",
                }}
              >
                Contact Person Name <span style={{ color: "red" }}>*</span>
              </Typography>

              <TextField
                variant="filled"
                value={storeData?.contact_person_name || ""}
                InputProps={{ readOnly: true, disableUnderline: true }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    border: "1px solid #D5D9E2",
                    height: "48px",
                  },

                  "& .MuiInputBase-input": {
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                  },
                }}
              />
            </FormControl>
          </Grid>

          {/* Contact Email */}
          <Grid size ={{xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  fontSize: "14px",
                  mb: "8px",
                }}
              >
                Contact Email ID <span style={{ color: "red" }}>*</span>
              </Typography>

              <TextField
                variant="filled"
                value={storeData?.contact_email_id || ""}
                InputProps={{ readOnly: true, disableUnderline: true }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    border: "1px solid #D5D9E2",
                    height: "48px",
                  },

                  "& .MuiInputBase-input": {
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                  },
                }}
              />
            </FormControl>
          </Grid>

          {/* Store URL */}
          <Grid  size ={{xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <FormControl fullWidth>
              <Typography
                component="label"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  fontSize: "14px",
                  mb: "8px",
                }}
              >
                Store URL <span style={{ color: "red" }}>*</span>
              </Typography>

              <TextField
                variant="filled"
                value={storeData?.domain_url || ""}
                InputProps={{ readOnly: true, disableUnderline: true }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    border: "1px solid #D5D9E2",
                    height: "48px",
                  },

                  "& .MuiInputBase-input": {
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                  },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default StoreInfoView;
