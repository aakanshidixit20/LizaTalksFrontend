import React, { useState, useEffect, useContext } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import LeftSidebarMenu from "./components/Layout/LeftSidebarMenu";
import Footer from "./components/Layout/Footer";
import TopNavbar from "./components/Layout/TopNavbar";
import ScrollToTop from "./components/Layout/ScrollToTop";

import Dashboard from "./pages/client-dashboard/dashboard";
import Invoices from "./pages/client-dashboard/invoices";
import Analytics from "./pages/client-dashboard/analytics";
import Orders from "./pages/client-dashboard/orders";
import ChatTranscripts from "./pages/client-dashboard/chat-transcripts";
import StoreManagement from "./pages/client-dashboard/store-management";
import POS_Sync from "./pages/client-dashboard/pos-sync";
import DocumentManagement from "./pages/client-dashboard/document-management";
import Notifications from "./pages/client-dashboard/notifications";
import UserManagement from "./pages/client-dashboard/user-management";
import CreateStore from "./pages/client-dashboard/store-management/create-store";
import EditStore from "./pages/client-dashboard/store-management/edit-store";
import Pricing from "./pages/client-dashboard/store-management/pricing";
import ChatBotSnippet from "./pages/client-dashboard/store-management/chatbot-snippet";
import ConfigurePOS from "./pages/client-dashboard/pos-sync/configure";
import AddingNewUser from "./pages/client-dashboard/user-management/add-user";
import EditUserPage from "./pages/client-dashboard/user-management/edit-user";
import ChatWindow from "./pages/client-dashboard/chat-transcripts/chat-window";
import DocDetails from "./pages/client-dashboard/document-management/documents";
import AddDoc from "./pages/client-dashboard/document-management/add-document";

import Products from "./pages/client-dashboard/products";
import ProductsDetailsPage from "./pages/client-dashboard/products/product-details";

import EditProfile from "./components/Layout/TopNavbar/EditProfile";

import ProtectedRoute from "./authentication/ProtectedRoute";
import SubscriptionProtectedRoute from "./authentication/SubscriptionProtectedRoute";
import SignInForm from "./authentication/SignInForm";
import ForgotPasswordForm from "./authentication/ForgotPasswordForm";
import ResetPasswordForm from "./authentication/ResetPassword";

import SessionExpiryModal from "./authentication/SessionExpiry";

import ReportProblem from "./pages/client-dashboard/report-problem";
import SessionChatTranscript from "./components/ClientDashboard/ReportProblems/SessionChatTranscript";

// ANALYTICS SUB-PAGES
import SalesAndConversionInsightAnalytics from "./pages/client-dashboard/analytics/sub-pages/SalesAndConversionInsightAnalytics";
import EngagementTimingAnalytics from "./pages/client-dashboard/analytics/sub-pages/EngagementTimingAnalytics";
import ProductPerformanceAnalytics from "./pages/client-dashboard/analytics/sub-pages/ProductPerformanceAnalytics";

import PeakInteractionDetails from "./components/ClientDashboard/analytics-components/EngagementTiming/peakInteractionDetails";

// NEW MOOD COMPONENTS (Correct)
import MoodAndEffectTrends from "./components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrends";
import MoodAndEffectTrendsDetails from "./components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrendsDetails";

// PRODUCT ANALYTICS (other)
import TopConvertingProductsMain from "./components/ClientDashboard/analytics-components/ProductPerformance/TopConvertingProductsMain";
import TopConvertingProductsDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/TopConvertingProductsDetails";

