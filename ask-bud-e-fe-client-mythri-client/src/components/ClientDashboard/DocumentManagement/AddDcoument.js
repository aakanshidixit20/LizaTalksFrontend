"use client";
import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import config from "../../../config";
import { AuthContext } from "../../../authentication/AuthContext";

const categoryOptions = [
  "Product Guide",
  "Usage Instructions",
  "Medical References",
  "Promotional Material",
  "FAQ",
];

const AddDocument = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { store_id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [chatEnabled, setChatEnabled] = useState(false);
  const [category, setCategory] = useState("Product Guide");
  const location = useLocation();
  const { storeName } = location.state || {}; 

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.[^/.]+$/, "")); // Remove extension for editing
      }
    },
  });

  const formatFileSize = (size) => {
    if (!size) return "";
    return size < 1024
      ? `${size} B`
      : size < 1024 * 1024
      ? `${(size / 1024).toFixed(1)} KB`
      : `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
  };

  const [loading, setLoading] = useState(false);

 const handleAdd = async () => {
  if (!file) return;

  if (!config.isAuthenticated()) {
    logout("Please login to upload documents.");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("client_store_id", store_id);
  formData.append("document_title", fileName);
  formData.append("category", category);
  formData.append("chat_enabled", chatEnabled.toString()); // Use boolean toString
  formData.append("file", file);

  // Debug: Log FormData contents
  console.log("FormData contents:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": ", pair[1]);
  }

  try {
    const headers = config.getHeaders();
    
    // Remove Content-Type header to let browser set it automatically with boundary
    // This is crucial for FormData with files
    if (headers["Content-Type"]) {
      delete headers["Content-Type"];
    }

    const response = await fetch(`${config.API_BASE_URL}/client/documents/upload`, {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
      }
      
      // Try to parse error response as JSON first, then as text
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail?.[0]?.msg || errorData.message || `HTTP ${response.status}`;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || `HTTP ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();

    if (result?.success) {
      navigate(`/document-management/documents/${store_id}`, {
        state: { 
          snackbar: { 
            type: "success", 
            message: "Document added successfully" 
          } 
        },
      });
    } else {
      throw new Error(result?.message || "Failed to upload document");
    }
  } catch (error) {
    console.error("Upload error:", error);
    setSnackbarMessage(error.message || "Failed to upload document. Please try again.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  } finally {
    setLoading(false);
  }
};


  const handleCancel = () => {
    navigate(`/document-management/documents/${store_id}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
        {/* Header */}
        <Box sx={{ p: 1 }}>
          {/* Mobile layout (xs only) */}
          <Box
            display={{ xs: "flex", sm: "none" }}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h5">Add Document</Typography>
          </Box>

          {/* Desktop layout (sm and up) */}
          <Box
            display={{ xs: "none", sm: "flex" }}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            {/* Left: Store Name */}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Store Name:{" "}
              <Box component="span" sx={{ fontWeight: "bold", color: "text.primary" }}>
                <strong>{storeName || "Unknown Store"}</strong> 
              </Box>
            </Typography>

            {/* Right: Back button */}
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleCancel}
            >
              Back
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Body */}
        <CardContent sx={{ p: 3 }}>
          {/* Dropzone Upload */}
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed",
              borderColor: isDragActive ? "primary.main" : "#ccc",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: isDragActive ? "#f0f8ff" : "transparent",
              transition: "0.2s",
              "&:hover": { borderColor: "primary.main", backgroundColor: "#fafafa" },
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            {isDragActive ? (
              <Typography variant="body1" fontWeight="500">
                Drop the file here...
              </Typography>
            ) : (
              <Typography variant="body1" fontWeight="500">
                Drag & drop or click to choose file
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              (Only PDF and DOC/DOCX files are supported)
            </Typography>
          </Box>

          {/* File Preview */}
          {file && (
            <List sx={{ mt: 2 }}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" color="error" onClick={handleRemoveFile}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={file.name}
                  secondary={`Type: ${file.name.split(".").pop()} | Size: ${formatFileSize(
                    file.size
                  )}`}
                />
              </ListItem>
            </List>
          )}

          {/* File Name Input */}
          {file && (
            <TextField
              fullWidth
              label="Document Title"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              margin="normal"
              helperText="You can edit the document title here"
            />
          )}

          {/* Category Dropdown */}
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="select-category-label">Select Category</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Select Category"
                sx={{
                  "& fieldset": {
                    border: "1px solid #D5D9E2",
                    borderRadius: "7px",
                  },
                }}
              >
                {categoryOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Chat Enabled */}
          <FormControlLabel
            control={
              <Checkbox
                checked={chatEnabled}
                onChange={(e) => setChatEnabled(e.target.checked)}
                color="primary"
              />
            }
            label="Chat Enabled"
            sx={{ mt: 2 }}
          />

          {/* Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <Button variant="outlined" onClick={handleCancel} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAdd}
              disabled={!file || loading}
              startIcon={
                loading ? <CircularProgress size={18} color="inherit" /> : null
              }
            >
              {loading ? "Adding..." : "Add"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Snackbar for errors */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddDocument;