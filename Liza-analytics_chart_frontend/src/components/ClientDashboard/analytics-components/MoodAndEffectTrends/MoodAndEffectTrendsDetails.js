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

export default function MoodAndEffectTrendsDetails() {
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

  const handleSearch = (e) => applyFilters(e.target.value, filterSeverity, sortOption);
  const handleSeverityFilter = (value) => {
    setFilterSeverity(value);
    applyFilters("", value, sortOption);
  };
  const handleSort = (value) => {
    setSortOption(value);
    applyFilters("", filterSeverity, value);
  };

  // CSV Export
  const exportCSV = () => {
    const header = "Mood,Requests,Percentage,Severity\n";
    const csvRows = rows
      .map((r) => `${r.mood},${r.requests},${r.percentage},${r.severity}`)
      .join("\n");

    const blob = new Blob([header + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Mood_Insights.csv";
    a.click();
  };

  return (
    <Box p={3}>
      {/* Back Button */}
      <Button
        onClick={() => navigate("/analytics")}
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

      {/* Table Card */}
      <Box
        sx={{
          background: "#fff",
          p: 3,
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        }}
      >
        {/* Filters */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              placeholder="Search Mood..."
              size="small"
              sx={{ width: "180px" }}
              onChange={handleSearch}
            />

            <Select
              value={filterSeverity}
              size="small"
              displayEmpty
              sx={{ width: "180px" }}
              onChange={(e) => handleSeverityFilter(e.target.value)}
            >
              <MenuItem value="">Filter Severity</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Moderate">Moderate</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>

            <Select
              value={sortOption}
              size="small"
              displayEmpty
              sx={{ width: "180px" }}
              onChange={(e) => handleSort(e.target.value)}
            >
              <MenuItem value="">Sort Requests</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </Box>

          <Button
            variant="contained"
            sx={{ background: "#6366F1", textTransform: "none" }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </Box>

        {/* Table */}
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
