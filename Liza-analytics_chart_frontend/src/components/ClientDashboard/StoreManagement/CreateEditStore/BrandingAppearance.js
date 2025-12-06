"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Avatar,
  Button,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonIcon from "@mui/icons-material/Person";

const BrandingAppearance = ({
  isEdit,
  isEditable,
  storeId,
  clientId,
  apiBase,
  onSave,
  defaultValues = { theme_color_hex: "#000000", font_style: "", logo_url: null },
}) => {
  const [font, setFont] = useState(defaultValues.font_style || "");
  const [color, setColor] = useState(defaultValues.theme_color_hex || "#000000");
  const [logo, setLogo] = useState(defaultValues.logo_url || null);
  const [saving, setSaving] = useState(false);

  // Prefill if defaultValues change
  useEffect(() => {
    setFont(defaultValues.font_style || "");
    setColor(defaultValues.theme_color_hex || "#000000");
    setLogo(defaultValues.logo_url || null);
  }, [
    defaultValues?.font_style,
    defaultValues?.theme_color_hex,
    defaultValues?.logo_url
  ]);

  // File upload handler (local preview + store file path in logo_url)
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogo(previewUrl);

      // TODO: real flow: upload file to your backend / S3 and get logo_url
      // For now just mock with filename
      // setLogo(`/uploads/${file.name}`);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    disabled: !isEditable || saving,
  });

  // Save branding settings
  const handleSave = useCallback(async () => {
    if (!isEdit || !storeId) {
      return { ok: false, msg: "Store must be created first." };
    }
    if (!isEditable) {
      return { ok: false, msg: "Upgrade to Premium/Pro to edit branding." };
    }

    const payload = {
      client_id: clientId,
      section: "branding",
      data: {
        theme_color_hex: (color || "").trim(),
        font_style: font?.trim() || null,
        logo_url: logo || null,
      },
    };

    if (
      !payload.data.theme_color_hex &&
      !payload.data.font_style &&
      !payload.data.logo_url
    ) {
      return { ok: false, msg: "Nothing to update." };
    }

    try {
      setSaving(true);
      const res = await fetch(`${apiBase}/api/v1/client/store/${storeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || json?.success === false) {
        const m = json?.error?.details || json?.message || "Failed to update branding.";
        return { ok: false, msg: m };
      }

      return { ok: true, msg: json?.message || "Branding saved successfully." };
    } catch (e) {
      return { ok: false, msg: e?.message || "Network error." };
    } finally {
      setSaving(false);
    }
  }, [isEdit, isEditable, color, font, logo, clientId, apiBase, storeId]);

  // Expose save to parent
  useEffect(() => {
    if (typeof onSave === "function") onSave(() => handleSave);
    return () => {
      if (typeof onSave === "function") onSave(() => null);
    };
  }, [onSave, handleSave]);

  return (
    <Grid container spacing={4}>
      {/* Left - Logo Upload + Font Style */}
      <Grid item xs={12} md={4}>
        {/* Logo Upload */}
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            cursor: isEditable && !saving ? "pointer" : "not-allowed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 220,
            "&:hover": {
              borderColor: isEditable && !saving ? "primary.main" : "#ccc",
              backgroundColor: isEditable && !saving ? "#fafafa" : "transparent",
            },
          }}
        >
          <input {...getInputProps()} />
          {logo ? (
            <Avatar src={logo} alt="Logo" sx={{ width: 100, height: 100, mb: 2 }} />
          ) : (
            <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: "#f0f0f0" }}>
              <PersonIcon sx={{ fontSize: 50, color: "primary.main" }} />
            </Avatar>
          )}

          <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Click or drag to upload logo
          </Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            sx={{ textTransform: "none", borderRadius: "7px" }}
            disabled={!isEditable || saving}
          >
            Upload
          </Button>
        </Box>

        {/* Font Style */}
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: 1 }}>
            Choose Font Style
          </Typography>
          <FormControl fullWidth disabled={!isEditable || saving}>
            <InputLabel>Font Style</InputLabel>
            <Select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              label="Font Style"
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Roboto">Roboto</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              {font && !["Arial", "Roboto", "Times New Roman"].includes(font) && (
                <MenuItem value={font}>{font}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      {/* Right - Theme Color */}
      <Grid item xs={12} md={8}>
        <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: 1 }}>
          Theme Color
        </Typography>

        <Box sx={{ mb: 2, opacity: !isEditable || saving ? 0.6 : 1 }}>
          <HexColorPicker
            color={color}
            onChange={setColor}
            style={{ width: "250px", height: "180px" }}
            disabled={!isEditable || saving}
          />
        </Box>

        {/* Preview + Hex Input */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 50,
              height: 40,
              borderRadius: "7px",
              border: "1px solid #D5D9E2",
              backgroundColor: color,
            }}
          />
          <TextField
            size="small"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            label="Hex Code"
            disabled={!isEditable || saving}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BrandingAppearance;
