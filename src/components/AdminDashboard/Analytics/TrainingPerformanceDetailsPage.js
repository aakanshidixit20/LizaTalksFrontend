// import React from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   Chip,
// } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

// import BarChart from "./Charts/BarChart";
// import { analyticsData } from "./Data/AnalyticsData";

// const classifyStatus = (latency) => {
//   if (latency == null) return { label: "Unknown", color: "default" };
//   if (latency < 250) return { label: "Good", color: "success" };
//   if (latency < 400) return { label: "Warning", color: "warning" };
//   return { label: "Critical", color: "error" };
// };

// const TrainingPerformanceDetailsPage = () => {
//   const labels = analyticsData.clients;
//   const latencyArray =
//     analyticsData.trainingPerformanceInsights.apiResponseLatency || [];

//   // Build table rows, pairing client names with latency entries
//   const rows = labels.map((clientName, index) => {
//     const entry = latencyArray[index] || {};
//     const avgLatencyMs = entry.avgLatencyMs ?? null;

//     // If your data actually have storeName, use it; otherwise fallback
//     const storeName = entry.storeName || "N/A";

//     const status = classifyStatus(avgLatencyMs);

//     return {
//       clientName,
//       storeName,
//       avgLatencyMs,
//       status,
//     };
//   });

//   const handleExportCsv = () => {
//     const header = ["Client Name", "Store Name", "Avg Latency (ms)", "Status"];
//     const lines = [
//       header.join(","),
//       ...rows.map((r) =>
//         [
//           `"${r.clientName}"`,
//           `"${r.storeName}"`,
//           r.avgLatencyMs != null ? r.avgLatencyMs : "",
//           `"${r.status.label}"`,
//         ].join(",")
//       ),
//     ];

//     const blob = new Blob([lines.join("\n")], {
//       type: "text/csv;charset=utf-8;",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "latency-data.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const chartData = latencyArray.map((e) => e.avgLatencyMs);

//   return (
//     <Box>
//       {/* Back link */}
//       <Button
//         component={RouterLink}
//         to="/analytics/training-performance"
//         startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 16 }} />}
//         sx={{
//           mb: 2,
//           textTransform: "none",
//           fontSize: "0.85rem",
//           color: "#4F46E5",
//         }}
//         variant="text"
//       >
//         Back to Overview
//       </Button>

//       {/* Page title + subtitle */}
//       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//         API Response Latency Details
//       </Typography>
//       <Typography
//         variant="body2"
//         sx={{ mb: 3, color: "text.secondary", maxWidth: 480 }}
//       >
//         Detailed breakdown of endpoint performance metrics across clients.
//       </Typography>

//       {/* Top card: chart */}
//       <Box
//         sx={{
//           p: 3,
//           mb: 3,
//           border: "1px solid #E5E7EB",
//           borderRadius: "10px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <Typography sx={{ fontWeight: 500, mb: 2 }}>
//           Latency Visualization
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ mb: 2, color: "text.secondary" }}
//         >
//           Average latency per endpoint (client).
//         </Typography>

//         <BarChart
//           labels={labels}
//           data={chartData}
//           title="Avg Latency (ms)"
//         />
//       </Box>

//       {/* Table card */}
//       <Box
//         sx={{
//           p: 3,
//           border: "1px solid #E5E7EB",
//           borderRadius: "10px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <Box
//           sx={{
//             mb: 2,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography sx={{ fontWeight: 500 }}>Latency Data Logs</Typography>

//           <Button
//             variant="outlined"
//             size="small"
//             onClick={handleExportCsv}
//             sx={{
//               textTransform: "none",
//               fontSize: "0.8rem",
//               borderRadius: "8px",
//             }}
//             startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />}
//           >
//             Export CSV
//           </Button>
//         </Box>

//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 600 }}>CLIENT NAME</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>STORE NAME</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>AVG LATENCY (MS)</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow key={row.clientName}>
//                 <TableCell>{row.clientName}</TableCell>
//                 <TableCell>{row.storeName}</TableCell>
//                 <TableCell>
//                   {row.avgLatencyMs != null ? `${row.avgLatencyMs} ms` : "—"}
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={row.status.label}
//                     color={row.status.color}
//                     size="small"
//                     variant={row.status.color === "default" ? "outlined" : "filled"}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
//     </Box>
//   );
// };

// export default TrainingPerformanceDetailsPage;
// import React, { useMemo, useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   Chip,
//   Autocomplete,
//   TextField,
//   TablePagination,
// } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import SwapVertIcon from "@mui/icons-material/SwapVert";

// import BarChart from "./Charts/BarChart";
// import { analyticsData } from "./Data/AnalyticsData";