import HighClicksLowConversions from "./components/ClientDashboard/analytics-components/ProductPerformance/HighClicksLowConversions";
import HighClicksLowConversionsDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/HighClicksLowConversionsDetails";
// CONVERSATION ANALYTICS
import ConversationAnalysisAnalytics from "./pages/client-dashboard/analytics/sub-pages/ConversationAnalysisAnalytics";
import ConversationAnalysisAnalyticsIndex from "./pages/client-dashboard/analytics/sub-pages/ConversationAnalysisAnalytics/ConversationAnalysisAnalyticsIndex";
import DropoffKeywordInsights from "./components/ClientDashboard/analytics-components/ConversationAnalysis/DropoffKeywordInsights";
import DropOffKeywordInsightsDetails from "./components/ClientDashboard/analytics-components/ConversationAnalysis/DropOffKeywordInsightsDetails";
import MostRecommendedCategories from "./components/ClientDashboard/analytics-components/ProductPerformance/MostRecommendedCategories";
import MostRecommendedCategoriesDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/MostRecommendedCategoriesDetails";
import UserAcquisitionRetentionTrends from "./components/ClientDashboard/analytics-components/ConversationAnalysis/UserAcquisitionRetentionTrends";
import UserAcquisitionRetentionDetails from "./components/ClientDashboard/analytics-components/ConversationAnalysis/UserAcquisitionRetentionDetails";
import MostRepeatedUserQueries from "./components/ClientDashboard/analytics-components/ConversationAnalysis/MostRepeatedUserQueries";
import MostRepeatedUserQueriesDetails from "./components/ClientDashboard/analytics-components/ConversationAnalysis/MostRepeatedUserQueriesDetails";
// SALES CONVERSION NEW
import ProductRecommendationPurchaseFunnel from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/ProductRecommendationPurchaseFunnel";
import ProductRecommendationFunnelDetails from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/ProductRecommendationFunnelDetails";

import RevenueDrivenbyAIChatbot from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/RevenueDrivenbyAIChatbot";
import RevenueDrivenbyAIChatbotDetail from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/RevenueDrivenbyAIChatbotDetail";

import AnalyticsChartsPage from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/AnalyticsChartsPage";

