import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarChartGradient from "./Charts/BarChartGradient";
import DataTable from "react-data-table-component";
import { analyticsData } from "./Data/AnalyticsData";

export default function BotEffectivenessDetails() {
  
  const navigate = useNavigate();

  const labels = analyticsData.clients;
  const conversionData = analyticsData.botEffectiveness.conversionRatePerClient;

  // ---------- Table Formatting with Status Colors ----------
  const tableRows = conversionData.map(item => {
    let status = "";
    let style = {};

    if (item.conversionRate > 12) {
      status = "Excellent";
      style = { bg: "#E8F9F0", border: "#10B981", text: "#065F46" };
    } else if (item.conversionRate > 7) {
      status = "Average";
      style = { bg: "#FFF4CC", border: "#F59E0B", text: "#B45309" };
    } else {
      status = "Poor";
      style = { bg: "#FFE6E6", border: "#EF4444", text: "#B91C1C" };
    }

    return { ...item, status, style };
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filtered = tableRows.filter(row =>
    row.client.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "All" || row.status === statusFilter)
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // ---------- CSV Export ----------
  const exportCSV = () => {
    const rows = filtered.map(row => ({
      Client: row.client,
      "Conversion Rate (%)": row.conversionRate,
      Status: row.status
    }));

    const file = [
      Object.keys(rows[0]).join(","), 
      ...rows.map(r => Object.values(r).join(","))
    ].join("\n");

    const blob = new Blob([file], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ConversionRate_Table.csv";
    a.click();
  };

  const columns = [
    { name: "Client", selector: row => row.client, sortable: true },
    { name: "Conversion Rate (%)", selector: row => row.conversionRate, sortable: true },
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
            textTransform: "capitalize",
          }}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>

      {/* BACK BUTTON */}
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
          borderColor: "#8B5CF6",
          color: "#8B5CF6",
          "&:hover": { background: "#8B5CF6", color: "#fff" },
        }}
      >
        ← Back
      </Button>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Conversion Rate — Detailed View
      </Typography>

      {/* CHART */}
      <Box sx={{ p: 3, background: "#fff", borderRadius: "10px", mb: 4, border: "1px solid #E5E7EB" }}>
        <Typography sx={{ mb: 2, fontWeight: 600 }}>Conversion Chart Overview</Typography>
        <BarChartGradient labels={labels} data={conversionData.map(i => i.conversionRate)} title="Conversion Rate (%)" />
      </Box>

      {/* TABLE */}
      <Box sx={{ p: 3, background: "#fff", borderRadius: "10px", border: "1px solid #E5E7EB" }}>

        {/* Filters */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField size="small" label="Search Client" value={search} onChange={e => setSearch(e.target.value)} />

            <Select size="small" sx={{ width: "140px" }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Excellent">Excellent</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="Poor">Poor</MenuItem>
            </Select>
          </Box>

          {/* 🔥 Styled Export Button */}
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              background: "#8B5CF6",
              boxShadow: "0px 4px 12px rgba(139,92,246,0.25)",
              "&:hover": { background: "#7C3AED" }
            }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </Box>

        <DataTable columns={columns} data={paginatedData} highlightOnHover />

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>⬅ Prev</Button>
          <Typography>Page {page} / {totalPages}</Typography>
          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ➡</Button>
        </Box>

      </Box>
    </Box>
  );
}
