"use client";

import React, { useEffect, useState } from "react";
import { Grid, Box, Card, Typography, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dashboardData from "../../../data/dashboard_overview_success.json";

// Import Charts
import RevenueChart from "./RevenueChart";
import ConversationChart from "./ConversationChart";
import CustomerIntentChart from "./CustomerIntent";
import PeakChatTimes from "./PeakChatTime";
import ProductPerformance from "./ProductPerformance";
import EngagementGrowth from "./EngagementGrowth";

// Icons
import StoreIcon from "@mui/icons-material/Store";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ChatIcon from "@mui/icons-material/Chat";
import SyncIcon from "@mui/icons-material/Sync";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const data = dashboardData?.data || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {/* 1️⃣ Quick Actions - First Line Small Buttons */}
      <Card sx={{ 
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
        borderRadius: 2, 
        mb: 3, 
        p: 2,
        border: "1px solid #e0e0e0"
      }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AssessmentIcon />}
              onClick={() => navigate("/analytics")}
              sx={{ justifyContent: 'flex-start', py: 1 }}
            >
              Export Report
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ChatIcon />}
              onClick={() => navigate("/chat-transcripts")}
              sx={{ justifyContent: 'flex-start', py: 1 }}
            >
              View Conversations
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<CreditCardIcon />}
              onClick={() => navigate("/billing")}
              sx={{ justifyContent: 'flex-start', py: 1 }}
            >
              Manage Credits
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SyncIcon />}
              onClick={() => navigate("/pos-sync")}
              sx={{ justifyContent: 'flex-start', py: 1 }}
            >
              POS Management
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* 2️⃣ Store Performance Snapshot - KPI Cards */}
      <Card sx={{ 
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
        borderRadius: 2, 
        mb: 3, 
        p: 2,
        width: '100%',
        border: "1px solid #e0e0e0"
      }}>
        <Grid container spacing={2}>
          {/* Conversations */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: "7px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "120px",
                backgroundColor: "#EFF6FF",
                border: "1px solid #DBEAFE",
                "&:hover": { bgcolor: "#E0E7FF", borderColor: "#93C5FD" }
              }}
              onClick={() => navigate("/chat-transcripts")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
                <Box sx={{ color: "primary.main" }}>
                  <i className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    chat
                  </i>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    mb: "3px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "text.secondary"
                  }}
                >
                  Conversations
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    mb: 0.5
                  }}
                >
                  1,245
                </Typography>
                <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>
                  ↑ +12%
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Unique Users */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: "7px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "120px",
                backgroundColor: "#EFF6FF",
                border: "1px solid #DBEAFE",
                "&:hover": { bgcolor: "#E0E7FF", borderColor: "#93C5FD" }
              }}
              onClick={() => navigate("/users")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
                <Box sx={{ color: "primary.main" }}>
                  <i className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    people
                  </i>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    mb: "3px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "text.secondary"
                  }}
                >
                  Unique Users
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    mb: 0.5
                  }}
                >
                  980
                </Typography>
                <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>
                  ↑ +8%
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Product Clicks */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: "7px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "120px",
                backgroundColor: "#EFF6FF",
                border: "1px solid #DBEAFE",
                "&:hover": { bgcolor: "#E0E7FF", borderColor: "#93C5FD" }
              }}
              onClick={() => navigate("/products")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
                <Box sx={{ color: "primary.main" }}>
                  <i className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    shopping_cart
                  </i>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    mb: "3px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "text.secondary"
                  }}
                >
                  Product Clicks
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    mb: 0.5
                  }}
                >
                  356
                </Typography>
                <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>
                  ↑ +15%
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Revenue Influenced */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: "7px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "120px",
                backgroundColor: "#EFF6FF",
                border: "1px solid #DBEAFE",
                "&:hover": { bgcolor: "#E0E7FF", borderColor: "#93C5FD" }
              }}
              onClick={() => navigate("/orders")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
                <Box sx={{ color: "primary.main" }}>
                  <i className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    attach_money
                  </i>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    mb: "3px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "text.secondary"
                  }}
                >
                  Orders Influenced
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    mb: 0.5
                  }}
                >
                  $8,200
                </Typography>
                <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>
                  ↑ +18%
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Bot Health */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: "7px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "120px",
                backgroundColor: "#D1FAE5",
                border: "1px solid #A7F3D0",
                "&:hover": { bgcolor: "#A7F3D0", borderColor: "#6EE7B7" }
              }}
              onClick={() => navigate("/bot-health")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
                <Box sx={{ color: "success.main" }}>
                  <i className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    monitoring
                  </i>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    mb: "3px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "text.secondary"
                  }}
                >
                  Bot Health
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    mb: 0.5,
                    color: "success.main"
                  }}
                >
                  ✅ Stable
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                  1.8s avg. response
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Store Credits */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: "7px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: "120px",
                backgroundColor: "#FFEDD5",
                border: "1px solid #FED7AA",
                "&:hover": { bgcolor: "#FED7AA", borderColor: "#FDBA74" }
              }}
              onClick={() => navigate("/billing")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
                <Box sx={{ color: "warning.main" }}>
                  <i className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    credit_card
                  </i>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    display: "block",
                    mb: "3px",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "text.secondary"
                  }}
                >
                  Store Credits
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    mb: 0.5
                  }}
                >
                  1,250
                </Typography>
                <Typography variant="caption" sx={{ color: "warning.main", fontWeight: 600 }}>
                  ⚡ Active
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* 3️⃣ Customer Intent & Engagement - 2 Column Layout */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            overflow: 'hidden',
            p: 3  // Added padding
          }}>
            <CustomerIntentChart />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            overflow: 'hidden',
            p: 3  // Added padding
          }}>
            <PeakChatTimes />
          </Card>
        </Grid>
      </Grid>

      {/* 4️⃣ Product Impact - 2 Column Layout */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            overflow: 'hidden',
            p: 3  // Added padding
          }}>
            <ProductPerformance />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ 
            height: '100%', 
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            overflow: 'hidden',
            p: 3  // Added padding
          }}>
            <RevenueChart />
          </Card>
        </Grid>
      </Grid>

      {/* 5️⃣ Engagement & Growth */}
      <Box sx={{ mb: 3 }}>
        <Card sx={{ 
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          overflow: 'hidden',
          p: 3  // Added padding
        }}>
          <EngagementGrowth />
        </Card>
      </Box>

      {/* 6️⃣ Conversation Chart */}
      <Card sx={{ 
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        overflow: 'hidden',
        p: 3  // Added padding
      }}>
        <ConversationChart />
      </Card>
    </>
  );
};

export default ClientDashboard;