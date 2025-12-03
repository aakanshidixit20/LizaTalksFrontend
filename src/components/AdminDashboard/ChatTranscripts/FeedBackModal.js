"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Autocomplete,
  TextField,
  Typography
} from "@mui/material";

const feedbackOptions = [
  { label: "Positive" },
  { label: "Negative" },
  { label: "Suggestion" },
];

const FeedbackModal = ({ open, onClose, onSubmit }) => {
  const [feedbackType, setFeedbackType] = useState(null);

  const handleSubmit = () => {
    if (feedbackType) {
      onSubmit(feedbackType.label);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          Please select the type of feedback you would like to share.
        </Typography>

        <Autocomplete
          disablePortal
          options={feedbackOptions}
          value={feedbackType}
          onChange={(event, newValue) => setFeedbackType(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Feedback Type"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                },
              }}
            />
          )}
        />
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
          onClick={onClose}
          variant="outlined"
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
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
          }}
          disabled={!feedbackType}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;
