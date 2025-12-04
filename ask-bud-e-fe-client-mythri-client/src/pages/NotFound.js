import React from "react"; 
import { Box, Typography, Link } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <Box 
        className="not-found-area"
        sx={{
          py: {xs: '50px', md: '70px', lg: '120px'}
        }}
      >
        <Box className="not-found-content text-center ml-auto mr-auto">
          <Box mb="20px">
            <img 
              src="/images/error.png"
              alt="error-image" 
              width={400}
              height={400}
            />
          </Box>

          <Typography 
            variant="h4"
            sx={{
              fontSize: '21px',
              fontWeight: '700',
              mb: '13px',
              lineHeight: '1.4'
            }}
          >
            Looks like we did not find this page, please try again later.
          </Typography>

          <Typography sx={{ lineHight: '1.7', mb: '30px' }}>
            But no worries! Our team is looking ever where while you wait safely.
          </Typography>

          <Link 
            href="/dashboard/ecommerce/"
            sx={{
              bgcolor: 'primary.main',
              textTransform: "capitalize",
              borderRadius: "6px",
              fontWeight: "500",
              fontSize: "16px",
              padding: "12px 23px",
              color: "#fff !important",
              boxShadow: "none", 
              display: 'inline-block'
            }}
          >
            Back to Home
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default NotFound;
