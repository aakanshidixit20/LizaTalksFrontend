// // import React, { useState, useMemo } from "react";
// // import { Box, Typography, Button, TextField, MenuItem, Paper } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// // import DropoffKeywordInsights from "../../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/DropoffKeywordInsights";
// // import Papa from "papaparse"; // for CSV export

// // const DropoffDetailsPage = () => {
// //   const navigate = useNavigate();

// //   // Filters
// //   const [filter, setFilter] = useState("month");
// //   const [search, setSearch] = useState("");
// //   const [sortField, setSortField] = useState("keyword");
// //   const [sortOrder, setSortOrder] = useState("asc");
// //   const [page, setPage] = useState(1);

// //   const rowsPerPage = 5;

// //   // Data
// //   const labels = [
// //     "Effects of Indica vs Sativa",
// //     "CBD oil for anxiety dosage",
// //     "Dispensary near me THC &CBD",
// //     "Difference between THC &CBD",
// //     "How to get a medical card",
// //     "[State] weed laws",
// //     "Best vape pens 2024",
// //   ];

// //   const datasets = {
// //     week: [12, 20, 14, 10, 6, 18, 9],
// //     month: [44, 55, 41, 37, 22, 43, 21],
// //     "3months": [120, 140, 110, 98, 90, 130, 95],
// //   };

// //   const resumedSessions = {
// //     week: [15, 18, 11, 17, 4, 14, 10],
// //     month: [53, 32, 33, 52, 13, 43, 32],
// //     "3months": [150, 130, 125, 160, 70, 140, 120],
// //   };

// //   // convert to structured data
// //   const initialData = labels.map((label, i) => ({
// //     keyword: label,
// //     dropoff: datasets[filter][i],
// //     resumed: resumedSessions[filter][i],
// //   }));

// //   // Search + Sort + Paginate
// //   const filteredData = useMemo(() => {
// //     let table = initialData.filter(row =>
// //       row.keyword.toLowerCase().includes(search.toLowerCase())
// //     );

// //     // Sorting
// //     table.sort((a, b) => {
// //       const valA = a[sortField];
// //       const valB = b[sortField];
// //       return sortOrder === "asc" ? valA > valB ? 1 : -1 : valA < valB ? 1 : -1;
// //     });

// //     return table;
// //   }, [search, sortField, sortOrder, filter]);

// //   // Pagination logic
// //   const pageCount = Math.ceil(filteredData.length / rowsPerPage);
// //   const paginatedRows = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

// //   // Export CSV
// //   const exportCSV = () => {
// //     const csv = Papa.unparse(filteredData);
// //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// //     const link = document.createElement("a");
// //     link.href = URL.createObjectURL(blob);
// //     link.download = "dropoff-data.csv";
// //     link.click();
// //   };

// //   return (
// //     <Box sx={{ p: 3 }}>

// //       {/* Breadcrumb + Back */}
// //       <Typography sx={{ mb: 1, opacity: 0.6 }}>
// //         Conversation Analytics → <strong>Drop-off Keyword Insights</strong>
// //       </Typography>
      
// //       <Button onClick={() => navigate(-1)}>← Back</Button>

// //       {/* Heading */}
// //       <Typography variant="h5" fontWeight={600} sx={{ mt: 2, mb: 3 }}>
// //         Drop-off Keyword Insights
// //       </Typography>

// //       {/* Full Chart */}
// //       <Paper sx={{ p: 3, mb: 4 }}>
// //         <DropoffKeywordInsights viewDetails filter={filter} />
// //       </Paper>

// //       {/* Controls Row */}
// //       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// //         <TextField
// //           placeholder="Search..."
// //           size="small"
// //           value={search}
// //           onChange={e => setSearch(e.target.value)}
// //         />

// //         <Box sx={{ display: "flex", gap: 2 }}>
// //           {/* Filter */}
// //           <TextField select size="small" value={filter} onChange={e => setFilter(e.target.value)}>
// //             <MenuItem value="week">This Week</MenuItem>
// //             <MenuItem value="month">This Month</MenuItem>
// //             <MenuItem value="3months">Last 3 Months</MenuItem>
// //           </TextField>

// //           {/* Export */}
// //           <Button variant="outlined" onClick={exportCSV}>Export CSV</Button>
// //         </Box>
// //       </Box>

// //       {/* Sortable Table */}
// //       <Paper sx={{ p: 2 }}>
// //         <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //           <thead>
// //             <tr style={{ background: "#eee", fontWeight: 600 }}>
// //               <td onClick={() => setSortField("keyword")}>Keyword 🔽</td>
// //               <td onClick={() => setSortField("dropoff")}>Drop-off</td>
// //               <td onClick={() => setSortField("resumed")}>Resumed</td>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {paginatedRows.map((row, i) => (
// //               <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
// //                 <td>{row.keyword}</td>
// //                 <td>{row.dropoff}</td>
// //                 <td>{row.resumed}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         {/* Pagination */}
// //         <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
// //           <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
// //           <Typography>{page}/{pageCount}</Typography>
// //           <Button disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</Button>
// //         </Box>
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default DropoffDetailsPage;


// // // // import React from "react";
// // // // import ReactApexChart from "react-apexcharts";

// // // // const DropoffKeywordInsights = ({ filter, preview, full, showTable }) => {
// // // //   // Mock filtered datasets
// // // //   const datasets = {
// // // //     week: [12, 20, 14, 10, 6, 18, 9],
// // // //     month: [44, 55, 41, 37, 22, 43, 21],
// // // //     "3months": [120, 140, 110, 98, 90, 130, 95],
// // // //   };

// // // //   const resumedSessions = {
// // // //     week: [15, 18, 11, 17, 4, 14, 10],
// // // //     month: [53, 32, 33, 52, 13, 43, 32],
// // // //     "3months": [150, 130, 125, 160, 70, 140, 120],
// // // //   };

// // // //   const chartData = datasets[filter] || datasets.month;
// // // //   const resumeData = resumedSessions[filter] || resumedSessions.month;

// // // //   const labels = [
// // // //     "Effects of Indica vs Sativa",
// // // //     "CBD oil for anxiety dosage",
// // // //     "Dispensary near me THC &CBD",
// // // //     "Difference between THC &CBD",
// // // //     "How to get a medical card",
// // // //     "[State] weed laws",
// // // //     "Best vape pens 2024",
// // // //   ];

// // // //   const series = [
// // // //     { name: "Permanent Drop-off", data: chartData },
// // // //     { name: "Resumed Session", data: resumeData },
// // // //   ];

// // // //   const options = {
// // // //     chart: { stacked: true, toolbar: { show: !preview } },
// // // //     plotOptions: {
// // // //       bar: {
// // // //         horizontal: true,
// // // //         dataLabels: { total: { enabled: true, style: { fontWeight: 600 } } },
// // // //       },
// // // //     },
// // // //     legend: { position: "top", horizontalAlign: "left" },
// // // //     xaxis: { categories: labels },
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       {/* Only show heading in FULL mode */}
// // // //       {full && (
// // // //         <>
// // // //           <h3>Drop-off Keyword Insights</h3>
// // // //           <p>User Drop-offs vs Resumed Sessions by Last Keyword</p>
// // // //         </>
// // // //       )}

// // // //       {/* Chart */}
// // // //       {!showTable && (
// // // //         <ReactApexChart
// // // //           options={options}
// // // //           series={series}
// // // //           type="bar"
// // // //           height={preview ? 200 : 350}
// // // //         />
// // // //       )}

// // // //       {/* Table shown in FULL mode OR showTable mode */}
// // // //       {(full || showTable) && (
// // // //         <table
// // // //           style={{
// // // //             width: "100%",
// // // //             marginTop: "20px",
// // // //             borderCollapse: "collapse",
// // // //           }}
// // // //         >
// // // //           <thead>
// // // //             <tr style={{ background: "#f5f5f5", fontWeight: 600 }}>
// // // //               <td>Keyword</td>
// // // //               <td>Permanent Drop-off</td>
// // // //               <td>Resumed Session</td>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {labels.map((row, i) => (
// // // //               <tr
// // // //                 key={i}
// // // //                 style={{ borderBottom: "1px solid #eee", height: "40px" }}
// // // //               >
// // // //                 <td>{row}</td>
// // // //                 <td>{chartData[i]}</td>
// // // //                 <td>{resumeData[i]}</td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DropoffKeywordInsights;


// // import React from "react";
// // import ReactApexChart from "react-apexcharts";

// // const DropoffKeywordInsights = ({ filter = "month", preview, full, viewDetails }) => {

// //   // ======================
// //   // 📊 MOCK DATA (Replace later with API)
// //   // ======================
// //   const datasets = {
// //     week: [12, 20, 14, 10, 6, 18, 9],
// //     month: [44, 55, 41, 37, 22, 43, 21],
// //     "3months": [120, 140, 110, 98, 90, 130, 95],
// //   };

// //   const resumedSessions = {
// //     week: [15, 18, 11, 17, 4, 14, 10],
// //     month: [53, 32, 33, 52, 13, 43, 32],
// //     "3months": [150, 130, 125, 160, 70, 140, 120],
// //   };

// //   const labels = [
// //     "Effects of Indica vs Sativa",
// //     "CBD oil for anxiety dosage",
// //     "Dispensary near me THC &CBD",
// //     "Difference between THC &CBD",
// //     "How to get a medical card",
// //     "[State] weed laws",
// //     "Best vape pens 2024",
// //   ];

// //   // ======================
// //   // PROCESS FILTERED DATA
// //   // ======================
// //   const chartData = datasets[filter] || datasets.month;
// //   const resumeData = resumedSessions[filter] || resumedSessions.month;

// //   const series = [
// //     { name: "Permanent Drop-off", data: chartData },
// //     { name: "Resumed Session", data: resumeData },
// //   ];

// //   const options = {
// //     chart: { type: "bar", stacked: true, toolbar: { show: !preview } },
// //     plotOptions: {
// //       bar: {
// //         horizontal: true,
// //         dataLabels: {
// //           total: { enabled: true, style: { fontWeight: 600, fontSize: "13px" } },
// //         },
// //       },
// //     },
// //     xaxis: { categories: labels },
// //     legend: { position: "top", horizontalAlign: "left" },
// //     colors: ["#4F46E5", "#F97316"],
// //   };

// //   return (
// //     <div style={{ width: "100%" }}>
      
// //       {/* ====================== */}
// //       {/* Heading only in full/detail mode */}
// //       {/* ====================== */}
// //       {(full || viewDetails) && (
// //         <div style={{ marginBottom: "10px" }}>
// //           <h3 style={{ margin: 0 }}>Drop-off Keyword Insights</h3>
// //           <p style={{ marginTop: 4, opacity: 0.6 }}>
// //             User Drop-offs vs Resumed Sessions by Last Keyword
// //           </p>
// //         </div>
// //       )}

// //       {/* ====================== */}
// //       {/* 📊 ALWAYS SHOW CHART */}
// //       {/* ====================== */}
// //       <ReactApexChart 
// //         options={options} 
// //         series={series} 
// //         type="bar" 
// //         height={preview ? 180 : 350} 
// //       />

// //       {/* ====================== */}
// //       {/* 🟡 TABLE ONLY IN DETAIL MODE */}
// //       {/* ====================== */}
// //       {viewDetails && (
// //         <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
// //           <thead>
// //             <tr style={{ background: "#f5f5f5", fontWeight: 600 }}>
// //               <td style={styles.cell}>Keyword</td>
// //               <td style={styles.cell}>Permanent Drop-off</td>
// //               <td style={styles.cell}>Resumed Session</td>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {labels.map((item, index) => (
// //               <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
// //                 <td style={styles.cell}>{item}</td>
// //                 <td style={styles.cellCenter}>{chartData[index]}</td>
// //                 <td style={styles.cellCenter}>{resumeData[index]}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // // ======================
// // // Styles
// // // ======================
// // const styles = {
// //   cell: { padding: "12px" },
// //   cellCenter: { padding: "12px", textAlign: "center" },
// // };

// // export default DropoffKeywordInsights;


// import React, { useState, useMemo } from "react";
// import { Box, Typography, Button, TextField, MenuItem, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import DropoffKeywordInsights from 
// "../../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/DropoffKeywordInsights";
// import Papa from "papaparse"; // For CSV export

// const DropoffDetailsPage = () => {
//   const navigate = useNavigate();

//   const [filter, setFilter] = useState("month");
//   const [search, setSearch] = useState("");
//   const [sortField, setSortField] = useState("keyword");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [page, setPage] = useState(1);

//   const rowsPerPage = 5;

//   const labels = [
//     "Effects of Indica vs Sativa",
//     "CBD oil for anxiety dosage",
//     "Dispensary near me THC &CBD",
//     "Difference between THC &CBD",
//     "How to get a medical card",
//     "[State] weed laws",
//     "Best vape pens 2024",
//   ];

//   const datasets = {
//     week: [12, 20, 14, 10, 6, 18, 9],
//     month: [44, 55, 41, 37, 22, 43, 21],
//     "3months": [120, 140, 110, 98, 90, 130, 95],
//   };

//   const resumedSessions = {
//     week: [15, 18, 11, 17, 4, 14, 10],
//     month: [53, 32, 33, 52, 13, 43, 32],
//     "3months": [150, 130, 125, 160, 70, 140, 120],
//   };

//   const initialData = labels.map((label, i) => ({
//     keyword: label,
//     dropoff: datasets[filter][i],
//     resumed: resumedSessions[filter][i],
//   }));

//   const filteredData = useMemo(() => {
//     let table = [...initialData];

//     if (search.trim()) {
//       table = table.filter(row =>
//         row.keyword.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     table.sort((a, b) => {
//       const A = a[sortField];
//       const B = b[sortField];

//       if (A < B) return sortOrder === "asc" ? -1 : 1;
//       if (A > B) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     return table;
//   }, [search, sortField, sortOrder, filter]);

//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedRows = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

//   const exportCSV = () => {
//     const csv = Papa.unparse(filteredData);
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "dropoff-keyword-insights.csv";
//     link.click();
//   };
//   function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }
//   const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


//   return (
//     <Box sx={{ p: 3 }}>
//       {/* <Typography sx={{ mb: 1, opacity: 0.6 }}>
//         Conversation Analytics → <strong>Drop-off Keyword Insights</strong>
//       </Typography> */}

//       <Button onClick={() => navigate(-1)}>← Back</Button>

//       <Typography variant="h5" fontWeight={600} sx={{ mt: 2, mb: 3 }}>
//         Drop-off Keyword Insights
//       </Typography>

//       {/* CHART SECTION */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <DropoffKeywordInsights filter={filter} full />
//       </Paper>

//       {/* Search + Filter + Export */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <TextField
//           placeholder="Search..."
//           size="small"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <Box sx={{ display: "flex", gap: 2 }}>
//           <TextField select size="small" value={filter} onChange={(e) => setFilter(e.target.value)}>
//             <MenuItem value="week">This Week</MenuItem>
//             <MenuItem value="month">This Month</MenuItem>
//             <MenuItem value="3months">Last 3 Months</MenuItem>
//           </TextField>

//           <Button variant="outlined" onClick={exportCSV}>
//             Export CSV
//           </Button>
//         </Box>
//       </Box>

//       {/* TABLE SECTION */}
//       {/* <Paper sx={{ p: 2 }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ background: "#eee", fontWeight: 600 }}>
//               <td onClick={() => setSortField("keyword")}>Keyword</td>
//               <td onClick={() => setSortField("dropoff")}>Drop-off</td>
//               <td onClick={() => setSortField("resumed")}>Resumed</td>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedRows.map((row, index) => (
//               <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
//                 <td>{row.keyword}</td>
//                 <td>{row.dropoff}</td>
//                 <td>{row.resumed}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
//           <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
//             Prev
//           </Button>
//           <Typography>{page}/{pageCount}</Typography>
//           <Button disabled={page === pageCount} onClick={() => setPage(page + 1)}>
//             Next
//           </Button>
//         </Box>
//       </Paper> */}
//       <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
  
//     </Box>
//   );
// };

// export default DropoffDetailsPage;


import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import Papa from "papaparse";

const PURPLE = "#6D5DD2";

const DropoffDetailsPage = () => {
  const [filter, setFilter] = useState("month");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("keyword");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const rowsPerPage = 6;

  const labels = [
    "Effects of Indica vs Sativa",
    "CBD oil for anxiety dosage",
    "Dispensary near me THC &CBD",
    "Difference between THC &CBD",
    "How to get a medical card",
    "[State] weed laws",
    "Best vape pens 2024",
  ];

  const datasets = {
    week: [12, 20, 14, 10, 6, 18, 9],
    month: [44, 55, 41, 37, 22, 43, 21],
    "3months": [120, 140, 110, 98, 90, 130, 95],
  };

  const resumedSessions = {
    week: [15, 18, 11, 17, 4, 14, 10],
    month: [53, 32, 33, 52, 13, 43, 32],
    "3months": [150, 130, 125, 160, 70, 140, 120],
  };

  const dropoffData = datasets[filter];
  const resumeData = resumedSessions[filter];

  const chartSeries = [
    { name: "Permanent Drop-off", data: dropoffData },
    { name: "Resumed Session", data: resumeData },
  ];

  const chartOptions = {
    chart: { stacked: true, toolbar: { show: true } },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: { total: { enabled: true, style: { fontWeight: 600 } } },
      },
    },
    colors: [PURPLE, "#2ecc71"],
    legend: { position: "top", horizontalAlign: "left" },
    xaxis: { categories: labels },
  };

  const tableData = labels.map((label, i) => ({
    keyword: label,
    dropoff: dropoffData[i],
    resumed: resumeData[i],
  }));

  const processedRows = useMemo(() => {
    let data = [...tableData];

    if (search) {
      data = data.filter((item) =>
        item.keyword.toLowerCase().includes(search.toLowerCase())
      );
    }

    data.sort((a, b) =>
      sortOrder === "asc"
        ? a[sortField] > b[sortField]
          ? 1
          : -1
        : a[sortField] < b[sortField]
        ? 1
        : -1
    );

    return data;
  }, [search, sortField, sortOrder, filter]);

  const totalPages = Math.ceil(processedRows.length / rowsPerPage);
  const paginatedRows = processedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const exportCSV = () => {
    const csv = Papa.unparse(processedRows);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "DropoffInsights.csv";
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>

      {/* 🔙 Back button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: PURPLE,
          "&:hover": { bgcolor: "#5B4ACA" },
          textTransform: "none",
          mb: 2,
        }}
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
      >
        Back
      </Button>

      {/* Header row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Drop-off Keyword Insights
        </Typography>

        {/* <TextField
          select
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{
            width: "160px",
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: PURPLE,
            },
          }}
        >
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
          <MenuItem value="3months">Last 3 Months</MenuItem>
        </TextField> */}
      </Box>

      {/* Chart */}
      <Paper sx={{ p: 3, borderRadius: "12px", mb: 4 }}>
        <Typography fontWeight={600} mb={1}>
          User Drop-offs vs Resumed Sessions
        </Typography>

        <ReactApexChart
          type="bar"
          height={400}
          options={chartOptions}
          series={chartSeries}
        />
      </Paper>

      {/* Table */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            placeholder="Search keyword..."
            size="small"
            sx={{ width: "260px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ textTransform: "none", borderColor: PURPLE, color: PURPLE }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </Box>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#EFEAFF", fontWeight: 600 }}>
              <td style={{ padding: 12, cursor: "pointer" }} onClick={() => setSortField("keyword")}>
                Keyword <SortIcon fontSize="small" />
              </td>
              <td style={{ padding: 12, textAlign: "center" }}>Drop-off</td>
              <td style={{ padding: 12, textAlign: "center" }}>Resumed</td>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 12 }}>{row.keyword}</td>
                <td style={{ padding: 12, textAlign: "center" }}>{row.dropoff}</td>
                <td style={{ padding: 12, textAlign: "center" }}>{row.resumed}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Box justifyContent="center" display="flex" gap={2} mt={3}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <Typography>Page {page} of {totalPages}</Typography>
          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)} variant="contained" sx={{ bgcolor: PURPLE }}>
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DropoffDetailsPage;

