import React, { useEffect, useState, useContext } from "react";
import GenericTable from "../GenericTable/GenericTable";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import config from "../../../config";
import { AuthContext } from "../../../authentication/AuthContext";

const docColumns = [
  { id: "document_title", label: "Title", render: (row) => row.document_title || "N/A" },
  { id: "document_type", label: "Document Type" },
  { id: "category", label: "Category", render: (row) => row.category || "N/A" },
  { id: "chat_enabled", label: "Chat Enabled", render: (row) => (row.chat_enabled ? "Yes" : "No") },
  { id: "document_size", label: "Size", render: (row) => row.document_size || "N/A" },
  { id: "uploaded_date", label: "Uploaded Date" },
];

function DocumentsDetails() {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [storeName, setStoreName] = useState("");

  // Delete modal states...
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Snackbar for user feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // 🔹 Check navigation state for snackbar (success/failure from AddDocument)
  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar({ ...location.state.snackbar, open: true });
      // Clear state so snackbar doesn't reappear on refresh/back
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 🔹 Fetch documents for store
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      if (!config.isAuthenticated()) {
        logout("Please login to access document details.");
        return;
      }

      console.log("Making API call with:", {
        clientId: config.clientId,
        apiKey: config.apiKey ? "***" + config.apiKey.slice(-4) : "missing"
      });

      const response = await fetch(
        `${config.API_BASE_URL}/client/documents/store/details/?client_store_id=${store_id}`,
        {
          method: "GET",
          headers: config.getHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result?.success && Array.isArray(result?.data)) {
        setRows(result.data);
        if (result.data.length > 0 && result.data[0].store_name) {
          setStoreName(result.data[0].store_name);
        }
      } else {
        setError("No documents found for this store.");
      }
    } catch (err) {
      console.error("Error fetching store documents:", err);
      if (err.message.includes("Session expired") || err.message.includes("login")) {
        logout(err.message);
      } else {
        setError(err.message || "Failed to fetch store documents. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [store_id, logout]);

  // 🔹 Delete handlers
  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setDeleteLoading(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow) return;

    try {
      setDeleteLoading(true);

      // Check authentication before delete
      if (!config.isAuthenticated()) {
        logout("Please login to delete documents.");
        return;
      }

      const response = await fetch(
        `${config.API_BASE_URL}/client/documents/delete/${selectedRow.store_document_id}`,
        {
          method: "DELETE",
          headers: config.getHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result?.success) {
        setSnackbar({ open: true, message: "Document deleted successfully.", severity: "success" });
        handleClose();
        await fetchDocuments(); // refresh data
      } else {
        throw new Error(result?.message || "Delete failed");
      }
    } catch (err) {
      console.error("Error deleting document:", err);
      if (err.message.includes("Session expired") || err.message.includes("login")) {
        logout(err.message);
      } else {
        setSnackbar({ open: true, message: err.message || "Failed to delete document.", severity: "error" });
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  // 🔹 UI rendering
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ margin: "2rem" }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <>
      <GenericTable
        title="Document Details"
        subtitle={
          <>
            Store Name: <strong>{storeName || "N/A"}</strong>
          </>
        }
        columns={docColumns}
        rows={rows}
        showView={false}
        showEdit={false}
        showDelete={true}
        dropdownFilters={["category", "document_type"]}
        onDelete={handleDeleteClick}
        customHeaderButtons={[
          {
            label: "Add Document",
            icon: "add",
            onClick: () =>
              navigate(`/document-management/documents/${store_id}/add-document`, {
                state: { storeName },
              }),
          },
        ]}
      />

      {/* 🔹 Delete Confirmation Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete document{" "}
            <strong>{selectedRow?.document_title || selectedRow?.store_document_id}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary" disabled={deleteLoading}>
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

      {/* 🔹 Snackbar with severity */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default DocumentsDetails;