import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import ClientDashboard from "../../../components/ClientDashboard/Dashboard";
import { AuthContext } from "../../../authentication/AuthContext";
import config from "../../../config";

const Dashboard = () => {
  const { hasActiveSubscription, checkSubscriptionStatus, user } = useContext(AuthContext);

  // ✅ Refresh subscription status when dashboard loads
  useEffect(() => {
    const refreshSubscription = async () => {
      const clientId = config.clientId || user?.client_id;
      if (clientId && checkSubscriptionStatus) {
        console.log("[DASHBOARD] Checking subscription status on mount...");
        await checkSubscriptionStatus(clientId);
      }
    };

    refreshSubscription();
  }, []); // Run once on mount

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Dashboard</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
        </ul>
      </div>

      {/* Activation Message */}
      {!hasActiveSubscription && (
        <Alert
          severity="warning"
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>Activate Your Account</AlertTitle>
          Please add a store and purchase a subscription to activate complete features.
          <Link
            to="/store-management"
            style={{
              marginLeft: "8px",
              fontWeight: 600,
              color: "#ed6c02",
              textDecoration: "underline"
            }}
          >
            Go to Store Management
          </Link>
        </Alert>
      )}

      {/* Content goes here */}
      <div className="dashboard-content">
        {/* Placeholder for dashboard components */}
        <ClientDashboard />
      </div>
    </>
  );
}
export default Dashboard;