// "use client";

// import React, { useEffect } from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Chip,
// } from "@mui/material";

// // STATIC PLAN LIST
//  const STATIC_PLANS = [
//   { plan_id: 1, plan_name: "Premium", plan_amount: "19.99", credits: 10000, next_billing_date: "Dec 28, 2025" },
//   { plan_id: 2, plan_name: "Professional", plan_amount: "49.99", credits: 25000, next_billing_date: "Dec 28, 2025" },
//   { plan_id: 3, plan_name: "Enterprise", plan_amount: "99.99", credits: 50000, next_billing_date: "Dec 28, 2025" },
// ];

// // const innerCardContentView = ({ plan }) => {
// //   if (!plan) return null;

// //   return (
// //     <CardContent sx={{ display: "flex", alignItems: "center" }}>
// //       <Box>
// //         <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
// //           {plan.plan_name}
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary">
// //           ${plan.plan_amount} / month
// //         </Typography>
// //       </Box>
// //     </CardContent>
// //   );
// // };

// const SubscriptionTypeView = ({
//   selectedPlan,
//   numLocations,
//   plansData,
//   currentPlanData, // not used here, could be removed
// }) => {
//   // Find current plan details safely
//   const currentPlanDetails = STATIC_PLANS.find(
//     (p) => p.plan_name === selectedPlan
//   );
//   console.log("Current Plan Details:", STATIC_PLANS);
//   console.log("Plans Data:", plansData);
//   console.log("Selected Plan:", selectedPlan);
//   if (!currentPlanDetails) {
//     return (
//       <Box sx={{ width: "100%", mt: 3 }}>
//         <Typography variant="body1" color="error">
//           No subscription plan selected or plan not found.
//         </Typography>
//       </Box>
//     );
//   }

//   const basePrice = parseFloat(currentPlanDetails.plan_amount) || 0;
//   const totalAmount = basePrice * (numLocations || 1);
//   const taxPercent = 0; // adjust if needed
//   const tax = totalAmount * (taxPercent / 100);
//   const totalPayable = totalAmount + tax;

//   return (
//     <Box sx={{ width: "100%", mt: 3 }}>
//       {/* CURRENT SUBSCRIPTION */}
//       <Box
//         sx={{
//           border: "1px solid #e5e7eb",
//           borderRadius: "7px",
//           p: 2,
//           mb: 3,
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box>
//             <Typography variant="subtitle1" fontWeight={700}>
//               Current Subscription
//             </Typography>

//             <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//               {currentPlanDetails.plan_name} — ${currentPlanDetails.plan_amount}
//               /mo
//             </Typography>

//             <Box
//               sx={{
//                 mt: 2,
//                 p: 1.2,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "7px",
//                 width: "220px",
//               }}
//             >
//               <Typography variant="body2" fontWeight={600}>
//                 Current Locations
//               </Typography>

//               <Typography variant="body2" color="text.secondary">
//                 {numLocations || 1} total
//               </Typography>
//             </Box>
//           </Box>

//           {/* <Button variant="outlined" color="primary" sx={{ height: "36px" }}>
//             Edit Locations
//           </Button> */}
//         </Box>
//       </Box>

//       <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//         {/* LEFT SIDE: BASIC PLAN ONLY */}
//         {/* <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               mb: 2,
//               border: "2px solid var(--primaryColor)",
//               borderRadius: "7px",
//             }}
//           >
//             {innerCardContentView({ plan: currentPlanDetails })}
//           </Card>
//         </Grid> */}

//         {/* RIGHT SIDE: SUBSCRIPTION SUMMARY */}
//         <Grid item xs={12} md={6}>
//           <Box
//             sx={{
//               p: 3,
//               border: "1px solid #e5e7eb",
//               borderRadius: "7px",
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 textAlign: "center",
//                 fontWeight: 600,
//                 fontSize: "14px",
//                 mb: 2,
//               }}
//             >
//               Subscription Summary
//             </Typography>

//             {/* PRICE */}
//             <Box sx={{ textAlign: "center", mb: 3 }}>
//               <Typography variant="h5" fontWeight={700}>
//                 ${currentPlanDetails.plan_amount}
//                 <Typography
//                   component="span"
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ ml: 0.5 }}
//                 >
//                   / month
//                 </Typography>
//               </Typography>
//             </Box>

