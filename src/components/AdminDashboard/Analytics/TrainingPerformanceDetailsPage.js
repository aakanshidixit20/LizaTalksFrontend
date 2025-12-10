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
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import BarChart from "./Charts/BarChart";
import DateFilter from "./DateFilter";   // ⭐ ADDED

// Status Classification
const classifyStatus = (latency) => {
  if (latency == null)
    return {
      label: "Unknown",
      style: { bg: "#E5E7EB", border: "#9CA3AF", text: "#374151" },
    };
  if (latency > 3000)
    return {
      label: "Critical",
      style: { bg: "#FFE6E6", border: "#EF4444", text: "#B91C1C" },
    };
  if (latency > 2000)
    return {
      label: "Slow",
      style: { bg: "#FFF4CC", border: "#F59E0B", text: "#B45309" },
    };
  return {
    label: "Healthy",
    style: { bg: "#E8F9F0", border: "#10B981", text: "#065F46" },
  };
};

const TrainingPerformanceDetailsPage = () => {
  const baseRows = useMemo(() => {
    const rawRows = [
      { clientName: "Alpha Retail", storeName: "Flagship Store", avgLatencyMs: 250 },
      { clientName: "Beta Corp", storeName: "Online Store", avgLatencyMs: 310 },
      { clientName: "Gamma Styles", storeName: "Kiosk K2", avgLatencyMs: 180 },
      { clientName: "Delta Home", storeName: "Mobile App", avgLatencyMs: 450 },
      { clientName: "Epsilon Tech", storeName: "Web Portal", avgLatencyMs: 290 },
      { clientName: "Zeta App", storeName: "Main App", avgLatencyMs: 220 },
      { clientName: "Eta Direct", storeName: "Direct API", avgLatencyMs: 350 },
    ];

    return rawRows.map((row) => {
      const fullLabel = `${row.clientName} - ${row.storeName}`;
      const status = classifyStatus(row.avgLatencyMs);
      return { ...row, fullLabel, status };
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

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage) || 1;
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const chartLabels = filteredRows.map((r) => r.fullLabel);
  const chartData = filteredRows.map((r) => r.avgLatencyMs ?? 0);

  const exportCSV = () => {
    const header = ["Client Name", "Store Name", "Avg Latency (ms)", "Status"];
    const lines = [
      header.join(","),
      ...filteredRows.map((r) =>
        [
          r.clientName,
          r.storeName,
          r.avgLatencyMs != null ? r.avgLatencyMs : "",
          r.status.label,
        ].join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "latency-data.csv";
    a.click();
  };

  return (
    <Box sx={{ p: 3 }}>
      
      {/* ⭐ BACK + DATE FILTER (same layout as FeatureDropoff) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          component={RouterLink}
          to="/analytics/training-performance"
          variant="outlined"
          sx={{
            px: 3,
            py: 1,
            textTransform: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#6A5BFF",
            borderRadius: "12px",
            border: "1.75px solid #6A5BFF",
            "&:hover": { backgroundColor: "#6A5BFF", color: "#fff" },
          }}
        >
          Back
        </Button>

        <DateFilter />   {/* ⭐ ADDED HERE – EXACTLY SAME POSITION */}
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        API Response Latency
      </Typography>

      {/* Chart */}
      <Box
        sx={{
          p: 3,
          mb: 3,
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Typography sx={{ fontWeight: 500, mb: 2 }}>
          Latency Visualization
        </Typography>

        <BarChart labels={chartLabels} data={chartData} title="Avg Latency (ms)" />
      </Box>

      {/* Table Box */}
      <Box
        sx={{
          p: 3,
          borderRadius: "10px",
          border: "1px solid #E5E7EB",
          background: "#fff",
        }}
      >
        {/* Filters */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              label="Search by client..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              sx={{ width: 140 }}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Healthy">Healthy</MenuItem>
              <MenuItem value="Slow">Slow</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </Box>

          <Button
            variant="contained"
            onClick={exportCSV}
            sx={{
              textTransform: "none",
              background: "#6A5BFF",
              borderRadius: "8px",
              fontWeight: 600,
              "&:hover": { background: "#5444ff" },
            }}
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
                <TableCell>{row.avgLatencyMs} ms</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      backgroundColor: row.status.style.bg,
                      color: row.status.style.text,
                      border: `1.5px solid ${row.status.style.border}`,
                      borderRadius: "18px",
                      px: 2,
                      py: 0.5,
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    {row.status.label}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            ⬅ Prev
          </Button>

          <Typography>
            Page {page} / {totalPages}
          </Typography>

          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next ➡
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TrainingPerformanceDetailsPage;
