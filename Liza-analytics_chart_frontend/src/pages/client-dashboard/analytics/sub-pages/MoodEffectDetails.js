// import React from "react";
// import { Box, Typography, Card, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
// import MoodAndEffectTrends from "../../../../components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrends";

// const MoodEffectDetails = () => {
//   const moodData = [
//     { mood: "Happy", percent: "32%" },
//     { mood: "Neutral", percent: "25.6%" },
//     { mood: "Calm", percent: "23.8%" },
//     { mood: "Sad", percent: "9.9%" },
//     { mood: "Stressed", percent: "8.7%" },
//   ];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography sx={{ mb: 2, fontSize: 24, fontWeight: 600 }}>
//         Mood Insights Overview
//       </Typography>

//       {/* Chart */}
//       <Card sx={{ p: 3, mb: 3 }}>
//         <MoodAndEffectTrends hideButton />
//       </Card>

//       {/* Table */}
//       <Card sx={{ p: 3 }}>
//         <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
//           Mood Breakdown Summary
//         </Typography>

//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><b>Mood</b></TableCell>
//               <TableCell><b>Percentage</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {moodData.map((row, i) => (
//               <TableRow key={i}>
//                 <TableCell>{row.mood}</TableCell>
//                 <TableCell>{row.percent}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>
//     </Box>
//   );
// };

// export default MoodEffectDetails;


// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Card,
//   TextField,
//   MenuItem,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import { useNavigate } from "react-router-dom";
// import MoodAndEffectTrends from "../../../../components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrends";

// const MoodEffectDetails = () => {
//   const navigate = useNavigate();

//   // Dummy table data
//   const initialData = [
//     { mood: "Happy", count: 1208, percentage: "32%" },
//     { mood: "Neutral", count: 976, percentage: "25.6%" },
//     { mood: "Calm", count: 890, percentage: "23.8%" },
//     { mood: "Sad", count: 310, percentage: "9.9%" },
//     { mood: "Stressed", count: 268, percentage: "8.7%" },
//   ];

//   const [tableData, setTableData] = useState(initialData);
//   const [filterValue, setFilterValue] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Table Filters
//   const handleFilter = (value) => {
//     setFilterValue(value);

//     if (value === "High to Low") {
//       setTableData([...initialData].sort((a, b) => b.count - a.count));
//     } else if (value === "Low to High") {
//       setTableData([...initialData].sort((a, b) => a.count - b.count));
//     } else {
//       setTableData(initialData);
//     }
//   };

//   // Search
//   const filteredTable = tableData.filter((row) =>
//     row.mood.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Export CSV
//   const exportCSV = () => {
//     const csvContent = [
//       ["Mood", "Count", "Percentage"],
//       ...filteredTable.map((row) => [row.mood, row.count, row.percentage]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "Mood_Report.csv";
//     link.click();
//   };

//   return (
//     <Box sx={{ px: 3, py: 2 }}>
//       {/* Back Button */}
//       <Button
//         onClick={() => navigate("/analytics/mood-trend")}
//         startIcon={<ArrowBackIcon />}
//         sx={{
//           textTransform: "none",
//           fontWeight: 500,
//           borderRadius: "10px",
//           mb: 2,
//           px: 2.5,
//           py: 1,
//           backgroundColor: "#EEF2FF",
//           color: "#4F46E5",
//           "&:hover": { backgroundColor: "#E0E7FF" },
//         }}
//       >
//         Back
//       </Button>

//       {/* Main Card */}
//       <Card sx={{ borderRadius: "14px", border: "1px solid #E5E7EB", p: 3 }}>
//         <Typography sx={{ fontSize: "22px", fontWeight: 600, mb: 3 }}>
//           Mood Request Insights
//         </Typography>

//         {/* Chart */}
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <MoodAndEffectTrends hideButton />
//         </Box>

//         {/* --- Table Area --- */}
//         <Box mt={5}>
//           <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 2 }}>
//             Mood Breakdown Table
//           </Typography>

//           {/* Filters */}
//           <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
//             <TextField
//               label="Search Mood"
//               size="small"
//               sx={{ width: "200px" }}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             <TextField
//               select
//               label="Sort"
//               size="small"
//               sx={{ width: "200px" }}
//               value={filterValue}
//               onChange={(e) => handleFilter(e.target.value)}
//             >
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="High to Low">High → Low</MenuItem>
//               <MenuItem value="Low to High">Low → High</MenuItem>
//             </TextField>