const App = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const toggleActive = () => setActive(!active);

  const isAuthPage = location.pathname.startsWith("/authentication");

  return (
    <div className={`main-wrapper-content ${active ? "active" : ""}`}>
      {!isAuthPage && (
        <>
          <TopNavbar toggleActive={toggleActive} />
          <LeftSidebarMenu toggleActive={toggleActive} />
        </>
      )}
      <div className="main-content" style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 100px)" }}>
        <SessionExpiryModal />
        <ScrollToTop />

        <div style={{ flex: 1 }}>
          <Routes>

            {/* Authentication */}
            <Route path="/authentication/sign-in" element={<SignInForm />} />
            <Route path="/authentication/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/authentication/reset-password/:token" element={<ResetPasswordForm />} />

            {/* Dashboard */}
            <Route path="/" element={<ProtectedRoute allowedRoles={["admin", "user"]}><Dashboard /></ProtectedRoute>} />

            {/* Orders */}
            <Route path="/orders" element={<ProtectedRoute allowedRoles={["admin", "user"]}><SubscriptionProtectedRoute><Orders /></SubscriptionProtectedRoute></ProtectedRoute>} />

            {/* Chat transcripts */}
            <Route path="/chat-transcripts" element={<ProtectedRoute allowedRoles={["admin", "user"]}><SubscriptionProtectedRoute><ChatTranscripts /></SubscriptionProtectedRoute></ProtectedRoute>} />
            <Route path="/chat-transcripts/chats/:customer_id" element={<ProtectedRoute allowedRoles={["admin", "user"]}><SubscriptionProtectedRoute><ChatWindow /></SubscriptionProtectedRoute></ProtectedRoute>} />

            {/* Store management */}
            <Route path="/store-management" element={<ProtectedRoute allowedRoles={["admin", "user"]}><StoreManagement /></ProtectedRoute>} />
            <Route path="/store-management/create-store" element={<ProtectedRoute allowedRoles={["admin", "user"]}><CreateStore /></ProtectedRoute>} />
            <Route path="/store-management/:store_id/edit-store" element={<ProtectedRoute allowedRoles={["admin", "user"]}><EditStore /></ProtectedRoute>} />

            {/* Product analytics standalone routes */}
            <Route path="/analytics/top-products" element={<TopConvertingProductsMain />} />
            <Route path="/analytics/top-products/details" element={<TopConvertingProductsDetails />} />

            <Route path="/analytics/high-clicks" element={<HighClicksLowConversions />} />
            <Route path="/analytics/high-clicks/details" element={<HighClicksLowConversionsDetails />} />

            <Route path="/analytics/most-recommended" element={<MostRecommendedCategories />} />
            <Route path="/analytics/most-recommended/details" element={<MostRecommendedCategoriesDetails />} />

            {/* SALES INSIGHT STANDALONE */}
            <Route path="/analytics/product-funnel" element={<ProductRecommendationPurchaseFunnel />} />
            <Route path="/analytics/product-funnel/details" element={<ProductRecommendationFunnelDetails />} />

            <Route path="/revenue-ai" element={<RevenueDrivenbyAIChatbot />} />
            <Route path="/revenue-ai-detail" element={<RevenueDrivenbyAIChatbotDetail />} />

            <Route path="/analytics/charts" element={<AnalyticsChartsPage />} />

            {/* -------------------- CLEANED ANALYTICS ROUTES -------------------- */}

            <Route
              path="/analytics"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <Analytics /> {/* Tabs layout + Outlet */}
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            >

              {/* Default */}
              <Route index element={<ProductPerformanceAnalytics />} />

              {/* Product Performance */}
              <Route path="product-performance" element={<ProductPerformanceAnalytics />} />

              {/* ---------------- NEW MOOD ROUTES (CORRECT) ---------------- */}
              <Route path="mood-trend" element={<MoodAndEffectTrends />} />
              <Route path="mood-trend/details" element={<MoodAndEffectTrendsDetails />} />
              {/* ---------------------------------------------------------------- */}

              {/* Conversation Analytics */}
              <Route path="conversation-analytics" element={<ConversationAnalysisAnalytics />}>
                <Route index element={<ConversationAnalysisAnalyticsIndex />} />
                <Route path="drop-off-keyword-insights" element={<DropoffKeywordInsights />} />
                <Route
                  path="drop-off-keyword-insights/details"
                  element={<DropOffKeywordInsightsDetails />}
                />
                <Route path="most-repeated-user-queries" element={<MostRepeatedUserQueries />} />
                <Route
                  path="most-repeated-user-queries/details"
                  element={<MostRepeatedUserQueriesDetails />}
                />

                <Route path="user-acquisition-retention-trends" element={< UserAcquisitionRetentionTrends />} />
              </Route>

              <Route path="user-acquisition-retention-trends/details"
                element={<UserAcquisitionRetentionDetails />}
              />


              {/* Sales Insight */}
              <Route path="sales-insight" element={<SalesAndConversionInsightAnalytics />} />

              {/* Engagement Timing */}
              <Route path="engagement-timing" element={<EngagementTimingAnalytics />} />
              <Route path="engagement-timing/peak-interaction-details" element={<PeakInteractionDetails />} />

              {/* Fallback */}
              <Route path="*" element={<ProductPerformanceAnalytics />} />
            </Route>

            {/* Product pages */}
            <Route path="/products" element={<ProtectedRoute allowedRoles={["admin", "user"]}><SubscriptionProtectedRoute><Products /></SubscriptionProtectedRoute></ProtectedRoute>} />
            <Route path="/products/product-details/:product_code" element={<ProtectedRoute allowedRoles={["admin", "user"]}><SubscriptionProtectedRoute><ProductsDetailsPage /></SubscriptionProtectedRoute></ProtectedRoute>} />

            {/* Reports */}
            <Route path="/chat-problems-report" element={<ProtectedRoute allowedRoles={["admin", "user"]}><SubscriptionProtectedRoute><ReportProblem /></SubscriptionProtectedRoute></ProtectedRoute>} />
            <Route path="/chat-reports/:feedback_id/transcript" element={<ProtectedRoute allowedRoles={["admin", "user"]}><SubscriptionProtectedRoute><SessionChatTranscript /></SubscriptionProtectedRoute></ProtectedRoute>} />

          </Routes>
        </div>

        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
};

export default App;

