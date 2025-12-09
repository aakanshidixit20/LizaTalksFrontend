import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HorizontalBar from "./Charts/HorizontalBar";
import DataTable from "react-data-table-component";
import { analyticsData } from "./Data/AnalyticsData";
import DateFilter from "./DateFilter";
export default function FallbackDetails() {
  
  const navigate = useNavigate();

  const labels = analyticsData.clients;
  const fallbackData = analyticsData.botEffectiveness.fallbackErrorRatePerClient;

  const tableRows = fallbackData.map(item => {
    let status = "";
    let style = {};

    if (item.errorCount < 30) {
      status = "Stable";
      style = { bg: "#E8F9F0", border: "#10B981", text: "#065F46" };
    } else if (item.errorCount < 60) {
      status = "Warning";
      style = { bg: "#FFF4CC", border: "#F59E0B", text: "#B45309" };
    } else {
      status = "Critical";
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

  const exportCSV = () => {
    const rows = filtered.map(row => ({
      Client: row.client,
      "Error Count": row.errorCount,
      Status: row.status
    }));

    const file = [
      Object.keys(rows[0]).join(","), 
      ...rows.map(r => Object.values(r).join(","))
    ].join("\n");

    const blob = new Blob([file], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Fallback_Error_Table.csv";
    a.click();
  };

  const columns = [
    { name: "Client", selector: row => row.client, sortable: true },
    { name: "Error Count", selector: row => row.errorCount, sortable: true },

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


      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Fallback/Error Rate — Detailed View
      </Typography>

      <Box sx={{ p: 3, background: "#fff", borderRadius: "10px", mb: 4, border: "1px solid #E5E7EB" }}>
        <Typography sx={{ mb: 2, fontWeight: 600 }}>Error Rate Chart Overview</Typography>
        <HorizontalBar labels={labels} data={fallbackData.map(i => i.errorCount)} title="Fallback/Error Rate" />
      </Box>

      <Box sx={{ p: 3, background: "#fff", borderRadius: "10px", border: "1px solid #E5E7EB" }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField size="small" label="Search Client" value={search} onChange={e => setSearch(e.target.value)} />

            <Select size="small" sx={{ width: "140px" }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Stable">Stable</MenuItem>
              <MenuItem value="Warning">Warning</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </Box>

          {/* 🔥 Only this button style updated */}
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              background: "#6A5BFF",
              "&:hover": { background: "#0F6CD6" },
            }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
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
