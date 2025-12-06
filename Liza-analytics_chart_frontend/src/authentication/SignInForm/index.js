"use client";

import * as React from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authentication/AuthContext";
import config from "../../config";

const SignInForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    setError("");

    // Get email & password values
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Make API call to login endpoint
      const response = await fetch("https://ask-bud-e-be-client-v2.onrender.com/api/v1/client/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_id: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // ✅ Store the actual API key from backend response
        const apiKey = data.data.api_key;

        // Generate JWT token with user data and 20-minute expiry
        const jwtToken = generateJWTToken(data.data);

        // ✅ Store user data in config including the actual api_key
        storeUserData(data.data);

        // Log in via AuthContext (now async to check subscription)
        await login(jwtToken, data.data);

        // Navigation is handled by login function
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Generate JWT token with 20-minute expiry
  const generateJWTToken = (userData) => {
    const payload = {
      ...userData,
      exp: Math.floor(Date.now() / 1000) + 3600, // 20 minutes expiry (1200 seconds)
      iat: Math.floor(Date.now() / 1000),
    };
    
    // In a real app, this would be properly signed by the backend
    // For frontend simulation, we'll create a mock token structure
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payloadBase64 = btoa(JSON.stringify(payload));
    const signature = "mock_signature"; // This would be properly signed in production
    
    return `${header}.${payloadBase64}.${signature}`;
  };

  // Store user data for use across the application
  const storeUserData = (userData) => {
    // Store in localStorage for persistence
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // ✅ Update config with the actual user data including api_key
    config.setUserData(userData);
    
    console.log("User data stored:", {
      apiKey: userData.api_key,
      clientId: userData.client_id,
      clientUserId: userData.client_user_id
    });
  };

  return (
    <>
      <div className="fp-wrapper">
        <Box
          className="auth-main-wrapper sign-in-area"
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
                  <Box
                    className="logo"
                    sx={{
                      mb: "23px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/images/Bud-e-logo-removebg.png"
                      alt="logo"
                      width={112}
                      height={28}
                    />
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
                      Good to see you again!
                    </Typography>
                  </Box>

                  {error && (
                    <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                    <Box mb="15px">
                      <FormControl fullWidth>
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
                          Email Address
                        </Typography>

                        <TextField
                          label="example&#64;email.com"
                          variant="filled"
                          id="email"
                          name="email"
                          type="email"
                          required
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
                        />
                      </FormControl>
                    </Box>

                    <Box mb="15px">
                      <FormControl fullWidth>
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
                          Password
                        </Typography>

                        <TextField
                          label="Type Password"
                          variant="filled"
                          type="password"
                          id="password"
                          name="password"
                          required
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
                        />
                      </FormControl>
                    </Box>

                    <Box mb="20px" sx={{ textAlign: "left" }}>
                      <Link
                        to="/authentication/forgot-password/"
                        className="text-primary"
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Box>

                    <Box mb="20px">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                          textTransform: "capitalize",
                          borderRadius: "6px",
                          fontWeight: "500",
                          fontSize: { xs: "13px", sm: "16px" },
                          padding: { xs: "10px 20px", sm: "10px 24px" },
                          color: "#fff !important",
                          boxShadow: "none",
                          width: "100%",
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <>
                            <i className="material-symbols-outlined mr-5">login</i>
                            Sign In
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

export default SignInForm;