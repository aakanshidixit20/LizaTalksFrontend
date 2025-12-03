"use client";

import * as React from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPasswordForm = () => {

  // ---------- STATE ----------
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  // ---------- HANDLE SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ CHECK MATCH
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // assuming JWT stored here

      await axios.post(
        "http://your-backend.com/auth/reset-password",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      

      setMessage("Password updated successfully!");
      setError("");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Box
        className="auth-main-wrapper forgot-password-area"
        sx={{
          py: { xs: "60px", md: "80px", lg: "100px", xl: "135px" },
        }}
      >
        <Box
          sx={{
            maxWidth: { sm: "500px", md: "1255px" },
            mx: "auto !important",
            px: "12px",
          }}
        >
          <Grid
            container
            alignItems="center"
            columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 3 }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 7 }}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <img
                  src="/images/reset-password.jpg"
                  alt="reset-password-image"
                  width={646}
                  height={804}
                  style={{ borderRadius: "24px" }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 5 }}>
              <Box className="form-content">

                {/* SHOW ERROR */}
                {error && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                  </Typography>
                )}

                {/* SHOW SUCCESS */}
                {message && (
                  <Typography color="green" sx={{ mb: 2 }}>
                    {message}
                  </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit}>

                  {/* OLD PASSWORD */}
                  <Box mb="15px">
                    <FormControl fullWidth>
                      <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px" }}>
                        Old Password
                      </Typography>

                      <TextField
                        variant="filled"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </FormControl>
                  </Box>

                  {/* NEW PASSWORD */}
                  <Box mb="15px">
                    <FormControl fullWidth>
                      <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px" }}>
                        New Password
                      </Typography>

                      <TextField
                        variant="filled"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </FormControl>
                  </Box>

                  {/* CONFIRM PASSWORD */}
                  <Box mb="15px">
                    <FormControl fullWidth>
                      <Typography component="label" sx={{ fontWeight: "500", fontSize: "14px", mb: "10px" }}>
                        Confirm Password
                      </Typography>

                      <TextField
                        variant="filled"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </FormControl>
                  </Box>

                  <Box my="25px">
                    <Button type="submit" variant="contained" fullWidth>
                      Reset Password
                    </Button>
                  </Box>

                  <Typography>
                    Back to{" "}
                    <Link to="/authentication/sign-in/" className="text-primary">
                      Sign In
                    </Link>
                  </Typography>

                </Box>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ResetPasswordForm;
