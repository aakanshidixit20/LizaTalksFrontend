import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import Papa from "papaparse";

const PURPLE = "#6D5DD2";

const UserAcquisitionRetentionDetails = () => {
  const [filter] = useState("month");
  const [search, setSearch] = useState("");
  const [sortField] = useState("date");
  const [page, setPage] = useState(1);

  const rowsPerPage = 6;

  const dates = [
    "2018-09-19T00:30:00.000Z",
    "2018-09-19T01:30:00.000Z",
    "2018-09-19T02:30:00.000Z",
    "2018-09-19T03:30:00.000Z",
    "2018-09-19T04:30:00.000Z",
    "2018-09-19T05:30:00.000Z",
    "2018-09-19T06:30:00.000Z",
  ];

  const newUsers = [31, 40, 28, 51, 42, 109, 100];
  const returningUsers = [11, 32, 45, 32, 34, 52, 41];

  const rows = dates.map((d, i) => ({
    date: d,
    newUsers: newUsers[i],
    returning: returningUsers[i],
  }));

  const filtered = useMemo(() => {
    return rows.filter((r) =>
      r.date.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const series = [
    { name: "New Users", data: newUsers },
    { name: "Returning Users", data: returningUsers },
  ];

  const chartOptions = {
    chart: { type: "area", toolbar: { show: true } },
    stroke: { curve: "smooth", width: 3 },
    xaxis: { categories: dates },
    colors: [PURPLE, "#22C55E"],
    dataLabels: { enabled: false },
  };

  const exportCSV = () => {
    const csv = Papa.unparse(rows);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv]));
    link.download = "UserRetentionData.csv";
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔙 Back Button */}
      <Button
        onClick={() => window.history.back()}
        startIcon={<ArrowBackIcon sx={{ color: "#4F46E5" }} />}
        sx={{
          mb: 2,
          border: "1px solid #D4D7E2",
          fontSize: "12px",
          background: "#F8F9FF",
          color: "#4F46E5",
          textTransform: "uppercase",
          "&:hover": { background: "#EEF2FF" },
        }}
      >
        Back
      </Button>

      {/* Title */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        User Acquisition & Retention Trends — Detailed View
      </Typography>

      {/* Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <ReactApexChart type="area" height={400} options={chartOptions} series={series} />
      </Paper>

      {/* Search + Export */}
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            placeholder="Search by date..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: "260px" }}
          />

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ borderColor: PURPLE, color: PURPLE }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </Box>

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
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <Typography>Page {page} of {totalPages}</Typography>
          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserAcquisitionRetentionDetails;
