"use client";

import React from "react";
import { Card, Typography, Button, styled } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const CustomizedTooltips = () => {
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
          Customized Tooltips
        </Typography>

        <div>
          <LightTooltip title="Add">
            <Button>Light</Button>
          </LightTooltip>
          <BootstrapTooltip title="Add">
            <Button>Bootstrap</Button>
          </BootstrapTooltip>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Tooltip with HTML</Typography>
                <em>{"And here's"}</em> <b>{"some"}</b>{" "}
                <u>{"amazing content"}</u>. {"It's very engaging. Right?"}
              </React.Fragment>
            }
          >
            <Button>HTML</Button>
          </HtmlTooltip>
        </div>
      </Card>
    </>
  );
};

export default CustomizedTooltips;
