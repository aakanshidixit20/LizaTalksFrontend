"use client";
import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import UserInfo from "./UserInfo";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../../config";

function CustomTabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

const AddUser = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { client_user_id } = useParams();

  // ✅ Treat edit mode as true ONLY if param is a proper UUID (prevents /add-user from being misread)
  const isValidUuid =
    !!client_user_id &&
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      client_user_id
    );
  const isEdit = isValidUuid;

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  // API constants
  const CLIENT_ID = config.clientId;

  const handleChange = (event, newValue) => setValue(newValue);

  // Prefill when editing (only if a valid UUID is present)
  useEffect(() => {
    if (!isEdit) return;

    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/client/user/${client_user_id}`);
        const json = await res.json();
        if (res.ok && json?.data) {
          const u = json.data;
          setFirstName(u.first_name || "");
          setLastName(u.last_name || "");
          setEmail(u.email_id || "");
          setPhone(u.phone_number || "");
          setPassword(""); // do not prefill password for security
          // If backend returns an existing picture URL, we keep it in state as string (upload only when replaced)
          if (u.profile_picture_url) {
            // If it's a relative path (avatar endpoint), prepend API base
            const pictureUrl = u.profile_picture_url.startsWith('/')
              ? `${config.API_BASE_URL}${u.profile_picture_url}`
              : u.profile_picture_url;
            setProfilePicture(pictureUrl);
          }
        } else {
          setSnackbarMsg(json?.message || "Failed to load user details");
          setSnackbarOpen(true);
        }
      } catch (err) {
        setSnackbarMsg("Error fetching user details");
        setSnackbarOpen(true);
      }
    };

    fetchUserDetails();
  }, [isEdit, client_user_id]);

  const handleSave = async () => {
    // Per-field validation with specific messages
    if (!firstName.trim()) {
      setSnackbarMsg("First Name is required.");
      setSnackbarOpen(true);
      return;
    }
    if (!lastName.trim()) {
      setSnackbarMsg("Last Name is required.");
      setSnackbarOpen(true);
      return;
    }
    if (!email.trim()) {
      setSnackbarMsg("Email is required.");
      setSnackbarOpen(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setSnackbarMsg("Please enter a valid email address.");
      setSnackbarOpen(true);
      return;
    }

    if (!isEdit && !password.trim()) {
      setSnackbarMsg("Password is required.");
      setSnackbarOpen(true);
      return;
    }
    if (password && password.length < 6) {
      setSnackbarMsg("Password must be at least 6 characters long.");
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("client_id", CLIENT_ID);
    formData.append("first_name", firstName.trim());
    formData.append("last_name", lastName.trim());
    formData.append("email_id", email.trim());
    if (password) formData.append("password", password);
    formData.append("phone_number", phone.trim() || "");

    // Only append a file if the user selected a new one (strings are existing URLs)
    if (profilePicture && typeof profilePicture !== "string") {
      formData.append("profile_picture", profilePicture);
    }
    if (isEdit) {
      formData.append("client_user_id", client_user_id);
    }

    try {
      setLoading(true);
      const endpoint = isEdit
        ? `${config.API_BASE_URL}/client/user/update`
        : `${config.API_BASE_URL}/client/user/create`;

      const res = await fetch(endpoint, {
        method: isEdit ? "PATCH" : "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || json?.success === false) {
        const errMsg =
          json?.message || (isEdit ? "Failed to update user" : "Failed to create user");
        setSnackbarMsg(errMsg);
        setSnackbarOpen(true);
        return;
      }

      setSnackbarMsg(
        json?.message || (isEdit ? "User updated successfully." : "User created successfully.")
      );
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/user-management/");
      }, 1500);
    } catch (error) {
      setSnackbarMsg(error?.message || "Network error saving user");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const tabLabels = ["User Info"];

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
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700, mb: "25px" }}
      >
        {isEdit ? "Edit User" : "Add User"}
      </Typography>

      <Tabs value={value} onChange={handleChange}>
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <UserInfo
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          password={password}
          setPassword={setPassword}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
        />
      </CustomTabPanel>

      <Stack direction="row" alignItems="center" justifyContent="center" mt={2}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ minWidth: 120 }}
          >
            {loading ? "Submitting..." : isEdit ? "Update" : "Submit"}
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        autoHideDuration={3000}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Card>
  );
};

export default AddUser;

