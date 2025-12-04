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
  Chip,
  CircularProgress,
  Alert,
  Divider,
  TextField,
  Grid,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import config from "../../../../config";

const ManageLocationsModal = ({
  open,
  onClose,
  currentPlan,
  currentLocations = [], // Array of { store_type, zip_code }
  onSave,
  storeId,
}) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prorationData, setProrationData] = useState(null);
  const [fetchingProration, setFetchingProration] = useState(false);

  const currentQuantity = currentLocations.length;
  const newQuantity = locations.length;

  useEffect(() => {
    if (open) {
      // Initialize with current locations
      setLocations(
        currentLocations.map((loc) => ({
          store_type: loc.store_type || "",
          zip_code: loc.zip_code || "",
        }))
      );
      setProrationData(null);
    }
  }, [open, currentLocations]);

  // Fetch proration data when quantity changes
  useEffect(() => {
    if (open && newQuantity !== currentQuantity) {
      fetchProrationData(newQuantity);
    } else if (open && newQuantity === currentQuantity) {
      setProrationData(null);
    }
  }, [newQuantity, open]);

  const fetchProrationData = async (quantity) => {
    setFetchingProration(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const quantityDiff = quantity - currentQuantity;
      const isIncrease = quantityDiff > 0;
      const planAmount = parseFloat(currentPlan?.plan_amount || 100);
      const daysRemaining = 20; // Dummy value - should come from backend
      const daysInMonth = 30;

      const prorationAmount = Math.abs(
        (quantityDiff * planAmount * daysRemaining) / daysInMonth
      );

      const dummyProrationData = {
        is_upgrade: isIncrease,
        current_quantity: currentQuantity,
        new_quantity: quantity,
        quantity_change: quantityDiff,
        plan_amount: planAmount.toFixed(2),
        days_remaining: daysRemaining,
        proration_amount: prorationAmount.toFixed(2),
        due_today: isIncrease ? prorationAmount.toFixed(2) : "0.00",
        credit_applied: !isIncrease ? prorationAmount.toFixed(2) : "0.00",
        next_billing_amount: (quantity * planAmount).toFixed(2),
      };

      setProrationData(dummyProrationData);
    } catch (error) {
      console.error("Error fetching proration data:", error);
    } finally {
      setFetchingProration(false);
    }
  };

  const handleDecrease = () => {
    if (locations.length > 1) {
      setLocations(locations.slice(0, -1));
    }
  };

  const handleIncrease = () => {
    if (locations.length < 10) {
      setLocations([...locations, { store_type: "", zip_code: "" }]);
    }
  };

  const handleLocationChange = (index, field, value) => {
    const updated = [...locations];
    updated[index][field] = value;
    setLocations(updated);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Dummy API call to Sidglo for prorated charge
      console.log("🔄 Calling Sidglo API for prorated charge...");
      console.log("Store ID:", storeId);
      console.log("New Locations:", locations);
      console.log("Proration Data:", prorationData);

      // TODO: Replace with actual Sidglo API call
      // const response = await fetch(`${config.API_BASE_URL}/client/subscription/update-locations`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     store_id: storeId,
      //     locations: locations,
      //     proration_data: prorationData,
      //   }),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("✅ Sidglo API call successful (dummy)");

      await onSave(locations, prorationData);
    } catch (error) {
      console.error("❌ Error saving locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const isIncrease = newQuantity > currentQuantity;
  const isDecrease = newQuantity < currentQuantity;
  const hasChanges = newQuantity !== currentQuantity;

  // Validate all locations have both fields filled
  const isValid = locations.every(
    (loc) => loc.store_type.trim() !== "" && loc.zip_code.trim() !== ""
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Manage Locations
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          Adjust the number of locations on your {currentPlan?.plan_name || "Basic"} Plan
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2, pb: 0 }}>
        {/* Current Plan Info - Compact */}
        <Box sx={{ mb: 2, p: 1.5, backgroundColor: "#f9fafb", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {currentPlan?.plan_name || "Basic"} Plan
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ${currentPlan?.plan_amount || "0"} per location/month
              </Typography>
            </Box>
            <Chip
              label="Current plan"
              size="small"
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: "22px",
              }}
            />
          </Box>
        </Box>

        {/* Location Counter - Single Line Compact */}
        <Box sx={{ mb: 2, p: 1.5, backgroundColor: "#fff", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Locations
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentQuantity} currently in use
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                onClick={handleDecrease}
                disabled={locations.length <= 1}
                size="small"
                sx={{
                  border: "1px solid #e0e0e0",
                  width: "28px",
                  height: "28px",
                  "&:hover": { backgroundColor: "#f5f5f5", borderColor: "#1976d2" },
                  "&:disabled": { opacity: 0.4 },
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography variant="h6" fontWeight={600} sx={{ minWidth: "24px", textAlign: "center", fontSize: "1.1rem" }}>
                {locations.length}
              </Typography>
              <IconButton
                onClick={handleIncrease}
                disabled={locations.length >= 10}
                size="small"
                sx={{
                  border: "1px solid #e0e0e0",
                  width: "28px",
                  height: "28px",
                  "&:hover": { backgroundColor: "#f5f5f5", borderColor: "#1976d2" },
                  "&:disabled": { opacity: 0.4 },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          {locations.length >= 10 && (
            <Typography variant="caption" color="error" display="block" mt={1}>
              Maximum 10 locations allowed
            </Typography>
          )}
        </Box>

        {/* Location Details - Horizontal Layout with Scrollable Container */}
        <Box>
          <Typography variant="body2" fontWeight={600} mb={1.5}>
            Location Details
          </Typography>
          <Box
            sx={{
              maxHeight: "240px",
              overflowY: "auto",
              pr: 1,
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c1c1c1",
                borderRadius: "3px",
                "&:hover": {
                  backgroundColor: "#a8a8a8",
                },
              },
            }}
          >
            {locations.map((location, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1.5,
                  p: 1.5,
                  backgroundColor: "#fafafa",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={1}>
                  Location {index + 1}
                </Typography>
                <Box display="flex" gap={1.5}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Store Type"
                    value={location.store_type}
                    onChange={(e) =>
                      handleLocationChange(index, "store_type", e.target.value.slice(0, 100))
                    }
                    placeholder="e.g., Dispensary"
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#fff",
                      },
                    }}
                  />
                  <TextField
                    size="small"
                    label="Zip Code"
                    value={location.zip_code}
                    onChange={(e) => {
                      const val = e.target.value.trim().toUpperCase();
                      const zipPattern = /^[0-9]{0,5}(-[0-9]{0,4})?$/;
                      if (zipPattern.test(val)) {
                        handleLocationChange(index, "zip_code", val);
                      }
                    }}
                    placeholder="e.g., 12345"
                    inputProps={{ maxLength: 10 }}
                    sx={{
                      width: "140px",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#fff",
                      },
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>

      {/* Billing Summary - Always Visible Outside Scrollable Area */}
      {hasChanges && (
        <Box sx={{ px: 3, pb: 2, pt: 2, borderTop: "1px solid #e5e7eb", backgroundColor: "#fff" }}>
          {fetchingProration ? (
            <Box display="flex" justifyContent="center" alignItems="center" py={2}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Calculating proration...
              </Typography>
            </Box>
          ) : prorationData ? (
            <Box>
              <Typography variant="body2" fontWeight={600} mb={1.5}>
                💰 Billing Summary
              </Typography>

              {isIncrease && (
                <Alert
                  icon={<WarningAmberIcon />}
                  severity="warning"
                  sx={{
                    mb: 1.5,
                    py: 0.5,
                    backgroundColor: "#fff8e1",
                    color: "#f57c00",
                    fontSize: "0.85rem",
                    "& .MuiAlert-icon": { color: "#f57c00", fontSize: "1.2rem" },
                  }}
                >
                  Adding {prorationData.quantity_change} location{Math.abs(prorationData.quantity_change) !== 1 ? "s" : ""} will be prorated for the remaining {prorationData.days_remaining} days of your billing cycle.
                </Alert>
              )}

              {isDecrease && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 1.5,
                    py: 0.5,
                    fontSize: "0.85rem",
                    "& .MuiAlert-icon": { fontSize: "1.2rem" },
                  }}
                >
                  Removing {Math.abs(prorationData.quantity_change)} location{Math.abs(prorationData.quantity_change) !== 1 ? "s" : ""} will generate a credit of ${prorationData.credit_applied} applied to your next bill.
                </Alert>
              )}

              <Box
                sx={{
                  p: 1.5,
                  backgroundColor: "#f9fafb",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Current monthly billing
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${(prorationData.current_quantity * parseFloat(prorationData.plan_amount)).toFixed(2)}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    New monthly billing
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${prorationData.next_billing_amount}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                {isIncrease && (
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight={700}>
                      Due Today (Prorated)
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="primary"
                      sx={{ fontSize: "1.1rem" }}
                    >
                      ${prorationData.due_today}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ) : null}
        </Box>
      )}

      <DialogActions sx={{ px: 2.5, py: 2, gap: 1, backgroundColor: "#fafafa", borderTop: "1px solid #e5e7eb" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{
            minWidth: 90,
            textTransform: "none",
            borderColor: "#e0e0e0",
            color: "text.secondary",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isValid || loading || fetchingProration}
          sx={{
            minWidth: 120,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Save changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageLocationsModal;