//             {/* DETAILS */}
//             <Box>
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}
//               >
//                 <Typography color="text.secondary">Selected Plan</Typography>
//                 <Typography fontWeight={600}>{currentPlanDetails.plan_name}</Typography>
//               </Box>

//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}
//               >
//                 <Typography color="text.secondary">Credits (tokens)</Typography>
//                 <Typography fontWeight={600}>
//                   {currentPlanDetails.credits ?? "N/A"}
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}
//               >
//                 <Typography color="text.secondary">Price</Typography>
//                 <Typography fontWeight={600}>
//                   ${currentPlanDetails.plan_amount}
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}
//               >
//                 <Typography color="text.secondary">Next Billing Date</Typography>
//                 <Typography fontWeight={600}>
//                   {currentPlanDetails.next_billing_date ?? "N/A"}
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   mt: 2,
//                   pt: 2,
//                   borderTop: "1px solid #e5e7eb",
//                 }}
//               >
//                 <Typography fontWeight={700}>Status</Typography>
//                 <Chip label="Active" color="success" size="small" />
//               </Box>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default SubscriptionTypeView;
// ------------------------------------------ working code below ------------------------------------------


// "use client";

// import React from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   Chip,
// } from "@mui/material";

// const SubscriptionTypeView = ({
//   plansData, // your API response object
// }) => {
//   const currentPlanDetails = plansData;

//   if (!currentPlanDetails) {
//     return (
//       <Box sx={{ width: "100%", mt: 3 }}>
//         <Typography variant="body1" color="error">
//           No subscription plan data found.
//         </Typography>
//       </Box>
//     );
//   }

//   // Extract values correctly
//   const numLocations = currentPlanDetails.number_of_locations || 1;
//   const credits = currentPlanDetails.tokens_per_credit;
//   const price = currentPlanDetails.total_amount; // cents as-is
//   const nextBillingDate = currentPlanDetails.next_due_date
//     ? new Date(currentPlanDetails.next_due_date).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       })
//     : "N/A";

//   return (
//     <Box sx={{ width: "100%", mt: 3 }}>
//       {/* CURRENT SUBSCRIPTION */}
//       <Box
//         sx={{
//           border: "1px solid #e5e7eb",
//           borderRadius: "7px",
//           p: 2,
//           mb: 3,
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Box>
//             <Typography variant="subtitle1" fontWeight={700}>
//               Current Subscription
//             </Typography>

//             <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//               {currentPlanDetails.plan_name} — {price}¢/mo
//             </Typography>

//             <Box
//               sx={{
//                 mt: 2,
//                 p: 1.2,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "7px",
//                 width: "220px",
//               }}
//             >
//               <Typography variant="body2" fontWeight={600}>
//                 Current Locations
//               </Typography>

//               <Typography variant="body2" color="text.secondary">
//                 {numLocations} total
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//         {/* RIGHT SIDE: SUBSCRIPTION SUMMARY */}
//         <Grid item xs={12} md={6}>
//           <Box
//             sx={{
//               p: 3,
//               border: "1px solid #e5e7eb",
//               borderRadius: "7px",
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 textAlign: "center",
//                 fontWeight: 600,
//                 fontSize: "14px",
//                 mb: 2,
//               }}
//             >
//               Subscription Summary
//             </Typography>

//             {/* PRICE */}
//             <Box sx={{ textAlign: "center", mb: 3 }}>
//               <Typography variant="h5" fontWeight={700}>
//                 {price}¢
//                 <Typography
//                   component="span"
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ ml: 0.5 }}
//                 >
//                   / month
//                 </Typography>
//               </Typography>
//             </Box>

//             {/* DETAILS */}
//             <Box>
//               {/* Selected Plan */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   mb: 1.2,
//                 }}
//               >
//                 <Typography color="text.secondary">Selected Plan</Typography>
//                 <Typography fontWeight={600}>
//                   {currentPlanDetails.plan_name}
//                 </Typography>
//               </Box>

