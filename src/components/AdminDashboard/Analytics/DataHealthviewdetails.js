import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import HorizontalBarOne from "./Charts/HorizontalBarOne";
import { analyticsData } from "./Data/AnalyticsData";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import DateFilter from "./DateFilter";

export default function DataHealthviewdetails() {
  const navigate = useNavigate();

  // ---------- CHART DATA: use sync frequency instead of latency ----------
  const syncData =
    analyticsData?.dataHealthReliability?.productSyncFrequency || [];

  const labels = syncData.map((item) => item.storeName);
  const syncCounts = syncData.map((item) => item.syncPerMonth);

  // ---------- TABLE DATA: dataHealthReliability.productSyncFrequency ----------
  const tableData = syncData;

  // ---------- SEARCH ----------
  const [search, setSearch] = useState("");

  const filteredTable = tableData.filter((row) => {
    if (!search) return true;
    const s = search.toLowerCase();

    return (
      row.client.toLowerCase().includes(s) ||
      row.storeName.toLowerCase().includes(s) ||
      String(row.syncPerMonth).toLowerCase().includes(s)
    );
  });

  // ---------- PAGINATION ----------
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTable.length / rowsPerPage)
  );

  const paginatedData = filteredTable.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // ---------- COLUMNS ----------
  const columns = [
    {
      name: "Client Name",
      selector: (row) => row.client,
      sortable: true,
    },
    {
      name: "Store Name",
      selector: (row) => row.storeName,
      sortable: true,
    },
    {
      name: "Sync Count / Month",
      selector: (row) => row.syncPerMonth,
      sortable: true,
    },
  ];

  // ---------- EXPORT CSV ----------
  const exportCSV = () => {
    if (!filteredTable.length) return;

    const rows = filteredTable.map((row) => ({
      "Client Name": row.client,
      "Store Name": row.storeName,
      "Sync Count / Month": row.syncPerMonth,
    }));

    const headers = Object.keys(rows[0]);

    const csv = [
      headers.join(","), // header line
      ...rows.map((row) =>
        headers
          .map((key) => {
            const cell = row[key] ?? "";
            const safe = String(cell).replace(/"/g, '""');
            return `"${safe}"`;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DataHealth_Table.csv";
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 🔙 Back + DateFilter row */}
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
          Product Sync Frequency Overview
        </Typography>

        <HorizontalBarOne
          labels={labels}
          latency={syncCounts}          // 👈 yaha ab sync count ja raha hai
          title="Sync Count / Month"   // 👈 title bhi change
        />
      </Box>

      {/* ------------ TABLE SECTION ------------- */}
      <Box
        sx={{
          p: 3,
          borderRadius: "10px",
          border: "1px solid #E5E7EB",
          background: "#fff",
        }}
      >
        {/* Search + Export */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              label="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // search par page reset
              }}
            />
          </Box>

          <Button variant="contained" onClick={exportCSV}>
            Export CSV
          </Button>
        </Box>

        <DataTable columns={columns} data={paginatedData} highlightOnHover />

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            ⬅ Prev
          </Button>
          <Typography>
            Page {page} / {totalPages}
          </Typography>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next ➡
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