//             {/* Export CSV */}
//             <Button
//               startIcon={<FileDownloadIcon />}
//               sx={{
//                 background: "#6366F1",
//                 color: "#fff",
//                 px: 2,
//                 borderRadius: "8px",
//                 "&:hover": { background: "#4F46E5" },
//               }}
//               onClick={exportCSV}
//             >
//               Export CSV
//             </Button>
//           </Box>

//           {/* Table */}
//           <Table sx={{ border: "1px solid #E5E7EB", borderRadius: "10px" }}>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#F3F4F6" }}>
//                 <TableCell sx={{ fontWeight: 600 }}>Mood</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Count</TableCell>
//                 <TableCell sx={{ fontWeight: 600 }}>Percentage</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredTable.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.mood}</TableCell>
//                   <TableCell>{row.count}</TableCell>
//                   <TableCell>{row.percentage}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default MoodEffectDetails;


// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   MenuItem,
//   Select,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";

// export default function MoodEffectDetails() {
//   const navigate = useNavigate();

//   // Chart data
//   const chartData = {
//     series: [32, 26, 24, 10, 8],
//     labels: ["Happy", "Neutral", "Calm", "Sad", "Stressed"],
//     colors: ["#6366F1", "#22C55E", "#A78BFA", "#FACC15", "#EF4444"],
//   };

//   // Table data
//   const initialRows = [
//     { mood: "Happy", requests: 320, percentage: "32%", severity: "Low" },
//     { mood: "Neutral", requests: 260, percentage: "26%", severity: "Low" },
//     { mood: "Calm", requests: 240, percentage: "24%", severity: "Moderate" },
//     { mood: "Sad", requests: 100, percentage: "10%", severity: "High" },
//     { mood: "Stressed", requests: 80, percentage: "8%", severity: "Critical" },
//   ];

//   const [rows, setRows] = useState(initialRows);
//   const [filter, setFilter] = useState("");

//   // CSV export
//   const exportCSV = () => {
//     const header = "Mood,Requests,Percentage,Severity\n";
//     const csvRows = rows.map((r) => `${r.mood},${r.requests},${r.percentage},${r.severity}`).join("\n");
//     const blob = new Blob([header + csvRows], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "Mood_Insights.csv";
//     a.click();
//   };

//   // Search filter
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setRows(initialRows.filter((row) => row.mood.toLowerCase().includes(value)));
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Back Button */}
//       <Button
//         onClick={() => navigate("/analytics/mood-trend")}
//         sx={{
//           mb: 2,
//           background: "#EEF2FF",
//           textTransform: "none",
//           borderRadius: "8px",
//         }}
//       >
//         ← Back
//       </Button>

//       {/* Page Title */}
//       <Typography sx={{ fontSize: "24px", fontWeight: 600, mb: 3 }}>
//         Mood Interaction Insights
//       </Typography>

//       {/* Chart Section */}
//       <Box
//         sx={{
//           background: "#fff",
//           p: 3,
//           borderRadius: "12px",
//           mb: 4,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
//         }}
//       >
//         <Typography sx={{ fontWeight: 550, mb: 2, fontSize: "18px" }}>
//           Mood Distribution
//         </Typography>

//         <ReactApexChart
//           options={{
//             labels: chartData.labels,
//             colors: chartData.colors,
//             legend: { position: "bottom" },
//           }}
//           series={chartData.series}
//           type="donut"
//           height={350}
//         />
//       </Box>

//       {/* Table + Filters */}
//       <Box
//         sx={{
//           background: "#fff",
//           p: 3,
//           borderRadius: "12px",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          
//           <TextField
//             placeholder="Search Mood..."
//             size="small"
//             onChange={handleSearch}
//             sx={{ width: "200px" }}
//           />

//           <Button
//             variant="contained"
//             sx={{ background: "#6366F1", textTransform: "none" }}
//             onClick={exportCSV}
//           >
//             Export CSV
//           </Button>
//         </Box>

