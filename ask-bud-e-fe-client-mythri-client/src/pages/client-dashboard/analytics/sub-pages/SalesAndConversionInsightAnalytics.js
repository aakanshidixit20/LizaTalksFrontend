import React from 'react'
import RevenueDrivenbyAIChatbot from '../../../../components/ClientDashboard/analytics-components/SalesAndConversionInsight/RevenueDrivenbyAIChatbot';
import ProductRecommendationPurchaseFunnel from '../../../../components/ClientDashboard/analytics-components/SalesAndConversionInsight/ProductRecommendationPurchaseFunnel';

const SalesAndConversionInsightAnalytics = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center",  gap: "50px", alignItems: "flex-start" }}>
      <ProductRecommendationPurchaseFunnel />
      <RevenueDrivenbyAIChatbot />
    </div>
  )
}

export default SalesAndConversionInsightAnalytics;