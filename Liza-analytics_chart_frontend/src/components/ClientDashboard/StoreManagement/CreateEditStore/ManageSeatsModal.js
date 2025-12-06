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
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import config from "../../../../config";

const ManageSeatsModal = ({
  open,
  onClose,
  currentPlan,
  currentQuantity,
  onSave,
  subscriptionId,
}) => {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [loading, setLoading] = useState(false);
  const [prorationData, setProrationData] = useState(null);
  const [fetchingProration, setFetchingProration] = useState(false);

  useEffect(() => {
    if (open) {
      setQuantity(currentQuantity);
      setProrationData(null);
    }
  }, [open, currentQuantity]);

  // Fetch proration data when quantity changes
  useEffect(() => {
    if (open && quantity !== currentQuantity) {
      fetchProrationData(quantity);
    }
  }, [quantity, open]);

  const fetchProrationData = async (newQuantity) => {
    setFetchingProration(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${config.API_BASE_URL}/client/subscription/calculate-proration`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     subscription_id: subscriptionId,
      //     change_type: "quantity",
      //     new_quantity: newQuantity,
      //   }),
      // });
      // const result = await response.json();

      // Dummy response for now
      await new Promise((resolve) => setTimeout(resolve, 500));

      const quantityDiff = newQuantity - currentQuantity;
      const isIncrease = quantityDiff > 0;
      const planAmount = parseFloat(currentPlan?.plan_amount || 100);
      const daysRemaining = 20; // Dummy value
      const daysInMonth = 30;

      const prorationAmount = Math.abs(
        (quantityDiff * planAmount * daysRemaining) / daysInMonth
      );

      const dummyProrationData = {
        is_upgrade: isIncrease,
        current_quantity: currentQuantity,
        new_quantity: newQuantity,
        quantity_change: quantityDiff,
        plan_amount: planAmount.toFixed(2),
        days_remaining: daysRemaining,
        proration_amount: prorationAmount.toFixed(2),
        due_today: isIncrease ? prorationAmount.toFixed(2) : "0.00",
        credit_applied: !isIncrease ? prorationAmount.toFixed(2) : "0.00",
        next_billing_amount: (newQuantity * planAmount).toFixed(2),
      };

      setProrationData(dummyProrationData);
    } catch (error) {
      console.error("Error fetching proration data:", error);
    } finally {
      setFetchingProration(false);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(quantity, prorationData);
    setLoading(false);
  };

  const isIncrease = quantity > currentQuantity;
  const isDecrease = quantity < currentQuantity;
  const hasChanges = quantity !== currentQuantity;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Manage Locations
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Current Plan Info */}
        <Box sx={{ mb: 3, p: 2, backgroundColor: "#f9fafb", borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Plan
            </Typography>
            <Chip
              label={currentPlan?.plan_name || "Basic"}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            ${currentPlan?.plan_amount || "0"} per location per month
          </Typography>
        </Box>

        {/* Location Counter */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>
            Number of Locations
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
            <IconButton
              onClick={handleDecrease}
              disabled={quantity <= 1}
              sx={{
                border: "2px solid #e0e0e0",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h4" fontWeight={600} sx={{ minWidth: "60px", textAlign: "center" }}>
              {quantity}
            </Typography>
            <IconButton
              onClick={handleIncrease}
              sx={{
                border: "2px solid #e0e0e0",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={1}>
            Currently using: {currentQuantity} location{currentQuantity !== 1 ? "s" : ""}
          </Typography>
        </Box>

        {/* Proration Preview */}
        {hasChanges && (
          <>
            <Divider sx={{ my: 2 }} />
            {fetchingProration ? (
              <Box display="flex" justifyContent="center" py={3}>
                <CircularProgress size={24} />
              </Box>
            ) : prorationData ? (
              <Box>
                <Typography variant="subtitle2" fontWeight={600} mb={2}>
                  Billing Summary
                </Typography>

                {isIncrease && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Adding {prorationData.quantity_change} location{Math.abs(prorationData.quantity_change) !== 1 ? "s" : ""} will be prorated for the remaining {prorationData.days_remaining} days of your billing cycle.
                  </Alert>
                )}

                {isDecrease && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Removing {Math.abs(prorationData.quantity_change)} location{Math.abs(prorationData.quantity_change) !== 1 ? "s" : ""} will generate a credit of ${prorationData.credit_applied} applied to your next bill.
                  </Alert>
                )}

                <Box sx={{ p: 2, backgroundColor: "#f9fafb", borderRadius: 2 }}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      Current: {prorationData.current_quantity} × ${prorationData.plan_amount}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${(prorationData.current_quantity * parseFloat(prorationData.plan_amount)).toFixed(2)}/mo
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="text.secondary">
                      New: {prorationData.new_quantity} × ${prorationData.plan_amount}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${prorationData.next_billing_amount}/mo
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  {isIncrease && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" fontWeight={600}>
                        Due Today (Prorated)
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="primary">
                        ${prorationData.due_today}
                      </Typography>
                    </Box>
                  )}
                  {isDecrease && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" fontWeight={600}>
                        Credit Applied
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="success.main">
                        ${prorationData.credit_applied}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            ) : null}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!hasChanges || loading || fetchingProration}
        >
          {loading ? <CircularProgress size={24} /> : isIncrease ? "Add Locations" : "Remove Locations"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageSeatsModal;