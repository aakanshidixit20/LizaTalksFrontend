"use client";

import * as React from "react";
import {
  Grid,
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    try {
      const response = await fetch("https://clientapi-storemgmt.onrender.com/api/v1/client/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_id: email
        }),
      });

      if (response.ok) {
        handleOpen();
      } else {
        // Even if the API returns an error, we still show the success modal
        // for security reasons (to avoid revealing which emails exist)
        handleOpen();
      }
    } catch (error) {
      // Even on network errors, we show the success modal for security
      handleOpen();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                        bolt
                      </i>
                    </Box>
                  </Box>

                  {/* <Box
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
                  </Box> */}

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
                      Forgot your password?
                    </Typography>

                    <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                      Enter the email address you used when you joined and we'll
                      send you instructions to reset your password.
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                    <Box mb="25px">
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
                        <i className="material-symbols-outlined mr-5">
                          {loading ? "autorenew" : "send"}
                        </i>
                        {loading ? "Sending..." : "Send"}
                      </Button>
                    </Box>

                    <Typography>
                      Back to{" "}
                      <Link
                        to="/authentication/sign-in/"
                        className="text-primary"
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        Sign In
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Success Modal */}
        <Modal
          aria-labelledby="success-modal-title"
          aria-describedby="success-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: "8px",
                boxShadow: 24,
                p: 4,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  color: "success.main",
                  mb: 2,
                }}
              >
                <i className="material-symbols-outlined" style={{ fontSize: "48px" }}>
                  check_circle
                </i>
              </Box>
              
              <Typography id="success-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                Check Your Email
              </Typography>
              
              <Typography id="success-modal-description" sx={{ mb: 3 }}>
                If your account exists, we have sent an email with reset instructions.
              </Typography>
              
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default ForgotPasswordForm;