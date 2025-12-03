"use client";
import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Stack,
  Snackbar,
  Fade,
} from "@mui/material";
import ClientInfo from "./ClientInfo";
import OrganizationDetails from "./OrganizationDetails";
import ClientCredentials from "./ClientCredentials";
import SuccessDialog from "./SuccessDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function CustomTabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

const CreateEditClient = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientLoginId, setClientLoginId] = useState("");
  const [credentialsReady, setCredentialsReady] = useState(false);

  const handleChange = (event, newValue) => setValue(newValue);
  const handleNext = () => value < 2 && setValue(value + 1);
  const handlePrev = () => value > 0 && setValue(value - 1);

  const tabLabels = [
    "Client Info",
    "Organization Details",
    "Client Credentials",
  ];

  const buttonConfig = {
    0: { label: "Save Changes", msg: "Client info saved successfully!" },
    1: { label: "Create Client", msg: "Client Created successfully" },
  };

  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const generateLoginId = () => {
    return "CLNT-" + Date.now();
  };

  const handleAction = () => {
    setSnackbarMsg(buttonConfig[value].msg);
    setSnackbarOpen(true);

    if (value === 1) {
      // Generate credentials right after creating client
      setClientPassword(generateRandomPassword());
      setClientLoginId(generateLoginId());
      setCredentialsReady(true);

      // Move to credentials tab
      setValue(2);

      // Open success dialog
      setSuccessOpen(true);
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "7px",
        mb: "25px",
        padding: { xs: "18px", sm: "20px", lg: "25px" },
      }}
      className="rmui-card"
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "25px",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700 }}
        >
          Add New Client
        </Typography>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/client-management")}
        >
          Back
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs value={value} onChange={handleChange}>
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <ClientInfo setClientEmail={setClientEmail} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OrganizationDetails />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ClientCredentials
          email={clientEmail}
          password={clientPassword}
          loginId={clientLoginId}
          credentialsReady={credentialsReady}
        />
      </CustomTabPanel>

      {/* Navigation buttons */}
      <Stack direction="row" alignItems="center" mt={2}>
        {/* Previous */}
        <Box flex={1}>
          <Button variant="outlined" onClick={handlePrev} disabled={value === 0}>
            Previous
          </Button>
        </Box>

        {/* Action Button (only for first two tabs) */}
        {buttonConfig[value] && (
          <Box>
            <Button variant="contained" color="primary" onClick={handleAction}>
              {buttonConfig[value].label}
            </Button>
          </Box>
        )}

        {/* Next */}
        <Box flex={1} display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={value === tabLabels.length - 1}
          >
            Next
          </Button>
        </Box>
      </Stack>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        autoHideDuration={2000}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <SuccessDialog
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
        }}
      />
    </Card>
  );
};

export default CreateEditClient;
