import React, { useEffect, useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Button, Alert, Box, IconButton, Typography } from "@mui/material";
import config from "../../../config";

const syncColumns = [
  { id: "store_name", label: "Store Name" },
  { id: "pos_name", label: "POS System" },
  { id: "last_sync_date", label: "Last Sync Date" },
  { id: "sync_status", label: "Status" },
  {
    id: "sync_button",
    label: "Sync"
  }
];



function SyncList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [storeList, setStoreList] = useState([]);
  const [error, setError] = useState(null);
  const [syncLoading, setSyncLoading] = useState({});
  const [syncMessage, setSyncMessage] = useState(null);

  // Custom Sync Button Component
  const SyncButton = ({ store }) => {
    const isLoading = syncLoading[store.client_store_id];

    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} color="primary" />
          <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
            Syncing...
          </Typography>
        </Box>
      );
    }

    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => handleSyncProducts(store)}
        startIcon={<i className="material-symbols-outlined" style={{ fontSize: 16 }}>sync</i>}
        sx={{
          minWidth: '100px',
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '0.75rem'
        }}
      >
      </Button>
    );
  };

  useEffect(() => {
    const fetchConfiguredStores = async () => {
      try {
        setLoading(true);
        const clientId = config.clientId || "0486bc6d-6d15-4ea3-8504-adefe1512324";

        const response = await fetch(`${config.API_BASE_URL}/client/pos/configured-stores?client_id=${clientId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch configured stores: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          // Add actions to each store (sync button will be rendered dynamically)
          const storesWithActions = (result.data || []).map(store => ({
            ...store,
            actions: store.client_store_id, // Store ID for actions
            sync_button: store.client_store_id // Store ID for sync button
          }));
          setStoreList(storesWithActions);
        } else {
          throw new Error(result.message || "Failed to fetch stores");
        }

      } catch (err) {
        console.error("Failed to fetch configured stores:", err);
        setError(err.message);
        setStoreList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConfiguredStores();
  }, []);

  const handleSyncProducts = async (store) => {
    const storeId = store.client_store_id;
    setSyncLoading(prev => ({ ...prev, [storeId]: true }));
    setSyncMessage({
      type: 'info',
      text: `🔄 Syncing products for ${store.store_name}... Please wait.`
    });

    try {
      console.log("🚀 Starting product sync for store:", store.store_name);

      // Call new manual-sync endpoint
      const response = await fetch(`${config.API_BASE_URL}/client/pos/manual-sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_store_id: store.client_store_id
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("📊 Manual sync result:", result);

      if (result.success) {
        // Extract sync summary from new response format
        const syncSummary = result.sync_summary || {};
        const rowsInserted = syncSummary.rows_inserted || 0;
        const rowsUpdated = syncSummary.rows_updated || 0;
        const totalChanges = syncSummary.value_changes_detected || 0;

        setSyncMessage({
          type: 'success',
          text: `✅ Sync completed for ${store.store_name}: ${rowsInserted} rows inserted, ${rowsUpdated} rows updated (${totalChanges} changes)`
        });

        // ✅ Call revenue configure endpoint after successful manual sync
        console.log("🚀 Calling revenue configure endpoint for store:", store.store_name);
        try {
          const clientId = config.clientId || "0486bc6d-6d15-4ea3-8504-adefe1512324";

          const revenueResponse = await fetch(`${config.API_BASE_URL}/client/revenue/configure`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              client_id: clientId,
              client_store_id: store.client_store_id  // ✅ Pass specific store ID
            })
          });

          if (revenueResponse.ok) {
            const revenueResult = await revenueResponse.json();
            console.log("📊 Revenue configure result:", revenueResult);

            if (revenueResult.success) {
              console.log(`✅ Revenue data synced: ${revenueResult.total_orders_fetched} orders fetched, ${revenueResult.total_inserted} inserted`);
            } else {
              console.warn("⚠️ Revenue configure completed with warnings:", revenueResult.message);
            }
          } else {
            console.warn("⚠️ Revenue configure request failed:", revenueResponse.status);
          }
        } catch (revenueError) {
          console.error("❌ Revenue configure error (non-blocking):", revenueError);
          // Don't throw - this is a non-blocking operation
        }

        // Refresh the store list to update last sync date
        window.location.reload();
      } else {
        throw new Error(result.message || "Sync failed");
      }

    } catch (err) {
      console.error("Sync error:", err);
      setSyncMessage({
        type: 'error',
        text: `❌ Sync failed for ${store.store_name}: ${err.message}`
      });
    } finally {
      setSyncLoading(prev => ({ ...prev, [storeId]: false }));
    }
  };



  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        Error loading stores: {error}
      </div>
    );
  }

  return (
    <>
      {syncMessage && (
        <Alert
          severity={syncMessage.type}
          sx={{ mb: 2 }}
          onClose={() => setSyncMessage(null)}
        >
          {syncMessage.text}
        </Alert>
      )}

      <GenericTable
        title="POS Management"
        columns={syncColumns}
        rows={storeList.map(store => ({
          ...store,
          sync_button: <SyncButton store={store} /> // Render sync button dynamically
        }))}
        showView={false}
        showEdit={true}
        showDelete={false}
        onEdit={(row) => navigate(`/pos-sync/${row.client_store_id}/fetch-update`)}

        customHeaderButtons={[
          {
            label: "Configure POS",
            icon: "settings",
            onClick: () => {
              navigate("/pos-sync/configure");
            },
          },
        ]}
      />
    </>
  );
}

export default SyncList;
