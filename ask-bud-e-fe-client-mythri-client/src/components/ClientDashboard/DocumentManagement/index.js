import React, { useEffect, useState, useContext } from "react";
import GenericTable from "../GenericTable/GenericTable";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Alert } from "@mui/material";
import config from "../../../config";
import { AuthContext } from "../../../authentication/AuthContext";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10; // ✅ Easily adjustable

const documentColumns = [
  { id: "store_name", label: "Store Name" },
  { id: "total_documents", label: "Total Number of Documents" },
];

function DocumentList() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is authenticated
        if (!config.isAuthenticated()) {
          logout("Please login to access documents.");
          return;
        }

        console.log("Making API call with:", {
          clientId: config.clientId,
          apiKey: config.apiKey ? "***" + config.apiKey.slice(-4) : "missing"
        });

        const response = await fetch(
          `${config.API_BASE_URL}/client/documents/list?client_id=${config.clientId}&page=${DEFAULT_PAGE}&limit=${DEFAULT_LIMIT}`,
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
        } else {
          setError("No documents found.");
        }
      } catch (err) {
        console.error("Error fetching documents:", err);
        if (err.message.includes("Session expired") || err.message.includes("login")) {
          logout(err.message);
        } else {
          setError(err.message || "Failed to fetch documents. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [logout]);

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
    <GenericTable
      title="Documents List"
      columns={documentColumns}
      rows={rows}
      showView={true}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["store_name"]}
      onView={(row) => {
        navigate(`/document-management/documents/${row.client_store_id}`);
      }}
    />
  );
}

export default DocumentList;