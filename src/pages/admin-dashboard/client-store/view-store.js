// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../../styles/view-store.css";

// export default function ViewStorePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [store, setStore] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Fetching store details for ID:", id);
//     const API_URL = `http://127.0.0.1:8000/api/client-stores/${id}`;

//     axios.get(API_URL)
//       .then((res) => {
//         setStore(res.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching store:", error);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleGoBack = () => {
//     navigate(-1); // Go back to previous page
//   };

//   if (loading) return (
//     <div className="loading-container">
//       <p>Loading store details...</p>
//     </div>
//   );

//   if (!store) return (
//     <div className="error-container">
//       <p>No store found.</p>
//     </div>
//   );

//   return (
//     <div className="store-details-container">
//       {/* Page Header with Back Button */}
//       <div className="page-header">
//         <div className="header-left">
//           <button className="back-button" onClick={handleGoBack}>
//             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Back
//           </button>
//           <h2 className="page-title">Store Details</h2>
//         </div>
//         <div className="store-id">ID: {store.client_store_id}</div>
//       </div>

//       {/* Rest of your existing JSX remains the same */}
//       <div className="main-store-card">
//         <div className="store-header">
//           <div className="store-basic-info">
//             <h1 className="store-name">{store.store_name}</h1>
//             <div className="store-type-badge">
//               {store.store_types?.join(", ")}
//             </div>
//           </div>
//           <div className="store-status">
//             <span className={`status-badge ${store.widget_status ? 'active' : 'inactive'}`}>
//               {store.widget_status ? 'Active' : 'Inactive'}
//             </span>
//           </div>
//         </div>

//         <div className="store-stats-grid">
//           <div className="stat-item">
//             <label>Plan</label>
//             <span className="stat-value">{store.plan_name || "-"}</span>
//           </div>
//           <div className="stat-item">
//             <label>Amount</label>
//             <span className="stat-value">${Number(store.plan_amount).toLocaleString()}</span>
//           </div>
//           <div className="stat-item">
//             <label>Locations</label>
//             <span className="stat-value">{store.number_of_locations ?? "-"}</span>
//           </div>
//           <div className="stat-item">
//             <label>Zip Codes</label>
//             <span className="stat-value">{store.location_zip_codes?.join(", ") || "-"}</span>
//           </div>
//         </div>
//       </div>

//       <div className="details-grid">
//         <div className="detail-card">
//           <div className="card-header">
//             <h3>Chatbot Settings</h3>
//           </div>
//           <div className="card-content">
//             <div className="info-row">
//               <span className="info-label">Chatbot Name:</span>
//               <span className="info-value">{store.chatbot_name || "-"}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Widget Status:</span>
//               <span className={`status ${store.widget_status ? 'active' : 'inactive'}`}>
//                 {store.widget_status ? 'Enabled' : 'Disabled'}
//               </span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Welcome Message:</span>
//               <span className="info-value">{store.welcome_message || "Not set"}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Disclaimer:</span>
//               <span className="info-value">{store.disclaimer_text || "Not set"}</span>
//             </div>
//           </div>
//         </div>

//         <div className="detail-card">
//           <div className="card-header">
//             <h3>Store Information</h3>
//           </div>
//           <div className="card-content">
//             <div className="info-row">
//               <span className="info-label">Store ID:</span>
//               <span className="info-value store-id">{store.client_store_id}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Store Name:</span>
//               <span className="info-value">{store.store_name}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Store Types:</span>
//               <span className="info-value">{store.store_types?.join(", ") || "-"}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Number of Locations:</span>
//               <span className="info-value">{store.number_of_locations}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../../styles/view-store.css";

// export default function ViewStorePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [store, setStore] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Fetching store details for ID:", id);
//     const API_URL = `http://127.0.0.1:8000/api/client-stores/${id}?`; // pass client_id if needed

