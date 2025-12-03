
"use client";

import React from "react";
import { Grid, Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dashboardData from "../../../data/dashboard_overview_success.json";
import RevenueChart from "./RevenueChart";
import ConversationChart from "./ConversationChart";
import StoreIcon from "@mui/icons-material/Store";
import Person2Rounded from "@mui/icons-material/Person2Rounded";
import AssessmentIcon from "@mui/icons-material/Assessment";


const ClientDashboard = () => {
  const navigate = useNavigate();

  const data = dashboardData?.data || {};

  return (
    <>
      {/* Info Cards */}
      <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
        <Grid container columnSpacing={{ xs: 1, sm: 4, md: 4, lg: 3 }}>
  {/* Total Conversations*/}
  <Grid size={{ xs: 12, sm:6, md:3, lg:3,xl:3}}>

            <Box
              className="pm-po-card bg-primary-50"
              sx={{ padding: "22px 20px", borderRadius: "7px", mt: "5px", cursor: "pointer" }}
              onClick={() => navigate("/chat-transcripts")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box className="text-primary">
                  <i className="material-symbols-outlined" style={{ fontSize: "40px" }}>
                    chat
                  </i>
                </Box>
                <Box>
                  <Typography component="span" mb="3px" sx={{ display: "block" }}>
                    Total Conversations
                  </Typography>
                  <Typography variant="h5" fontSize={20} mb={0} fontWeight={700} className="text-black">
                    {data.total_conversations}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Total Revenue */}
         <Grid size={{ xs: 12, sm:6, md:3, lg:3,xl:3}}>
            <Box
              className="pm-po-card bg-primary-50"
              sx={{ padding: "22px 20px", borderRadius: "7px", mt: "5px", cursor: "pointer" }}
              onClick={() => navigate("/revenue")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box className="text-primary">
                  <i className="material-symbols-outlined" style={{ fontSize: "40px" }}>
                    attach_money
                  </i>
                </Box>
                <Box>
                  <Typography component="span" mb="3px" sx={{ display: "block" }}>
                    Total Revenue
                  </Typography>
                  <Typography variant="h5" fontSize={20} mb={0} fontWeight={700} className="text-black">
                    ${data.total_revenue}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Top Moods */}
  <Grid size={{ xs: 12, sm:6, md:3, lg:3,xl:3}}>
            <Box
              className="pm-po-card bg-primary-50"
              sx={{ padding: "22px 20px", borderRadius: "7px", mt: "5px", cursor: "pointer" }}
              onClick={() => navigate("/revenue")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box className="text-primary">
                  <i className="material-symbols-outlined" style={{ fontSize: "40px" }}>
                    credit_card
                  </i>
                </Box>
                <Box>
                  <Typography component="span" mb="3px" sx={{ display: "block" }}>
                    Total Subscriptions Sold
                  </Typography>
                  <Typography variant="h5" fontSize={20} mb={0} fontWeight={700} className="text-black">
                    {data.top_moods}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

             <Grid size={{ xs: 12, sm:6, md:3, lg:3,xl:3}}>
            <Box
              className="pm-po-card bg-primary-50"
              sx={{ padding: "22px 20px", borderRadius: "7px", mt: "5px", cursor: "pointer" }}
              onClick={() => navigate("/clients-order")}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box className="text-primary">
                  <i className="material-symbols-outlined" style={{ fontSize: "40px" }}>
                   attach_money
                  </i>
                </Box>
                <Box>
                  <Typography component="span" mb="3px" sx={{ display: "block" }}>
                    Client's Revenue
                  </Typography>
                  <Typography variant="h5" fontSize={20} mb={0} fontWeight={700} className="text-black">
                    ${data.client_revenue}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

        </Grid>

      </Card>

     {/* Graphs */}
      {/* Revenue Chart + Quick Actions */}
      <Grid
        container
        columnSpacing={{ xs: 2, sm: 3, md: 3 }}
        rowSpacing={2}
        sx={{ mt: 2, display: "flex", alignItems: "stretch" }}
      >
        {/* Revenue Chart */}
        <Grid size={{ xs: 12, md: 9 }} sx={{ display: "flex", flexDirection: "column" }}>
          <RevenueChart sx={{ flex: 1 }} />
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: "flex", flexDirection: "column" }}>
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "7px",
              mb: "25px",
              padding: { xs: "18px", sm: "20px", lg: "25px" },
              flex: 1,
            }}
            className="rmui-card"
          >

            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
              className="text-black"
            >
              Quick Actions
            </Typography>

            {/* Actions Grid */}
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{ flexGrow: 1, height: "100%", pb: 1 }} // add padding-bottom to parent
            >
              {/* Add Store */}
              <Grid item xs={12} sx={{ flexGrow: 1 }}>
                <Box
                  className="bg-primary-50"
                  sx={{
                    p: 2,
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    cursor: "pointer",
                    gap: 1,
                    "&:hover": { bgcolor: "#E0E7FF" },
                  }}
                  onClick={() => navigate("/client-management/create-client")}
                >
                  <Box className="text-primary">
                    <StoreIcon sx={{ fontSize: 30 }} />
                  </Box>
                  <Typography fontWeight={600}>Add Client</Typography>
                </Box>
              </Grid>

              {/* Generate Report */}
              <Grid item xs={12} sx={{ flexGrow: 1 }}>
                <Box
                  className="bg-orange-50"
                  sx={{
                    p: 2,
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    cursor: "pointer",
                    gap: 1,
                    "&:hover": { bgcolor: "#FFEDD5" },
                  }}
                  onClick={() => navigate("/analytics")}
                >
                  <Box className="text-orange">
                    <AssessmentIcon sx={{ fontSize: 30 }} />
                  </Box>
                  <Typography fontWeight={600}>Generate Report</Typography>
                </Box>
              </Grid>

              {/* Upload Document */}
              <Grid item xs={12} sx={{ flexGrow: 1 , mb: 3.5}}> {/* reduced bottom margin */}
                <Box
                  className="bg-success-50"
                  sx={{
                    p: 2,
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    cursor: "pointer",
                    gap: 1,
                     // small margin at bottom to prevent touching
                    "&:hover": { bgcolor: "#D1FAE5" },
                  }}
                  onClick={() => navigate("/user-management/add-user")}
                >
                  <Box className="text-success">
                    <Person2Rounded sx={{ fontSize: 30 }} />
                  </Box>
                  <Typography fontWeight={600}>Add User</Typography>
                </Box>
              </Grid>
            </Grid>



          </Card>
        </Grid>
      </Grid>
      <ConversationChart />
    </>
  );
};

export default ClientDashboard;