//         {/* Table */}
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: "#F3F4F6" }}>
//                 <TableCell><strong>Mood</strong></TableCell>
//                 <TableCell><strong>Requests</strong></TableCell>
//                 <TableCell><strong>Percentage</strong></TableCell>
//                 <TableCell><strong>Severity</strong></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {rows.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{row.mood}</TableCell>
//                   <TableCell>{row.requests}</TableCell>
//                   <TableCell>{row.percentage}</TableCell>
//                   <TableCell>{row.severity}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }


// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";

// export default function MoodEffectDetails() {
//   const navigate = useNavigate();

//   const chartData = {
//     series: [32, 26, 24, 10, 8],
//     labels: ["Happy", "Neutral", "Calm", "Sad", "Stressed"],
//     colors: ["#6366F1", "#22C55E", "#A78BFA", "#FACC15", "#EF4444"],
//   };

//   const initialRows = [
//     { mood: "Happy", requests: 320, percentage: "32%", severity: "Low" },
//     { mood: "Neutral", requests: 260, percentage: "26%", severity: "Low" },
//     { mood: "Calm", requests: 240, percentage: "24%", severity: "Moderate" },
//     { mood: "Sad", requests: 100, percentage: "10%", severity: "High" },
//     { mood: "Stressed", requests: 80, percentage: "8%", severity: "Critical" },
//   ];

//   const [rows, setRows] = useState(initialRows);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setRows(initialRows.filter(row => row.mood.toLowerCase().includes(value)));
//   };

//   const exportCSV = () => {
//     const header = "Mood,Requests,Percentage,Severity\n";
//     const csvRows = rows
//       .map(r => `${r.mood},${r.requests},${r.percentage},${r.severity}`)
//       .join("\n");

//     const blob = new Blob([header + csvRows], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "Mood_Insights.csv";
//     a.click();
//   };

//   return (
//     <Box>

//       {/* Back Button (Matches Screenshot Style) */}
//       <Button
//         onClick={() => navigate("/analytics/mood-trend")}
//         sx={{
//           mb: 2,
//           border: "1px solid #D4D7E2",
//           textTransform: "uppercase",
//           fontSize: "12px",
//           borderRadius: "6px",
//           background: "#F8F9FF",
//           color: "#4F46E5",
//           "&:hover": { background: "#EEF2FF" },
//         }}
//       >
//         ← BACK
//       </Button>

//       <Typography sx={{ fontSize: "24px", fontWeight: 600, mb: 3 }}>
//         Mood Interaction Insights
//       </Typography>

//       {/* Chart */}
//       <Box
//         sx={{
//           background: "#fff",
//           p: 3,
//           borderRadius: "12px",
//           mb: 4,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
//         }}
//       >
//         <Typography sx={{ fontWeight: 550, mb: 2, fontSize: "18px" }}>
//           Mood Distribution
//         </Typography>

//         <ReactApexChart
//           options={{
//             labels: chartData.labels,
//             colors: chartData.colors,
//             legend: { position: "bottom" },
//           }}
//           series={chartData.series}
//           type="donut"
//           height={350}
//         />
//       </Box>

//       {/* Data Table */}
//       <Box
//         sx={{
//           background: "#fff",
//           p: 3,
//           borderRadius: "12px",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
//           <TextField
//             placeholder="Search Mood..."
//             size="small"
//             onChange={handleSearch}
//             sx={{ width: "200px" }}
//           />

//           <Button
//             variant="contained"
//             sx={{ background: "#6366F1", textTransform: "none" }}
//             onClick={exportCSV}
//           >
//             Export CSV
//           </Button>
//         </Box>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: "#F3F4F6" }}>
//                 <TableCell><strong>Mood</strong></TableCell>
//                 <TableCell><strong>Requests</strong></TableCell>
//                 <TableCell><strong>Percentage</strong></TableCell>
//                 <TableCell><strong>Severity</strong></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {rows.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{row.mood}</TableCell>
//                   <TableCell>{row.requests}</TableCell>
//                   <TableCell>{row.percentage}</TableCell>
//                   <TableCell>{row.severity}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }



import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

