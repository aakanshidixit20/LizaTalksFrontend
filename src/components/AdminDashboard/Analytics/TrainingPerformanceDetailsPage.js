import React, { useMemo, useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BarChart from "./Charts/BarChart";
import DateFilter from "./DateFilter";
import { analyticsData } from "./Data/AnalyticsData";

const classifyStatus = (latency) => {
  if (latency == null) return { label: "Unknown", style: { bg: "#E5E7EB", border: "#9CA3AF", text: "#374151" } };
  if (latency > 3000) return { label: "Critical", style: { bg: "#FFE6E6", border: "#EF4444", text: "#B91C1C" } };
  if (latency > 2000) return { label: "Slow", style: { bg: "#FFF4CC", border: "#F59E0B", text: "#B45309" } };
  return { label: "Healthy", style: { bg: "#E8F9F0", border: "#10B981", text: "#065F46" } };
};

const TrainingPerformanceDetailsPage = () => {
  const navigate = useNavigate();

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

  // ⭐ Missing states added
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // ⭐ Apply filters
  const filteredRows = useMemo(() => {
    let rows = [...baseRows];

    if (search) {
      rows = rows.filter((r) =>
        r.clientName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      rows = rows.filter((r) => r.status.label === statusFilter);
    }

    rows.sort((a, b) =>
      sortDirection === "asc" ? a.avgLatencyMs - b.avgLatencyMs : b.avgLatencyMs - a.avgLatencyMs
    );

    return rows;
  }, [baseRows, search, statusFilter, sortDirection]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const paginatedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const chartLabels = filteredRows.map((r) => r.clientName);
  const chartData = filteredRows.map((r) => r.avgLatencyMs);

  const exportCSV = () => {
    const header = "Client,Store,Latency,Status\n";
    const rows = filteredRows
      .map((r) => `${r.clientName},${r.storeName},${r.avgLatencyMs},${r.status.label}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "latency-report.csv";
    a.click();
  };

  return (
    <Box>
     <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
    }}
  >
    <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,
              px: 2.5,
              py: 1,
              fontWeight: 600,
              borderRadius: "8px",
              textTransform: "none",
              borderColor: "#6A5BFF",
              color: "#6A5BFF",
              "&:hover": { background: "#6A5BFF", color: "#fff" },
            }}
          >
             Back
          </Button>
    
    <DateFilter />
  </Box>


      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        API Response Latency Details
      </Typography>

      <Box sx={{ p: 3, border: "1px solid #E5E7EB", mb: 3 }}>
        <BarChart labels={chartLabels} data={chartData} />
      </Box>

      <Box sx={{ p: 3, border: "1px solid #E5E7EB" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            label="Search Client"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={statusFilter} size="small" onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Healthy">Healthy</MenuItem>
            <MenuItem value="Slow">Slow</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>

          <Button onClick={exportCSV} size="small" variant="outlined">
            Export CSV
          </Button>
        </Box>

        <Table>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.clientName}>
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.storeName}</TableCell>
                <TableCell>{row.avgLatencyMs} ms</TableCell>
                <TableCell>{row.status.label}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default TrainingPerformanceDetailsPage;
