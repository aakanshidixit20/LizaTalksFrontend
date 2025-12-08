// import React, { useState, useEffect } from "react";
// import {
//   HashRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import LeftSidebarMenu from "./components/Layout/LeftSidebarMenu";
// import Footer from "./components/Layout/Footer";
// import TopNavbar from "./components/Layout/TopNavbar";
// import ScrollToTop from "./components/Layout/ScrollToTop";

// import Dashboard from "./pages/client-dashboard/dashboard";
// import Invoices from "./pages/client-dashboard/invoices";
// import Analytics from "./pages/client-dashboard/analytics";
// import Orders from "./pages/client-dashboard/orders";
// import ChatTranscripts from "./pages/client-dashboard/chat-transcripts";
// import StoreManagement from "./pages/client-dashboard/store-management";
// import POS_Sync from "./pages/client-dashboard/pos-sync";
// import DocumentManagement from "./pages/client-dashboard/document-management";
// import Notifications from "./pages/client-dashboard/notifications";
// import UserManagement from "./pages/client-dashboard/user-management";
// import CreateStore from "./pages/client-dashboard/store-management/create-store";
// import EditStore from "./pages/client-dashboard/store-management/edit-store";
// import Pricing from "./pages/client-dashboard/store-management/pricing";
// import ChatBotSnippet from "./pages/client-dashboard/store-management/chatbot-snippet";
// import ConfigurePOS from "./pages/client-dashboard/pos-sync/configure";
// import AddingNewUser from "./pages/client-dashboard/user-management/add-user";
// import EditUserPage from "./pages/client-dashboard/user-management/edit-user";
// import ChatWindow from "./pages/client-dashboard/chat-transcripts/chat-window";
// import DocDetails from "./pages/client-dashboard/document-management/documents";
// import AddDoc from "./pages/client-dashboard/document-management/add-document";
// import Products from "./pages/client-dashboard/products";
// import EditProfile from "./components/Layout/TopNavbar/EditProfile";
// import ProtectedRoute from "./authentication/ProtectedRoute";
// import SubscriptionProtectedRoute from "./authentication/SubscriptionProtectedRoute";
// import SignInForm from "./authentication/SignInForm";
// import ForgotPasswordForm from "./authentication/ForgotPasswordForm";
// import { AuthContext } from "./authentication/AuthContext";
// import { useContext } from "react";
// import FetchUpdatePOS from "./pages/client-dashboard/pos-sync/fetchupdate";
// import ResetPasswordForm from "./authentication/ResetPassword";
// import ProductsDetailsPage from "./pages/client-dashboard/products/product-details";
// import ReportProblem from "./pages/client-dashboard/report-problem";
// import SessionExpiryModal from "./authentication/SessionExpiry";
// import SessionChatTranscript from "./components/ClientDashboard/ReportProblems/SessionChatTranscript";
// import SalesAndConversionInsightAnalytics from "./pages/client-dashboard/analytics/sub-pages/SalesAndConversionInsightAnalytics";
// import EngagementTimingAnalytics from "./pages/client-dashboard/analytics/sub-pages/EngagementTimingAnalytics";
// import ProductPerformanceAnalytics from "./pages/client-dashboard/analytics/sub-pages/ProductPerformanceAnalytics";
// import MoodAndEffectTrendsAnalytics from "./pages/client-dashboard/analytics/sub-pages/MoodAndEffectTrendsAnalytics";
// import ConversationAnalysisAnalytics from "./pages/client-dashboard/analytics/sub-pages/ConversationAnalysisAnalytics";
// import PeakInteractionDetails from './components/ClientDashboard/analytics-components/EngagementTiming/peakInteractionDetails';
// import MoodEffectDetails from "./pages/client-dashboard/analytics/sub-pages/MoodEffectDetails";

// import TopConvertingProductsMain from "./components/ClientDashboard/analytics-components/ProductPerformance/TopConvertingProductsMain";
// import TopConvertingProductsDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/TopConvertingProductsDetails";

// // import PeakInteractionDetails from './components/ClientDashboard/analytics-components/EngagementTiming/peakInteractionDetails';
// import HighClicksLowConversions from "./components/ClientDashboard/analytics-components/ProductPerformance/HighClicksLowConversions";
// import HighClicksLowConversionsDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/HighClicksLowConversionsDetails";