// const classifyStatus = (latency) => {
//   if (latency == null) return { label: "Unknown", color: "default" };
//   if (latency < 250) return { label: "Good", color: "success" };
//   if (latency < 400) return { label: "Warning", color: "warning" };
//   return { label: "Critical", color: "error" };
// };

// const TrainingPerformanceDetailsPage = () => {
//   const baseRows = useMemo(() => {
//     const latencyArray =
//       analyticsData.trainingPerformanceInsights?.apiResponseLatency || [];
//     const clients = analyticsData.clients || [];

//     return latencyArray.map((entry, index) => {
//       const clientName =
//         entry.clientName || entry.client || clients[index] || "Unknown Client";

//       const storeName =
//         entry.storeName || entry.channelName || entry.store || "N/A";

//       const avgLatencyMs =
//         typeof entry.avgLatencyMs === "number" ? entry.avgLatencyMs : null;

//       const status = classifyStatus(avgLatencyMs);

//       return {
//         clientName,
//         storeName,
//         avgLatencyMs,
//         status,
//       };
//     });
//   }, []);

//   const [clientFilter, setClientFilter] = useState(null);
//   const [storeFilter, setStoreFilter] = useState(null);
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     setPage(0);
//   }, [clientFilter, storeFilter, sortDirection]);

//   const clientOptions = useMemo(
//     () => Array.from(new Set(baseRows.map((r) => r.clientName))).sort(),
//     [baseRows]
//   );

//   const storeOptions = useMemo(
//     () => Array.from(new Set(baseRows.map((r) => r.storeName))).sort(),
//     [baseRows]
//   );

//   const filteredAndSortedRows = useMemo(() => {
//     let rows = [...baseRows];

//     if (clientFilter) rows = rows.filter((r) => r.clientName === clientFilter);
//     if (storeFilter) rows = rows.filter((r) => r.storeName === storeFilter);

//     rows.sort((a, b) => {
//       const aVal = a.avgLatencyMs ?? 0;
//       const bVal = b.avgLatencyMs ?? 0;
//       return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
//     });

//     return rows;
//   }, [baseRows, clientFilter, storeFilter, sortDirection]);

//   const totalRows = filteredAndSortedRows.length;

//   const pagedRows = useMemo(() => {
//     const start = page * rowsPerPage;
//     const end = start + rowsPerPage;
//     return filteredAndSortedRows.slice(start, end);
//   }, [filteredAndSortedRows, page, rowsPerPage]);

//   const chartLabels = filteredAndSortedRows.map((r) => r.clientName);
//   const chartData = filteredAndSortedRows.map((r) => r.avgLatencyMs ?? 0);

//   const handleExportCsv = () => {
//     const header = ["Client Name", "Store Name", "Avg Latency (ms)", "Status"];
//     const lines = [
//       header.join(","),
//       ...filteredAndSortedRows.map((r) =>
//         [
//           `"${r.clientName}"`,
//           `"${r.storeName}"`,
//           r.avgLatencyMs != null ? r.avgLatencyMs : "",
//           `"${r.status.label}"`,
//         ].join(",")
//       ),
//     ];

//     const blob = new Blob([lines.join("\n")], {
//       type: "text/csv;charset=utf-8;",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "latency-data.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const clearFilters = () => {
//     setClientFilter(null);
//     setStoreFilter(null);
//   };

//   const handleChangePage = (_event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const value = parseInt(event.target.value, 10);
//     setRowsPerPage(value);
//     setPage(0);
//   };

//   return (
//     <Box>
//       {/* Back link — UPDATED HOVER BEHAVIOR */}
//       <Button
//         component={RouterLink}
//         to="/analytics/training-performance"
//         startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 16 }} />}
//         variant="outlined"
//         sx={{
//           mb: 2,
//           px: 2.5,
//           py: 0.75,
//           textTransform: "none",
//           fontSize: "0.85rem",
//           color: "#6A5BFF",
//           borderRadius: "8px",
//           borderColor: "#6A5BFF",
//           "&:hover": {
//             backgroundColor: "#6A5BFF",
//             color: "#fff",
//             borderColor: "#6A5BFF",
//           },
//         }}
//       >
//         Back
//       </Button>

//       {/* Page title */}
//       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//         API Response Latency Details
//       </Typography>
//       <Typography
//         variant="body2"
//         sx={{ mb: 3, color: "text.secondary", maxWidth: 480 }}
//       >
//         Detailed breakdown of endpoint performance metrics across clients and
//         stores.
//       </Typography>

//       {/* Chart card */}
//       <Box
//         sx={{
//           p: 3,
//           mb: 3,
//           border: "1px solid #E5E7EB",
//           borderRadius: "10px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <Typography sx={{ fontWeight: 500, mb: 2 }}>
//           Latency Visualization
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{ mb: 2, color: "text.secondary" }}
//         >
//           Average latency per client. Filters below will update this chart.
//         </Typography>

