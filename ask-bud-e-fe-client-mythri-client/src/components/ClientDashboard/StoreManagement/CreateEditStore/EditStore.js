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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StoreInfo from "./StoreInfo";
import SubscriptionTypeClean from "./SubscriptionTypeClean";
import ChatbotSettings from "./ChatbotSetting";
import BrandingAppearance from "./BrandingAppearance";
import ManageSeatsModal from "./ManageSeatsModal";
import ManageLocationsModal from "./ManageLocationsModal";
import PlanChangeModal from "./PlanChangeModal";
import AddLocationDetailsModal from "./AddLocationDetailsModal";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../../config";
import { AuthContext } from "../../../../authentication/AuthContext";

function CustomTabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

const EditStore = () => {
  const navigate = useNavigate();
  const { checkSubscriptionStatus } = useContext(AuthContext);
  const { store_id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const CLIENT_ID = config.clientId;

  // Loading states
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  // Store Info States
  const [storeName, setStoreName] = useState("");
  const [storeTypes, setStoreTypes] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [numLocations, setNumLocations] = useState(1);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [existingBillingCycle, setExistingBillingCycle] = useState("monthly");

  // Subscription States
  const [existingPlan, setExistingPlan] = useState("Free");
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [planAmount, setPlanAmount] = useState(0);
  const [plansData, setPlansData] = useState(null);
  const [currentPlanData, setCurrentPlanData] = useState(null);

  // Modal States
  const [showManageSeatsModal, setShowManageSeatsModal] = useState(false);
  const [showManageLocationsModal, setShowManageLocationsModal] = useState(false);
  const [showPlanChangeModal, setShowPlanChangeModal] = useState(false);
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [pendingQuantity, setPendingQuantity] = useState(null);
  const [pendingPlan, setPendingPlan] = useState(null);

  // Chatbot States
  const [chatbotData, setChatbotData] = useState({
    chatbot_name: "",
    chatbot_welcome_message: "",
    chatbot_disclaimer: "",
  });

  // Branding States
  const [brandingData, setBrandingData] = useState({
    chatbot_theme_color: "",
    chatbot_font_style: "",
  });

  // Track changes for save button
  const [storeInfoChanged, setStoreInfoChanged] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Check if plan allows chatbot/branding editing
  const isPremiumOrAbove = ["Premium", "Pro"].includes(selectedPlan);

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  // Fetch plans data first on mount
  useEffect(() => {
    fetchPlansData();
  }, [store_id]);

  // Fetch store data after plansData is available
  useEffect(() => {
    if (plansData) {
      fetchStoreData();
    }
  }, [plansData, store_id]);

  const fetchPlansData = async () => {
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
    }
  };

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      const url = `${config.API_BASE_URL}/client/store/${store_id}?client_id=${CLIENT_ID}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch store data: ${res.status}`);
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to fetch store data");
      }

      const data = json.data;

      // Prefill Store Info
      setStoreName(data.store_name || "");
      setStoreTypes(data.store_types || []);
      setZipCodes(data.location_zip_codes || []);
      setNumLocations(parseInt(data.number_of_locations) || 1);
      setContactName(data.contact_person_name || "");
      setContactEmail(data.contact_email_id || "");
      setStoreUrl(data.domain_url || "");

      // Prefill Subscription
      setSubscriptionId(data.subscription_id || "");
      setSelectedPlan(data.plan_name || "");
      setExistingPlan(data.plan_name);
      setBillingCycle(data.billing_cycle || "");
      setExistingBillingCycle(data.billing_cycle);
      setPlanAmount(data.plan_amount || "");

      // Set current plan data from plansData
      if (plansData) {
        const currentPlan = plansData.find(p => p.plan_name === data.plan_name);
        setCurrentPlanData(currentPlan || null);
      }

      // Prefill Chatbot Settings
      setChatbotData({
        chatbot_name: data.chatbot_name || "",
        chatbot_welcome_message: data.chatbot_welcome_message || "",
        chatbot_disclaimer: data.chatbot_disclaimer || "",
      });

      // Prefill Branding
      setBrandingData({
        chatbot_theme_color: data.chatbot_theme_color || "#007bff",
        chatbot_font_style: data.chatbot_font_style || "Arial",
      });

      showSnackbar("Store data loaded successfully", "success");
    } catch (error) {
      console.error("Error fetching store data:", error);
      showSnackbar(error.message || "Failed to load store data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStoreInfo = async () => {
    try {
      const payload = {
        client_id: CLIENT_ID,
        section: "store_info",
        data: {
          store_name: storeName.trim(),
          store_types: storeTypes,
          number_of_locations: numLocations.toString(),
          location_zip_codes: zipCodes,
          contact_person_name: contactName.trim(),
          contact_email_id: contactEmail.trim(),
          domain_url: storeUrl.trim(),
        }
      };

      const res = await fetch(`${config.API_BASE_URL}/client/store/${store_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to update store info");
      }

      setStoreInfoChanged(false);
      showSnackbar("Store info updated successfully", "success");
    } catch (error) {
      console.error("Error updating store info:", error);
      showSnackbar(error.message || "Failed to update store info", "error");
    }
  };

  const handleSaveChatbot = async () => {
    // Call the ChatbotSettings component's internal save function
    if (window.chatbotSaveFunc) {
      const result = await window.chatbotSaveFunc();
      if (result.ok) {
        showSnackbar("Chatbot settings updated successfully", "success");
        // Refresh store data to get updated values
        fetchStoreData();
      } else {
        showSnackbar(result.msg || "Failed to update chatbot settings", "error");
      }
    }
  };

  const handleSaveBranding = async () => {
    // Call the BrandingAppearance component's internal save function
    if (window.brandingSaveFunc) {
      const result = await window.brandingSaveFunc();
      if (result.ok) {
        showSnackbar("Branding updated successfully", "success");
        // Refresh store data to get updated values
        fetchStoreData();
      } else {
        showSnackbar(result.msg || "Failed to update branding", "error");
      }
    }
  };

  // Handle location change - opens manage locations modal
  const handleEditLocations = () => {
    setShowManageLocationsModal(true);
  };

  // Save location changes from manage locations modal
  const handleSaveLocations = async (updatedLocations, prorationData) => {
    try {
      setLoading(true);

      // Update state with new locations
      const newStoreTypes = updatedLocations.map(loc => loc.store_type);
      const newZipCodes = updatedLocations.map(loc => loc.zip_code);
      const newQuantity = updatedLocations.length;

      // TODO: Replace with actual API call
      // const response = await fetch(`${config.API_BASE_URL}/client/store/${store_id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     client_id: CLIENT_ID,
      //     section: "locations",
      //     data: {
      //       subscription_id: subscriptionId,
      //       store_types: newStoreTypes,
      //       location_zip_codes: newZipCodes,
      //       number_of_locations: newQuantity,
      //       proration_data: prorationData,
      //     }
      //   }),
      // });
      // const result = await response.json();

      // Dummy success response
      await new Promise(resolve => setTimeout(resolve, 1000));

      setNumLocations(newQuantity);
      setStoreTypes(newStoreTypes);
      setZipCodes(newZipCodes);
      setShowManageLocationsModal(false);
      showSnackbar(`Locations updated successfully`, "success");
      fetchStoreData(); // Refresh data
    } catch (error) {
      console.error("Error updating locations:", error);
      showSnackbar(error.message || "Failed to update locations", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle plan selection - opens plan change modal if different from current
  const handlePlanSelection = (planName) => {
    if (planName !== existingPlan) {
      const newPlanData = plansData?.find(p => p.plan_name === planName);
      setPendingPlan(newPlanData);
      setShowPlanChangeModal(true);
    } else {
      setSelectedPlan(planName);
    }
  };

  // Save location change from manage seats modal
  const handleSaveLocationChange = async (newQuantity, prorationData) => {
    const quantityDiff = newQuantity - numLocations;
    const isIncrease = quantityDiff > 0;

    // If increasing locations, show add location details modal first
    if (isIncrease) {
      setPendingQuantity(newQuantity);
      setShowManageSeatsModal(false);
      setShowAddLocationModal(true);
      return;
    }

    // If decreasing, proceed with API call
    try {
      setLoading(true);

      // TODO: Replace with actual API call
      // const response = await fetch(`${config.API_BASE_URL}/client/store/${store_id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     client_id: CLIENT_ID,
      //     section: "quantity_change",
      //     data: {
      //       subscription_id: subscriptionId,
      //       new_quantity: newQuantity,
      //       proration_data: prorationData,
      //     }
      //   }),
      // });
      // const result = await response.json();

      // Dummy success response
      await new Promise(resolve => setTimeout(resolve, 1000));

      setNumLocations(newQuantity);
      setShowManageSeatsModal(false);
      showSnackbar(`Locations updated to ${newQuantity} successfully`, "success");
      fetchStoreData(); // Refresh data
    } catch (error) {
      console.error("Error updating locations:", error);
      showSnackbar(error.message || "Failed to update locations", "error");
    } finally {
      setLoading(false);
    }
  };

  // Save new location details and complete the increase
  const handleSaveNewLocationDetails = async (updatedStoreTypes, updatedZipCodes) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call
      // const response = await fetch(`${config.API_BASE_URL}/client/store/${store_id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     client_id: CLIENT_ID,
      //     section: "quantity_change",
      //     data: {
      //       subscription_id: subscriptionId,
      //       new_quantity: pendingQuantity,
      //       store_types: updatedStoreTypes,
      //       location_zip_codes: updatedZipCodes,
      //     }
      //   }),
      // });
      // const result = await response.json();

      // Dummy success response
      await new Promise(resolve => setTimeout(resolve, 1000));

      setNumLocations(pendingQuantity);
      setStoreTypes(updatedStoreTypes);
      setZipCodes(updatedZipCodes);
      setShowAddLocationModal(false);
      setPendingQuantity(null);
      showSnackbar(`Locations increased to ${pendingQuantity} successfully`, "success");
      fetchStoreData(); // Refresh data
    } catch (error) {
      console.error("Error adding locations:", error);
      showSnackbar(error.message || "Failed to add locations", "error");
    } finally {
      setLoading(false);
    }
  };

  // Confirm plan change from plan change modal
  const handleConfirmPlanChange = async (newPlanData, prorationData) => {
    try {
      setLoading(true);

      // Prepare upgrade payload
      const upgradePayload = {
        client_store_id: store_id,
        client_subscription_id: subscriptionId,
        store_name: storeName,
        number_of_locations: String(numLocations),
        contact_person_name: contactName,
        contact_email_id: contactEmail,
        old_plan_id: currentPlanData?.plan_id,
        old_plan_name: currentPlanData?.plan_name,
        plan_id: newPlanData.plan_id,
        plan: newPlanData.plan_name,
        enable_free_trial: false,
        billing_cycle: billingCycle || "monthly",
        plan_amount: parseFloat(newPlanData.plan_amount),
        is_refund: prorationData.is_refund || false,
        adjusted_amount: parseFloat(prorationData.adjusted_amount || 0),
      };

      console.log("Upgrade payload:", upgradePayload);

      // Call upgrade API
      const response = await fetch(`${config.API_BASE_V2_URL}/subscriptions/upgrade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(upgradePayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to upgrade subscription`);
      }

      const result = await response.json();
      console.log("Upgrade API response:", result);

      if (!result.success) {
        throw new Error(result.message || "Failed to upgrade subscription");
      }

      // If upgrade, might need to show payment modal
      if (prorationData.is_upgrade && parseFloat(prorationData.due_today) > 0) {
        // Check if there's a checkout URL in the response
        if (result.new_sidglo_response?.link) {
          setPaymentUrl(result.new_sidglo_response.link);
          showSnackbar("Redirecting to payment...", "info");
          // Open payment URL in new tab
          window.open(result.new_sidglo_response.link, "_blank");
        } else {
          showSnackbar("Payment required but no checkout URL provided", "warning");
        }
      }

      setSelectedPlan(newPlanData.plan_name);
      setExistingPlan(newPlanData.plan_name);
      setCurrentPlanData(newPlanData);
      setShowPlanChangeModal(false);
      setPendingPlan(null);
      showSnackbar(`Plan changed to ${newPlanData.plan_name} successfully`, "success");
      fetchStoreData(); // Refresh data
    } catch (error) {
      console.error("Error changing plan:", error);
      showSnackbar(error.message || "Failed to change plan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = async () => {
    try {
      setLoading(true);
      // Call subscription update endpoint
      const payload = {
        client_id: CLIENT_ID,
        section: "plan_change",
        data: {
          store_id: store_id,
          current_subscription_id: subscriptionId,
          old_plan: existingPlan,
          new_plan: selectedPlan,
          old_billing_cycle: existingBillingCycle,
          new_billing_cycle: billingCycle,
          quantity: numLocations,
        }
      };

      const res = await fetch(`${config.API_BASE_URL}/client/store/${store_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to process payment");
      }

      // If checkout URL returned, show iframe
      if (json.data?.checkout_url) {
        setPaymentUrl(json.data.checkout_url);
      } else {
        showSnackbar("Subscription updated successfully", "success");
        fetchStoreData();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      showSnackbar(error.message || "Failed to process payment", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  // If payment URL exists, show iframe
  if (paymentUrl) {
    return (
      <Box>
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Complete Payment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please complete the payment to upgrade your subscription
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
          onClick={async () => {
            setPaymentUrl(null);

            // ✅ Refresh subscription status after payment
            const clientId = config.clientId;
            if (clientId && checkSubscriptionStatus) {
              console.log("[EDIT STORE] Refreshing subscription status after payment...");
              await checkSubscriptionStatus(clientId);
              console.log("[EDIT STORE] Subscription status refreshed!");
            }

            fetchStoreData();
          }}
          sx={{ mt: 2 }}
        >
          Back to Edit Store
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
          Edit Store
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/store-management")}
        >
          Back
        </Button>
      </Box>

      {/* Tabs - All enabled in edit mode */}
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
        <Tab label="Store Info" />
        <Tab label="Subscription" />
        <Tab label="Chatbot Settings" />
        <Tab label="Branding" />
      </Tabs>

        {/* Tab Panels */}
        <CustomTabPanel value={activeTab} index={0}>
          <StoreInfo
            storeName={storeName}
            setStoreName={(val) => { setStoreName(val); setStoreInfoChanged(true); }}
            storeTypes={storeTypes}
            setStoreTypes={(val) => { setStoreTypes(val); setStoreInfoChanged(true); }}
            zipCodes={zipCodes}
            setZipCodes={(val) => { setZipCodes(val); setStoreInfoChanged(true); }}
            numLocations={numLocations}
            setNumLocations={(val) => { setNumLocations(val); setStoreInfoChanged(true); }}
            contactName={contactName}
            setContactName={(val) => { setContactName(val); setStoreInfoChanged(true); }}
            contactEmail={contactEmail}
            setContactEmail={(val) => { setContactEmail(val); setStoreInfoChanged(true); }}
            storeUrl={storeUrl}
            setStoreUrl={(val) => { setStoreUrl(val); setStoreInfoChanged(true); }}
            isEdit={true}
          />
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              onClick={handleSaveStoreInfo}
              disabled={!storeInfoChanged}
            >
              Save Changes
            </Button>
            <Button variant="contained" onClick={() => setActiveTab(1)}>
              Next
            </Button>
          </Stack>
        </CustomTabPanel>

        <CustomTabPanel value={activeTab} index={1}>
          <SubscriptionTypeClean
            numLocations={numLocations}
            selectedPlan={selectedPlan}
            setSelectedPlan={handlePlanSelection}
            plansData={plansData || []}
            isEdit={true}
            onEditLocations={handleEditLocations}
            currentPlanData={currentPlanData}
          />
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => setActiveTab(0)}>
                Previous
              </Button>
            </Stack>
            <Button variant="contained" onClick={() => setActiveTab(2)}>
              Next
            </Button>
          </Stack>
        </CustomTabPanel>

        <CustomTabPanel value={activeTab} index={2}>
          <ChatbotSettings
            isEdit={true}
            isEditable={isPremiumOrAbove}
            storeId={store_id}
            clientId={CLIENT_ID}
            apiBase={config.API_BASE_URL}
            defaultValues={{
              chatbot_name: chatbotData.chatbot_name,
              welcome_message: chatbotData.chatbot_welcome_message,
              disclaimer_text: chatbotData.chatbot_disclaimer,
            }}
            onSave={(saveFunc) => {
              // Store the save function reference
              window.chatbotSaveFunc = saveFunc;
            }}
          />
          {!isPremiumOrAbove && (
            <Typography variant="body2" color="warning.main" sx={{ mt: 2, fontStyle: "italic" }}>
              ⚠️ Chatbot editing is only available for Premium and Pro plans.
            </Typography>
          )}
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => setActiveTab(1)}>
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveChatbot}
                disabled={!isPremiumOrAbove}
              >
                Save Changes
              </Button>
            </Stack>
            <Button variant="contained" onClick={() => setActiveTab(3)}>
              Next
            </Button>
          </Stack>
        </CustomTabPanel>

        <CustomTabPanel value={activeTab} index={3}>
          <BrandingAppearance
            isEdit={true}
            isEditable={isPremiumOrAbove}
            storeId={store_id}
            clientId={CLIENT_ID}
            apiBase={config.API_BASE_URL}
            defaultValues={{
              theme_color_hex: brandingData.chatbot_theme_color,
              font_style: brandingData.chatbot_font_style,
              logo_url: null,
            }}
            onSave={(saveFunc) => {
              // Store the save function reference
              window.brandingSaveFunc = saveFunc;
            }}
          />
          {!isPremiumOrAbove && (
            <Typography variant="body2" color="warning.main" sx={{ mt: 2, fontStyle: "italic" }}>
              ⚠️ Branding editing is only available for Premium and Pro plans.
            </Typography>
          )}
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => setActiveTab(2)}>
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveBranding}
                disabled={!isPremiumOrAbove}
              >
                Save Changes
              </Button>
            </Stack>
            <Button variant="outlined" onClick={() => navigate("/store-management")}>
              Done
            </Button>
          </Stack>
        </CustomTabPanel>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Manage Seats Modal */}
      <ManageSeatsModal
        open={showManageSeatsModal}
        onClose={() => {
          setShowManageSeatsModal(false);
          setPendingQuantity(null);
        }}
        currentPlan={currentPlanData}
        currentQuantity={numLocations}
        onSave={handleSaveLocationChange}
        subscriptionId={subscriptionId}
      />

      {/* Manage Locations Modal */}
      <ManageLocationsModal
        open={showManageLocationsModal}
        onClose={() => setShowManageLocationsModal(false)}
        currentPlan={currentPlanData}
        currentLocations={storeTypes.map((type, idx) => ({
          store_type: type,
          zip_code: zipCodes[idx] || "",
        }))}
        onSave={handleSaveLocations}
        storeId={store_id}
      />

      {/* Plan Change Modal */}
      <PlanChangeModal
        open={showPlanChangeModal}
        onClose={() => {
          setShowPlanChangeModal(false);
          setPendingPlan(null);
          setSelectedPlan(existingPlan); // Reset to existing plan
        }}
        currentPlan={currentPlanData}
        newPlan={pendingPlan}
        currentQuantity={numLocations}
        onConfirm={handleConfirmPlanChange}
        subscriptionId={subscriptionId}
        storeId={store_id}
      />

      {/* Add Location Details Modal */}
      <AddLocationDetailsModal
        open={showAddLocationModal}
        onClose={() => {
          setShowAddLocationModal(false);
          setPendingQuantity(null);
        }}
        onSave={handleSaveNewLocationDetails}
        numberOfNewLocations={pendingQuantity ? pendingQuantity - numLocations : 0}
        existingStoreTypes={storeTypes}
        existingZipCodes={zipCodes}
      />
    </Card>
  );
};

export default EditStore;