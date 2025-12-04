import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const SessionExpiryModal = () => {
  const { showExpiryWarning, dismissWarning, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    logout();
    navigate("/sign-in");
  };

  const handleContinue = () => {
    dismissWarning();
  };

  return (
    <Dialog
      open={showExpiryWarning}
      onClose={handleContinue}
      aria-labelledby="session-expiry-warning"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          border: "2px solid #ff6b6b",
        }
      }}
    >
      <DialogTitle sx={{ 
        backgroundColor: "#ffebee", 
        borderBottom: "1px solid #ffcdd2",
        py: 2
      }}>
        <Box display="flex" alignItems="center">
          <Alert 
            severity="warning" 
            sx={{ 
              backgroundColor: "transparent",
              padding: 0,
              '& .MuiAlert-icon': { color: "#d32f2f" }
            }}
          >
            <Typography variant="h6" component="span" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
              Session Expiring Soon!
            </Typography>
          </Alert>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ py: 3 }}>
        <Typography variant="body1" sx={{ pd: 3, mb: 2, color: "#d32f2f" }}>
          Your session will expire in less than 1 minute. For security reasons, you'll be automatically logged out.
        </Typography>
  
      </DialogContent>
      
      <DialogActions sx={{ 
        px: 3, 
        py: 2, 
        gap: 1,
        borderTop: "1px solid #ffcdd2"
      }}>
        <Button
          onClick={handleContinue}
          variant="outlined"
          sx={{
            borderColor: "#d32f2f",
            color: "#d32f2f",
            "&:hover": {
              borderColor: "#b71c1c",
              backgroundColor: "#ffebee",
            }
          }}
        >
          Continue for Now
        </Button>
        <Button
          onClick={handleLoginRedirect}
          variant="contained"
          sx={{
            backgroundColor: "#d32f2f",
            color: "white",
            "&:hover": {
              backgroundColor: "#b71c1c",
            }
          }}
        >
          Login Again
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionExpiryModal;