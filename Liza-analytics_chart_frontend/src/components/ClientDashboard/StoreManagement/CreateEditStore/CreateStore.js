"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import StoreInfo from "./StoreInfo";
import SubscriptionTypeClean from "./SubscriptionTypeClean";
import ChatbotSettings from "./ChatbotSetting";
import BrandingAppearance from "./BrandingAppearance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import config from "../../../../config";
import { AuthContext } from "../../../../authentication/AuthContext";

function CustomTabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

const CreateStore = () => {
  const navigate = useNavigate();
  const { checkSubscriptionStatus } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const CLIENT_ID = config.clientId;

  // Store Info States
  const [storeName, setStoreName] = useState("");
  const [storeTypes, setStoreTypes] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [numLocations, setNumLocations] = useState(1);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [storeUrl, setStoreUrl] = useState("");

  // Subscription States
  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [enableFreeTrial, setEnableFreeTrial] = useState(false);
  const [plansData, setPlansData] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(false);

  // Chatbot & Branding States (defaults - will be saved on payment)
  const [chatbotData, setChatbotData] = useState({
    chatbot_name: "BudE Assistant",
    widget_status: "disabled",
    // Add other default chatbot fields
  });
  const [brandingData, setBrandingData] = useState({
    primary_color: "#007bff",
    secondary_color: "#6c757d",
    // Add other default branding fields
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);

  // Validation for Store Info
  const isStoreInfoValid = () => {
    return (
      storeName.trim().length >= 3 &&
      contactName.trim().length >= 3 &&
      contactEmail.trim().includes("@") &&
      storeUrl.trim().length > 0 &&
      storeTypes.length > 0 &&
      zipCodes.length > 0 &&
      numLocations > 0
    );
  };

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  // Fetch plans data from API
  const fetchPlansData = async () => {
    setLoadingPlans(true);
    try {
      const response = await fetch(`${config.API_BASE_V2_URL}/subscriptions/plans`);
      const result = await response.json();

      if (result.success && result.data) {
        // Sort plans in order: Basic, Pro, Premium
        const sortedPlans = result.data.sort((a, b) => {
          const order = ["Basic", "Pro", "Premium"];
          return order.indexOf(a.plan_name) - order.indexOf(b.plan_name);
        });

        setPlansData(sortedPlans);
      } else {
        throw new Error(result.error || "Failed to fetch plans");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      showSnackbar("Failed to load plans", "error");
    } finally {
      setLoadingPlans(false);
    }
  };

  const handleNext = () => {
    if (activeTab === 0) {
      if (!isStoreInfoValid()) {
        showSnackbar("Please fill all required fields", "error");
        return;
      }
      // Fetch plans data before moving to subscription tab
      fetchPlansData();
      setActiveTab(1);
    }
  };

  const handlePrev = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  // Get default values based on selected plan
  const getDefaultChatbotSettings = () => {
    const defaults = {
      Free: {
        chatbot_name: "BudE Assistant",
        welcome_message: "Hello! How can I help you today?",
        disclaimer_text: "This is an AI assistant. Responses may not always be accurate.",
        widget_status: "disabled",
      },
      Basic: {
        chatbot_name: "BudE Assistant",
        welcome_message: "Welcome! I'm here to help you find what you need.",
        disclaimer_text: "AI-powered assistance for your queries.",
        widget_status: "enabled",
      },
      Premium: {
        chatbot_name: "BudE Pro Assistant",
        welcome_message: "Welcome! I'm your premium AI assistant ready to help.",
        disclaimer_text: "Premium AI assistance with advanced features.",
        widget_status: "enabled",
      },
      Pro: {
        chatbot_name: "BudE Enterprise Assistant",
        welcome_message: "Welcome! Your enterprise AI assistant is ready.",
        disclaimer_text: "Enterprise-grade AI assistance.",
        widget_status: "enabled",
      },
    };
    return defaults[selectedPlan] || defaults.Free;
  };

  const getDefaultBrandingSettings = () => {
    const defaults = {
      Free: {
        primary_color: "#007bff",
        secondary_color: "#6c757d",
        font_family: "Arial, sans-serif",
      },
      Basic: {
        primary_color: "#007bff",
        secondary_color: "#6c757d",
        font_family: "Arial, sans-serif",
      },
      Premium: {
        primary_color: "#007bff",
        secondary_color: "#6c757d",
        font_family: "Roboto, sans-serif",
      },
      Pro: {
        primary_color: "#007bff",
        secondary_color: "#6c757d",
        font_family: "Roboto, sans-serif",
      },
    };
    return defaults[selectedPlan] || defaults.Free;
  };

  const handleCreateStore = async () => {
    // Final validation
    if (!isStoreInfoValid()) {
      showSnackbar("Please complete Store Info section", "error");
      return;
    }

    setLoading(true);
    showSnackbar("Creating store and processing payment...", "info");

    // Get defaults based on selected plan
    const defaultChatbot = getDefaultChatbotSettings();
    const defaultBranding = getDefaultBrandingSettings();

    // Get current plan details
    const currentPlan = plansData?.find((p) => p.plan_name === selectedPlan);

    const payload = {
      client_id: CLIENT_ID,
      store_name: storeName.trim(),
      store_types: storeTypes,
      number_of_locations: numLocations,
      location_zip_codes: zipCodes,
      contact_person_name: contactName.trim(),
      contact_email_id: contactEmail.trim(),
      domain_url: storeUrl.trim(),
      subscription: {
        plan_id: currentPlan?.plan_id, // UUID - Primary identifier for backend
        plan: selectedPlan,
        plan_code: currentPlan?.plan_code || `${selectedPlan.toUpperCase()}-MONTHLY`,
        billing_cycle: "monthly", // Always monthly now
        plan_amount: calculateTotalAmount(),
        quantity: numLocations,
        enable_free_trial: enableFreeTrial, // Free trial flag
      },
      // Include default settings to be saved on payment completion
      chatbot_defaults: defaultChatbot,
      branding_defaults: defaultBranding,
    };

    try {
      const response = await fetch(`${config.API_BASE_URL}/client/store/create-with-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      console.log("Create store response:", result);
      setSubscriptionData(result.data || null);
      if (!response.ok || !result.success) {
        throw new Error(result.error?.details || result.message || "Failed to create store");
      }

      showSnackbar(result.message || "Store created successfully!", "success");

      // If payment URL exists, show it in iframe
      if (result.data?.checkout_url) {
        setPaymentUrl(result.data.checkout_url);
      } else {
        // Free plan - no payment needed
        setTimeout(() => {
          navigate("/store-management");
        }, 1500);
      }
    } catch (error) {
      console.error("Create store error:", error);
      showSnackbar(error.message || "Failed to create store", "error");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    // Get the current plan details from plansData
    const currentPlan = plansData?.find((p) => p.plan_name === selectedPlan);
    if (!currentPlan) return 0;

    const basePrice = parseFloat(currentPlan.plan_amount);
    const totalAmount = basePrice * numLocations;
    const taxPercent = 0; // 0% tax for now
    const tax = totalAmount * (taxPercent / 100);
    return totalAmount + tax;
  };

  useEffect(() => {
    if (paymentUrl == null) return;

    let intervalId;

    const fetchStatus = async () => {
      try {
        const response = await fetch(`${config.API_BASE_V2_URL}/subscriptions/${subscriptionData.client_subscription_id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log("Subscription status check:", result);

        if (result.success && result.data?.sidglo_subscription_status === "active") {
          setPaymentStatus("active");
          clearInterval(intervalId); // stop polling
        } else {
          setPaymentStatus(result.data?.sidglo_subscription_status || "pending");
        }
      } catch (err) {
        console.error("Error fetching subscription status:", err);
      }
    };

    fetchStatus();
    intervalId = setInterval(fetchStatus, 10000);

    return () => clearInterval(intervalId);
  }, [paymentUrl]);

  useEffect(() => {
    if (paymentStatus === "active") {
      showSnackbar("Payment completed and store activated!", "success");

      // ✅ Refresh subscription status in AuthContext
      const refreshSubscription = async () => {
        const clientId = config.clientId;
        if (clientId && checkSubscriptionStatus) {
          console.log("[CREATE STORE] Refreshing subscription status after payment...");
          await checkSubscriptionStatus(clientId);
          console.log("[CREATE STORE] Subscription status refreshed!");
        }

        setTimeout(() => {
          navigate("/store-management");
        }, 2000);
      };

      refreshSubscription();
    }
  }, [paymentStatus]);

  // If payment URL exists, show iframe
  if (paymentUrl) {
    return (
      <Box>
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Complete Payment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please complete the payment to activate your store
          </Typography>
        </Box>
        <Card sx={{ p: 2, height: "80vh" }}>
          <iframe
            src={paymentUrl}
            title="Payment Checkout"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </Card>
        <Button
          variant="outlined"
          onClick={() => navigate("/store-management")}
          sx={{ mt: 2 }}
        >
          Back to Store Management
        </Button>
      </Box>
    );
  }

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "7px",
        mb: "25px",
        padding: { xs: "18px", sm: "20px", lg: "25px" },
      }}
      className="rmui-card"
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "25px",
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700 }}>
          Create Store
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/store-management")}
        >
          Back
        </Button>
      </Box>

      {/* Tabs - Navigation disabled in create mode */}
      <Tabs value={activeTab} onChange={() => {/* Disabled in create mode */}}>
        <Tab label="Store Info" />
        <Tab label="Subscription" disabled />
        <Tab label="Chatbot Settings" disabled />
        <Tab label="Branding" disabled />
      </Tabs>

      {/* Tab Panels */}
      <CustomTabPanel value={activeTab} index={0}>
        <StoreInfo
          storeName={storeName}
          setStoreName={setStoreName}
          storeTypes={storeTypes}
          setStoreTypes={setStoreTypes}
          zipCodes={zipCodes}
          setZipCodes={setZipCodes}
          numLocations={numLocations}
          setNumLocations={setNumLocations}
          contactName={contactName}
          setContactName={setContactName}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          storeUrl={storeUrl}
          setStoreUrl={setStoreUrl}
          isEdit={false}
        />
      </CustomTabPanel>

      <CustomTabPanel value={activeTab} index={1}>
        <SubscriptionTypeClean
          numLocations={numLocations}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          enableFreeTrial={enableFreeTrial}
          setEnableFreeTrial={setEnableFreeTrial}
          plansData={plansData || []}
          isEdit={false}
        />
      </CustomTabPanel>

      <CustomTabPanel value={activeTab} index={2}>
        <ChatbotSettings
          storeData={{ chatbot: chatbotData }}
          isEdit={false}
          onUpdate={(data) => setChatbotData(data)}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: "italic" }}>
          ℹ️ Chatbot settings will be enabled after payment completion. Default values shown above will be saved.
        </Typography>
      </CustomTabPanel>

      <CustomTabPanel value={activeTab} index={3}>
        <BrandingAppearance
          storeData={{ branding: brandingData }}
          isEdit={false}
          onUpdate={(data) => setBrandingData(data)}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: "italic" }}>
          ℹ️ Branding settings will be enabled after payment completion. Default values shown above will be saved.
        </Typography>
      </CustomTabPanel>

      {/* Navigation Buttons */}
      <Stack direction="row" alignItems="center" mt={2} spacing={2}>
        <Button variant="outlined" onClick={handlePrev} disabled={activeTab === 0 || loading}>
          Previous
        </Button>
        <Box flex={1} />
        {activeTab === 0 && (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStoreInfoValid() || loading}
          >
            Next
          </Button>
        )}
        {activeTab === 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateStore}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Processing..." : "Make Payment"}
          </Button>
        )}
      </Stack>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CreateStore;