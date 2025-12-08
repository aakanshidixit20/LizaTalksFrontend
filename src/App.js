// // import React, { useState, useEffect } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import LeftSidebarMenu from "./components/Layout/LeftSidebarMenu";
// // import Footer from "./components/Layout/Footer";
// // import TopNavbar from "./components/Layout/TopNavbar";
// // import ScrollToTop from "./components/Layout/ScrollToTop";
// // import Dashboard from "./pages/admin-dashboard/dashboard";
// // import BillingHistory from "./pages/admin-dashboard/billing-history";
// // import Analytics from "./pages/admin-dashboard/analytics";
// // import Revenue from "./pages/admin-dashboard/revenue";
// // import ChatTranscripts from "./pages/admin-dashboard/chat-transcripts";
// // import ClientManagement from "./pages/admin-dashboard/client-management";
// // import Notifications from "./pages/admin-dashboard/notifications";
// // import UserManagement from "./pages/admin-dashboard/user-management";
// // import CreateClient from "./pages/admin-dashboard/client-management/create-client";
// // import AddingNewUser from "./pages/admin-dashboard/user-management/add-user";
// // import ChatWindow from "./pages/admin-dashboard/chat-transcripts/chat-window";
// // import ClientStores from "./pages/admin-dashboard/client-store";
// // import Products from "./pages/admin-dashboard/products";
// // import ClientFeedBack from "./pages/admin-dashboard/client-feedback";
// // import ReportProblem from "./pages/admin-dashboard/report-problem";
// // import ViewStorePage from "./pages/admin-dashboard/client-store/view-store";

// // // import Analytics from "./pages/admin-dashboard/analytics";
// // import BotEffectiveness from "./components/AdminDashboard/Analytics/BotEffectiveness";
// // import TrainingAndPerformance from "./components/AdminDashboard/Analytics/TrainingAndPerformance";
// // import DataHealthAndReliability from "./components/AdminDashboard/Analytics/DataHealthAndReliability";
// // import FeaturePerformance from "./components/AdminDashboard/Analytics/FeaturePerformance";

// // const App = () => {
// //   const [active, setActive] = useState(false);
// //   const [pathname, setPathname] = useState("");

// //   useEffect(() => {
// //     setPathname(window.location.pathname); // Get the current path
// //   }, []);

// //   const toggleActive = () => {
// //     setActive(!active);
// //   };

// //   const isAuthPage = [
// //     "/authentication/sign-in/",
// //     "/authentication/sign-up/",
// //     "/authentication/forgot-password/",
// //     "/authentication/reset-password/",
// //     "/authentication/confirm-email/",
// //     "/authentication/lock-screen/",
// //     "/authentication/logout/",
// //   ].includes(pathname);

// //   return (
// //     <>
// //       <div className={`main-wrapper-content ${active ? "active" : ""}`}>
// //         <Router>
// //           {!isAuthPage && (
// //             <>
// //               <TopNavbar toggleActive={toggleActive} />
// //               <LeftSidebarMenu toggleActive={toggleActive} />
// //             </>
// //           )}

// //           {/* Main Content with sticky footer support */}
// //           <div
// //             className="main-content"
// //             style={{
// //               display: "flex",
// //               flexDirection: "column",
// //               minHeight: "calc(100vh - 100px)", // subtract TopNavbar height
// //             }}
// //           >
// //             <ScrollToTop />

// //             {/* Page content grows to fill space */}
// //             <div style={{ flex: 1 }}>
// //               <Routes>
// //                 {/* Client Dashboard Pages */}
// //                 <Route path="/" element={<Dashboard />} />
// //                 <Route path="/clients-order" element={<Revenue />} />

// //                 <Route path="/chat-transcripts" element={<ChatTranscripts />} />
// //                 <Route
// //                   path="/chat-transcripts/chats/:customer_id"
// //                   element={<ChatWindow />}
// //                 />

// //                 {/* client management routes */}
// //                 <Route
// //                   path="/client-management"
// //                   element={<ClientManagement />}
// //                 />

// //                 <Route
// //                   path="/client-management/create-client"
// //                   element={<CreateClient />}
// //                 />

// //                 <Route path="/revenue" element={<BillingHistory />} />
// //                 <Route path="/notifications" element={<Notifications />} />

