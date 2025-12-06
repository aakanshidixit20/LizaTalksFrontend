"use client";

import React from "react";
import { Card, Box, Typography } from "@mui/material";
import NavList from "../NavList";

const TermsConditionsContent = () => {
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
            Desktop, Email, Chat, Purchase Notifications
          </Typography>
          <Typography>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.
          </Typography>

          <Typography
            variant="h5"
            className="title fw-semibold text-black d-block"
          >
            Delete This Account :
          </Typography>
          <Typography>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </Typography>

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
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters.
          </Typography>

          <Typography
            variant="h5"
            className="title fw-semibold text-black d-block"
          >
            Backup Codes
          </Typography>
          <Typography>
            Lorem ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of lorem ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Box>
      </Card>
    </>
  );
};

export default TermsConditionsContent;