// import MostRecommendedCategories from "./components/ClientDashboard/analytics-components/ProductPerformance/MostRecommendedCategories";
// import MostRecommendedCategoriesDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/MostRecommendedCategoriesDetails";

// // #akanshi


// const App = () => {
//   const [active, setActive] = useState(false);
//   const location = useLocation(); // ✅ better than window.location
//   const toggleActive = () => setActive(!active);

//   const isAuthPage = location.pathname.startsWith("/authentication");

//   return (
//     <div className={`main-wrapper-content ${active ? "active" : ""}`}>
//       {/* Top Navbar & Sidebar */}
//       {!isAuthPage && (
//         <>
//           <TopNavbar toggleActive={toggleActive} />
//           <LeftSidebarMenu toggleActive={toggleActive} />
//         </>
//       )}

//       {/* Main content */}
//       <div
//         className="main-content"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "calc(100vh - 100px)",
//         }}
//       >
//         <SessionExpiryModal />
//         <ScrollToTop />

//         <div style={{ flex: 1 }}>
//           <Routes>
//             {/* Authentication pages */}
//             <Route path="/authentication/sign-in" element={<SignInForm />} />
//             <Route
//               path="/authentication/forgot-password/"
//               element={<ForgotPasswordForm />}
//             />
//             <Route
//               path="/authentication/reset-password/:token"
//               element={<ResetPasswordForm />}
//             />
//             <Route path="/unauthorized" element={<h2>Not Allowed</h2>} />

//             {/* Add other auth routes here */}

//             {/* Protected Dashboard Pages */}
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Orders */}
//             <Route
//               path="/orders"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <Orders />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />

//             {/* Chat Transcripts */}
//             <Route
//               path="/chat-transcripts"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <ChatTranscripts />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
            
//             <Route
//               path="/chat-transcripts/chats/:customer_id"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <ChatWindow />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
//             {/* <Route
//               path="product-purchase-funnel"
//               element={<ProductPurchaseFunnelAnalytics />}
//             /> */}

//             {/* Store Management */}
//             <Route
//               path="/store-management"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <StoreManagement />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/store-management/create-store"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <CreateStore />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/store-management/:store_id/edit-store"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <EditStore />
//                 </ProtectedRoute>
//               }
//             />

//              <Route path="/analytics/top-products" element={<TopConvertingProductsMain />} />
//             <Route path="/analytics/top-products/details" element={<TopConvertingProductsDetails />} />

//             <Route path="/analytics/high-clicks" element={<HighClicksLowConversions />} />
//             <Route path="/analytics/high-clicks/details" element={<HighClicksLowConversionsDetails />} />

            
//             <Route path="/analytics/most-recommended" element={<MostRecommendedCategories />} />
//             <Route path="/analytics/most-recommended/details" element={<MostRecommendedCategoriesDetails />} />

//             <Route
//               path="/store-management/pricing"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <Pricing />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/store-management/store/:store_id/chatbot-snippet"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <ChatBotSnippet />
//                 </ProtectedRoute>
//               }
//             />

//             {/* POS Sync */}
//             <Route
//               path="/pos-sync"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <POS_Sync />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/pos-sync/configure"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <ConfigurePOS />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/pos-sync/:store_id/fetch-update"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <FetchUpdatePOS />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />

//             {/* Document Management */}
//             <Route
//               path="/document-management"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <DocumentManagement />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/document-management/documents/:store_id"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <DocDetails />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/document-management/documents/:store_id/add-document"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <AddDoc />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />

//             {/* Invoices */}
//             <Route
//               path="/invoices"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <Invoices />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />

//             {/* Notifications */}
//             <Route
//               path="/notifications"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <Notifications />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />

//             {/* User Management */}
//             <Route
//               path="/user-management"
//               element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <SubscriptionProtectedRoute>
//                     <UserManagement />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/user-management/add-user"
//               element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <SubscriptionProtectedRoute>
//                     <AddingNewUser />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/user-management/:client_user_id/edit-user"
//               element={
//                 <ProtectedRoute>
//                   <SubscriptionProtectedRoute>
//                     <EditUserPage />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile/edit"
//               element={
//                 <ProtectedRoute>
//                   <EditProfile />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Analytics */}
//             <Route
//           path="/analytics"
//           element={
//             <ProtectedRoute allowedRoles={["admin", "user"]}>
//               <SubscriptionProtectedRoute>
//                 <Analytics /> {/* layout + tabs + <Outlet /> */}
//               </SubscriptionProtectedRoute>
//             </ProtectedRoute>
//           }
//         >
//           {/* Default tab: /analytics */}
//           <Route index element={<ProductPerformanceAnalytics />} />