//         <BarChart labels={chartLabels} data={chartData} title="Avg Latency (ms)" />
//       </Box>

//       {/* Table card */}
//       <Box
//         sx={{
//           p: 3,
//           border: "1px solid #E5E7EB",
//           borderRadius: "10px",
//           backgroundColor: "#fff",
//         }}
//       >
//         {/* Header row with filters + export */}
//         <Box
//           sx={{
//             mb: 2,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 2,
//           }}
//         >
//           <Typography sx={{ fontWeight: 500 }}>Latency Data Logs</Typography>

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               flexWrap: "wrap",
//               justifyContent: "flex-end",
//             }}
//           >
//             <Autocomplete
//               size="small"
//               sx={{ minWidth: 160 }}
//               options={clientOptions}
//               value={clientFilter}
//               onChange={(_e, newValue) => setClientFilter(newValue)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Client" placeholder="All" />
//               )}
//               clearOnEscape
//               disableClearable={false}
//               isOptionEqualToValue={(option, value) => option === value}
//             />

//             <Autocomplete
//               size="small"
//               sx={{ minWidth: 160 }}
//               options={storeOptions}
//               value={storeFilter}
//               onChange={(_e, newValue) => setStoreFilter(newValue)}
//               renderInput={(params) => (
//                 <TextField {...params} label="Store" placeholder="All" />
//               )}
//               clearOnEscape
//               disableClearable={false}
//               isOptionEqualToValue={(option, value) => option === value}
//             />

//             {(clientFilter || storeFilter) && (
//               <Button
//                 size="small"
//                 variant="text"
//                 onClick={clearFilters}
//                 sx={{
//                   textTransform: "none",
//                   fontSize: "0.8rem",
//                   color: "#6B7280",
//                 }}
//               >
//                 Clear
//               </Button>
//             )}

//             <Button
//               variant="outlined"
//               size="small"
//               onClick={handleExportCsv}
//               sx={{
//                 textTransform: "none",
//                 fontSize: "0.8rem",
//                 borderRadius: "8px",
//               }}
//               startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />}
//             >
//               Export CSV
//             </Button>
//           </Box>
//         </Box>

