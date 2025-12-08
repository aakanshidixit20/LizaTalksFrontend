import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select } from "@mui/material";
import HorizontalBarOne from "./Charts/HorizontalBarOne";
import { analyticsData } from "./Data/AnalyticsData";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

export default function DataHealthviewdetails() {

  const navigate = useNavigate();

  // ---------- Chart Data ----------
  const labels = analyticsData.clients;
  const latency = analyticsData.trainingPerformanceInsights.apiResponseLatency.map(item => item.avgLatencyMs);

  // ---------- Table + Status Logic ----------
  const tableData = analyticsData.trainingPerformanceInsights.apiResponseLatency.map(item => {
    
    let status = "";
    let style = {};

    if (item.avgLatencyMs > 3000) {
      status = "Critical";
      style = { bg: "#FFE6E6", border: "#EF4444", text: "#B91C1C" };
    } else if (item.avgLatencyMs > 2000) {
      status = "Slow";
      style = { bg: "#FFF4CC", border: "#F59E0B", text: "#B45309" };
    } else {
      status = "Healthy";
      style = { bg: "#E8F9F0", border: "#10B981", text: "#065F46" };
    }

    return { ...item, status, style };
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTable = tableData.filter(row =>
    row.client.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "All" || row.status === statusFilter)
  );

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredTable.length / rowsPerPage);
  const paginatedData = filteredTable.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const exportCSV = () => {
    const rows = filteredTable.map(row => ({
      Client: row.client,
      "Latency (ms)": row.avgLatencyMs,
      Status: row.status
    }));

    const file = [
      Object.keys(rows[0]).join(","),
      ...rows.map(r => Object.values(r).join(","))
    ].join("\n");

    const blob = new Blob([file], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DataHealth_Table.csv";
    link.click();
  };

  const columns = [
    { name: "Client", selector: (row) => row.client, sortable: true },
    { name: "Latency (ms)", selector: (row) => row.avgLatencyMs, sortable: true },
    {
      name: "Status",
      cell: (row) => (
        <span
          style={{
            background: row.style.bg,
            color: row.style.text,
            border: `1.5px solid ${row.style.border}`,
            padding: "6px 14px",
            borderRadius: "18px",
            fontWeight: 600,
            fontSize: "13px",
          }}
        >
          {row.status}
        </span>
      ),
    },
  ];


  return (
    <Box sx={{ p: 3 }}>

      {/* 🔙 Back button outside top-left */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          px: 3,
          py: 1,
          fontWeight: 600,
          borderRadius: "8px",
          textTransform: "none",
          borderColor: "#6A5BFF",
          color: "#6A5BFF",
          "&:hover": { background: "#6A5BFF", color: "#fff" },
        }}
      >
        ← Back
      </Button>


      {/* ------------ CHART SECTION ------------- */}
      <Box
        sx={{
          p: 3,
          background: "#fff",
          borderRadius: "10px",
          mb: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        <Typography sx={{ fontWeight: 600, mb: 2 }}>
          Performance Overview
        </Typography>

        <HorizontalBarOne labels={labels} latency={latency} title="Avg Latency (ms)" />
      </Box>


      {/* ------------ TABLE SECTION ------------- */}
      <Box sx={{ p: 3, borderRadius: "10px", border: "1px solid #E5E7EB", background: "#fff" }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField size="small" label="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <Select size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ width: "140px" }}>
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Healthy">Healthy</MenuItem>
              <MenuItem value="Slow">Slow</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </Box>

          <Button variant="contained" onClick={exportCSV}>Export CSV</Button>
        </Box>

        <DataTable columns={columns} data={paginatedData} highlightOnHover />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>⬅ Prev</Button>
          <Typography>Page {page} / {totalPages}</Typography>
          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ➡</Button>
        </Box>

      </Box>
    </Box>
  );
}
