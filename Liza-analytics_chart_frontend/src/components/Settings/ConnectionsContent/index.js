"use client";

import React from "react";
import { Card, Box, Typography, Button, Divider } from "@mui/material";
import NavList from "../NavList";

const ConnectionsContent = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <NavList />

        {/* Connected Accounts */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
              mb: "10px",
            }}
            className="text-black"
          >
            Connected Accounts
          </Typography>

          <Box>
            {/* Google */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/google.svg"
                    alt="google"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    Google
                  </Typography>

                  <Typography component="span" sx={{ display: "block" }}>
                    Calendar and Contacts
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>

            {/* Slack */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/slack.svg"
                    alt="slack"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    Slack
                  </Typography>

                  <Typography component="span" sx={{ display: "block" }}>
                    Communications
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>

            {/* GitHub */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/github.svg"
                    alt="github"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    GitHub
                  </Typography>

                  <Typography component="span" sx={{ display: "block" }}>
                    Manage your Git repositories
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>

            {/* Mailchimp */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/mailchimp.svg"
                    alt="mailchimp"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    Mailchimp
                  </Typography>

                  <Typography component="span" sx={{ display: "block" }}>
                    Email marketing service
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>

            {/* Figma */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/figma.svg"
                    alt="figma"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    Figma
                  </Typography>

                  <Typography component="span" sx={{ display: "block" }}>
                    Design
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: "30px" }}></Divider>

        {/* Social Accounts */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
              mb: "10px",
            }}
            className="text-black"
          >
            Social Accounts
          </Typography>

          <Box>
            {/* Facebook */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/facebook.svg"
                    alt="facebook"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Google
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>

            {/* Twitter */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/twitter.svg"
                    alt="twitter"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    X
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>

            {/* Instagram */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/instagram.svg"
                    alt="instagram"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    Instagram
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>

            {/* dribbble */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/dribbble.svg"
                    alt="dribbble"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    Dribbble
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>

            {/* behance */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box>
                  <img
                    src="/images/socials/behance.svg"
                    alt="behance"
                    width={40}
                    height={40}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    className="text-black"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      mb: "4px",
                    }}
                  >
                    Behance
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "normal",
                    fontSize: "14px",
                    padding: "0",
                  }}
                >
                  Click to Disconnect
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ConnectionsContent;
