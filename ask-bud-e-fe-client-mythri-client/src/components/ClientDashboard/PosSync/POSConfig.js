"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Snackbar,
  Fade
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import posData from "../../../data/pos_list_success.json";
import POSLogs from "./POSLogs";

const syncFrequencyOptions = ["Everyday", "Every 3 Days", "Weekly"];

const POSConfig = () => {
  const [stores, setStores] = useState(posData.data);
  const [selectedStoreId, setSelectedStoreId] = useState(
    stores[0].client_store_id
  );
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const selectedStore = stores.find(
    (store) => store.client_store_id === selectedStoreId
  );

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const showSnackbar = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarOpen(true);
  };

  const handleFrequencyChange = (posKey, newFrequency) => {
    setStores((prev) =>
      prev.map((store) =>
        store.client_store_id === selectedStoreId
          ? {
              ...store,
              [posKey]: { ...store[posKey], sync_frequency: newFrequency }
            }
          : store
      )
    );
  };

  const handleSync = (posKey) => {
    setStores((prev) =>
      prev.map((store) =>
        store.client_store_id === selectedStoreId
          ? {
              ...store,
              [posKey]: {
                ...store[posKey],
                last_sync_date: getCurrentDate()
              }
            }
          : store
      )
    );
    showSnackbar(`${posKey} synced successfully`);
  };

  const handleConnect = (posKey) => {
    setStores((prev) =>
      prev.map((store) =>
        store.client_store_id === selectedStoreId
          ? {
              ...store,
              [posKey]: {
                ...store[posKey],
                sync_status: "Connected",
                last_sync_date: getCurrentDate()
              }
            }
          : store
      )
    );
    showSnackbar(`${posKey} connected successfully`);
  };

  const handleDisconnect = (posKey) => {
    setStores((prev) =>
      prev.map((store) =>
        store.client_store_id === selectedStoreId
          ? {
              ...store,
              [posKey]: {
                ...store[posKey],
                sync_status: "Disconnected"
              }
            }
          : store
      )
    );
    showSnackbar(`${posKey} disconnected`);
  };

  const renderPOSBox = (title, posKey, posDetails) => {
    const isConnected = posDetails.sync_status === "Connected";

    return (
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          p: 2
        }}
      >
       <Typography
  variant="h6"
  sx={{ fontWeight: 600, mb: 2, fontSize: { xs: "1rem", md: "1.25rem" } }}
>
  {title}
</Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Sync Frequency</InputLabel>
          <Select
            value={posDetails.sync_frequency}
            label="Sync Frequency"
            onChange={(e) =>
              handleFrequencyChange(posKey, e.target.value)
            }
          >
            {syncFrequencyOptions.map((freq) => (
              <MenuItem key={freq} value={freq}>
                {freq}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {isConnected ? (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Last Sync Date:{" "}
              <strong>{posDetails.last_sync_date}</strong>
            </Typography>

            <Box sx={{ mt: "auto", display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => handleDisconnect(posKey)}
              >
                Disconnect
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleSync(posKey)}
              >
                Sync
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ mt: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleConnect(posKey)}
                sx={{ mb: 1 }}
              >
                Connect
              </Button>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", textAlign: "center" }}
              >
                Currently <strong>{title}</strong> is disconnected.
                Click "Connect" to sync with your store.
              </Typography>
            </Box>
          </>
        )}
      </Card>
    );
  };

  return (
    <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
      {/* Header */}
     <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap", // ✅ makes items wrap on small screens
    gap: 2,            // ✅ adds spacing when wrapped
    mb: 2,
    alignItems: "center"
  }}
>

        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Select Store</InputLabel>
          <Select
            value={selectedStoreId}
            label="Select Store"
            onChange={(e) => setSelectedStoreId(e.target.value)}
          >
            {stores.map((store) => (
              <MenuItem
                key={store.client_store_id}
                value={store.client_store_id}
              >
                {store.store_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/pos-sync/")}
        >
          Back
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Two equal-width boxes in same row */}
     <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, // ✅ stack on mobile
    gap: 2,
    width: "100%",
  }}
>
        <Card
          sx={{
  flex: 1,              // ✅ both take equal width
  width: "100%",        // ✅ full width on mobile
  boxShadow: "none",
  borderRadius: "7px",
  p: 2
}}
        >
          {renderPOSBox("Dutchie", "dutchie", selectedStore.dutchie)}
        </Card>

        <Card
          sx={{
  flex: 1,              // ✅ both take equal width
  width: "100%",        // ✅ full width on mobile
  boxShadow: "none",
  borderRadius: "7px",
  p: 2
}}
        >
          {renderPOSBox(
            "iHeart Jane",
            "iheart_jane",
            selectedStore.iheart_jane
          )}
        </Card>
      </Box>
      <POSLogs />

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        autoHideDuration={2000}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
};

export default POSConfig;