//           {/* Child routes: /analytics/... */}
//           <Route
//             path="product-performance"
//             element={<ProductPerformanceAnalytics />}
//           />
//           <Route path="mood-trend" element={<MoodAndEffectTrendsAnalytics />} />
//           <Route path="mood-trend/details" element={<MoodEffectDetails />} />

//           <Route
//             path="conversation-analytics"
//             element={<ConversationAnalysisAnalytics />}
//           />
//           <Route
//             path="sales-insight"
//             element={<SalesAndConversionInsightAnalytics />}
//           />
//           <Route path="engagement-timing" element={<EngagementTimingAnalytics />} />
//           <Route path="engagement-timing/peak-interaction-details" element={<PeakInteractionDetails />} />

//           {/* Fallback: agar unknown nested path ho */}
//           <Route
//             path="*"
//             element={<ProductPerformanceAnalytics />}
//           />
//         </Route>

//             {/* Products */}
//             <Route
//               path="/products"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <Products />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />

//             {/* Products */}
//             <Route
//               path="/products/product-details/:product_code"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <ProductsDetailsPage />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
//             {/* Chat Problems Report */}
//             <Route
//               path="/chat-problems-report"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <ReportProblem />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />

//             {/* Chat Reports - Session Transcript Detail */}
//             <Route
//               path="/chat-reports/:feedback_id/transcript"
//               element={
//                 <ProtectedRoute allowedRoles={["admin", "user"]}>
//                   <SubscriptionProtectedRoute>
//                     <SessionChatTranscript />
//                   </SubscriptionProtectedRoute>
//                 </ProtectedRoute>
//               }
//             />
           
//           </Routes>
//         </div>

//         {!isAuthPage && <Footer />}
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
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
import EditProfile from "./components/Layout/TopNavbar/EditProfile";
import ProtectedRoute from "./authentication/ProtectedRoute";
import SubscriptionProtectedRoute from "./authentication/SubscriptionProtectedRoute";
import SignInForm from "./authentication/SignInForm";
import ForgotPasswordForm from "./authentication/ForgotPasswordForm";
import { AuthContext } from "./authentication/AuthContext";
import { useContext } from "react";
import FetchUpdatePOS from "./pages/client-dashboard/pos-sync/fetchupdate";
import ResetPasswordForm from "./authentication/ResetPassword";
import ProductsDetailsPage from "./pages/client-dashboard/products/product-details";
import ReportProblem from "./pages/client-dashboard/report-problem";
import SessionExpiryModal from "./authentication/SessionExpiry";
import SessionChatTranscript from "./components/ClientDashboard/ReportProblems/SessionChatTranscript";
import SalesAndConversionInsightAnalytics from "./pages/client-dashboard/analytics/sub-pages/SalesAndConversionInsightAnalytics";
import EngagementTimingAnalytics from "./pages/client-dashboard/analytics/sub-pages/EngagementTimingAnalytics";
import ProductPerformanceAnalytics from "./pages/client-dashboard/analytics/sub-pages/ProductPerformanceAnalytics";
import MoodAndEffectTrendsAnalytics from "./pages/client-dashboard/analytics/sub-pages/MoodAndEffectTrendsAnalytics";
import ConversationAnalysisAnalytics from "./pages/client-dashboard/analytics/sub-pages/ConversationAnalysisAnalytics";
import PeakInteractionDetails from './components/ClientDashboard/analytics-components/EngagementTiming/peakInteractionDetails';
import MoodEffectDetails from "./pages/client-dashboard/analytics/sub-pages/MoodEffectDetails";

import TopConvertingProductsMain from "./components/ClientDashboard/analytics-components/ProductPerformance/TopConvertingProductsMain";
import TopConvertingProductsDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/TopConvertingProductsDetails";