// //                 {/* User Management Routes */}
// //                 <Route path="/user-management" element={<UserManagement />} />
// //                 <Route
// //                   path="/user-management/add-user"
// //                   element={<AddingNewUser />}
// //                 />

// //                 {/* Client Stores Routes */}
// //                 <Route path="/client-stores" element={<ClientStores />} />
// //                 <Route path="/store_id/:store_id" element={<ViewStorePage />} />

// //                 {/* <Route path="/analytics/*" element={<Analytics />} /> */}
// // {/* ----------------------------------------------------------------------------------F */}
// //                 <Route path="/analytics" element={<Analytics />}>
// //                   <Route index element={<BotEffectiveness />} />
// //                   <Route
// //                     path="bot-effectiveness"
// //                     element={<BotEffectiveness />}
// //                   />
// //                   <Route
// //                     path="training-performance"
// //                     element={<TrainingAndPerformance />}
// //                   />
// //                   <Route
// //                     path="data-health-reliability"
// //                     element={<DataHealthAndReliability />}
// //                   />
// //                   <Route
// //                     path="feature-performance"
// //                     element={<FeaturePerformance />}
// //                   />
// //                 </Route>
// //                 console.log("Analytics Routes Loaded");
// // {/* ---------------------------------------------------------------------------------- */}
// //                 <Route path="/products" element={<Products />} />

// //                 <Route path="/client-feedback" element={<ClientFeedBack />} />

// //                 <Route
// //                   path="/chat-problems-report"
// //                   element={<ReportProblem />}
// //                 />
// //               </Routes>
// //             </div>

// //             {/* Sticky Footer */}
// //             {!isAuthPage && <Footer />}
// //           </div>
// //         </Router>
// //       </div>
// //     </>
// //   );
// // };

// // export default App;

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LeftSidebarMenu from "./components/Layout/LeftSidebarMenu";
// import Footer from "./components/Layout/Footer";
// import TopNavbar from "./components/Layout/TopNavbar";
// import ScrollToTop from "./components/Layout/ScrollToTop";
// import Dashboard from "./pages/admin-dashboard/dashboard";
// import BillingHistory from "./pages/admin-dashboard/billing-history";
// import Analytics from "./pages/admin-dashboard/analytics";
// import Revenue from "./pages/admin-dashboard/revenue";
// import ChatTranscripts from "./pages/admin-dashboard/chat-transcripts";
// import ClientManagement from "./pages/admin-dashboard/client-management";
// import Notifications from "./pages/admin-dashboard/notifications";
// import UserManagement from "./pages/admin-dashboard/user-management";
// import CreateClient from "./pages/admin-dashboard/client-management/create-client";
// import AddingNewUser from "./pages/admin-dashboard/user-management/add-user";
// import ChatWindow from "./pages/admin-dashboard/chat-transcripts/chat-window";
// import ClientStores from "./pages/admin-dashboard/client-store";
// import Products from "./pages/admin-dashboard/products";
// import ClientFeedBack from "./pages/admin-dashboard/client-feedback";
// import ReportProblem from "./pages/admin-dashboard/report-problem";
// import ViewStorePage from "./pages/admin-dashboard/client-store/view-store";

// import BotEffectiveness from "./components/AdminDashboard/Analytics/BotEffectiveness";
// import TrainingAndPerformance from "./components/AdminDashboard/Analytics/TrainingAndPerformance";
// import DataHealthAndReliability from "./components/AdminDashboard/Analytics/DataHealthAndReliability";
// import FeaturePerformance from "./components/AdminDashboard/Analytics/FeaturePerformance";
// import TrainingPerformanceDetailsPage from "./components/AdminDashboard/Analytics/TrainingPerformanceDetailsPage";

// const App = () => {
//   const [active, setActive] = useState(false);
//   const [pathname, setPathname] = useState("");

//   useEffect(() => {
//     setPathname(window.location.pathname); // Get the current path
//   }, []);

//   const toggleActive = () => {
//     setActive(!active);
//   };

//   const isAuthPage = [
//     "/authentication/sign-in/",
//     "/authentication/sign-up/",
//     "/authentication/forgot-password/",
//     "/authentication/reset-password/",
//     "/authentication/confirm-email/",
//     "/authentication/lock-screen/",
//     "/authentication/logout/",
//   ].includes(pathname);

