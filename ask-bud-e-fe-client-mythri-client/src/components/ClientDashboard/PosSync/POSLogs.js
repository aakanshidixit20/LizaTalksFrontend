"use client";

import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

// MUI Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CancelIcon from "@mui/icons-material/Cancel";

// Import JSON file with logs
import logData from "../../../data/pos_logs_success.json";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  backgroundColor: "#fafafa",
  fontFamily: "'Courier New', monospace",
  fontSize: "14px",
  whiteSpace: "pre-wrap",
}));

// Status styles and icons
const statusStyles = {
  success: { color: "green", icon: <CheckCircleIcon sx={{ color: "green" }} /> },
  partial: { color: "orange", icon: <WarningIcon sx={{ color: "orange" }} /> },
  failed: { color: "red", icon: <CancelIcon sx={{ color: "red" }} /> },
};

const POSLogs = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (

    <>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span" sx={{ fontWeight: 600 }}>
             Logs
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {logData.data.map((log, index) => {
            const style = statusStyles[log.status] || {};
            return (
              <Box key={index} sx={{ mb: 2 }}>
                <span style={{ color: "#555" }}>
                  [{log.timestamp}]
                </span>{" "}
                {style.icon}{" "}
                <span style={{ color: style.color }}>
                  POS sync {log.status} via [{log.provider}] –{" "}
                  {log.products_updated} products updated ({log.sync_time_sec}s)
                </span>
                {log.message && (
                  <div style={{ color: style.color }}>
                    Reason: {log.message}
                  </div>
                )}
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>
      </>

  );
};



export default POSLogs;

