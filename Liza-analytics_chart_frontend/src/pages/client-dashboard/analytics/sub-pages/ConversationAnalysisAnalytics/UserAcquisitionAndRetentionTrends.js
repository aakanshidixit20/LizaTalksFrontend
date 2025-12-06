// import React from 'react'

// function UserAcquisitionAndRetentionTrends() {
//   return (
//     <div>UserAcquisition&RetentionTrends</div>
//   )
// }

// export default UserAcquisitionAndRetentionTrends

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

const UserAcquisitionRetentionDetails = () => {

  const [filter, setFilter] = useState("month");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const rowsPerPage = 6;

  // Labels (x-axis / table rows)
  const dates = [
    "2018-09-19T00:30:00.000Z",
    "2018-09-19T01:30:00.000Z",
    "2018-09-19T02:30:00.000Z",
    "2018-09-19T03:30:00.000Z",
    "2018-09-19T04:30:00.000Z",
    "2018-09-19T05:30:00.000Z",
    "2018-09-19T06:30:00.000Z",
  ];

  // Mock filter change data
  const datasetNew = {
    week: [10, 20, 15, 25, 18, 30, 27],
    month: [31, 40, 28, 51, 42, 109, 100],
    "3months": [80, 120, 130, 140, 160, 170, 150],
  };

  const datasetReturning = {
    week: [5, 10, 12, 17, 14, 21, 19],
    month: [11, 32, 45, 32, 34, 52, 41],
    "3months": [55, 75, 90, 120, 140, 130, 110],
  };

  const newUsers = datasetNew[filter];
  const returningUsers = datasetReturning[filter];

  // Table structured data
  const rows = dates.map((date, i) => ({
    date,
    newUsers: newUsers[i],
    returning: returningUsers[i],
  }));

  // Apply sorting + searching
  const processedRows = useMemo(() => {
    let data = rows.filter((r) =>
      r.date.toLowerCase().includes(search.toLowerCase())
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
  }, [search, sortField, sortOrder, filter]);

  // Pagination
  const totalPages = Math.ceil(processedRows.length / rowsPerPage);
  const paginated = processedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Chart config
  const chartSeries = [
    { name: "New Users", data: newUsers },
    { name: "Returning Users", data: returningUsers },
  ];

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: true },
    },
    stroke: { curve: "smooth", width: 3 },
    xaxis: {
      categories: dates,
      labels: { rotate: -30 },
    },
    colors: [PURPLE, "#22C55E"],
    dataLabels: { enabled: false },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 0.5, opacityFrom: 0.4, opacityTo: 0.1 },
    },
  };

  // CSV Export
  const exportCSV = () => {
    const csv = Papa.unparse(processedRows);
    const file = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "UserTrends.csv";
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>

      {/* 🔙 Back button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: PURPLE,
          "&:hover": { bgcolor: "#5A4BCB" },
          textTransform: "none",
          mb: 2,
        }}
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
      >
        Back
      </Button>

      {/* Title + Filter row */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          User Acquisition & Retention Trends
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Filter */}
          {/* <TextField
            select
            size="small"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            sx={{
              minWidth: 160,
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: PURPLE,
              },
            }}
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="3months">Last 3 Months</MenuItem>
          </TextField> */}

          {/* Export */}
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              borderColor: PURPLE,
              color: PURPLE,
              textTransform: "none",
            }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* 📊 Chart */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: "12px" }}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          New vs. Returning Users Daily Volume
        </Typography>

        <ReactApexChart type="area" height={400} options={chartOptions} series={chartSeries} />
      </Paper>

      {/* Search + Table */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>
        <TextField
          placeholder="Search by date..."
          size="small"
          sx={{ mb: 2, width: "260px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#EFEAFF", fontWeight: 600 }}>
              <td style={{ padding: 12 }}>Date <SortIcon fontSize="small" /></td>
              <td style={{ padding: 12, textAlign: "center" }}>New Users</td>
              <td style={{ padding: 12, textAlign: "center" }}>Returning Users</td>
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 12 }}>{row.date}</td>
                <td style={{ padding: 12, textAlign: "center" }}>{row.newUsers}</td>
                <td style={{ padding: 12, textAlign: "center" }}>{row.returning}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            sx={{ textTransform: "none", color: "#666" }}
          >
            Prev
          </Button>

          <Typography fontWeight={600}>Page {page} of {totalPages}</Typography>

          <Button
            variant="contained"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            sx={{ bgcolor: PURPLE, "&:hover": { bgcolor: "#5A4BCB" }, textTransform: "none" }}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserAcquisitionRetentionDetails;
