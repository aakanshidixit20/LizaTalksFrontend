// // BotEffectivenessTablePage.js
// import React from "react";
// import { Box, Paper, Typography, Grid } from "@mui/material";

// import BarChart from "./Charts/BarChart"; // your existing chart
// import { analyticsData } from "./Data/AnalyticsData";

// export default function BotEffectivenessTablePage() {
//   const labels = analyticsData.clients;

//   const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(
//     (i) => i.engagementRate
//   );

//   const tableData = analyticsData.botEffectiveness.engagementRatePerClient;

//   const totalCredits = tableData.reduce((sum, item) => sum + item.creditsSpent, 0);

//   return (
//     <Box sx={{ p: 3 }}>

//       {/* ---------------------- TOP GRAPH ---------------------- */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
//           Engagement Rate per Client
//         </Typography>

//         <BarChart
//           labels={labels}
//           data={engagementRate}
//           title="Engagement Rate (%)"
//         />
//       </Paper>

//       {/* ---------------------- BOTTOM TABLE ---------------------- */}
//       <Paper sx={{ p: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
//           Credits Spent Per Client
//         </Typography>

//         {/* Table Header */}
//         <Grid container sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
//           <Grid item xs={6}>Client</Grid>
//           <Grid item xs={6} textAlign="right">Credits</Grid>
//         </Grid>

//         {/* Table Rows */}
//         {tableData.map((item, index) => (
//           <Grid
//             container
//             key={index}
//             sx={{
//               py: 1.2,
//               borderBottom: index !== tableData.length - 1 ? "1px solid #eee" : "none",
//             }}
//           >
//             <Grid item xs={6}>
//               <Typography fontSize="15px" fontWeight={500}>
//                 {item.client}
//               </Typography>
//             </Grid>

//             <Grid item xs={6} textAlign="right">
//               <Typography
//                 fontSize="15px"
//                 fontWeight={600}
//                 color="#6559F5"
//               >
//                 {item.creditsSpent.toLocaleString()}
//               </Typography>
//             </Grid>
//           </Grid>
//         ))}

//         {/* TOTAL ROW */}
//         <Grid container sx={{ py: 1.5, mt: 2, borderTop: "2px solid #ddd" }}>
//           <Grid item xs={6}>
//             <Typography fontSize="15px" fontWeight={700}>Total</Typography>
//           </Grid>

//           <Grid item xs={6} textAlign="right">
//             <Typography
//               fontSize="15px"
//               fontWeight={800}
//               color="#4a3ef5"
//             >
//               {totalCredits.toLocaleString()}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Paper>

//     </Box>
//   );
// }


// BotEffectivenessTablePage.js
// import React from "react";
// import { Box, Paper, Typography, Grid } from "@mui/material";

// import BarChart from "./Charts/BarChart"; 
// import { analyticsData } from "../Analytics/Data/AnalyticsData";

// export default function BotEffectivenessTablePage() {
//   const labels = analyticsData.clients;

//   const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(
//     (i) => i.engagementRate
//   );

//   const tableData = analyticsData.botEffectiveness.engagementRatePerClient;

//   const totalCredits = tableData.reduce(
//     (sum, item) => sum + item.creditsSpent,
//     0
//   );

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* ---------------------- TOP GRAPH ---------------------- */}
//       <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
//           Engagement Rate per Client
//         </Typography>

//         <BarChart
//           labels={labels}
//           data={engagementRate}
//           title="Engagement Rate (%)"
//         />
//       </Paper>

//       {/* ---------------------- BOTTOM TABLE ---------------------- */}
//       <Paper sx={{ p: 3, borderRadius: 3 }}>
//         <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
//           Credits Spent Per Client
//         </Typography>

//         {/* Table Header */}
//         <Grid container sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
//           <Grid item xs={6}>Client</Grid>
//           <Grid item xs={6} textAlign="right">Credits</Grid>
//         </Grid>

