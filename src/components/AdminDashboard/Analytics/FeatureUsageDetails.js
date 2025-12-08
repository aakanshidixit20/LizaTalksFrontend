import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select } from "@mui/material";
import DonutChart from "./Charts/DonutChart";
import { analyticsData } from "./Data/AnalyticsData";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

export default function FeatureUsageDetails() {

  const navigate = useNavigate();

  // Chart Data
  const labels = analyticsData.featurePerformance.featureUsageBreakdown.map(i => i.client);
  const values = analyticsData.featurePerformance.featureUsageBreakdown.map(
    i => i.usage.generalChat + i.usage.storeInquiry + i.usage.productSuggestion
  );

  // Table Data With Status Logic
  const tableRows = analyticsData.featurePerformance.featureUsageBreakdown.map(item => {

    let status = "";
    let style = {};

    if (item.usage.generalChat + item.usage.storeInquiry + item.usage.productSuggestion > 300) {
      status = "High Usage";
      style = { bg: "#E8F9F0", text: "#065F46", border: "#10B981" };
    } 
    else if (item.usage.generalChat + item.usage.storeInquiry + item.usage.productSuggestion > 150) {
      status = "Moderate";
      style = { bg: "#FFF4CC", text: "#B45309", border: "#F59E0B" };
    } 
    else {
      status = "Low Usage";
      style = { bg: "#FFE6E6", text: "#B91C1C", border: "#EF4444" };
    }

    return { 
      client: item.client,
      totalUsage: item.usage.generalChat + item.usage.storeInquiry + item.usage.productSuggestion,
      status,
      style
    };
  });

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = tableRows.filter(r =>
    r.client.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus === "All" || filterStatus === r.status)
  );

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const displayedRows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Export CSV
  const exportCSV = () => {
    const rows = filtered.map(row => ({
      Client: row.client,
      Usage: row.totalUsage,
      Status: row.status
    }));

    const content = [
      Object.keys(rows[0]).join(","),
      ...rows.map(r => Object.values(r).join(","))
    ].join("\n");

    const file = new Blob([content], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "FeatureUsage_Report.csv";
    link.click();
  };

  // Table Columns
  const columns = [
    { name: "Client", selector: row => row.client, sortable: true },
    { name: "Total Usage", selector: row => row.totalUsage, sortable: true },
    {
      name: "Status",
      cell: (row) => (
        <span
          style={{
            padding: "6px 14px",
            borderRadius: "18px",
            fontWeight: 600,
            border: `1px solid ${row.style.border}`,
            background: row.style.bg,
            color: row.style.text
          }}
        >
          {row.status}
        </span>
      ),
    }
  ];

  return (
    <Box sx={{ p: 3 }}>

      {/* Back Button */}
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
        Feature Usage — Detailed View
      </Typography>

      {/* Chart */}
      <Box sx={{ p: 3, background: "#fff", borderRadius: "10px", mb: 4, border: "1px solid #E5E7EB" }}>
        <Typography sx={{ fontWeight: 600, mb: 2 }}>Usage Distribution</Typography>
        <DonutChart labels={labels} data={values} />
      </Box>

      {/* Table */}
      <Box sx={{ p: 3, background: "#fff", borderRadius: "10px", border: "1px solid #E5E7EB" }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField size="small" label="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />

            <Select size="small" sx={{ width: "150px" }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="High Usage">High Usage</MenuItem>
              <MenuItem value="Moderate">Moderate</MenuItem>
              <MenuItem value="Low Usage">Low Usage</MenuItem>
            </Select>
          </Box>

          <Button variant="contained" onClick={exportCSV}>Export CSV</Button>
        </Box>

        <DataTable columns={columns} data={displayedRows} highlightOnHover />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>⬅ Prev</Button>
          <Typography>Page {page} / {totalPages}</Typography>
          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next ➡</Button>
        </Box>

      </Box>

    </Box>
  );
}