//               {/* Credits */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   mb: 1.2,
//                 }}
//               >
//                 <Typography color="text.secondary">Credits (tokens)</Typography>
//                 <Typography fontWeight={600}>{credits}</Typography>
//               </Box>

//               {/* Price */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   mb: 1.2,
//                 }}
//               >
//                 <Typography color="text.secondary">Price</Typography>
//                 <Typography fontWeight={600}>{price}$</Typography>
//               </Box>

//               {/* Next Billing */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   mb: 1.2,
//                 }}
//               >
//                 <Typography color="text.secondary">
//                   Next Billing Date
//                 </Typography>
//                 <Typography fontWeight={600}>
//                   {nextBillingDate}
//                 </Typography>
//               </Box>

//               {/* Status */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   mt: 2,
//                   pt: 2,
//                   borderTop: "1px solid #e5e7eb",
//                 }}
//               >
//                 <Typography fontWeight={700}>Status</Typography>
//                 <Chip
//                   label={currentPlanDetails.subscription_status}
//                   color="success"
//                   size="small"
//                 />
//               </Box>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default SubscriptionTypeView;

// working code below ------------------------------------------


"use client";

import React from "react";
import {
  Grid,
  Box,
  Typography,
  Chip,
} from "@mui/material";

const SubscriptionTypeView = ({
  plansData, // your API response object
}) => {

  const currentPlanDetails = plansData;

  if (!currentPlanDetails) {
    return (
      <Box sx={{ width: "100%", mt: 3 }}>
        <Typography variant="body1" color="error">
          No subscription plan data found.
        </Typography>
      </Box>
    );
  }

  // Extract values correctly
  const numLocations = currentPlanDetails.number_of_locations || 1;
  const credits = currentPlanDetails.tokens_per_credit;

  // 🔥 NEW: cents → dollars conversion
  const priceCents = currentPlanDetails.total_amount;  
  const priceDollars = (priceCents / 100).toFixed(2);

  const nextBillingDate = currentPlanDetails.next_due_date
    ? new Date(currentPlanDetails.next_due_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <Box sx={{ width: "100%", mt: 3 }}>

      {/* CURRENT SUBSCRIPTION */}
      <Box
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "7px",
          p: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              Current Subscription
            </Typography>

            {/* 🔥 UPDATED: cents → dollars */}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {currentPlanDetails.plan_name} — ${priceDollars}/mo
            </Typography>

            <Box
              sx={{
                mt: 2,
                p: 1.2,
                border: "1px solid #e5e7eb",
                borderRadius: "7px",
                width: "220px",
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Current Locations
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {numLocations} total
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        {/* RIGHT SIDE: SUBSCRIPTION SUMMARY */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
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
              }}
            >
              Subscription Summary
            </Typography>

            {/* PRICE */}
            <Box sx={{ textAlign: "center", mb: 3 }}>

              {/* 🔥 UPDATED: cents → dollars */}
              <Typography variant="h5" fontWeight={700}>
                ${priceDollars}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 0.5 }}
                >
                  / month
                </Typography>
              </Typography>

            </Box>

            {/* DETAILS */}
            <Box>

              {/* Selected Plan */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.2,
                }}
              >
                <Typography color="text.secondary">Selected Plan</Typography>
                <Typography fontWeight={600}>
                  {currentPlanDetails.plan_name}
                </Typography>
              </Box>

              {/* Credits */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.2,
                }}
              >
                <Typography color="text.secondary">Credits (tokens)</Typography>
                <Typography fontWeight={600}>{credits}</Typography>
              </Box>

              {/* Price */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.2,
                }}
              >

                {/* 🔥 UPDATED: cents → dollars */}
                <Typography color="text.secondary">Price</Typography>
                <Typography fontWeight={600}>${priceDollars}</Typography>

              </Box>

              {/* Next Billing */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.2,
                }}
              >
                <Typography color="text.secondary">
                  Next Billing Date
                </Typography>
                <Typography fontWeight={600}>
                  {nextBillingDate}
                </Typography>
              </Box>

              {/* Status */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  pt: 2,
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <Typography fontWeight={700}>Status</Typography>
                <Chip
                  label={currentPlanDetails.subscription_status}
                  color="success"
                  size="small"
                />
              </Box>

            </Box>

          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default SubscriptionTypeView;
