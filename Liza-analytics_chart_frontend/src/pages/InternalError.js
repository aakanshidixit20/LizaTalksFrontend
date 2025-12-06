import React from "react";
import { Box, Typography, Link } from "@mui/material"; 

const InternalError = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Pricing</h5>

        <ul className="breadcrumb">
          <li>
            <Link href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>Pricing</li>
        </ul>
      </div>

      <Box
        className="bg-white not-found-area"
        sx={{
          px: "20px",
          py: { xs: "50px", md: "60px", lg: "70px" },
          borderRadius: "7px",
          mb: "25px",
        }}
      >
        <Box className="not-found-content text-center ml-auto mr-auto">
          <Box mb="20px">
            <img
              src="/images/internal-error.png"
              alt="error-image"
              width={400}
              height={434}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontSize: "21px",
              fontWeight: "700",
              mb: "13px",
              lineHeight: "1.4",
            }}
          >
            Looks like we have an internal error, please try again later.
          </Typography>

          <Typography sx={{ lineHight: "1.7", mb: "30px" }}>
            But no worries! Our team is looking ever where while you wait
            safely.
          </Typography>

          <Link
            href="/dashboard/ecommerce/"
            sx={{
              bgcolor: "primary.main",
              textTransform: "capitalize",
              borderRadius: "6px",
              fontWeight: "500",
              fontSize: "16px",
              padding: "12px 23px",
              color: "#fff !important",
              boxShadow: "none",
              display: "inline-block",
            }}
          >
            Back to Dashboard
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default InternalError;
