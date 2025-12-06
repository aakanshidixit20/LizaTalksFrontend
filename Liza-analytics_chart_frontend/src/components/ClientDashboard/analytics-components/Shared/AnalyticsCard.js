import { useState } from "react";
import { Paper, Typography, Button, Collapse, Divider, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
 
const PRIMARY_PURPLE = "#6D5DD2";
const PURPLE_HOVER = "#5645c0";
 
export default function AnalyticsCard({ title, children, details, redirection }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
 
  const handleRedirection = () => {
    if (redirection) navigate(redirection);
    else setExpanded(!expanded);
  };
 
  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: "14px",
        border: "1px solid #EAE8FF",
        boxShadow: "0 4px 18px rgba(109,93,210,0.05)",
      }}
    >
      {/* ------- Header ------- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography fontWeight={600} fontSize="18px" sx={{ color: PRIMARY_PURPLE }}>
          {title}
        </Typography>
 
        {/* FULL PURPLE BUTTON LIKE "BACK" */}
        {redirection && (
          <Button
            variant="contained"
            // endIcon={<ArrowForwardIosIcon sx={{ fontSize: "14px" }} />}
            onClick={handleRedirection}
            sx={{
              textTransform: "none",
              backgroundColor: PRIMARY_PURPLE,
              fontWeight: 600,
              fontSize: "14px",
              padding: "6px 16px",
              borderRadius: "10px", // pill shape
              "&:hover": {
                backgroundColor: PURPLE_HOVER,
              },
            }}
          >
            View Details →
          </Button>
        )}
      </Box>
 
      {/* Preview Chart */}
      {children}
 
      {/* Expand Section if no redirect */}
      <Collapse in={expanded}>
        <Divider sx={{ my: 2 }} />
        {details}
      </Collapse>
    </Paper>
  );
}