//   return (
//     <>
//       <div className={`main-wrapper-content ${active ? "active" : ""}`}>
//         <Router>
//           {!isAuthPage && (
//             <>
//               <TopNavbar toggleActive={toggleActive} />
//               <LeftSidebarMenu toggleActive={toggleActive} />
//             </>
//           )}

//           {/* Main Content with sticky footer support */}
//           <div
//             className="main-content"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               minHeight: "calc(100vh - 100px)", // subtract TopNavbar height
//             }}
//           >
//             <ScrollToTop />

//             {/* Page content grows to fill space */}
//             <div style={{ flex: 1 }}>
//               <Routes>
//                 {/* Client Dashboard Pages */}
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/clients-order" element={<Revenue />} />

//                 <Route path="/chat-transcripts" element={<ChatTranscripts />} />
//                 <Route
//                   path="/chat-transcripts/chats/:customer_id"
//                   element={<ChatWindow />}
//                 />

//                 {/* client management routes */}
//                 <Route
//                   path="/client-management"
//                   element={<ClientManagement />}
//                 />

//                 <Route
//                   path="/client-management/create-client"
//                   element={<CreateClient />}
//                 />

//                 <Route path="/revenue" element={<BillingHistory />} />
//                 <Route path="/notifications" element={<Notifications />} />

//                 {/* User Management Routes */}
//                 <Route path="/user-management" element={<UserManagement />} />
//                 <Route
//                   path="/user-management/add-user"
//                   element={<AddingNewUser />}
//                 />

//                 {/* Client Stores Routes */}
//                 <Route path="/client-stores" element={<ClientStores />} />
//                 <Route path="/store_id/:store_id" element={<ViewStorePage />} />

//                 {/* Analytics routes */}
//                 <Route path="/analytics" element={<Analytics />}>
//                   <Route index element={<BotEffectiveness />} />
//                   <Route
//                     path="bot-effectiveness"
//                     element={<BotEffectiveness />}
//                   />
//                   <Route
//                     path="training-performance"
//                     element={<TrainingAndPerformance />}
//                   />
//                   <Route
//                     path="training-performance/details"
//                     element={<TrainingPerformanceDetailsPage />}
//                   />
//                   <Route
//                     path="data-health-reliability"
//                     element={<DataHealthAndReliability />}
//                   />
//                   <Route
//                     path="feature-performance"
//                     element={<FeaturePerformance />}
//                   />
//                 </Route>

//                 <Route path="/products" element={<Products />} />

//                 <Route path="/client-feedback" element={<ClientFeedBack />} />

//                 <Route
//                   path="/chat-problems-report"
//                   element={<ReportProblem />}
//                 />
//               </Routes>
//             </div>

//             {/* Sticky Footer */}
//             {!isAuthPage && <Footer />}
//           </div>
//         </Router>
//       </div>
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftSidebarMenu from "./components/Layout/LeftSidebarMenu";
import Footer from "./components/Layout/Footer";
import TopNavbar from "./components/Layout/TopNavbar";
import ScrollToTop from "./components/Layout/ScrollToTop";

<<<<<<< HEAD
=======
// Pages
>>>>>>> 17a8032 (Added data and health filter functionality, updated the feature performance and conversion rate per client)
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

<<<<<<< HEAD
=======
// Analytics Pages
import AnalyticsLayout from "./components/AdminDashboard/Analytics/AnalyticsLayout";
>>>>>>> 17a8032 (Added data and health filter functionality, updated the feature performance and conversion rate per client)
import BotEffectiveness from "./components/AdminDashboard/Analytics/BotEffectiveness";
import TrainingAndPerformance from "./components/AdminDashboard/Analytics/TrainingAndPerformance";
import DataHealthAndReliability from "./components/AdminDashboard/Analytics/DataHealthAndReliability";
import FeaturePerformance from "./components/AdminDashboard/Analytics/FeaturePerformance";
<<<<<<< HEAD
import TrainingPerformanceDetailsPage from "./components/AdminDashboard/Analytics/TrainingPerformanceDetailsPage";
=======
import BotEffectivenessDetails from "./components/AdminDashboard/Analytics/BotEffectivenessDetails";