export default function MoodEffectDetails() {
  const navigate = useNavigate();

  const chartData = {
    series: [32, 26, 24, 10, 8],
    labels: ["Happy", "Neutral", "Calm", "Sad", "Stressed"],
    colors: ["#6366F1", "#22C55E", "#A78BFA", "#FACC15", "#EF4444"],
  };

  const initialRows = [
    { mood: "Happy", requests: 320, percentage: "32%", severity: "Low" },
    { mood: "Neutral", requests: 260, percentage: "26%", severity: "Low" },
    { mood: "Calm", requests: 240, percentage: "24%", severity: "Moderate" },
    { mood: "Sad", requests: 100, percentage: "10%", severity: "High" },
    { mood: "Stressed", requests: 80, percentage: "8%", severity: "Critical" },
  ];

  const [rows, setRows] = useState(initialRows);
  const [filterSeverity, setFilterSeverity] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Search Filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    applyFilters(value, filterSeverity, sortOption);
  };

  // Severity Filter
  const handleSeverityFilter = (value) => {
    setFilterSeverity(value);
    applyFilters("", value, sortOption);
  };

  // Sorting Filter
  const handleSort = (value) => {
    setSortOption(value);
    applyFilters("", filterSeverity, value);
  };

  // Central function to apply all filters
  const applyFilters = (search = "", severity = "", sort = "") => {
    let filtered = [...initialRows];

    if (search) {
      filtered = filtered.filter((item) =>
        item.mood.toLowerCase().includes(search)
      );
    }

    if (severity) {
      filtered = filtered.filter((item) => item.severity === severity);
    }

    if (sort === "asc") {
      filtered.sort((a, b) => a.requests - b.requests);
    } else if (sort === "desc") {
      filtered.sort((a, b) => b.requests - a.requests);
    }

    setRows(filtered);
  };

  // CSV Export
  const exportCSV = () => {
    const header = "Mood,Requests,Percentage,Severity\n";
    const csvRows = rows
      .map(r => `${r.mood},${r.requests},${r.percentage},${r.severity}`)
      .join("\n");

    const blob = new Blob([header + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Mood_Insights.csv";
    a.click();
  };

  return (
    <Box>

      {/* Breadcrumb */}
      {/* <Typography sx={{ color: "#6B7280", fontSize: "14px", mb: 1 }}>
        Analytics / Mood and Effect Trend / Mood Interaction Insights
      </Typography> */}

      {/* Back Button */}
      <Button
        onClick={() => navigate("/analytics/mood-trend")}
        sx={{
          mb: 2,
          border: "1px solid #D4D7E2",
          textTransform: "uppercase",
          fontSize: "12px",
          borderRadius: "6px",
          background: "#F8F9FF",
          color: "#4F46E5",
          "&:hover": { background: "#EEF2FF" },
        }}
      >
        ← BACK
      </Button>

      {/* <Typography sx={{ fontSize: "24px", fontWeight: 600, mb: 3 }}>
        Mood Interaction Insights
      </Typography> */}

      {/* Chart Card */}
      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: "12px",
          mb: 4,
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        }}
      >
        <Typography sx={{ fontWeight: 550, mb: 2, fontSize: "18px" }}>
          Mood Distribution
        </Typography>

        <ReactApexChart
          options={{
            labels: chartData.labels,
            colors: chartData.colors,
            legend: { position: "bottom" },
          }}
          series={chartData.series}
          type="donut"
          height={350}
        />
      </Box>

      {/* Data Table Card */}
      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        }}
      >
        
        {/* FILTER BAR */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

          {/* Left Filters */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              placeholder="Search Mood..."
              size="small"
              onChange={handleSearch}
              sx={{ width: "180px" }}
            />

            <Select
              value={filterSeverity}
              onChange={(e) => handleSeverityFilter(e.target.value)}
              displayEmpty
              size="small"
              sx={{ width: "180px" }}
            >
              <MenuItem value="">Filter Severity</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Moderate">Moderate</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>

            <Select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              displayEmpty
              size="small"
              sx={{ width: "180px" }}
            >
              <MenuItem value="">Sort Requests</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </Box>

          {/* Export */}
          <Button
            variant="contained"
            sx={{ background: "#6366F1", textTransform: "none" }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </Box>

        {/* Data Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#F3F4F6" }}>
                <TableCell><strong>Mood</strong></TableCell>
                <TableCell><strong>Requests</strong></TableCell>
                <TableCell><strong>Percentage</strong></TableCell>
                <TableCell><strong>Severity</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.mood}</TableCell>
                  <TableCell>{row.requests}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                  <TableCell>{row.severity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