//         {/* Table Rows */}
//         {tableData.map((item, index) => (
//           <Grid
//             container
//             key={index}
//             sx={{
//               py: 1.2,
//               borderBottom:
//                 index !== tableData.length - 1 ? "1px solid #eee" : "none",
//             }}
//           >
//             <Grid item xs={6}>
//               <Typography fontSize="15px" fontWeight={500}>
//                 {item.client}
//               </Typography>
//             </Grid>

//             <Grid item xs={6} textAlign="right">
//               <Typography fontSize="15px" fontWeight={600} color="#6559F5">
//                 {item.creditsSpent.toLocaleString()}
//               </Typography>
//             </Grid>
//           </Grid>
//         ))}

//         {/* TOTAL ROW */}
//         <Grid container sx={{ py: 1.5, mt: 2, borderTop: "2px solid #ddd" }}>
//           <Grid item xs={6}>
//             <Typography fontSize="15px" fontWeight={700}>
//               Total
//             </Typography>
//           </Grid>

//           <Grid item xs={6} textAlign="right">
//             <Typography fontSize="15px" fontWeight={800} color="#4a3ef5">
//               {totalCredits.toLocaleString()}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// }


import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  MenuItem,
  Button,
  TablePagination,
  IconButton,
  Grid
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

import BarChart from "../Analytics/Charts/BarChart";
import { analyticsData } from "../Analytics/Data/AnalyticsData";
import DateFilter from "./DateFilter";
export default function BotEffectivenessTablePage() {
  const navigate = useNavigate();

  const labels = analyticsData.clients;

  const engagementRate = analyticsData.botEffectiveness.engagementRatePerClient.map(
    (i) => i.engagementRate
  );

  const rawData = analyticsData.botEffectiveness.engagementRatePerClient;

  // ---------------- STATE ----------------
  const [filter, setFilter] = useState("month");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("creditsSpent");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // ---------------- FILTER + SEARCH + SORT ----------------
  const filteredRows = useMemo(() => {
    let result = [...rawData];

    if (search.trim()) {
      result = result.filter((row) =>
        row.client.toLowerCase().includes(search.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return order === "asc" ? valA - valB : valB - valA;
    });

    return result;
  }, [search, sortField, order, rawData]);

  // ---------------- PAGINATION ----------------
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalCredits = rawData.reduce((sum, item) => sum + item.creditsSpent, 0);

  // ---------------- EXPORT CSV ----------------
  const exportCSV = () => {
    const csv = Papa.unparse(filteredRows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "client-credits-data.csv";
    link.click();
  };

  return (
    <Box sx={{ maxWidth: "1100px", m: "0 auto", p: 3 }}>

      {/* BACK BUTTON */}
      <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
    }}
  >
    <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,
              px: 2.5,
              py: 1,
              fontWeight: 600,
              borderRadius: "8px",
              textTransform: "none",
              borderColor: "#6A5BFF",
              color: "#6A5BFF",
              "&:hover": { background: "#6A5BFF", color: "#fff" },
            }}
          >
             Back
          </Button>
    
    <DateFilter />
  </Box>
      {/* PAGE TITLE */}
      {/* <Typography fontWeight={700} fontSize="22px" sx={{ mb: 1 }}>
        Engagement Rate per Client
      </Typography>

      <Typography fontSize="14px" sx={{ mb: 3, color: "#696969" }}>
        Credits spent per client
      </Typography> */}

      {/* -------- TOP CHART -------- */}
      {/* <Paper sx={{ p: 3, mb: 4, borderRadius: "12px" }}>
        <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
          Client Engagement Chart
        </Typography>

        <BarChart labels={labels} data={engagementRate} title="Engagement Rate (%)" />
      </Paper> */}
     {/* -------- TOP CHART -------- */}
      <Box sx={{ mb: 1.5 }}>
        <Typography fontWeight={600} fontSize="18px" sx={{ color: "#000" }}>
          Engagement Rate per Client
        </Typography>

        <Typography fontSize="13px" sx={{ color: "#7A7A7A", mb: 2 }}>
          Credits spent per client
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        {/* Header Row inside Card */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            fontWeight={600}
            sx={{ fontSize: "15px", color: "#3B3B3B" }}
          >
            Client Credits Summary
          </Typography>

          {/* Purple View Details Button */}
          {/* <Button
            onClick={() => navigate("/analytics/bot-effectiveness/table")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "13px",
              color: "#6559F5",
              borderRadius: "50px",
              px: 2,
              py: "6px",
              border: "1px solid #CBC4FF",
              background: "#F7F6FF",
              "&:hover": {
                background: "#EDEBFF",
                borderColor: "#8B82FF",
              },
            }}
          >
            View Details →
          </Button> */}
        </Box>

        {/* Table Header */}
        <Grid
          container
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6}>
            Client
          </Grid>
          <Grid item xs={6} textAlign="right">
            Credits
          </Grid>
        </Grid>

        {/* Dynamic Data */}
        {analyticsData.botEffectiveness.engagementRatePerClient.map(
          (item, index) => (
            <Grid
              container
              key={index}
              sx={{
                py: 1.3,
                borderBottom:
                  index !==
                    analyticsData.botEffectiveness.engagementRatePerClient
                      .length -
                    1
                    ? "1px solid #EEE"
                    : "none",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs={6}>
                <Typography fontSize="15px" fontWeight={500}>
                  {item.client}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  fontSize="15px"
                  fontWeight={600}
                  color="grey"
                  textAlign="right"
                >
                  {item.creditsSpent.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          )
        )}

        {/* Total */}
        <Grid container sx={{ py: 1.5, mt: 1.5, borderTop: "2px solid #ddd", display: "flex", justifyContent: "space-between" }}>
          <Grid item xs={6}>
            <Typography fontSize="15px" fontWeight={700}>
              Total
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              fontSize="15px"
              fontWeight={800}
              color="grey"
              textAlign="right"
            >
              {totalCredits.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* -------- TABLE SECTION -------- */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>

        {/* TABLE ACTIONS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          {/* search */}
          <TextField
            placeholder="Search client..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, maxWidth: 300 }}
          />
          
          {/* FILTER DROPDOWN */}
          <TextField
            select
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ width: 160 }}
            label="Filter by Client"
          >
            <MenuItem value="Gamma Styles">Gamma Styles</MenuItem>
            <MenuItem value="Alpha Retail">Alpha Retail</MenuItem>
            <MenuItem value="Epsilon Tech">Epsilon Tech</MenuItem>
          </TextField>

          

          {/* EXPORT CSV BUTTON */}
        <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
    }}
  >
    {/* <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,
              px: 2.5,
              py: 1,
              fontWeight: 600,
              borderRadius: "8px",
              textTransform: "none",
              borderColor: "#6A5BFF",
              color: "#6A5BFF",
              "&:hover": { background: "#6A5BFF", color: "#fff" },
            }}
          >
             Back
          </Button> */}
    
   
  </Box>

        </Box>


        {/* SEARCH */}


        {/* TABLE */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#F8FAFC" }}>
                <TableCell
                  sx={{ fontWeight: 700, cursor: "pointer" }}
                  onClick={() => setSortField("client")}
                >
                  CLIENT NAME
                </TableCell>

                <TableCell
                  sx={{ fontWeight: 700, textAlign: "right", cursor: "pointer" }}
                  onClick={() => {
                    setSortField("creditsSpent");
                    setOrder(order === "asc" ? "desc" : "asc");
                  }}
                >
                  CREDITS {order === "asc" ? "↑" : "↓"}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.client}</TableCell>
                  <TableCell
                    sx={{
                      textAlign: "right",
                      fontWeight: 600,
                      color: "#000",
                    }}
                  >
                    {row.creditsSpent.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
        />
      </Paper>
    </Box>
  );
}
