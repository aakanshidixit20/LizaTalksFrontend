"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddLocationDetailsModal = ({
  open,
  onClose,
  onSave,
  numberOfNewLocations,
  existingStoreTypes,
  existingZipCodes,
}) => {
  const [newStoreTypes, setNewStoreTypes] = useState([]);
  const [newZipCodes, setNewZipCodes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && numberOfNewLocations > 0) {
      // Initialize arrays for new locations
      setNewStoreTypes(Array(numberOfNewLocations).fill(""));
      setNewZipCodes(Array(numberOfNewLocations).fill(""));
      setErrors({});
    }
  }, [open, numberOfNewLocations]);

  const validateZipCode = (zipCode) => {
    const zipPattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    return zipPattern.test(zipCode);
  };

  const handleStoreTypeChange = (index, value) => {
    const updated = [...newStoreTypes];
    updated[index] = value;
    setNewStoreTypes(updated);

    // Clear error for this field
    if (errors[`storeType_${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`storeType_${index}`];
      setErrors(newErrors);
    }
  };

  const handleZipCodeChange = (index, value) => {
    const updated = [...newZipCodes];
    updated[index] = value;
    setNewZipCodes(updated);

    // Clear error for this field
    if (errors[`zipCode_${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`zipCode_${index}`];
      setErrors(newErrors);
    }
  };

  const handleSave = () => {
    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    newStoreTypes.forEach((type, index) => {
      if (!type.trim()) {
        newErrors[`storeType_${index}`] = "Store type is required";
        hasErrors = true;
      }
    });

    newZipCodes.forEach((zip, index) => {
      if (!zip.trim()) {
        newErrors[`zipCode_${index}`] = "Zip code is required";
        hasErrors = true;
      } else if (!validateZipCode(zip)) {
        newErrors[`zipCode_${index}`] = "Invalid zip code format";
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Combine existing and new data
    const updatedStoreTypes = [...existingStoreTypes, ...newStoreTypes];
    const updatedZipCodes = [...existingZipCodes, ...newZipCodes];

    onSave(updatedStoreTypes, updatedZipCodes);
  };

  const existingCount = existingStoreTypes.length;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Add Location Details
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          Please provide store type and zip code for the {numberOfNewLocations} new location{numberOfNewLocations !== 1 ? "s" : ""}.
        </Alert>

        <Grid container spacing={3}>
          {Array.from({ length: numberOfNewLocations }).map((_, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" fontWeight={600} color="primary" mb={1}>
                  Location {existingCount + index + 1}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  component="label"
                  variant="body2"
                  fontWeight={500}
                  sx={{ display: "block", mb: 1 }}
                >
                  Store Type <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="e.g., Retail, Warehouse, Office"
                  value={newStoreTypes[index] || ""}
                  onChange={(e) => handleStoreTypeChange(index, e.target.value)}
                  error={!!errors[`storeType_${index}`]}
                  helperText={errors[`storeType_${index}`]}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#eeeeee" },
                      "&.Mui-focused": { backgroundColor: "#e8f4fd" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  component="label"
                  variant="body2"
                  fontWeight={500}
                  sx={{ display: "block", mb: 1 }}
                >
                  Zip Code <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="e.g., 12345 or 12345-6789"
                  value={newZipCodes[index] || ""}
                  onChange={(e) => handleZipCodeChange(index, e.target.value)}
                  error={!!errors[`zipCode_${index}`]}
                  helperText={errors[`zipCode_${index}`]}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#eeeeee" },
                      "&.Mui-focused": { backgroundColor: "#e8f4fd" },
                    },
                  }}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          Save & Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLocationDetailsModal;