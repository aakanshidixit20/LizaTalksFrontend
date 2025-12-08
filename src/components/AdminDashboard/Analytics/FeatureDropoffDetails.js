import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select } from "@mui/material";
import DropOffLineChart from "./Charts/DropOffLineChart";
import { analyticsData } from "./Data/AnalyticsData";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

export default function FeatureDropoffDetails() {

  const navigate = useNavigate();

  // -------- Line Chart Data --------
  const labels = analyticsData.clients;
  const dropoffValues = analyticsData.featurePerformance.dropOffPerFeature.map(i => i.avgSessionDurationSec);

  // -------- Table Data With Status Logic --------
  const tableRows = analyticsData.featurePerformance.dropOffPerFeature.map(item => {
    let status = "";
    let style = {};

    if (item.avgSessionDurationSec > 30) {
      status = "Critical";
      style = { bg: "#FFE6E6", border: "#EF4444", text: "#B91C1C" };
    } else if (item.avgSessionDurationSec > 15) {
      status = "Warning";
      style = { bg: "#FFF4CC", border: "#F59E0B", text: "#B45309" };
    } else {
      status = "Stable";
      style = { bg: "#E8F9F0", border: "#10B981", text: "#065F46" };
    }

    return { ...item, status, style };
  });

  // -------- Filters + Pagination --------
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTable = tableRows.filter(row =>
    row.client.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "All" || row.status === statusFilter)
  );

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredTable.length / rowsPerPage);
  const displayedData = filteredTable.slice((page - 1) * rowsPerPage, page * rowsPerPage);


  // -------- Export CSV --------
  const exportCSV = () => {
    const rows = filteredTable.map(row => ({
      Client: row.client,
      "Drop-off Value": row.avgSessionDurationSec,
      Status: row.status
    }));

    const csvContent = [
      Object.keys(rows[0]).join(","), 
      ...rows.map(r => Object.values(r).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "FeatureDropoff_Data.csv";
    a.click();
  };


  // -------- Table Columns --------
  const columns = [
    { name: "Client", selector: row => row.client, sortable: true },
    { name: "Drop-off Value", selector: row => row.avgSessionDurationSec, sortable: true },
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
          borderColor: "#6A5BFF",
          color: "#6A5BFF",
          "&:hover": { background: "#6A5BFF", color: "#fff" },
        }}
      >
        ← Back
      </Button>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Feature Drop-off — Detailed View
      </Typography>


      {/* -------- Chart Box -------- */}
      <Box sx={{ p: 3, background: "#fff", borderRadius: "10px", mb: 4, border: "1px solid #E5E7EB" }}>
        <Typography sx={{ mb: 2, fontWeight: 600 }}>Trend Overview</Typography>
        <DropOffLineChart labels={labels} data={dropoffValues} />
      </Box>


      {/* -------- Table Section -------- */}
      <Box sx={{ p: 3, background: "#fff", borderRadius: "10px", border: "1px solid #E5E7EB" }}>

        {/* Search + Filters + Export */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField size="small" label="Search..." value={search} onChange={e => setSearch(e.target.value)} />

            <Select size="small" sx={{ width: "140px" }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Stable">Stable</MenuItem>
              <MenuItem value="Warning">Warning</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </Box>

          <Button variant="contained" onClick={exportCSV}>Export CSV</Button>
        </Box>

        <DataTable columns={columns} data={displayedData} highlightOnHover />

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
