import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import DropOffLineChart from "./Charts/DropOffLineChart";
import { analyticsData } from "./Data/AnalyticsData";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import DateFilter from "./DateFilter";

export default function FeatureDropoffDetails() {
  const navigate = useNavigate();

  // ---------- DROP-OFF LINE CHART DATA ----------
  const dropoffData = analyticsData.featurePerformance.dropOffPerFeature || [];
  const labels = dropoffData.map((i) => i.client);
  const dropoffValues = dropoffData.map((i) => i.avgSessionDurationSec);

  // ---------- TABLE DATA (MERGED) ----------
  const usageData = analyticsData.featurePerformance.featureUsageBreakdown || [];

  const tableRows = usageData.map((item) => {
    const drop = dropoffData.find((d) => d.client === item.client);

    return {
      client: item.client,
      storeName: item.storeName || "N/A",
      avgSession: drop ? drop.avgSessionDurationSec : "--",
    };
  });

  // ---------- FILTERS ----------
  const [search, setSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [storeFilter, setStoreFilter] = useState("");

  const uniqueClients = [...new Set(tableRows.map((item) => item.client))];
  const uniqueStores = [...new Set(tableRows.map((item) => item.storeName))];

  const filteredTable = tableRows.filter((row) => {
    const matchSearch =
      !search ||
      row.client.toLowerCase().includes(search.toLowerCase()) ||
      row.storeName.toLowerCase().includes(search.toLowerCase());

    return (
      matchSearch &&
      (!clientFilter || row.client === clientFilter) &&
      (!storeFilter || row.storeName === storeFilter)
    );
  });

  // ---------- PAGINATION ----------
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredTable.length / rowsPerPage));

  const displayedData = filteredTable.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // ---------- EXPORT CSV ----------
  const exportCSV = () => {
    if (!filteredTable.length) return;

    const rows = filteredTable.map((row) => ({
      Client: row.client,
      "Store Name": row.storeName,
      "Avg Session (sec)": row.avgSession,
    }));

    const csvContent = [
      Object.keys(rows[0]).join(","),
      ...rows.map((r) => Object.values(r).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Dropoff_Details.csv";
    link.click();
  };

  // ---------- TABLE COLUMNS (Client → Store → AvgSession) ----------
  const columns = [
    { name: "Client", selector: (row) => row.client, sortable: true },
    { name: "Store Name", selector: (row) => row.storeName, sortable: true },
    {
      name: "Avg. Session Duration (sec)",
      selector: (row) => row.avgSession,
      sortable: true,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* ----- BACK + FILTERS ----- */}
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

      {/* ----- HEADING ----- */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        Feature Drop-off — Detailed View
      </Typography>

      {/* ----- CHART BOX ----- */}
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
          Trend Overview
        </Typography>
        <DropOffLineChart labels={labels} data={dropoffValues} />
      </Box>

      {/* ----- TABLE BOX ----- */}
      <Box
        sx={{
          p: 3,
          background: "#fff",
          borderRadius: "10px",
          border: "1px solid #E5E7EB",
        }}
      >
        {/* SEARCH + FILTERS */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Search Box */}
            <TextField
              size="small"
              label="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            {/* ⭐ Client Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                displayEmpty
                value={clientFilter}
                onChange={(e) => {
                  setClientFilter(e.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="">
                  <em>Client Name</em>
                </MenuItem>
                {uniqueClients.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* ⭐ Store Filter */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                displayEmpty
                value={storeFilter}
                onChange={(e) => {
                  setStoreFilter(e.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="">
                  <em>Store Name</em>
                </MenuItem>
                {uniqueStores.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button variant="contained" onClick={exportCSV}>
            Export CSV
          </Button>
        </Box>

        {/* Table */}
        <DataTable columns={columns} data={displayedData} highlightOnHover />

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            gap: 2,
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
