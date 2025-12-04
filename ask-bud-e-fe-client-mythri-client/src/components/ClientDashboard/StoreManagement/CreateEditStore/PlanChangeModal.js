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
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import config from "../../../../config";

const PlanChangeModal = ({
  open,
  onClose,
  currentPlan,
  newPlan,
  currentQuantity,
  onConfirm,
  subscriptionId,
  storeId,
}) => {
  const [loading, setLoading] = useState(false);
  const [prorationData, setProrationData] = useState(null);
  const [fetchingProration, setFetchingProration] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && newPlan && currentPlan && storeId) {
      fetchProrationData();
    }
  }, [open, newPlan, currentPlan, storeId]);

  const fetchProrationData = async () => {
    setFetchingProration(true);
    setError(null);
    try {
      // Call real proration API
      const url = `${config.API_BASE_V2_URL}/subscriptions/proration?store_id=${storeId}&current_plan_id=${currentPlan.plan_id}&new_plan=${newPlan.plan_name}&current_plan_amount=${currentPlan.plan_amount}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch proration`);
      }

      const result = await response.json();
      console.log("Proration API response:", result);

      // API returns: { difference, is_refund, effective_today }
      const currentAmount = parseFloat(currentPlan?.plan_amount);
      const newAmount = parseFloat(newPlan?.plan_amount);
      const isUpgrade = newAmount > currentAmount;
      const adjustedAmount = parseFloat(result.difference || 0);
      const isRefund = result.is_refund || false;

      const currentMonthlyTotal = currentAmount * currentQuantity;
      const newMonthlyTotal = newAmount * currentQuantity;

      const prorationDataFormatted = {
        is_upgrade: isUpgrade,
        current_plan_name: currentPlan?.plan_name || "Basic",
        new_plan_name: newPlan?.plan_name || "Premium",
        current_plan_amount: currentAmount.toFixed(2),
        new_plan_amount: newAmount.toFixed(2),
        quantity: currentQuantity,
        proration_amount: adjustedAmount.toFixed(2),
        due_today: isUpgrade ? adjustedAmount.toFixed(2) : "0.00",
        credit_applied: isRefund ? adjustedAmount.toFixed(2) : "0.00",
        next_billing_amount: newMonthlyTotal.toFixed(2),
        current_monthly_total: currentMonthlyTotal.toFixed(2),
        new_monthly_total: newMonthlyTotal.toFixed(2),
        adjusted_amount: adjustedAmount,
        is_refund: isRefund,
      };

      setProrationData(prorationDataFormatted);
    } catch (err) {
      console.error("Error fetching proration data:", err);
      setError(err.message || "Failed to calculate proration. Please try again.");
    } finally {
      setFetchingProration(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(newPlan, prorationData);
    setLoading(false);
  };

  const isUpgrade = prorationData?.is_upgrade;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            Change Subscription Plan
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Plan Comparison */}
        <Box sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
            <Box sx={{ textAlign: "center" }}>
              <Chip
                label={currentPlan?.plan_name || "Basic"}
                size="small"
                variant="outlined"
              />
              <Typography variant="h6" fontWeight={600} mt={1}>
                ${currentPlan?.plan_amount || "0"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                per location/month
              </Typography>
            </Box>

            <ArrowForwardIcon color="action" />

            <Box sx={{ textAlign: "center" }}>
              <Chip
                label={newPlan?.plan_name || "Premium"}
                size="small"
                color={isUpgrade ? "success" : "warning"}
              />
              <Typography variant="h6" fontWeight={600} mt={1}>
                ${newPlan?.plan_amount || "0"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                per location/month
              </Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center">
            <Chip
              label={isUpgrade ? "Upgrade" : "Downgrade"}
              size="small"
              color={isUpgrade ? "success" : "warning"}
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>

        {/* Proration Details */}
        {fetchingProration ? (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress size={24} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : prorationData ? (
          <>
            <Divider sx={{ my: 2 }} />

            {isUpgrade && (
              <Alert severity="info" sx={{ mb: 2 }}>
                You’re upgrading to <strong>{prorationData.new_plan_name}</strong>.
                A prorated amount of <strong>${prorationData.due_today}</strong>
                will be charged for the remaining days of your current billing cycle.
                The new plan’s features will be <strong>applied immediately</strong>.
              </Alert>
            )}

            {!isUpgrade && (
              <Alert severity="success" sx={{ mb: 2 }}>
                You’re downgrading to <strong>{prorationData.new_plan_name}</strong>.
                A refund of <strong>${prorationData.credit_applied}</strong>
                will be issued for the unused days of your previous plan.
                The new plan’s features and limits will take effect <strong>immediately</strong>.
              </Alert>
            )}

            <Box>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>
                Billing Summary
              </Typography>

              <Box sx={{ p: 2, backgroundColor: "#f9fafb", borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Current: {currentQuantity} × ${prorationData.current_plan_amount}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${prorationData.current_monthly_total}/mo
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    New: {currentQuantity} × ${prorationData.new_plan_amount}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${prorationData.new_monthly_total}/mo
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                {isUpgrade && (
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" fontWeight={600}>
                      Due Today (Prorated)
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      ${prorationData.due_today}
                    </Typography>
                  </Box>
                )}
                {!isUpgrade && (
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

              {isUpgrade && parseFloat(prorationData.due_today) > 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  You will be redirected to payment to complete the upgrade.
                </Alert>
              )}
            </Box>
          </>
        ) : null}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={loading || fetchingProration}
          color={isUpgrade ? "primary" : "warning"}
        >
          {loading ? <CircularProgress size={24} /> : `Confirm ${isUpgrade ? "Upgrade" : "Downgrade"}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanChangeModal;