"use client";

import React from "react";
import { Card, Box, Typography, Button } from "@mui/material";
import NavList from "../NavList";

const PrivacyPolicyContent = () => {
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

        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
              mb: "20px",
            }}
            className="text-black"
          >
            Security:
          </Typography>

          <Box
            sx={{
              "& h5": {
                fontSize: "14px",
                fontWeight: "600",
                mb: "10px",
              },
              "& p": {
                lineHeight: "1.8",
                mb: "15px",
              },
            }}
          >
            <Typography
              variant="h5"
              className="title fw-semibold text-black d-block"
            >
              Two-factor Authentication
            </Typography>
            <Typography>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of.
            </Typography>

            <Typography
              variant="h5"
              className="title fw-semibold text-black d-block"
            >
              Secondary Verification
            </Typography>
            <Typography>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing.
            </Typography>

            <Typography
              variant="h5"
              className="title fw-semibold text-black d-block"
            >
              Backup Codes
            </Typography>
            <Typography>
              Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of lorem ipsum.
            </Typography>

            <Typography
              variant="h5"
              className="title fw-semibold text-black d-block"
            >
              Desktop, Email, Chat, Purchase Notifications
            </Typography>
            <Typography>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters.
            </Typography>

            <Typography
              variant="h5"
              className="title fw-semibold text-black d-block"
            >
              Delete This Account :
            </Typography>
            <Typography>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "10px", sm: "20px" },
              mt: "25px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{
                textTransform: "capitalize",
                borderRadius: "6px",
                fontWeight: "500",
                fontSize: { xs: "13px", sm: "16px" },
                padding: { xs: "10px 20px", sm: "10px 24px" },
                color: "#fff !important",
                boxShadow: "none",
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "6px",
                fontWeight: "500",
                fontSize: { xs: "13px", sm: "16px" },
                padding: { xs: "10px 20px", sm: "10px 24px" },
                color: "#fff !important",
                boxShadow: "none",
              }}
            >
              <i className="material-symbols-outlined">close</i>
              Close & Delete This Account
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default PrivacyPolicyContent;