//     axios.get(API_URL)
//       .then((res) => {
//         setStore(res.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching store:", error);
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   if (loading) return (
//     <div className="loading-container">
//       <p>Loading store details...</p>
//     </div>
//   );

//   if (!store) return (
//     <div className="error-container">
//       <p>No store found.</p>
//     </div>
//   );

//   return (
//     <div className="store-details-container">
//       {/* Page Header with Back Button */}
//       <div className="page-header">
//         <div className="header-left">
//           <button className="back-button" onClick={handleGoBack}>
//             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Back
//           </button>
//           <h2 className="page-title">Store Details</h2>
//         </div>
//         <div className="store-id">ID: {store.client_store_id}</div>
//       </div>

//       {/* Main Store Card */}
//       <div className="main-store-card">
//         <div className="store-header">
//           <div className="store-basic-info">
//             <h1 className="store-name">{store.store_name}</h1>
//             <div className="store-type-badge">
//               {store.store_types?.join(", ") || "-"}
//             </div>
//           </div>
//           <div className="store-status">
//             <span className={`status-badge ${store.subscription_status === 'active' ? 'active' : 'inactive'}`}>
//               {store.subscription_status ? store.subscription_status.toUpperCase() : 'N/A'}
//             </span>
//           </div>
//         </div>

//         <div className="store-stats-grid">
//           <div className="stat-item">
//             <label>Plan</label>
//             <span className="stat-value">{store.plan_name || "-"}</span>
//           </div>
//           <div className="stat-item">
//             <label>Amount</label>
//             <span className="stat-value">${Number(store.plan_amount).toLocaleString()}</span>
//           </div>
//           <div className="stat-item">
//             <label>Next Due Date</label>
//             <span className="stat-value">{store.next_due_date ? new Date(store.next_due_date).toLocaleDateString() : "-"}</span>
//           </div>
//           <div className="stat-item">
//             <label>Locations</label>
//             <span className="stat-value">{store.number_of_locations ?? "-"}</span>
//           </div>
//           <div className="stat-item">
//             <label>Zip Codes</label>
//             <span className="stat-value">{store.location_zip_codes?.join(", ") || "-"}</span>
//           </div>
//         </div>
//       </div>

//       {/* Details Grid */}
//       <div className="details-grid">
//         {/* Chatbot Settings */}
//         <div className="detail-card">
//           <div className="card-header">
//             <h3>Chatbot Settings</h3>
//           </div>
//           <div className="card-content">
//             <div className="info-row">
//               <span className="info-label">Chatbot Name:</span>
//               <span className="info-value">{store.chatbot_name || "-"}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Welcome Message:</span>
//               <span className="info-value">{store.chatbot_welcome_message || "Not set"}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Disclaimer:</span>
//               <span className="info-value">{store.chatbot_disclaimer || "Not set"}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Theme Color:</span>
//               <span className="info-value">{store.chatbot_theme_color || "-"}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Font Style:</span>
//               <span className="info-value">{store.chatbot_font_style || "-"}</span>
//             </div>
//           </div>
//         </div>

//         {/* Store Information */}
//         <div className="detail-card">
//           <div className="card-header">
//             <h3>Store Information</h3>
//           </div>
//           <div className="card-content">
//             <div className="info-row">
//               <span className="info-label">Store ID:</span>
//               <span className="info-value">{store.client_store_id}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Store Name:</span>
//               <span className="info-value">{store.store_name}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Store Types:</span>
//               <span className="info-value">{store.store_types?.join(", ") || "-"}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Number of Locations:</span>
//               <span className="info-value">{store.number_of_locations}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Contact Person:</span>
//               <span className="info-value">{store.contact_person_name}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Contact Email:</span>
//               <span className="info-value">{store.contact_email_id}</span>
//             </div>
//             <div className="info-row">
//               <span className="info-label">Domain URL:</span>
//               <span className="info-value">{store.domain_url}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// -----------------------------------------------------------------------

//

// import React, { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import "../../../styles/view-store.css";

// function ViewStorePage() {
//   const { store_id } = useParams();
//   const { search } = useLocation();
//   const client_id = new URLSearchParams(search).get("client_id");

//   const [store, setStore] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!store_id || !client_id) {
//       console.error("Missing params:", { store_id, client_id });
//       return;
//     }

//     console.log("Fetching store details for ID:", store_id);

//     const API_URL = `http://127.0.0.1:8000/api/client-stores/${store_id}?client_id=${client_id}`;

//     axios.get(API_URL)
//       .then((res) => setStore(res.data.data))
//       .catch((err) => console.error("Error fetching store:", err))
//       .finally(() => setLoading(false));
//   }, [store_id, client_id]);

//   if (loading) return <p>Loading store...</p>;

//   return (
//     <div className="view-store-container">
//       {/* Header */}
//       <div className="view-store-header">
//         <h1>View Store</h1>
//         <button className="back-btn" onClick={() => window.history.back()}>
//           &larr; Back
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="view-store-tabs">
//         <span className="active-tab">STORE INFO</span>
//         <span className="disabled-tab">SUBSCRIPTION</span>
//         <span className="disabled-tab">CHATBOT SETTINGS</span>
//         <span className="disabled-tab">BRANDING</span>
//       </div>

//       {/* Store Information */}
//       <div className="store-info">
//         <h2>Store Information</h2>
//         <div className="store-info-grid">
//           {/* Store Name */}
//           <div className="store-info-item">
//             <label>
//               Store Name <span className="required">*</span>
//             </label>
//             <input type="text" value={store.name} readOnly />
//           </div>

//           {/* Contact Person Name */}
//           <div className="store-info-item">
//             <label>
//               Contact Person Name <span className="required">*</span>
//             </label>
//             <input type="text" value={store.contactPerson} readOnly />
//           </div>

//           {/* Contact Email */}
//           <div className="store-info-item">
//             <label>
//               Contact Email ID <span className="required">*</span>
//             </label>
//             <input type="text" value={store.contactEmail} readOnly />
//           </div>

//           {/* Store URL */}
//           <div className="store-info-item">
//             <label>
//               Store URL <span className="required">*</span>
//             </label>
//             <input type="text" value={store.url} readOnly />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewStorePage;
// -----working-------------------------------------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import ChatbotSettings from "../../../components/AdminDashboard/ClientStore/ChatbotSettingsView";
import BrandingAppearance from "../../../components/AdminDashboard/ClientStore/BrandingAppearanceView";
import SubscriptionTypeView from "../../../components/AdminDashboard/ClientStore/SubscriptionTypeView";
import StoreInfoView from "../../../components/AdminDashboard/ClientStore/StoreInfoView";

function ViewStorePage() {
  const [currentTab, setCurrentTab] = useState("store_info");

  const { store_id } = useParams();
  const { search } = useLocation();
  const client_id = new URLSearchParams(search).get("client_id");

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!store_id || !client_id) return;

    fetch(`http://127.0.0.1:8000/api/client-stores/${store_id}?client_id=${client_id}`)
      .then((res) => res.json())
      .then((data) => setStore(data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [store_id, client_id]);

  if (loading) return <p>Loading store details...</p>;
  if (!store) return <p>No store data available.</p>;

  return (
    <div style={{ padding: "24px 32px", width: "100%", color: "#111827" }}>

      {/* WHITE CARD WRAPPER */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "10px",
          padding: "32px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        }}
      >

        {/* PAGE HEADER INSIDE WHITE BACKGROUND */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            View Store
          </h1>

          <button
            onClick={() => window.history.back()}
            style={{
              background: "transparent",
              border: "1px solid #D1D5DB",
              padding: "6px 14px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14,
              color: "#374151",
            }}
          >
            ← Back
          </button>
        </div>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: "35px",
            marginBottom: "25px",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          {[
            { key: "store_info", label: "STORE INFO" },
            { key: "subscription", label: "SUBSCRIPTION" },
            { key: "chatbot_settings", label: "CHATBOT SETTINGS" },
            { key: "branding", label: "BRANDING" },
          ].map((tab) => {
            const active = currentTab === tab.key;

            return (
              <div
                key={tab.key}
                onClick={() => setCurrentTab(tab.key)}
                style={{
                  paddingBottom: "12px",
                  cursor: "pointer",
                  fontWeight: active ? 700 : 500,
                  fontSize: 13,
                  color: active ? "#2563EB" : "#6B7280",
                  borderBottom: active
                    ? "2px solid #2563EB"
                    : "2px solid transparent",
                  transition: "0.25s",
                }}
              >
                {tab.label}
              </div>
            );
          })}
        </div>

        {/* TAB CONTENT */}
        {currentTab === "store_info" && (
          <StoreInfoView storeData={store} isEdit={false} />
        )}

        {currentTab === "subscription" && store?.subscription_status &&(
          <SubscriptionTypeView
            isEdit={false}
            isEditable={false}
            selectedPlan={store?.plan_name}
            setSelectedPlan={() => {}}
            enableFreeTrial={false}
            plansData={store}
            numLocations={store?.number_of_locations || 1}
            currentPlanData={{
              plan_name: store?.plan_name,
              locations: store?.number_of_locations,
              total_amount: store?.plan_amount,
            }}
          />
        )}

        {currentTab === "chatbot_settings" && (
          <ChatbotSettings chatbotData={store} isEdit={false} isEditable={false} />
        )}

        {currentTab === "branding" && (
          <BrandingAppearance
            isEdit={false}
            isEditable={false}
            storeId={store?.client_store_id}
            clientId={store?.client_id}
            apiBase="http://127.0.0.1:8000"
          />
        )}

      </div>
      {/* END WHITE BACKGROUND */}
    </div>
  );
}

export default ViewStorePage;


// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Button,

//   CircularProgress,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import StoreInfoView from "../../../components/AdminDashboard/ClientStore/StoreInfoView"; // read-only version
// import SubscriptionTypeView from "../../../components/AdminDashboard/ClientStore/SubscriptionTypeView";
// import ChatbotSettingsView from "../../../components/AdminDashboard/ClientStore/ChatbotSettingsView";
// import BrandingAppearanceView from "../../../components/AdminDashboard/ClientStore/BrandingAppearanceView";
// import { useNavigate, useParams } from "react-router-dom";
// import config from "../../../config";
// // import { AuthContext } from "../../../../authentication/AuthContext";

// function CustomTabPanel({ children, value, index }) {
//   return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
// }

// const ViewStoreDetails = () => {
//   const navigate = useNavigate();
//   // const { checkSubscriptionStatus } = useContext(AuthContext);
//   const { store_id } = useParams();
//   const CLIENT_ID = config.clientId;

//   const [activeTab, setActiveTab] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Store Info States
//   const [storeData, setStoreData] = useState(null);

//   // Subscription States
//   const [plansData] = useState([]);
//   const [currentPlanData, setCurrentPlanData] = useState(null);
//   const [numLocations, setNumLocations] = useState(1);

//   // Chatbot & Branding
//   const [chatbotData, setChatbotData] = useState({});
//   const [brandingData, setBrandingData] = useState({});

//   // Fetch store details
//   useEffect(() => {
//     const fetchStore = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${config.API_BASE_URL}/store_id/${store_id}?client_id=${CLIENT_ID}`);
//         const json = await res.json();
//         if (!json.success) throw new Error(json.message || "Failed to load store");
//         const data = json.data;

//         setStoreData({
//           storeName: data.store_name || "",
//           storeTypes: data.store_types || [],
//           zipCodes: data.location_zip_codes || [],
//           numLocations: parseInt(data.number_of_locations) || 1,
//           contactName: data.contact_person_name || "",
//           contactEmail: data.contact_email_id || "",
//           storeUrl: data.domain_url || "",
//         });

//         setNumLocations(parseInt(data.number_of_locations) || 1);

//         // Subscription
//         setCurrentPlanData({
//           plan_name: data.plan_name || "Free",
//           free_trial: data.free_trial || false,
//           locations: data.number_of_locations || 1,
//         });

//         // Chatbot
//         setChatbotData({
//           chatbot_name: data.chatbot_name || "",
//           welcome_message: data.chatbot_welcome_message || "",
//           disclaimer_text: data.chatbot_disclaimer || "",
//         });

//         // Branding
//         setBrandingData({
//           theme_color_hex: data.chatbot_theme_color || "#007bff",
//           font_style: data.chatbot_font_style || "Arial",
//           logo_url: data.chatbot_logo_url || null,
//         });

//       } catch (error) {
//         console.error("Error fetching store:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStore();
//   }, [store_id, CLIENT_ID]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!storeData) {
//     return <Typography>No store details available.</Typography>;
//   }

//   return (
//     <Card sx={{ boxShadow: "none", borderRadius: "7px", mb: "25px", padding: { xs: "18px", sm: "20px", lg: "25px" } }}>
//       {/* Header */}
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "25px" }}>
//         <Typography variant="h3" sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700 }}>
//           Store Details
//         </Typography>
//         <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/store-management")}>
//           Back
//         </Button>
//       </Box>

//       {/* Tabs */}
//       <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
//         <Tab label="Store Info" />
//         <Tab label="Subscription" />
//         <Tab label="Chatbot Settings" />
//         <Tab label="Branding" />
//       </Tabs>

//       {/* Store Info Tab */}
//       <CustomTabPanel value={activeTab} index={0}>
//         <StoreInfoView
//           storeName={storeData.storeName}
//           storeTypes={storeData.storeTypes}
//           zipCodes={storeData.zipCodes}
//           numLocations={storeData.numLocations}
//           contactName={storeData.contactName}
//           contactEmail={storeData.contactEmail}
//           storeUrl={storeData.storeUrl}
//         />
//       </CustomTabPanel>

//       {/* Subscription Tab */}
//       <CustomTabPanel value={activeTab} index={1}>
//         <SubscriptionTypeView
//           numLocations={numLocations}
//           selectedPlan={currentPlanData.plan_name}
//           setSelectedPlan={() => {}}
//           plansData={plansData || []}
//           isEdit={false}
//           currentPlanData={currentPlanData}
//         />
//       </CustomTabPanel>

//       {/* Chatbot Tab */}
//       <CustomTabPanel value={activeTab} index={2}>
//         <ChatbotSettingsView
//           isEdit={false}
//           isEditable={false}
//           defaultValues={chatbotData}
//           storeId={store_id}
//           clientId={CLIENT_ID}
//           apiBase={config.API_BASE_URL}
//         />
//       </CustomTabPanel>

//       {/* Branding Tab */}
//       <CustomTabPanel value={activeTab} index={3}>
//         <BrandingAppearanceView
//           isEdit={false}
//           isEditable={false}
//           defaultValues={brandingData}
//           storeId={store_id}
//           clientId={CLIENT_ID}
//           apiBase={config.API_BASE_URL}
//         />
//       </CustomTabPanel>
//     </Card>
//   );
// };

// export default ViewStoreDetails;
