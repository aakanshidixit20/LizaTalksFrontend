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
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

import BarChart from "../Analytics/Charts/BarChart";
import { analyticsData } from "../Analytics/Data/AnalyticsData";

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
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIosNewIcon />}
        sx={{
          mb: 2,
          textTransform: "none",
          borderRadius: "8px",
          background: "#F0E9FF",
          color: "#5C45FF",
          fontWeight: 600,
          "&:hover": { background: "#E4DDFF" },
        }}
      >
        Back
      </Button>

      {/* PAGE TITLE */}
      <Typography fontWeight={700} fontSize="22px" sx={{ mb: 1 }}>
        Engagement Rate per Client
      </Typography>

      <Typography fontSize="14px" sx={{ mb: 3, color: "#696969" }}>
        Credits spent per client
      </Typography>

      {/* -------- TOP CHART -------- */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: "12px" }}>
        <Typography fontWeight={600} fontSize="18px" sx={{ mb: 2 }}>
          Client Engagement Chart
        </Typography>

        <BarChart labels={labels} data={engagementRate} title="Engagement Rate (%)" />
      </Paper>

      {/* -------- TABLE SECTION -------- */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>
        
        {/* TABLE HEADER + ACTIONS */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography fontWeight={600} fontSize="18px">
            Client Credits Details
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>

            {/* FILTER DROPDOWN */}
            <TextField
              select
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ width: 140 }}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="3months">Last 3 Months</MenuItem>
            </TextField>

            {/* EXPORT BUTTON */}
            <Button
              onClick={exportCSV}
              sx={{
                textTransform: "none",
                border: "1px solid #C9C1FF",
                borderRadius: "8px",
                px: 2,
                color: "#5C45FF",
                background: "#F4F1FF",
                "&:hover": { background: "#E6E2FF" },
              }}
            >
              Export CSV
            </Button>
          </Box>
        </Box>

        {/* SEARCH BAR */}
        <TextField
          fullWidth
          placeholder="Search client..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* TABLE */}
        <TableContainer>
          <Table>

            <TableHead>
              <TableRow sx={{ background: "#F6F6FB" }}>
                <TableCell
                  sx={{ fontWeight: 700 }}
                  onClick={() => setSortField("client")}
                >
                  Client
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 700, textAlign: "right", cursor: "pointer" }}
                  onClick={() => {
                    setSortField("creditsSpent");
                    setOrder(order === "asc" ? "desc" : "asc");
                  }}
                >
                  Credits {order === "asc" ? "▲" : "▼"}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.client}</TableCell>
                  <TableCell sx={{ textAlign: "right", fontWeight: 600, color: "#6559F5" }}>
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

        {/* TOTAL */}
        <Typography fontWeight={700} sx={{ mt: 2, textAlign: "right" }}>
          Total: <span style={{ color: "#4A3EF5" }}>{totalCredits.toLocaleString()}</span>
        </Typography>
      </Paper>
    </Box>
  );
}