// Detail Pages
import DataHealthviewdetails from "./components/AdminDashboard/Analytics/DataHealthviewdetails";
import FeatureDropoffDetails from "./components/AdminDashboard/Analytics/FeatureDropoffDetails";
import FeatureUsageDetails from "./components/AdminDashboard/Analytics/FeatureUsageDetails";
>>>>>>> 17a8032 (Added data and health filter functionality, updated the feature performance and conversion rate per client)

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

<<<<<<< HEAD
          <div
            className="main-content"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 100px)",
            }}
          >
            <ScrollToTop />

            <div style={{ flex: 1 }}>
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

                {/* Notifications */}
                <Route path="/notifications" element={<Notifications />} />

                {/* User Management */}
                <Route path="/user-management" element={<UserManagement />} />
                <Route
                  path="/user-management/add-user"
                  element={<AddingNewUser />}
                />

                {/* Client Stores */}
                <Route path="/client-stores" element={<ClientStores />} />
                <Route path="/store_id/:store_id" element={<ViewStorePage />} />

                {/* Analytics Routing */}
                <Route path="/analytics" element={<Analytics />}>
                  <Route index element={<BotEffectiveness />} />
                  <Route path="bot-effectiveness" element={<BotEffectiveness />} />
                  <Route
                    path="training-performance"
                    element={<TrainingAndPerformance />}
                  />
                  {/* NEW ADDED ROUTE */}
                  <Route
                    path="training-performance/details"
                    element={<TrainingPerformanceDetailsPage />}
                  />
                  <Route
                    path="data-health-reliability"
                    element={<DataHealthAndReliability />}
                  />
                  <Route
                    path="feature-performance"
                    element={<FeaturePerformance />}
                  />
                </Route>

                {/* Products */}
                <Route path="/products" element={<Products />} />

                {/* Feedback */}
                <Route path="/client-feedback" element={<ClientFeedBack />} />

                {/* Support */}
                <Route
                  path="/chat-problems-report"
                  element={<ReportProblem />}
                />
              </Routes>
            </div>

            {!isAuthPage && <Footer />}
          </div>
        </Router>
      </div>
    </>
=======
        {!isAuthPage && (
          <>
            <TopNavbar toggleActive={() => setActive(!active)} />
            <LeftSidebarMenu toggleActive={() => setActive(!active)} />
          </>
        )}

        <div className="main-content" style={{ minHeight: "calc(100vh - 100px)", display: "flex", flexDirection: "column" }}>
          <ScrollToTop />

          <Routes>

            {/* Dashboard + Default Pages */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients-order" element={<Revenue />} />
            <Route path="/chat-transcripts" element={<ChatTranscripts />} />
            <Route path="/chat-transcripts/chats/:customer_id" element={<ChatWindow />} />
            <Route path="/client-management" element={<ClientManagement />} />
            <Route path="/client-management/create-client" element={<CreateClient />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/user-management/add-user" element={<AddingNewUser />} />
            <Route path="/client-stores" element={<ClientStores />} />
            <Route path="/store_id/:store_id" element={<ViewStorePage />} />

            {/* ----------------- ANALYTICS ROUTES ----------------- */}
            <Route path="/analytics" element={<AnalyticsLayout />}>
              
              {/* Main Tab Pages */}
              <Route index element={<BotEffectiveness />} />
              <Route path="bot-effectiveness" element={<BotEffectiveness />} />
              <Route path="bot-effectiveness/details" element={<BotEffectivenessDetails />} />
              <Route path="training-performance" element={<TrainingAndPerformance />} />
              <Route path="data-health-reliability" element={<DataHealthAndReliability />} />
              <Route path="feature-performance" element={<FeaturePerformance />} />

              {/* Detail Pages */}
              <Route path="data-health/details" element={<DataHealthviewdetails />} />
              <Route path="feature-performance/line-details" element={<FeatureDropoffDetails />} />
              <Route path="feature-performance/donut-details" element={<FeatureUsageDetails />} />

            </Route>

            {/* Other Pages */}
            <Route path="/products" element={<Products />} />
            <Route path="/client-feedback" element={<ClientFeedBack />} />
            <Route path="/chat-problems-report" element={<ReportProblem />} />

          </Routes>

          {!isAuthPage && <Footer />}
        </div>
      </Router>
    </div>
>>>>>>> 17a8032 (Added data and health filter functionality, updated the feature performance and conversion rate per client)
  );
};

export default App;
