"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const ChatbotSettings = ({
  isEditable,
  storeData,         // kept for compatibility
  isEdit,
  storeId,
  clientId,
  apiBase,
  onSave,            // parent passes setChatbotSave
  defaultValues = { chatbot_name: "", welcome_message: "", disclaimer_text: "" },
}) => {
  const nameRef = useRef(null);
  const welcomeRef = useRef(null);
  const disclaimerRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  // Prefill uncontrolled inputs when defaults change
  useEffect(() => {
    if (nameRef.current) nameRef.current.value = defaultValues.chatbot_name || "";
    if (welcomeRef.current) welcomeRef.current.value = defaultValues.welcome_message || "";
    if (disclaimerRef.current) disclaimerRef.current.value = defaultValues.disclaimer_text || "";
  }, [
    defaultValues?.chatbot_name,
    defaultValues?.welcome_message,
    defaultValues?.disclaimer_text,
  ]);

  // Stable save function
  const handleSave = useCallback(async () => {
    setMsg(null);

    if (!isEditable) {
      const m = "Upgrade to Premium/Pro to edit chatbot settings.";
      setMsg({ type: "error", text: m });
      return { ok: false, msg: m };
    }
    if (!isEdit || !storeId) {
      const m = "Store must be created first.";
      setMsg({ type: "error", text: m });
      return { ok: false, msg: m };
    }

    const payloadData = {};
    const name = nameRef.current?.value?.trim();
    const welcome = welcomeRef.current?.value?.trim();
    const disclaimer = disclaimerRef.current?.value?.trim();

    if (name) payloadData.chatbot_name = name;
    if (welcome) payloadData.chatbot_welcome_message = welcome;
    if (disclaimer) payloadData.chatbot_disclaimer = disclaimer;

    if (Object.keys(payloadData).length === 0) {
      const m = "Nothing to update.";
      setMsg({ type: "error", text: m });
      return { ok: false, msg: m };
    }

    const body = { client_id: clientId, section: "chatbot", data: payloadData };

    try {
      setSaving(true);
      const res = await fetch(`${apiBase}/api/v1/client/store/${storeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (!res.ok || json?.success === false) {
        const m = json?.error?.details || json?.message || "Failed to update chatbot.";
        setMsg({ type: "error", text: m });
        return { ok: false, msg: m };
      }

      const m = json?.message || "Chatbot settings updated successfully.";
      setMsg({ type: "success", text: m });
      return { ok: true, msg: m };
    } catch (e) {
      const m = e?.message || "Network error.";
      setMsg({ type: "error", text: m });
      return { ok: false, msg: m };
    } finally {
      setSaving(false);
    }
  }, [isEditable, isEdit, storeId, clientId, apiBase]);

  // Register with parent: store the function (not a functional updater)
  useEffect(() => {
    if (typeof onSave === "function") onSave(() => handleSave);
    return () => {
      if (typeof onSave === "function") onSave(() => null);
    };
  }, [onSave, handleSave]);

  return (
    <Box component="form">
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        {/* Top Messages */}
        <Box sx={{ mb: "20px" }}>
          <Typography variant="body2" sx={{ color: "red", fontWeight: 500, mb: "5px" }}>
            You can make Changes After Completing Payment
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
            To make Changes please select Premium and above plans
          </Typography>
        </Box>

        {/* Header */}
        <Box sx={{ mb: "25px" }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700 }}
            className="text-black"
          >
            Chatbot Settings
          </Typography>
        </Box>

        <Grid container spacing={3} direction="column">
          {/* Chatbot Name */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography component="label" sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                Chatbot Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                placeholder="Enter chatbot name"
                variant="filled"
                required
                inputRef={nameRef}
                disabled={!isEditable || saving}
                sx={{
                  "& .MuiInputBase-root": {
                    border: "1px solid #D5D9E2",
                    backgroundColor: "#fff",
                    borderRadius: "7px",
                  },
                  "& .MuiInputBase-root::before": { border: "none" },
                  "& .MuiInputBase-root:hover::before": { border: "none" },
                }}
              />
            </FormControl>
          </Grid>

          {/* Welcome Message */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography component="label" sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                Welcome Message
              </Typography>
              <TextField
                placeholder="Enter welcome message"
                variant="filled"
                multiline
                rows={3}
                disabled={!isEditable || saving}
                inputRef={welcomeRef}
                sx={{
                  "& .MuiInputBase-root": {
                    border: "1px solid #D5D9E2",
                    backgroundColor: "#fff",
                    borderRadius: "7px",
                  },
                  "& .MuiInputBase-root::before": { border: "none" },
                  "& .MuiInputBase-root:hover::before": { border: "none" },
                }}
              />
            </FormControl>
          </Grid>

          {/* Disclaimer */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography component="label" sx={{ fontWeight: 500, fontSize: "14px", mb: "10px", display: "block" }} className="text-black">
                Disclaimer Text
              </Typography>
              <TextField
                placeholder="Enter disclaimer text"
                variant="filled"
                disabled={!isEditable || saving}
                inputRef={disclaimerRef}
                sx={{
                  "& .MuiInputBase-root": {
                    border: "1px solid #D5D9E2",
                    backgroundColor: "#fff",
                    borderRadius: "7px",
                  },
                  "& .MuiInputBase-root::before": { border: "none" },
                  "& .MuiInputBase-root:hover::before": { border: "none" },
                }}
              />
            </FormControl>
          </Grid>

          {/* Age Gate (unchanged; not wired to API) */}
          <Grid item xs={12}>
            <FormControl>
              <FormControlLabel
                control={<Checkbox disabled={!isEditable || saving} />}
                label={<Typography sx={{ fontWeight: 500, fontSize: "14px", color: "black" }}>Enable Age Gate</Typography>}
              />
            </FormControl>
          </Grid>

          {/* Note */}
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Note: If no text is entered, default disclaimer and welcome message will be applied.
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ChatbotSettings;
