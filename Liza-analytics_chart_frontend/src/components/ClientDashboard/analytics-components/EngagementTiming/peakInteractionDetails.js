// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";

// // MUI Components
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Breadcrumbs,
//   Link,
//   useTheme
// } from "@mui/material";

// const PeakInteractionDetails = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const timeData = [
//     { slot: "08:00-10:00", volume: 440, rate: "23%", severity: "Stable" },
//     { slot: "10:00-12:00", volume: 505, rate: "42%", severity: "Stable" },
//     { slot: "12:00-14:00", volume: 414, rate: "35%", severity: "Stable" },
//     { slot: "14:00-16:00", volume: 671, rate: "27%", severity: "High" },
//     { slot: "16:00-18:00", volume: 227, rate: "43%", severity: "Critical" },
//     { slot: "18:00-20:00", volume: 413, rate: "22%", severity: "Stable" },
//     { slot: "20:00-22:00", volume: 201, rate: "17%", severity: "Low" },
//     { slot: "22:00-24:00", volume: 352, rate: "31%", severity: "Stable" },
//   ];

//   const [filter, setFilter] = useState("");

//   const filteredData = timeData.filter((row) =>
//     row.slot.toLowerCase().includes(filter.toLowerCase())
//   );

//   const getSeverityChip = (type) => {
//     const colors = {
//       Critical: { label: "Critical", color: "error" },
//       High: { label: "High", color: "warning" },
//       Stable: { label: "Stable", color: "success" },
//       Low: { label: "Low", color: "info" },
//     };
//     return <Chip label={colors[type].label} color={colors[type].color} size="small" />;
//   };

//   return (
//     <Box p={3}>
//       {/* Breadcrumb Navigation */}
//       <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
//         <Link
//           underline="hover"
//           color="inherit"
//           sx={{ cursor: "pointer" }}
//           onClick={() => navigate("/analytics")}
//         >
//           Analytics
//         </Link>
//         <Link
//           underline="hover"
//           color="inherit"
//           sx={{ cursor: "pointer" }}
//           onClick={() => navigate("/analytics/engagement-timing")}
//         >
//           Engagement Timing
//         </Link>
//         <Typography color={theme.palette.text.primary}>Peak Interaction Details</Typography>
//       </Breadcrumbs>

//       <Button
//         variant="outlined"
//         onClick={() => navigate(-1)}
//         sx={{ mb: 3, borderRadius: 2 }}
//       >
//         ← Back
//       </Button>

//       {/* Title */}
//       <Typography variant="h5" fontWeight="700">
//         Peak Interaction Analysis
//       </Typography>
//       <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
//         Breakdown of browsing behavior and conversion rate based on time ranges.
//       </Typography>

//       {/* Chart Card */}
//       <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 4 }}>
//         <CardContent>
//           <ReactApexChart
//             type="line"
//             height={360}
//             series={[
//               {
//                 name: "Browsing Volume",
//                 type: "column",
//                 data: timeData.map((d) => d.volume),
//               },
//               {
//                 name: "Sales-Weighted Rate",
//                 type: "line",
//                 data: timeData.map((d) => parseInt(d.rate)),
//               },
//             ]}
//             options={{
//               labels: timeData.map((d) => d.slot),
//               colors: [
//                 theme.palette.primary.main,
//                 theme.palette.success.main,
//               ],
//               dataLabels: { enabled: true },
//               stroke: { width: [0, 3] },
//               grid: { borderColor: theme.palette.divider },
//               tooltip: { theme: theme.palette.mode },
//               yaxis: [
//                 {
//                   title: { text: "Browsing Volume" },
//                   labels: { style: { colors: theme.palette.text.primary } },
//                 },
//                 {
//                   opposite: true,
//                   title: { text: "Sales Rate" },
//                   labels: { style: { colors: theme.palette.text.primary } },
//                 },
//               ],
//               theme: { mode: theme.palette.mode },
//             }}
//           />
//         </CardContent>
//       </Card>

//       {/* Filters */}
//       <Box display="flex" gap={2} alignItems="center" mb={2}>
//         <TextField
//           label="Search by Time Slot"
//           variant="outlined"
//           value={filter}
//           size="small"
//           onChange={(e) => setFilter(e.target.value)}
//           sx={{ width: "250px" }}
//         />

//         <Button variant="contained" sx={{ borderRadius: 2 }}>
//           Export CSV
//         </Button>
//       </Box>

//       {/* Table */}
//       <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
//                 <TableCell><strong>Time Range</strong></TableCell>
//                 <TableCell><strong>Browsing Volume</strong></TableCell>
//                 <TableCell><strong>Sales Rate</strong></TableCell>
//                 <TableCell><strong>Severity</strong></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredData.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.slot}</TableCell>
//                   <TableCell>{row.volume}</TableCell>
//                   <TableCell>{row.rate}</TableCell>
//                   <TableCell>{getSeverityChip(row.severity)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PeakInteractionDetails;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Breadcrumbs,
//   Link,
//   MenuItem,
//   useTheme,
// } from "@mui/material";

// const PeakInteractionDetails = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const timeData = [
//     { slot: "08:00-10:00", volume: 440, rate: "23%", severity: "Stable" },
//     { slot: "10:00-12:00", volume: 505, rate: "42%", severity: "Stable" },
//     { slot: "12:00-14:00", volume: 414, rate: "35%", severity: "Stable" },
//     { slot: "14:00-16:00", volume: 671, rate: "27%", severity: "High" },
//     { slot: "16:00-18:00", volume: 227, rate: "43%", severity: "Critical" },
//     { slot: "18:00-20:00", volume: 413, rate: "22%", severity: "Stable" },
//     { slot: "20:00-22:00", volume: 201, rate: "17%", severity: "Low" },
//     { slot: "22:00-24:00", volume: 352, rate: "31%", severity: "Stable" },
//   ];

//   // Filters
//   const [search, setSearch] = useState("");
//   const [severityFilter, setSeverityFilter] = useState("");
//   const [minVolume, setMinVolume] = useState("");
//   const [minRate, setMinRate] = useState("");

//   // Filtering Logic
//   const filteredData = timeData.filter((row) => {
//     return (
//       (search === "" || row.slot.toLowerCase().includes(search.toLowerCase())) &&
//       (severityFilter === "" || row.severity === severityFilter) &&
//       (minVolume === "" || row.volume >= parseInt(minVolume)) &&
//       (minRate === "" || parseInt(row.rate) >= parseInt(minRate))
//     );
//   });

//   const resetFilters = () => {
//     setSearch("");
//     setSeverityFilter("");
//     setMinVolume("");
//     setMinRate("");
//   };

//   const getSeverityChip = (type) => {
//     const colors = {
//       Critical: "error",
//       High: "warning",
//       Stable: "success",
//       Low: "info",
//     };
//     return <Chip label={type} color={colors[type]} size="small" />;
//   };

//   return (
//     <Box p={3}>
//       {/* Breadcrumb */}
//       <Breadcrumbs sx={{ mb: 2 }}>
//         <Link underline="hover" color="inherit" onClick={() => navigate("/analytics")} sx={{ cursor: "pointer" }}>
//           Analytics
//         </Link>
//         <Link underline="hover" color="inherit" onClick={() => navigate("/analytics/engagement-timing")} sx={{ cursor: "pointer" }}>
//           Engagement Timing
//         </Link>
//         <Typography color="text.primary">Peak Interaction Details</Typography>
//       </Breadcrumbs>

//       {/* Back Button */}
//       <Button
//         variant="outlined"
//         sx={{ mb: 3, borderRadius: 2 }}
//         onClick={() => navigate(-1)}
//       >
//         ← Back
//       </Button>

//       {/* Title */}
//       <Typography variant="h5" fontWeight="700">
//         Peak Interaction Analysis
//       </Typography>
//       <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
//         Breakdown of browsing behavior and conversion rate based on time ranges.
//       </Typography>

//       {/* Chart */}
//       <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 4 }}>
//         <CardContent>
//           <ReactApexChart
//             type="line"
//             height={360}
//             series={[
//               { name: "Browsing Volume", type: "column", data: timeData.map((d) => d.volume) },
//               { name: "Sales-Weighted Rate", type: "line", data: timeData.map((d) => parseInt(d.rate)) },
//             ]}
//             options={{
//               labels: timeData.map((d) => d.slot),
//               colors: [theme.palette.primary.main, theme.palette.success.main],
//               dataLabels: { enabled: true },
//               stroke: { width: [0, 3] },
//               tooltip: { theme: theme.palette.mode },
//               yaxis: [
//                 { title: { text: "Browsing Volume" } },
//                 { opposite: true, title: { text: "Sales Rate (%)" } },
//               ],
//             }}
//           />
//         </CardContent>
//       </Card>

//       {/* FILTERS */}
//       <Box display="flex" gap={2} alignItems="center" mb={3}>
//         <TextField
//           size="small"
//           label="Search Time Slot"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{ width: "200px" }}
//         />

//         <TextField
//           size="small"
//           select
//           label="Severity"
//           value={severityFilter}
//           onChange={(e) => setSeverityFilter(e.target.value)}
//           sx={{ width: "160px" }}
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="Stable">Stable</MenuItem>
//           <MenuItem value="High">High</MenuItem>
//           <MenuItem value="Critical">Critical</MenuItem>
//           <MenuItem value="Low">Low</MenuItem>
//         </TextField>

//         <TextField
//           size="small"
//           label="Min Volume"
//           type="number"
//           value={minVolume}
//           onChange={(e) => setMinVolume(e.target.value)}
//           sx={{ width: "140px" }}
//         />

//         <TextField
//           size="small"
//           label="Min Rate %"
//           type="number"
//           value={minRate}
//           onChange={(e) => setMinRate(e.target.value)}
//           sx={{ width: "140px" }}
//         />

//         <Button variant="outlined" sx={{ borderRadius: 2 }} onClick={resetFilters}>
//           Reset
//         </Button>

//         <Button variant="contained" sx={{ borderRadius: 2 }}>
//           Export CSV
//         </Button>
//       </Box>

//       {/* TABLE */}
//       <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
//                 <TableCell><strong>Time Range</strong></TableCell>
//                 <TableCell><strong>Browsing Volume</strong></TableCell>
//                 <TableCell><strong>Sales Rate</strong></TableCell>
//                 <TableCell><strong>Severity</strong></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredData.map((row, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{row.slot}</TableCell>
//                   <TableCell>{row.volume}</TableCell>
//                   <TableCell>{row.rate}</TableCell>
//                   <TableCell>{getSeverityChip(row.severity)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PeakInteractionDetails;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactApexChart from "react-apexcharts";

// // MUI Components
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Breadcrumbs,
//   Link,
//   useTheme,
//   MenuItem
// } from "@mui/material";

// const PeakInteractionDetails = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const timeData = [
//     { slot: "08:00-10:00", volume: 440, rate: "23%", severity: "Stable" },
//     { slot: "10:00-12:00", volume: 505, rate: "42%", severity: "Stable" },
//     { slot: "12:00-14:00", volume: 414, rate: "35%", severity: "Stable" },
//     { slot: "14:00-16:00", volume: 671, rate: "27%", severity: "High" },
//     { slot: "16:00-18:00", volume: 227, rate: "43%", severity: "Critical" },
//     { slot: "18:00-20:00", volume: 413, rate: "22%", severity: "Stable" },
//     { slot: "20:00-22:00", volume: 201, rate: "17%", severity: "Low" },
//     { slot: "22:00-24:00", volume: 352, rate: "31%", severity: "Stable" },
//   ];

//   const [search, setSearch] = useState("");
//   const [severity, setSeverity] = useState("");

//   // Pagination State
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const filteredData = timeData.filter(
//     (row) =>
//       row.slot.toLowerCase().includes(search.toLowerCase()) &&
//       (severity === "" || row.severity === severity)
//   );

//   const paginatedRows = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const getSeverityChip = (type) => {
//     const colors = {
//       Critical: { label: "Critical", color: "error" },
//       High: { label: "High", color: "warning" },
//       Stable: { label: "Stable", color: "success" },
//       Low: { label: "Low", color: "info" },
//     };
//     return <Chip label={colors[type].label} color={colors[type].color} size="small" />;
//   };

//   return (
//     <Box p={3}>
//       {/* Breadcrumb */}
//       <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
//         <Link underline="hover" color="inherit" onClick={() => navigate("/analytics")}>
//           Analytics
//         </Link>
//         <Link
//           underline="hover"
//           color="inherit"
//           onClick={() => navigate("/analytics/engagement-timing")}
//         >
//           Engagement Timing
//         </Link>
//         <Typography color={theme.palette.text.primary}>
//           Peak Interaction Details
//         </Typography>
//       </Breadcrumbs>

//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3, borderRadius: 2 }}>
//         ← Back
//       </Button>

//       <Typography variant="h5" fontWeight="700">
//         Peak Interaction Analysis
//       </Typography>
//       <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
//         Breakdown of browsing behavior and conversion rate based on time ranges.
//       </Typography>

//       {/* Chart Card */}
//       <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 4 }}>
//         <CardContent>
//           <ReactApexChart
//             type="line"
//             height={360}
//             series={[
//               {
//                 name: "Browsing Volume",
//                 type: "column",
//                 data: timeData.map((d) => d.volume),
//               },
//               {
//                 name: "Sales-Weighted Rate",
//                 type: "line",
//                 data: timeData.map((d) => parseInt(d.rate)),
//               },
//             ]}
//             options={{
//               labels: timeData.map((d) => d.slot),
//               colors: [theme.palette.primary.main, theme.palette.success.main],
//               dataLabels: { enabled: true },
//               stroke: { width: [0, 3] },
//               grid: { borderColor: theme.palette.divider },
//               tooltip: { theme: theme.palette.mode },
//               yaxis: [
//                 {
//                   title: { text: "Browsing Volume" },
//                   labels: { style: { colors: theme.palette.text.primary } },
//                 },
//                 {
//                   opposite: true,
//                   title: { text: "Sales Rate" },
//                   labels: { style: { colors: theme.palette.text.primary } },
//                 },
//               ],
//               theme: { mode: theme.palette.mode },
//             }}
//           />
//         </CardContent>
//       </Card>

//       {/* ------- UPDATED FILTER + PAGINATION SECTION ------- */}
//       <Box display="flex" gap={2} alignItems="center" mb={2}>
//         <TextField
//           label="Search Time Slot"
//           size="small"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(0);
//           }}
//           sx={{ width: "200px" }}
//         />

//         <TextField
//           label="Severity"
//           select
//           size="small"
//           value={severity}
//           sx={{ width: "180px" }}
//           onChange={(e) => {
//             setSeverity(e.target.value);
//             setPage(0);
//           }}
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="Stable">Stable</MenuItem>
//           <MenuItem value="High">High</MenuItem>
//           <MenuItem value="Critical">Critical</MenuItem>
//           <MenuItem value="Low">Low</MenuItem>
//         </TextField>

//         <Button variant="contained" sx={{ borderRadius: 2 }}>
//           Export CSV
//         </Button>
//       </Box>

//       {/* Table with Pagination */}
//       <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
//                 <TableCell><b>Time Range</b></TableCell>
//                 <TableCell><b>Browsing Volume</b></TableCell>
//                 <TableCell><b>Sales Rate</b></TableCell>
//                 <TableCell><b>Severity</b></TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {paginatedRows.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.slot}</TableCell>
//                   <TableCell>{row.volume}</TableCell>
//                   <TableCell>{row.rate}</TableCell>
//                   <TableCell>{getSeverityChip(row.severity)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Pagination Controls */}
//           <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {Math.min(page * rowsPerPage + 1, filteredData.length)} -{" "}
//               {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length}
//             </Typography>

//             <Box display="flex" gap={2} alignItems="center">
//               {/* Rows per page */}
//               <TextField
//                 select
//                 size="small"
//                 value={rowsPerPage}
//                 sx={{ width: "100px" }}
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value));
//                   setPage(0);
//                 }}
//               >
//                 {[5, 10, 25, filteredData.length].map((size) => (
//                   <MenuItem key={size} value={size}>
//                     {size === filteredData.length ? "All" : size}
//                   </MenuItem>
//                 ))}
//               </TextField>

//               <Button
//                 disabled={page === 0}
//                 variant="outlined"
//                 onClick={() => setPage(page - 1)}
//               >
//                 ← Prev
//               </Button>

//               <Typography>{page + 1}</Typography>

//               <Button
//                 disabled={(page + 1) * rowsPerPage >= filteredData.length}
//                 variant="outlined"
//                 onClick={() => setPage(page + 1)}
//               >
//                 Next →
//               </Button>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PeakInteractionDetails;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

// MUI Components
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Breadcrumbs,
  Link,
  useTheme,
  MenuItem
} from "@mui/material";

const PeakInteractionDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const timeData = [
    { slot: "08:00-10:00", volume: 440, rate: "23%", severity: "Stable" },
    { slot: "10:00-12:00", volume: 505, rate: "42%", severity: "Stable" },
    { slot: "12:00-14:00", volume: 414, rate: "35%", severity: "Stable" },
    { slot: "14:00-16:00", volume: 671, rate: "27%", severity: "High" },
    { slot: "16:00-18:00", volume: 227, rate: "43%", severity: "Critical" },
    { slot: "18:00-20:00", volume: 413, rate: "22%", severity: "Stable" },
    { slot: "20:00-22:00", volume: 201, rate: "17%", severity: "Low" },
    { slot: "22:00-24:00", volume: 352, rate: "31%", severity: "Stable" },
  ];

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = timeData.filter(
    (row) =>
      row.slot.toLowerCase().includes(search.toLowerCase()) &&
      (severity === "" || row.severity === severity)
  );

  const paginatedRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getSeverityChip = (type) => {
    const colors = {
      Critical: { label: "Critical", color: "error" },
      High: { label: "High", color: "warning" },
      Stable: { label: "Stable", color: "success" },
      Low: { label: "Low", color: "info" },
    };
    return <Chip label={colors[type].label} color={colors[type].color} size="small" />;
  };

  return (
    <Box p={3}>
      
      {/* -------- COMMENTED BREADCRUMB SECTION --------
      <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
        <Link underline="hover" color="inherit" onClick={() => navigate("/analytics")}>
          Analytics
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate("/analytics/engagement-timing")}
        >
          Engagement Timing
        </Link>
        <Typography color={theme.palette.text.primary}>
          Peak Interaction Details
        </Typography>
      </Breadcrumbs>
      ------------------------------------------------ */}
      
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3, borderRadius: 2 }}>
        ← Back
      </Button>

      {/* <Typography variant="h5" fontWeight="700">
        Peak Interaction Analysis
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
        Breakdown of browsing behavior and conversion rate based on time ranges.
      </Typography> */}

      <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 4 }}>
        <CardContent>
          <ReactApexChart
            type="line"
            height={360}
            series={[
              {
                name: "Browsing Volume",
                type: "column",
                data: timeData.map((d) => d.volume),
              },
              {
                name: "Sales-Weighted Rate",
                type: "line",
                data: timeData.map((d) => parseInt(d.rate)),
              },
            ]}
            options={{
              labels: timeData.map((d) => d.slot),
              colors: [theme.palette.primary.main, theme.palette.success.main],
              dataLabels: { enabled: true },
              stroke: { width: [0, 3] },
              grid: { borderColor: theme.palette.divider },
              tooltip: { theme: theme.palette.mode },
              yaxis: [
                {
                  title: { text: "Browsing Volume" },
                  labels: { style: { colors: theme.palette.text.primary } },
                },
                {
                  opposite: true,
                  title: { text: "Sales Rate" },
                  labels: { style: { colors: theme.palette.text.primary } },
                },
              ],
              theme: { mode: theme.palette.mode },
            }}
          />
        </CardContent>
      </Card>

      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          label="Search Time Slot"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ width: "200px" }}
        />

        <TextField
          label="Severity"
          select
          size="small"
          value={severity}
          sx={{ width: "180px" }}
          onChange={(e) => {
            setSeverity(e.target.value);
            setPage(0);
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Stable">Stable</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Critical">Critical</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>

        <Button variant="contained" sx={{ borderRadius: 2 }}>
          Export CSV
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                <TableCell><b>Time Range</b></TableCell>
                <TableCell><b>Browsing Volume</b></TableCell>
                <TableCell><b>Sales Rate</b></TableCell>
                <TableCell><b>Severity</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.slot}</TableCell>
                  <TableCell>{row.volume}</TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell>{getSeverityChip(row.severity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              Showing {Math.min(page * rowsPerPage + 1, filteredData.length)} -{" "}
              {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length}
            </Typography>

            <Box display="flex" gap={2} alignItems="center">
              <TextField
                select
                size="small"
                value={rowsPerPage}
                sx={{ width: "100px" }}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value));
                  setPage(0);
                }}
              >
                {[5, 10, 25, filteredData.length].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size === filteredData.length ? "All" : size}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                disabled={page === 0}
                variant="outlined"
                onClick={() => setPage(page - 1)}
              >
                ← Prev
              </Button>

              <Typography>{page + 1}</Typography>

              <Button
                disabled={(page + 1) * rowsPerPage >= filteredData.length}
                variant="outlined"
                onClick={() => setPage(page + 1)}
              >
                Next →
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PeakInteractionDetails;
