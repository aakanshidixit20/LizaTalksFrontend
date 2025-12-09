// import React from 'react'

// function MostRepeatedUserQueries() {
//   return (
//     <div>MostRepeatedUserQueries</div>
//   )
// }

// export default MostRepeatedUserQueries

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

const MostRepeatedQueriesDetails = () => {
  const [filter, setFilter] = useState("month");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("keyword");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const labels = [
    "Dispensary near me",
    "Sativa vs Indica",
    "THC percentage",
    "Medical card requirements",
    "Edible dosage",
    "Delivery options",
    "California weed laws",
  ];

  const datasets = {
    week: [120, 100, 80, 75, 60, 58, 50],
    month: [400, 350, 320, 280, 250, 180, 150],
    "3months": [1100, 920, 840, 770, 710, 600, 550],
  };

  const chartData = datasets[filter];

  const rows = labels.map((label, i) => ({
    keyword: label,
    count: chartData[i],
  }));

  const processedRows = useMemo(() => {
    let data = rows.filter((row) =>
      row.keyword.toLowerCase().includes(search.toLowerCase())
    );

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
  }, [rows, search, sortField, sortOrder]);

  const totalPages = Math.ceil(processedRows.length / rowsPerPage);
  const paginatedRows = processedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const series = [{ name: "Query Count", data: chartData }];

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
      },
    },
    xaxis: { categories: labels },
    colors: [PURPLE],
    dataLabels: { enabled: false },
  };

  const exportCSV = () => {
    const csv = Papa.unparse(processedRows);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MostRepeatedQueries.csv";
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
      {/* 🔙 Back Button
      <Button
        variant="contained"
        sx={{
          mb: 2,
          backgroundColor: PURPLE,
          "&:hover": { backgroundColor: "#5A4BCB" },
          textTransform: "none"
        }}
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
      >
        Back
      </Button> */}

      {/* Title + Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Most Repeated User Queries
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>

          {/* Filter Dropdown */}
          {/* <TextField
            select
            size="small"
            sx={{
              minWidth: 150,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#c9c9c9" },
                "&:hover fieldset": { borderColor: PURPLE },
                "&.Mui-focused fieldset": { borderColor: PURPLE },
              },
            }}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="3months">Last 3 Months</MenuItem>
          </TextField> */}

          {/* Export CSV Button */}
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              borderColor: PURPLE,
              color: PURPLE,
              textTransform: "none",
              "&:hover": { backgroundColor: "#EFEAFF" },
            }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* 📊 Chart */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: "12px" }}>
        <ReactApexChart type="bar" height={400} series={series} options={chartOptions} />
      </Paper>

      {/* 🔎 Search + Table */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>
        <TextField
          placeholder="Search keyword..."
          size="small"
          sx={{
            mb: 2,
            width: "260px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#c9c9c9" },
              "&:hover fieldset": { borderColor: PURPLE },
              "&.Mui-focused fieldset": { borderColor: PURPLE },
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F3F4F6", fontWeight: 600 }}>
              <td style={{ padding: "12px" }}>
                Keyword <SortIcon fontSize="small" />
              </td>
              <td style={{ padding: "12px", textAlign: "center" }}>
                Query Count <SortIcon fontSize="small" />
              </td>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{row.keyword}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none", borderColor: "#a1a1a1", color: "#777" }}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </Button>

          <Typography sx={{ mt: 1, fontWeight: 600 }}>
            Page {page} of {totalPages}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: PURPLE,
              "&:hover": { backgroundColor: "#5A4BCB" },
              textTransform: "none",
            }}
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MostRepeatedQueriesDetails;
