"use client";
import React from "react";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  Radio,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Chip,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const innerCardContent = ({ plan, selectedPlan, handlePlanSelect }) => {
  return (
    <CardContent sx={{ display: "flex", alignItems: "center" }}>
      <Radio
        checked={selectedPlan === plan.plan_name}
        onChange={() => handlePlanSelect(plan.plan_name)}
        value={plan.plan_name}
      />
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {plan.plan_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${plan.plan_amount} / month
        </Typography>
      </Box>
    </CardContent>
  )
}

const SubscriptionTypeClean = ({
  numLocations = 1,
  selectedPlan,
  setSelectedPlan,
  enableFreeTrial,
  setEnableFreeTrial,
  plansData = [],
  isEdit = false,
  onEditLocations, // For edit mode - opens manage locations modal
  currentPlanData, // For edit mode - current plan info
}) => {
  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    // Reset free trial when switching away from Basic plan (only in create mode)
    if (!isEdit && planName !== "Basic") {
      setEnableFreeTrial(false);
    }
  };

  const handleFreeTrialChange = (event) => {
    setEnableFreeTrial(event.target.checked);
  };

  // Find current plan details from plansData
  const currentPlanDetails = plansData.find((p) => p.plan_name === selectedPlan);

  // Amount calculation: plan_amount * numLocations + tax (0% for now)
  const basePrice = currentPlanDetails ? parseFloat(currentPlanDetails.plan_amount) : 0;
  const totalAmount = basePrice * (numLocations || 1);
  const taxPercent = 0; // 0% tax for now
  const tax = totalAmount * (taxPercent / 100);
  const totalPayable = totalAmount + tax;

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700, mb: 2 }}
      >
        Choose Your Subscription
      </Typography>

      {/* Location Manager - Only in EDIT mode */}
      {isEdit && (
        <Box
          sx={{
            p: 2.5,
            mb: 3,
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                Locations
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentPlanData?.plan_name} Plan - ${currentPlanData?.plan_amount} per location per month
              </Typography>
            </Box>
            <Chip
              label="Current Plan"
              size="small"
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: 600,
              }}
            />
          </Box>

          <Box
            sx={{
              p: 2,
              backgroundColor: "#fff",
              borderRadius: "6px",
              border: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={600} mb={0.5}>
                Current Locations
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {numLocations} location{numLocations !== 1 ? "s" : ""} in use
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={onEditLocations}
              sx={{
                textTransform: "none",
                borderColor: "#e0e0e0",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Edit Locations
            </Button>
          </Box>
        </Box>
      )}

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Left Side - Plan Selection */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            {plansData && plansData.length > 0 ? (
              plansData.map((plan) => (
                <Card
                  key={plan.plan_id}
                  onClick={() => handlePlanSelect(plan.plan_name)}
                  sx={{
                    mb: 2,
                    border:
                      selectedPlan === plan.plan_name
                        ? "2px solid var(--primaryColor)"
                        : "1px solid var(--borderColor)",
                    borderRadius: "7px",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "var(--primaryColor)",
                    },
                  }}
                >
                  {innerCardContent({ plan, selectedPlan, handlePlanSelect })}
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Loading plans...
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Right Side - Pricing Summary */}
        <Grid size={{ xs: 12, md: 6 }}>
          {currentPlanDetails ? (
            <Box
              sx={{
                p: 3,
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "7px",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "14px",
                  mb: 2,
                  color: "black",
                }}
              >
                Pricing Summary
              </Typography>

              {/* Price + Interval */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ fontSize: "22px" }}
                >
                  ${currentPlanDetails.plan_amount}
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 0.5 }}
                  >
                    / month (per location)
                  </Typography>
                </Typography>
              </Box>

              {/* Details */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Plan Selected
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {currentPlanDetails.plan_name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No. of Locations
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {numLocations || 1}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Amount
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${totalAmount.toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Taxes ({taxPercent}%)
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    ${tax.toFixed(2)}
                  </Typography>
                </Box>

                {/* Free Trial Checkbox - Only for Basic Plan in CREATE mode */}
                {!isEdit && currentPlanDetails.plan_name === "Basic" && (
                  <Box sx={{ mt: 2, mb: 2, p: 1.5, backgroundColor: "#f0f7ff", borderRadius: "5px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={enableFreeTrial}
                          onChange={handleFreeTrialChange}
                        />
                      }
                      label={
                        <Typography variant="body2">
                          Enable 14 days free trial. Start paying after the trial period ends.
                        </Typography>
                      }
                    />
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    pt: 2,
                    borderTop: "1px solid #e5e7eb",
                  }}
                >
                  <Typography variant="body1" fontWeight={700}>
                    Total Payable
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    ${totalPayable.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Please select a plan to view details.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubscriptionTypeClean;