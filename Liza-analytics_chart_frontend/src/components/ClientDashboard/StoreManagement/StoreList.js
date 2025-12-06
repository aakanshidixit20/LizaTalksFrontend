import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import GenericTable from "../GenericTable/GenericTable";
import storeList from "../../../data/store_list_success.json";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import config from "../../../config";
const storeColumns = [
  { id: "store_name", label: "Store Name" },
  { id: "numLocations", label: "No. of Locations" },
  { id: "plan_name", label: "Current Plan" },
  { id: "modified_date", label: "Modified Date" }
];

function StoreList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(storeList.data);

  // ✅ State for modal
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  // API constants
  const CLIENT_ID = config.clientId ;

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDeleteError(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow) return;

    try {
      setDeleteLoading(true);
      setDeleteError(null);

      // Call the DELETE API
      const url = `${config.API_BASE_URL}/client/store/${selectedRow.client_store_id}?client_id=${CLIENT_ID}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      if (!res.ok || json?.success === false) {
        const errMsg = json?.error?.details || json?.message || "Failed to delete store";
        setDeleteError(errMsg);
        return;
      }

      // Remove from UI only after successful deletion
      setRows((prevRows) =>
        prevRows.filter((r) => r.client_store_id !== selectedRow.client_store_id)
      );

      handleClose();
    } catch (err) {
      console.error("Error deleting store:", err);
      setDeleteError(err?.message || "Network error deleting store");
    } finally {
      setDeleteLoading(false);
    }
  };

  const customActions = [
    {
      label: "View Snippet",
      icon: "code_blocks",
      color: "primary",
      onClick: (row) =>
        navigate(`/store-management/store/${row.client_store_id}/chatbot-snippet`)
    }
  ];

  const [loading, setLoading] = useState(true);   
  
    // useEffect(() => {
    //   // simulate loading delay (like API call)
    //   const timer = setTimeout(() => {
    //     setLoading(false); 
    //   }, 150); // 0.5 sec spinner
  
    //   return () => clearTimeout(timer);
    // }, []);
    useEffect(() => {
  const controller = new AbortController();

  const url = `${config.API_BASE_URL}/client/store?client_id=${CLIENT_ID}`;

  (async () => {
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // ✅ Response shape: { success, message, data, error }
      setRows(Array.isArray(json?.data) ? json.data : []);
    } catch (err) {
      console.error("[StoreList] fetch error:", err);
      setRows([]); // fallback
    } finally {
      setLoading(false);
    }
  })();

  return () => controller.abort();
}, []);
  
    if (loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <CircularProgress />
        </div>
      );
    }

  return (
    <>
      <GenericTable
        title="Stores List"
        columns={storeColumns}
        rows={rows}
        showView={false}
        showEdit={true}
        showDelete={true}
        onEdit={(row) => navigate(`/store-management/${row.client_store_id}/edit-store`)} // ✅ navigate to wizard
        onDelete={handleDeleteClick} // ✅ Open modal instead of alert
        customHeaderButtons={[
          {
            label: "Create Store",
            icon: "add",
            onClick: () => navigate(`/store-management/create-store`)
          }
        ]}
        customActions={customActions}
        customActionsHeader="View Snippet"
      />

      {/* ✅ Professional Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          {deleteError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {deleteError}
            </Alert>
          )}
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{selectedRow?.store_name}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            disabled={deleteLoading}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StoreList;