//         {/* Table */}
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 600 }}>CLIENT NAME</TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>STORE NAME</TableCell>
//               <TableCell
//                 sx={{
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   userSelect: "none",
//                   whiteSpace: "nowrap",
//                 }}
//                 onClick={() =>
//                   setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
//                 }
//               >
//                 AVG LATENCY (MS)&nbsp;
//                 <SwapVertIcon
//                   sx={{
//                     fontSize: 18,
//                     verticalAlign: "middle",
//                     color: "#6B7280",
//                   }}
//                 />
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {pagedRows.map((row) => (
//               <TableRow key={`${row.clientName}-${row.storeName}`}>
//                 <TableCell>{row.clientName}</TableCell>
//                 <TableCell>{row.storeName}</TableCell>
//                 <TableCell
//                   sx={{
//                     color:
//                       row.avgLatencyMs == null
//                         ? "inherit"
//                         : row.avgLatencyMs < 250
//                         ? "text.primary"
//                         : row.avgLatencyMs < 400
//                         ? "#d97706"
//                         : "#dc2626",
//                     fontWeight:
//                       row.avgLatencyMs != null && row.avgLatencyMs >= 400
//                         ? 600
//                         : 400,
//                   }}
//                 >
//                   {row.avgLatencyMs != null ? `${row.avgLatencyMs} ms` : "—"}
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={row.status.label}
//                     color={row.status.color}
//                     size="small"
//                     variant={
//                       row.status.color === "default" ? "outlined" : "filled"
//                     }
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {totalRows === 0 && (
//           <Typography
//             variant="body2"
//             sx={{ mt: 2, color: "text.secondary" }}
//           >
//             No records match the current filters.
//           </Typography>
//         )}

//         {/* Pagination with custom label: "Page X of Y" */}
//         <TablePagination
//           component="div"
//           count={totalRows}
//           page={page}
//           onPageChange={handleChangePage}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           rowsPerPageOptions={[5, 10, 25]}
//           labelDisplayedRows={({ page: p }) => {
//             const totalPages =
//               rowsPerPage === 0
//                 ? 1
//                 : Math.max(1, Math.ceil(totalRows / rowsPerPage));
//             return `Page ${p + 1} of ${totalPages}`;
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default TrainingPerformanceDetailsPage;


import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
  TextField
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BarChart from "./Charts/BarChart";
import { analyticsData } from "./Data/AnalyticsData";
 
const classifyStatus = (latency) => {
  if (latency == null) return { label: "Unknown", style: { bg: "#E5E7EB", border: "#9CA3AF", text: "#374151" } };
  if (latency > 3000) return { label: "Critical", style: { bg: "#FFE6E6", border: "#EF4444", text: "#B91C1C" } };
  if (latency > 2000) return { label: "Slow", style: { bg: "#FFF4CC", border: "#F59E0B", text: "#B45309" } };
  return { label: "Healthy", style: { bg: "#E8F9F0", border: "#10B981", text: "#065F46" } };
};
 
const TrainingPerformanceDetailsPage = () => {
  const baseRows = useMemo(() => {
    const latencyArray = analyticsData.trainingPerformanceInsights?.apiResponseLatency || [];
    const clients = analyticsData.clients || [];
    return latencyArray.map((entry, index) => {
      const clientName = entry.clientName || entry.client || clients[index] || "Unknown Client";
      const storeName = entry.storeName || entry.channelName || entry.store || "N/A";
      const avgLatencyMs = typeof entry.avgLatencyMs === "number" ? entry.avgLatencyMs : null;
      const status = classifyStatus(avgLatencyMs);
      return { clientName, storeName, avgLatencyMs, status };
    });
  }, []);
 
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
 
  const filteredRows = baseRows.filter(
    (r) =>
      r.clientName.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All" || r.status.label === statusFilter)
  );
 
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);
 
  const chartLabels = filteredRows.map((r) => r.clientName);
  const chartData = filteredRows.map((r) => r.avgLatencyMs ?? 0);
 
  const exportCSV = () => {
    const header = ["Client Name", "Store Name", "Avg Latency (ms)", "Status"];
    const lines = [
      header.join(","),
      ...filteredRows.map((r) =>
        [r.clientName, r.storeName, r.avgLatencyMs != null ? r.avgLatencyMs : "", r.status.label].join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "latency-data.csv";
    a.click();
  };
 
  return (
    <Box>
      {/* Back button */}
      <Button
        component={RouterLink}
        to="/analytics/training-performance"
        startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 16 }} />}
        variant="outlined"
        sx={{
          mb: 2,
          px: 2.5,
          py: 0.75,
          textTransform: "none",
          fontSize: "0.85rem",
          color: "#6A5BFF",
          borderRadius: "8px",
          borderColor: "#6A5BFF",
          "&:hover": {
            backgroundColor: "#6A5BFF",
            color: "#fff",
            borderColor: "#6A5BFF",
          },
        }}
      >
        Back
      </Button>
 
      {/* Page title */}
      <Typography variant="h6" sx={{ fontWeight: 600 }}>API Response Latency Details</Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "text.secondary", maxWidth: 480 }}>
        Detailed breakdown of endpoint performance metrics across clients and stores.
      </Typography>
 
      {/* Chart card */}
      <Box sx={{ p: 3, mb: 3, border: "1px solid #E5E7EB", borderRadius: "10px", backgroundColor: "#fff" }}>
        <Typography sx={{ fontWeight: 500, mb: 2 }}>Latency Visualization</Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Average latency per client. Filters below will update this chart.
        </Typography>
        <BarChart labels={chartLabels} data={chartData} title="Avg Latency (ms)" />
      </Box>
 
      {/* Table card */}
      <Box sx={{ p: 3, borderRadius: "10px", border: "1px solid #E5E7EB", background: "#fff" }}>
        {/* Filters + Export */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              label="Search by client..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              sx={{ width: 140 }}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Healthy">Healthy</MenuItem>
              <MenuItem value="Slow">Slow</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={exportCSV}
            sx={{ textTransform: "none", fontSize: "0.8rem" }}
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />}
          >
            Export CSV
          </Button>
        </Box>
 
        {/* Table */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>CLIENT NAME</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>STORE NAME</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>AVG LATENCY (MS)</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={`${row.clientName}-${row.storeName}`}>
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.storeName}</TableCell>
                <TableCell
                  sx={{
                    color:
                      row.avgLatencyMs > 3000 ? "#B91C1C" :
                      row.avgLatencyMs > 2000 ? "#B45309" :
                      "#065F46",
                    fontWeight: row.avgLatencyMs > 3000 ? 600 : 400,
                  }}
                >
                  {row.avgLatencyMs != null ? `${row.avgLatencyMs} ms` : "—"}
                </TableCell>
                <TableCell>
                  <Box sx={{
                    display: "inline-block",
                    backgroundColor: row.status.style.bg,
                    color: row.status.style.text,
                    border: `1.5px solid ${row.status.style.border}`,
                    borderRadius: "18px",
                    px: 2,
                    py: 0.5,
                    fontWeight: 600,
                    fontSize: "13px"
                  }}>
                    {row.status.label}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
 
        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>⬅ Prev</Button>
          <Typography>Page {page} / {totalPages}</Typography>
          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ➡</Button>
        </Box>
      </Box>
    </Box>
  );
};
 
export default TrainingPerformanceDetailsPage;