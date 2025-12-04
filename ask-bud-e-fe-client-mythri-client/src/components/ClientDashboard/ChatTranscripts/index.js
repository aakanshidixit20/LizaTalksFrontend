import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../GenericTable/GenericTable";
import { CircularProgress, Alert } from "@mui/material";
import config from "../../../config";
import { AuthContext } from "../../../authentication/AuthContext";

const DEFAULT_LIMIT = 100;

const ChatColumns = [
  { id: "customer_name", label: "Customer Name" },
  { id: "store_name", label: "Store Name" },
  {
    id: "last_visit",
    label: "Last Visit",
    render: (row) =>
      row.last_visit ? new Date(row.last_visit).toLocaleString() : "N/A",
  },
  { id: "purchased_product", label: "Purchased Product" },
  {
    id: "top_mood",
    label: "Top Mood",
    render: (row) =>
      Array.isArray(row.top_mood)
        ? row.top_mood.join(", ")
        : row.top_mood || "N/A",
  },
  { id: "active_time", label: "Active Time" },
  { id: "chat_overview", label: "Chat Overview" },
  { id: "last_product_suggestion", label: "Last Product Suggestion" },
  { id: "last_product_clicked", label: "Last Product Clicked" },
];

function ChatTranscriptsList() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatTranscripts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is authenticated
        if (!config.isAuthenticated()) {
          logout("Please login to access chat transcripts.");
          return;
        }

        console.log("Making API call with:", {
          clientId: config.clientId,
          apiKey: config.apiKey ? "***" + config.apiKey.slice(-4) : "missing"
        });

        const response = await fetch(
          `${config.API_BASE_URL}/client/list?client_id=${config.clientId}&page=1&limit=${DEFAULT_LIMIT}`,
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

        if (result?.success && result?.data?.chat_sessions) {
          setRows(result.data.chat_sessions);
        } else {
          setError("No chat transcripts found.");
        }
      } catch (err) {
        console.error("Error fetching chat transcripts:", err);
        if (err.message.includes("Session expired") || err.message.includes("login")) {
          logout(err.message);
        } else {
          setError(err.message || "Failed to fetch chat transcripts. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChatTranscripts();
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
      title="Chat Transcript List"
      columns={ChatColumns}
      rows={rows}
      showView={true}
      showEdit={false}
      showDelete={false}
      dropdownFilters={["store_name", "top_mood"]}
      onView={(row) => {
        navigate(`/chat-transcripts/chats/${row.store_customer_id}`);
      }}
    />
  );
}

export default ChatTranscriptsList;