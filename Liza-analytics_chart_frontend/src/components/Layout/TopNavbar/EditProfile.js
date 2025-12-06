"use client";

import React, { useEffect, useState } from "react";
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
import UserInfo from "../../ClientDashboard/UserManagement/AddUser/UserInfo";
import { useNavigate } from "react-router-dom";
import config from "../../../config";

function CustomTabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  // pull the current user’s id from your config (supports either key)
  const profileUserId =
    config?.user?.client_user_id || config?.user?.user_id || "";

  // form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [password, setPassword]   = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  // ui states
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const CLIENT_ID = config.clientId;

  const handleChange = (_e, newValue) => setValue(newValue);

  // prefill (edit only)
  useEffect(() => {
    if (!profileUserId) {
      setSnackbarMsg("Missing user id for profile.");
      setSnackbarOpen(true);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/client/user/${profileUserId}`);
        const json = await res.json();
        if (res.ok && json?.data) {
          const u = json.data;
          setFirstName(u.first_name || "");
          setLastName(u.last_name || "");
          setEmail(u.email_id || "");
          setPhone(u.phone_number || "");
          setPassword(""); // do not prefill for security
          // store existing pic URL (UserInfo will show local preview when a new file is chosen)
          if (u.profile_picture_url) {
            // If it's a relative path (avatar endpoint), prepend API base
            const pictureUrl = u.profile_picture_url.startsWith('/')
              ? `${config.API_BASE_URL}${u.profile_picture_url}`
              : u.profile_picture_url;
            setProfilePicture(pictureUrl);
          }
        } else {
          setSnackbarMsg(json?.message || "Failed to load profile details");
          setSnackbarOpen(true);
        }
      } catch (e) {
        setSnackbarMsg("Error fetching profile details");
        setSnackbarOpen(true);
      }
    })();
  }, [profileUserId]);

  const handleSave = async () => {
    // validations (same as Edit User)
    if (!firstName.trim()) { setSnackbarMsg("First Name is required."); setSnackbarOpen(true); return; }
    if (!lastName.trim())  { setSnackbarMsg("Last Name is required.");  setSnackbarOpen(true); return; }
    if (!email.trim())     { setSnackbarMsg("Email is required.");      setSnackbarOpen(true); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setSnackbarMsg("Please enter a valid email address.");
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
    formData.append("client_user_id", profileUserId);
    formData.append("first_name", firstName.trim());
    formData.append("last_name", lastName.trim());
    formData.append("email_id", email.trim());
    formData.append("phone_number", phone.trim() || "");
    if (password) formData.append("password", password);

    // only append a new file; strings are existing URLs
    if (profilePicture && typeof profilePicture !== "string") {
      formData.append("profile_picture", profilePicture);
    }

    try {
      setLoading(true);
      const res = await fetch(`${config.API_BASE_URL}/client/user/update`, {
        method: "PATCH",
        body: formData,
      });
      const json = await res.json();

      if (!res.ok || json?.success === false) {
        const errMsg = json?.message || "Failed to update profile";
        const details = json?.error?.details;
        setSnackbarMsg(details ? `${errMsg}: ${details}` : errMsg);
        setSnackbarOpen(true);
        return;
      }

      setSnackbarMsg(json?.message || "Profile updated successfully.");
      setSnackbarOpen(true);

      // optional: navigate back or refresh profile menu
      setTimeout(() => navigate(-2), 1200);
      window.dispatchEvent(
        new CustomEvent("profile:updated", {
            detail: {
            first_name: firstName.trim(),
            user_name:  `${firstName.trim()} ${lastName.trim()}`.trim(), // or whatever you display as username
            },
        })
);
    } catch (e) {
      setSnackbarMsg(e?.message || "Network error updating profile");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const tabLabels = ["Profile Info"];

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
        Edit Profile
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
            {loading ? "Submitting..." : "Update"}
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

export default EditProfile;
