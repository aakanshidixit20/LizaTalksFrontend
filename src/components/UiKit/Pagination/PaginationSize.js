"use client";

import React from "react";
import { Card, Typography, Pagination, Stack } from "@mui/material";

const PaginationSize = () => {
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
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
          }}
          className="text-black"
        >
          Pagination Size
        </Typography>

        <Stack spacing={2}>
          <Pagination count={10} size="small" />
          <Pagination count={10} />
          <Pagination count={10} size="large" />
        </Stack>
      </Card>
    </>
  );
};

export default PaginationSize;
