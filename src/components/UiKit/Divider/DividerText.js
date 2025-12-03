"use client";

import React from "react";
import { Card, Typography, Chip, Divider, styled } from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const DividerText = () => {
  const content = (
    <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}</p>
  );

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
          Divider Text
        </Typography>

        <Root>
          {content}
          <Divider>CENTER</Divider>
          {content}
          <Divider textAlign="left">LEFT</Divider>
          {content}
          <Divider textAlign="right">RIGHT</Divider>
          {content}
          <Divider>
            <Chip label="Chip" size="small" />
          </Divider>
          {content}
        </Root>
      </Card>
    </>
  );
};

export default DividerText;
