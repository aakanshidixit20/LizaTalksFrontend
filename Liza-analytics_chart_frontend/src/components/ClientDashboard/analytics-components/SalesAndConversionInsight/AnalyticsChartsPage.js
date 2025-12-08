import React from "react";
import ProductRecommendationPurchaseFunnel from "./ProductRecommendationPurchaseFunnel";
import RevenueDrivenbyAIChatbot from "./RevenueDrivenbyAIChatbot";
import { Box } from "@mui/material";
 
const AnalyticsChartsPage = () => {
  return (
    <Box
      width="100%"
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="stretch"        // ⭐ Ensures full width
      justifyContent="flex-start"
      gap={3}                     // ⭐ Space between charts
    >
      {/* FIRST CHART - FULL WIDTH */}
      <Box width="100%">
        <ProductRecommendationPurchaseFunnel />
      </Box>
 
      {/* SECOND CHART - FULL WIDTH BELOW */}
      <Box width="100%">
        <RevenueDrivenbyAIChatbot />
      </Box>
    </Box>
  );
};
 
export default AnalyticsChartsPage;
 