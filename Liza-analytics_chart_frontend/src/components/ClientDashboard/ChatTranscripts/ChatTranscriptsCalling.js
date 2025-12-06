import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ChatTranscriptsWindow from "./ChatTranscriptsWindow";
import { CircularProgress, Alert } from "@mui/material";
import config from "../../../config";
import { AuthContext } from "../../../authentication/AuthContext";

function ChatTranscriptsCalling() {
  const { customer_id } = useParams();
  const { logout } = useContext(AuthContext);
  
  console.log("Customer ID from URL:", customer_id);

  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // ✅ Fetch chat transcripts
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
          `${config.API_BASE_URL}/client/transcript/list/${customer_id}`,
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
        if (result?.success && result?.data) {
          setChatData(result.data);
          console.log("Fetched chat transcripts:", result.data);
        } else {
          throw new Error(result?.message || "Failed to fetch transcripts");
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

    if (customer_id) {
      fetchChatTranscripts();
    } else {
      setError("Customer ID is missing from the URL.");
      setLoading(false);
    }
  }, [customer_id, logout]);

  // ✅ Loading state
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div style={{ margin: "2rem" }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  // ✅ No data
  if (!chatData) {
    return (
      <div style={{ margin: "2rem" }}>
        <Alert severity="warning">No chat transcripts found for this customer.</Alert>
      </div>
    );
  }

  // ✅ Pass API response data to ChatTranscriptsWindow
  return <ChatTranscriptsWindow chatData={chatData} />;
}

export default ChatTranscriptsCalling;