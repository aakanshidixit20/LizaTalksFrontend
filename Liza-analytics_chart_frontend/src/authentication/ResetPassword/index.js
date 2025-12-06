"use client";

import * as React from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const ResetPasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  
  const { token } = useParams();

  // Extract just the token value if it includes "token=" prefix
  const getCleanToken = () => {
    if (!token) return "";
    
    // If token contains "token=", extract the actual token value
    if (token.includes("token=")) {
      return token.split("token=")[1];
    }
    
    return token;
  };

  const cleanToken = getCleanToken();

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!cleanToken) {
      newErrors.token = "Invalid reset token";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://clientapi-storemgmt.onrender.com/api/v1/client/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: cleanToken, // Use the cleaned token here
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Clear form
        setNewPassword("");
        setConfirmPassword("");
        setErrors({});
      } else {
        toast.error(data.message || "Failed to reset password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const isResetDisabled = !newPassword || !confirmPassword || newPassword !== confirmPassword || loading;

  return (
    <>
      <ToastContainer />
      <div className="fp-wrapper">
        <Box
          className="auth-main-wrapper forgot-password-area"
          sx={{
            py: { xs: "60px", md: "80px", lg: "100px", xl: "135px" },
            background: "linear-gradient(135deg, #E0ECFF 0%, #F3E8FF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              maxWidth: { sm: "500px", md: "1255px" },
              mx: "auto !important",
              px: "12px",
              width: "100%",
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 3 }}
            >
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 5 }}>
                <Box
                  className="form-content"
                  sx={{
                    paddingLeft: { xs: "0", lg: "10px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* Warning/Flash Icon */}
                  <Box
                    className="icon-wrapper"
                    sx={{
                      mb: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      color="primary.main"
                      backgroundColor="primary"
                    >
                      <i 
                        className="material-symbols-outlined" 
                        style={{ 
                          fontSize: "60px", 
                        }}
                      >
                        refresh
                      </i>
                    </Box>
                  </Box>

                  <Box
                    className="title"
                    sx={{
                      mb: "23px",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h1"
                      className="text-black"
                      sx={{
                        fontSize: { xs: "22px", sm: "25px", lg: "28px" },
                        mb: "7px",
                        fontWeight: "600",
                      }}
                    >
                      Reset your Password 
                    </Typography>
                  </Box>

                  {errors.token && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                      {errors.token}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                    {/* New Password Field */}
                    <Box mb="25px">
                      <FormControl fullWidth error={!!errors.newPassword}>
                        <Typography
                          component="label"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "10px",
                            display: "block",
                            textAlign: "left",
                          }}
                          className="text-black"
                        >
                          New Password 
                        </Typography>

                        <TextField
                          type={showNewPassword ? "text" : "password"}
                          variant="filled"
                          id="new-password"
                          name="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          error={!!errors.newPassword}
                          helperText={errors.newPassword}
                          sx={{
                            "& .MuiInputBase-root": {
                              border: "1px solid #D5D9E2",
                              backgroundColor: "#fff",
                              borderRadius: "7px",
                            },
                            "& .MuiInputBase-root::before": {
                              border: "none",
                            },
                            "& .MuiInputBase-root:hover::before": {
                              border: "none",
                            },
                            "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before":
                              {
                                border: "none",
                              },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  <i className="material-symbols-outlined">
                                    {showNewPassword ? "visibility_off" : "visibility"}
                                  </i>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Box>

                    {/* Confirm Password Field */}
                    <Box mb="25px">
                      <FormControl fullWidth error={!!errors.confirmPassword}>
                        <Typography
                          component="label"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "10px",
                            display: "block",
                            textAlign: "left",
                          }}
                          className="text-black"
                        >
                          Confirm Password
                        </Typography>

                        <TextField
                          type={showConfirmPassword ? "text" : "password"}
                          variant="filled"
                          id="confirm-password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword}
                          sx={{
                            "& .MuiInputBase-root": {
                              border: "1px solid #D5D9E2",
                              backgroundColor: "#fff",
                              borderRadius: "7px",
                            },
                            "& .MuiInputBase-root::before": {
                              border: "none",
                            },
                            "& .MuiInputBase-root:hover::before": {
                              border: "none",
                            },
                            "& .MuiInputBase-root:hover:hover:not(.Mui-disabled, .Mui-error)::before":
                              {
                                border: "none",
                              },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  <i className="material-symbols-outlined">
                                    {showConfirmPassword ? "visibility_off" : "visibility"}
                                  </i>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Box>

                    <Box mb="20px">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isResetDisabled}
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "6px",
                          fontWeight: "500",
                          fontSize: { xs: "13px", sm: "16px" },
                          padding: { xs: "10px 20px", sm: "10px 24px" },
                          color: "#fff !important",
                          boxShadow: "none",
                          width: "100%",
                          "&:disabled": {
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                            color: "rgba(0, 0, 0, 0.26)",
                          },
                        }}
                      >
                        {loading ? (
                          "Resetting..."
                        ) : (
                          <>
                            <i className="material-symbols-outlined mr-5">
                              autorenew
                            </i>
                            Reset Password
                          </>
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default ResetPasswordForm;