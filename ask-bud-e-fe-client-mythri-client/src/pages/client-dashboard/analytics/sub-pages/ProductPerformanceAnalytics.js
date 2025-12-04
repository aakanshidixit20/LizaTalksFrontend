import React from "react";

import TopConvertingProducts from "../../../../components/ClientDashboard/analytics-components/ProductPerformance/TopConvertingProducts";
import HighClicksLowConversions from "../../../../components/ClientDashboard/analytics-components/ProductPerformance/HighClicksLowConversions";
import MostRecommendedCategories from "../../../../components/ClientDashboard/analytics-components/ProductPerformance/MostRecommendedCategories";


const ProductPerformanceAnalytics = () => {
  return (
    <div>
      <TopConvertingProducts />
      <HighClicksLowConversions/>
      <MostRecommendedCategories/>
    </div>
  );
};

export default ProductPerformanceAnalytics;