// import PeakInteractionDetails from './components/ClientDashboard/analytics-components/EngagementTiming/peakInteractionDetails';
import HighClicksLowConversions from "./components/ClientDashboard/analytics-components/ProductPerformance/HighClicksLowConversions";
import HighClicksLowConversionsDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/HighClicksLowConversionsDetails";

import MostRecommendedCategories from "./components/ClientDashboard/analytics-components/ProductPerformance/MostRecommendedCategories";
import MostRecommendedCategoriesDetails from "./components/ClientDashboard/analytics-components/ProductPerformance/MostRecommendedCategoriesDetails";

// #akanshi
import DropoffKeywordInsights from "./pages/client-dashboard/analytics/sub-pages/ConversationAnalysisAnalytics/DropoffKeywordInsights";
import ConversationAnalysisAnalyticsIndex from "./pages/client-dashboard/analytics/sub-pages/ConversationAnalysisAnalytics/ConversationAnalysisAnalyticsIndex";
import MostRepeatedUserQueries from "./pages/client-dashboard/analytics/sub-pages/ConversationAnalysisAnalytics/MostRepeatedUserQueries";
import UserAcquisitionAndRetentionTrends from "./pages/client-dashboard/analytics/sub-pages/ConversationAnalysisAnalytics/UserAcquisitionAndRetentionTrends";
// sales and convertion insight
// new
 
import ProductRecommendationPurchaseFunnel from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/ProductRecommendationPurchaseFunnel";
import ProductRecommendationFunnelDetails from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/ProductRecommendationFunnelDetails";
 
import RevenueDrivenbyAIChatbot from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/RevenueDrivenbyAIChatbot";
import RevenueDrivenbyAIChatbotDetail from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/RevenueDrivenbyAIChatbotDetail";
 
import AnalyticsChartsPage from "./components/ClientDashboard/analytics-components/SalesAndConversionInsight/AnalyticsChartsPage";
 

const App = () => {
  const [active, setActive] = useState(false);
  const location = useLocation(); // ✅ better than window.location
  const toggleActive = () => setActive(!active);

  const isAuthPage = location.pathname.startsWith("/authentication");

  return (
    <div className={`main-wrapper-content ${active ? "active" : ""}`}>
      {/* Top Navbar & Sidebar */}
      {!isAuthPage && (
        <>
          <TopNavbar toggleActive={toggleActive} />
          <LeftSidebarMenu toggleActive={toggleActive} />
        </>
      )}

      {/* Main content */}
      <div
        className="main-content"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <SessionExpiryModal />
        <ScrollToTop />

        <div style={{ flex: 1 }}>
          <Routes>
            {/* Authentication pages */}
            <Route path="/authentication/sign-in" element={<SignInForm />} />
            <Route
              path="/authentication/forgot-password/"
              element={<ForgotPasswordForm />}
            />
            <Route
              path="/authentication/reset-password/:token"
              element={<ResetPasswordForm />}
            />
            <Route path="/unauthorized" element={<h2>Not Allowed</h2>} />

            {/* Add other auth routes here */}

            {/* Protected Dashboard Pages */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Orders */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <Orders />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />

            {/* Chat Transcripts */}
            <Route
              path="/chat-transcripts"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <ChatTranscripts />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/chat-transcripts/chats/:customer_id"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <ChatWindow />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="product-purchase-funnel"
              element={<ProductPurchaseFunnelAnalytics />}
            /> */}
            {/* <Route
                  index
                  element={<ConversationAnalysisAnalyticsIndex />}
                />
                <Route
                  path="drop-off-keyword-insights"
                  element={<DropoffKeywordInsights />}
                />
                <Route
                  path="most-repeated-user-queries"
                  element={<MostRepeatedUserQueries />}
                /> */}

            {/* Store Management */}
            <Route
              path="/store-management"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <StoreManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store-management/create-store"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <CreateStore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store-management/:store_id/edit-store"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <EditStore />
                </ProtectedRoute>
              }
            />

             <Route path="/analytics/top-products" element={<TopConvertingProductsMain />} />
            <Route path="/analytics/top-products/details" element={<TopConvertingProductsDetails />} />

            <Route path="/analytics/high-clicks" element={<HighClicksLowConversions />} />
            <Route path="/analytics/high-clicks/details" element={<HighClicksLowConversionsDetails />} />

            
            <Route path="/analytics/most-recommended" element={<MostRecommendedCategories />} />
            <Route path="/analytics/most-recommended/details" element={<MostRecommendedCategoriesDetails />} />
            {/* new  */}
            {/* sales and conversion insight */}
            <Route path="/analytics/product-funnel" element={<ProductRecommendationPurchaseFunnel />} />
            <Route path="/analytics/product-funnel/details" element={<ProductRecommendationFunnelDetails />} />
 
            <Route path="/revenue-ai" element={<RevenueDrivenbyAIChatbot />} />
            <Route path="/revenue-ai-detail" element={<RevenueDrivenbyAIChatbotDetail />} />
 
            <Route path="/analytics/charts" element={<AnalyticsChartsPage />} />
            <Route
              path="/store-management/pricing"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store-management/store/:store_id/chatbot-snippet"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <ChatBotSnippet />
                </ProtectedRoute>
              }
            />

            {/* POS Sync */}
            <Route
              path="/pos-sync"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <POS_Sync />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pos-sync/configure"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <ConfigurePOS />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pos-sync/:store_id/fetch-update"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <FetchUpdatePOS />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />

            {/* Document Management */}
            <Route
              path="/document-management"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <DocumentManagement />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/document-management/documents/:store_id"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <DocDetails />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/document-management/documents/:store_id/add-document"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <AddDoc />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />

            {/* Invoices */}
            <Route
              path="/invoices"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <Invoices />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />

            {/* Notifications */}
            <Route
              path="/notifications"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <Notifications />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />

            {/* User Management */}
            <Route
              path="/user-management"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SubscriptionProtectedRoute>
                    <UserManagement />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management/add-user"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <SubscriptionProtectedRoute>
                    <AddingNewUser />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management/:client_user_id/edit-user"
              element={
                <ProtectedRoute>
                  <SubscriptionProtectedRoute>
                    <EditUserPage />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            {/* Analytics */}
            <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <SubscriptionProtectedRoute>
                <Analytics /> {/* layout + tabs + <Outlet /> */}
              </SubscriptionProtectedRoute>
            </ProtectedRoute>
          }
        >
          {/* Default tab: /analytics */}
          <Route index element={<ProductPerformanceAnalytics />} />

          {/* Child routes: /analytics/... */}
          <Route
            path="product-performance"
            element={<ProductPerformanceAnalytics />}
          />
          <Route path="mood-trend" element={<MoodAndEffectTrendsAnalytics />} />
          <Route path="mood-trend/details" element={<MoodEffectDetails />} />

          {/* <Route
            path="conversation-analytics"
            element={<ConversationAnalysisAnalytics />}
          /> */}

          <Route
                path="conversation-analytics"
                element={<ConversationAnalysisAnalytics />}
              >
                <Route
                  index
                  element={<ConversationAnalysisAnalyticsIndex />}
                />
                <Route
                  path="drop-off-keyword-insights"
                  element={<DropoffKeywordInsights />}
                />
                <Route
                  path="most-repeated-user-queries"
                  element={<MostRepeatedUserQueries />}
                />
                <Route
                  path="user-acquisition-retention-trends"
                  element={<UserAcquisitionAndRetentionTrends />}
                />
              </Route>


          <Route
            path="sales-insight"
            element={<SalesAndConversionInsightAnalytics />}
          />
          <Route path="engagement-timing" element={<EngagementTimingAnalytics />} />
          <Route path="engagement-timing/peak-interaction-details" element={<PeakInteractionDetails />} />

          {/* Fallback: agar unknown nested path ho */}
          <Route
            path="*"
            element={<ProductPerformanceAnalytics />}
          />
        </Route>

            {/* Products */}
            <Route
              path="/products"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <Products />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />

            {/* Products */}
            <Route
              path="/products/product-details/:product_code"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <ProductsDetailsPage />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
            {/* Chat Problems Report */}
            <Route
              path="/chat-problems-report"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <ReportProblem />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />

            {/* Chat Reports - Session Transcript Detail */}
            <Route
              path="/chat-reports/:feedback_id/transcript"
              element={
                <ProtectedRoute allowedRoles={["admin", "user"]}>
                  <SubscriptionProtectedRoute>
                    <SessionChatTranscript />
                  </SubscriptionProtectedRoute>
                </ProtectedRoute>
              }
            />
           
          </Routes>
        </div>

        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
};

export default App;
