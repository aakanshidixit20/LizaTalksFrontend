import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../GenericTable/GenericTable";
import { CircularProgress, Alert } from "@mui/material";
import config from "../../../config";
const chatReportColumns = [
  { id: "customer_name", label: "Customer Name" },
  { id: "store_name", label: "Store Name" },
  { id: "customer_email", label: "Customer Email" },
  { id: "customer_issue", label: "Issue" },
  {
    id: "created_at",
    label: "Created At",
    render: (row) => {
      if (!row.created_at) return "";
      const date = new Date(row.created_at);
      return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
        date.getDate()
      ).padStart(2, "0")}/${date.getFullYear()} ${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}`;
    }
  }
];

function ChatReportsList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chatReports, setChatReports] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Get client_id from config (fallback provided)
  const clientId = config.clientId ;

  useEffect(() => {
    fetchChatReports();
  }, []);

  const fetchChatReports = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("📄 Fetching chat reports for client:", clientId);

      const response = await fetch(
        `${config.API_BASE_URL}/client/chat-reports/list?client_id=${clientId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setChatReports(data.data);
      } else {
        throw new Error(data.message || "Failed to load chat reports");
      }
    } catch (err) {
      console.error("❌ Error fetching chat reports:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="m-4">
        {error}
      </Alert>
    );
  }

  return (
    <GenericTable
      title="Chat Reports"
      columns={chatReportColumns}
      rows={chatReports}
      showView={true}      // ✅ View button to see chat transcript
      showEdit={false}
      showDelete={false}
      dropdownFilters={["customer_name"]} // ✅ only one filter
      onView={(row) => {
        // Navigate to chat transcript detail page with feedback_id
        navigate(`/chat-reports/${row.chatbot_customer_feedback_id}/transcript`);
      }}
    />
  );
}

export default ChatReportsList;
