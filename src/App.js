import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import LeftSidebarMenu from "./components/Layout/LeftSidebarMenu";
import Footer from "./components/Layout/Footer";
import TopNavbar from "./components/Layout/TopNavbar";
import ScrollToTop from "./components/Layout/ScrollToTop";

// Pages
import Dashboard from "./pages/admin-dashboard/dashboard";
import BillingHistory from "./pages/admin-dashboard/billing-history";
import Revenue from "./pages/admin-dashboard/revenue";
import ChatTranscripts from "./pages/admin-dashboard/chat-transcripts";
import ClientManagement from "./pages/admin-dashboard/client-management";
import Notifications from "./pages/admin-dashboard/notifications";
import UserManagement from "./pages/admin-dashboard/user-management";
import CreateClient from "./pages/admin-dashboard/client-management/create-client";
import AddingNewUser from "./pages/admin-dashboard/user-management/add-user";
import ChatWindow from "./pages/admin-dashboard/chat-transcripts/chat-window";
import ClientStores from "./pages/admin-dashboard/client-store";
import Products from "./pages/admin-dashboard/products";
import ClientFeedBack from "./pages/admin-dashboard/client-feedback";
import ReportProblem from "./pages/admin-dashboard/report-problem";
import ViewStorePage from "./pages/admin-dashboard/client-store/view-store";

// Analytics Layout and Pages
import AnalyticsLayout from "./components/AdminDashboard/Analytics/AnalyticsLayout";
import BotEffectiveness from "./components/AdminDashboard/Analytics/BotEffectiveness";
import BotEffectivenessDetails from "./components/AdminDashboard/Analytics/BotEffectivenessDetails";
import BotEffectivenessTablePage from "./components/AdminDashboard/Analytics/BotEffectivenessTablePage";

import TrainingAndPerformance from "./components/AdminDashboard/Analytics/TrainingAndPerformance";
import TrainingPerformanceDetailsPage from "./components/AdminDashboard/Analytics/TrainingPerformanceDetailsPage";

import DataHealthAndReliability from "./components/AdminDashboard/Analytics/DataHealthAndReliability";
import DataHealthviewdetails from "./components/AdminDashboard/Analytics/DataHealthviewdetails";

import FeaturePerformance from "./components/AdminDashboard/Analytics/FeaturePerformance";
import FeatureDropoffDetails from "./components/AdminDashboard/Analytics/FeatureDropoffDetails";
import FeatureUsageDetails from "./components/AdminDashboard/Analytics/FeatureUsageDetails";

const App = () => {
  const [active, setActive] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isAuthPage = [
    "/authentication/sign-in/",
    "/authentication/sign-up/",
    "/authentication/forgot-password/",
    "/authentication/reset-password/",
    "/authentication/confirm-email/",
    "/authentication/lock-screen/",
    "/authentication/logout/",
  ].includes(pathname);

  return (
    <div className={`main-wrapper-content ${active ? "active" : ""}`}>
      <Router>
        {!isAuthPage && (
          <>
            <TopNavbar toggleActive={() => setActive(!active)} />
            <LeftSidebarMenu toggleActive={() => setActive(!active)} />
          </>
        )}

        <div
          className="main-content"
          style={{
            minHeight: "calc(100vh - 100px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ScrollToTop />

          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Revenue */}
            <Route path="/clients-order" element={<Revenue />} />
            <Route path="/revenue" element={<BillingHistory />} />

            {/* Chat */}
            <Route path="/chat-transcripts" element={<ChatTranscripts />} />
            <Route
              path="/chat-transcripts/chats/:customer_id"
              element={<ChatWindow />}
            />

            {/* Client Management */}
            <Route path="/client-management" element={<ClientManagement />} />
            <Route
              path="/client-management/create-client"
              element={<CreateClient />}
            />

            {/* User Management */}
            <Route path="/user-management" element={<UserManagement />} />
            <Route
              path="/user-management/add-user"
              element={<AddingNewUser />}
            />

            {/* Client Stores */}
            <Route path="/client-stores" element={<ClientStores />} />
            <Route path="/store_id/:store_id" element={<ViewStorePage />} />

            {/* ---------------------- ANALYTICS ROUTES ---------------------- */}
            <Route path="/analytics" element={<AnalyticsLayout />}>
              {/* Main */}
              <Route index element={<BotEffectiveness />} />
              <Route path="bot-effectiveness" element={<BotEffectiveness />} />
              <Route path="bot-effectiveness/details" element={<BotEffectivenessDetails />} />
              <Route path="bot-effectiveness/table" element={<BotEffectivenessTablePage />} />

              {/* Training */}
              <Route path="training-performance" element={<TrainingAndPerformance />} />
              <Route path="training-performance/details" element={<TrainingPerformanceDetailsPage />} />

              {/* Data Health */}
              <Route path="data-health-reliability" element={<DataHealthAndReliability />} />
              <Route path="data-health/details" element={<DataHealthviewdetails />} />

              {/* Feature Performance */}
              <Route path="feature-performance" element={<FeaturePerformance />} />
              <Route path="feature-performance/line-details" element={<FeatureDropoffDetails />} />
              <Route path="feature-performance/donut-details" element={<FeatureUsageDetails />} />
            </Route>
            {/* --------------------------------------------------------------- */}

            {/* Products */}
            <Route path="/products" element={<Products />} />

            {/* Feedback */}
            <Route path="/client-feedback" element={<ClientFeedBack />} />

            {/* Support */}
            <Route path="/chat-problems-report" element={<ReportProblem />} />
          </Routes>

          {!isAuthPage && <Footer />}
        </div>
      </Router>
    </div>
  );
};

export default App;
