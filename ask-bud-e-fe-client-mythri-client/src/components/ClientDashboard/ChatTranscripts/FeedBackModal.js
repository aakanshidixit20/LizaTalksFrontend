"use client";

import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Autocomplete,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import config from "../../../config";
import { AuthContext } from "../../../authentication/AuthContext";

const feedbackOptions = [
  "Factually wrong",
  "Incomplete answer", 
  "Irrelevant",
  "Too long/too short",
  "Hard to understand",
  "Something else"
];

// Common tags that can be used across all feedback types
const commonTags = [
  "helpful", "quick_response", "slow_response", "friendly", 
  "unhelpful", "confusing", "clear", "detailed", "brief",
  "technical_issue", "ui_issue", "content_issue", "satisfied",
  "dissatisfied", "improvement", "feature_request", "bug_report"
];

const FeedbackModal = ({ open, onClose, onSubmit, sessionId }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [somethingElseText, setSomethingElseText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!selectedOption || !sessionId) {
      setError("Please select feedback option and ensure session ID is available.");
      return;
    }

    if (selectedOption === "Something else" && !somethingElseText.trim()) {
      setError("Please provide details for 'Something else'.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      if (!config.isAuthenticated()) {
        logout("Please login to submit feedback.");
        return;
      }

      // Use the selected option as the main tag, or the custom text for "Something else"
      const mainTag = selectedOption === "Something else" ? somethingElseText : selectedOption;
      const finalTags = selectedTags.length > 0 ? selectedTags : [mainTag.toLowerCase().replace(/\s+/g, '_')];

      console.log("Submitting feedback with:", {
        sessionId,
        feedbackOption: selectedOption,
        tags: finalTags,
        clientId: config.clientId,
        apiKey: config.apiKey ? "***" + config.apiKey.slice(-4) : "missing"
      });

      const response = await fetch(
        `${config.API_BASE_URL}/client/feedback`,
        {
          method: "POST",
          headers: {
            ...config.getHeaders(),
          },
          body: JSON.stringify({
            session_id: sessionId,
            client_id: config.clientId,
            tags: finalTags
          }),
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
        setSuccess(true);
        // Call the parent onSubmit callback if provided
        if (onSubmit) {
          onSubmit(selectedOption, finalTags);
        }
        // Reset form and close modal after successful submission
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        throw new Error(result?.message || "Failed to submit feedback");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      if (err.message.includes("Session expired") || err.message.includes("login")) {
        logout(err.message);
      } else {
        setError(err.message || "Failed to submit feedback. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setError(null);
  };

  const handleSomethingElseChange = (event) => {
    setSomethingElseText(event.target.value);
    setError(null);
  };

  const handleTagAdd = (event, newValue) => {
    if (newValue && !selectedTags.includes(newValue)) {
      setSelectedTags([...selectedTags, newValue]);
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToDelete));
  };

  const handleClose = () => {
    setSelectedOption("");
    setSomethingElseText("");
    setSelectedTags([]);
    setError(null);
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const handleSnackbarClose = () => {
    setSuccess(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={loading ? undefined : handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            padding: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            pb: 1,
          }}
        >
          Submit Feedback
        </DialogTitle>

        <DialogContent sx={{ pt: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 2,
            }}
          >
            Please select a feedback option and add relevant tags.
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          {/* Feedback Options Selection */}
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
              Feedback Type *
            </FormLabel>
            <RadioGroup
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {feedbackOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={loading}
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Something else text field */}
          {selectedOption === "Something else" && (
            <TextField
              fullWidth
              label="Please provide details *"
              value={somethingElseText}
              onChange={handleSomethingElseChange}
              disabled={loading}
              multiline
              rows={3}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                },
              }}
              placeholder="Please describe your feedback..."
              error={!!error && selectedOption === "Something else" && !somethingElseText.trim()}
            />
          )}

          {/* Tags Selection */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 3,
              mb: 1,
            }}
          >
            Add relevant tags:
          </Typography>

          <Autocomplete
            multiple
            freeSolo
            options={commonTags}
            value={selectedTags}
            onChange={handleTagAdd}
            disabled={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                size="small"
                placeholder="Type to add tags..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#fafafa",
                  },
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option}
                  label={option}
                  {...getTagProps({ index })}
                  onDelete={() => handleTagDelete(option)}
                  size="small"
                />
              ))
            }
          />

          {/* Selected Tags Display */}
          {selectedTags.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Selected tags: {selectedTags.join(", ")}
              </Typography>
            </Box>
          )}

          {sessionId && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 2,
                color: "text.secondary",
                fontStyle: "italic"
              }}
            >
              Session: {sessionId}
            </Typography>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            pt: 1,
            gap: 1,
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={loading}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!selectedOption || loading || (selectedOption === "Something else" && !somethingElseText.trim())}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              minWidth: "80px",
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={16} sx={{ mr: 1 }} />
                Submitting...
              </Box>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Feedback submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackModal;