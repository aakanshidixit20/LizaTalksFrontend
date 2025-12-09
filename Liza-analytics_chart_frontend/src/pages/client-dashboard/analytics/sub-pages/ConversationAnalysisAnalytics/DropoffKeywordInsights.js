// import React, { useState, useMemo } from "react";
// import ReactApexChart from "react-apexcharts";
// import {
//   Box,
//   Typography,
//   Paper,
//   TextField,
//   MenuItem,
//   Button,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import DownloadIcon from "@mui/icons-material/Download";
// import SortIcon from "@mui/icons-material/Sort";
// import Papa from "papaparse";

// const PURPLE = "#6D5DD2";

// const DropoffDetailsPage = () => {
//   const [filter, setFilter] = useState("month");
//   const [search, setSearch] = useState("");
//   const [sortField, setSortField] = useState("keyword");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [page, setPage] = useState(1);

//   const rowsPerPage = 6;

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

//   const dropoffData = datasets[filter];
//   const resumeData = resumedSessions[filter];

//   const chartSeries = [
//     { name: "Permanent Drop-off", data: dropoffData },
//     { name: "Resumed Session", data: resumeData },
//   ];

//   const chartOptions = {
//     chart: { stacked: true, toolbar: { show: true } },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         dataLabels: { total: { enabled: true, style: { fontWeight: 600 } } },
//       },
//     },
//     colors: [PURPLE, "#2ecc71"],
//     legend: { position: "top", horizontalAlign: "left" },
//     xaxis: { categories: labels },
//   };

//   const tableData = labels.map((label, i) => ({
//     keyword: label,
//     dropoff: dropoffData[i],
//     resumed: resumeData[i],
//   }));

//   const processedRows = useMemo(() => {
//     let data = [...tableData];

//     if (search) {
//       data = data.filter((item) =>
//         item.keyword.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     data.sort((a, b) =>
//       sortOrder === "asc"
//         ? a[sortField] > b[sortField]
//           ? 1
//           : -1
//         : a[sortField] < b[sortField]
//         ? 1
//         : -1
//     );

//     return data;
//   }, [search, sortField, sortOrder, filter]);

//   const totalPages = Math.ceil(processedRows.length / rowsPerPage);
//   const paginatedRows = processedRows.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const exportCSV = () => {
//     const csv = Papa.unparse(processedRows);
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
//     link.download = "DropoffInsights.csv";
//     link.click();
//   };

//   return (
//     <Box sx={{ p: 3 }}>

//       {/* 🔙 Back button */}
//       <Button
//         variant="contained"
//         sx={{
//           bgcolor: PURPLE,
//           "&:hover": { bgcolor: "#5B4ACA" },
//           textTransform: "none",
//           mb: 2,
//         }}
//         startIcon={<ArrowBackIcon />}
//         onClick={() => window.history.back()}
//       >
//         Back
//       </Button>

//       {/* Header row */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         {/* <Typography variant="h5" fontWeight={700}>
//           Drop-off Keyword Insights
//         </Typography> */}

//         {/* <TextField
//           select
//           size="small"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           sx={{
//             width: "160px",
//             "& .MuiOutlinedInput-root.Mui-focused fieldset": {
//               borderColor: PURPLE,
//             },
//           }}
//         >
//           <MenuItem value="week">This Week</MenuItem>
//           <MenuItem value="month">This Month</MenuItem>
//           <MenuItem value="3months">Last 3 Months</MenuItem>
//         </TextField> */}
//       </Box>

//       {/* Chart */}
//       <Paper sx={{ p: 3, borderRadius: "12px", mb: 4 }}>
//         <Typography fontWeight={600} mb={1}>
//           User Drop-offs vs Resumed Sessions
//         </Typography>

//         <ReactApexChart
//           type="bar"
//           height={400}
//           options={chartOptions}
//           series={chartSeries}
//         />
//       </Paper>

//       {/* Table */}
//       <Paper sx={{ p: 3, borderRadius: "12px" }}>
//         <Box display="flex" justifyContent="space-between" mb={2}>
//           <TextField
//             placeholder="Search keyword..."
//             size="small"
//             sx={{ width: "260px" }}
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <Button
//             variant="outlined"
//             startIcon={<DownloadIcon />}
//             sx={{ textTransform: "none", borderColor: PURPLE, color: PURPLE }}
//             onClick={exportCSV}
//           >
//             Export CSV
//           </Button>
//         </Box>

//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ background: "#EFEAFF", fontWeight: 600 }}>
//               <td style={{ padding: 12, cursor: "pointer" }} onClick={() => setSortField("keyword")}>
//                 Keyword <SortIcon fontSize="small" />
//               </td>
//               <td style={{ padding: 12, textAlign: "center" }}>Drop-off</td>
//               <td style={{ padding: 12, textAlign: "center" }}>Resumed</td>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedRows.map((row, i) => (
//               <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
//                 <td style={{ padding: 12 }}>{row.keyword}</td>
//                 <td style={{ padding: 12, textAlign: "center" }}>{row.dropoff}</td>
//                 <td style={{ padding: 12, textAlign: "center" }}>{row.resumed}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <Box justifyContent="center" display="flex" gap={2} mt={3}>
//           <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
//             Prev
//           </Button>
//           <Typography>Page {page} of {totalPages}</Typography>
//           <Button disabled={page === totalPages} onClick={() => setPage(page + 1)} variant="contained" sx={{ bgcolor: PURPLE }}>
//             Next
//           </Button>
//         </Box>
//       </Paper>
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
      
      {/* Updated Back Button Matching Theme */}
      <Button
        onClick={() => window.history.back()}
        startIcon={<ArrowBackIcon sx={{ fontSize: "18px", color: "#4F46E5" }} />}
        sx={{
          mb: 2,
          border: "1px solid #D4D7E2",
          textTransform: "uppercase",
          fontSize: "12px",
          borderRadius: "6px",
          background: "#F8F9FF",
          color: "#4F46E5",
          "&:hover": { background: "#EEF2FF" },
          paddingX: "14px",
        }}
      >
        Back
      </Button>

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

      {/* Table Section */}
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
