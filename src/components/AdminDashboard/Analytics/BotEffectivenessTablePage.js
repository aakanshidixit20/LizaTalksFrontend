import React, { useState, useMemo } from "react";
import DateFilter from "./DateFilter";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  MenuItem,
  Button,
  TablePagination,
  Grid,
  FormControl,
  Select
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

import { analyticsData } from "../Analytics/Data/AnalyticsData";

export default function BotEffectivenessTablePage() {
  const navigate = useNavigate();

  const rawData = analyticsData.botEffectiveness.engagementRatePerClient;

  const uniqueClients = [...new Set(rawData.map((item) => item.client))];

  const [clientFilter, setClientFilter] = useState("");
  const [creditsFilter, setCreditsFilter] = useState("");

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("creditsSpent");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filteredRows = useMemo(() => {
    let result = [...rawData];

    if (search.trim()) {
      result = result.filter((row) =>
        row.client.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (clientFilter) {
      result = result.filter((row) => row.client === clientFilter);
    }

    if (creditsFilter === "high") {
      result = result.filter((row) => row.creditsSpent >= 4000);
    } else if (creditsFilter === "medium") {
      result = result.filter(
        (row) => row.creditsSpent >= 2500 && row.creditsSpent < 4000
      );
    } else if (creditsFilter === "low") {
      result = result.filter((row) => row.creditsSpent < 2500);
    }

    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return order === "asc" ? valA - valB : valB - valA;
    });

    return result;
  }, [search, clientFilter, creditsFilter, sortField, order]);

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalCredits = rawData.reduce(
    (sum, item) => sum + item.creditsSpent,
    0
  );

  const exportCSV = () => {
    const csv = Papa.unparse(filteredRows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "client-credits-data.csv";
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>

      {/* BACK & DATE FILTER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            px: 2.5,
            py: 1,
            fontWeight: 600,
            borderRadius: "8px",
            textTransform: "none",
            borderColor: "#6A5BFF",
            color: "#6A5BFF",
            "&:hover": { background: "#6A5BFF", color: "#fff" }
          }}
        >
          Back
        </Button>

        <DateFilter />
      </Box>

      {/* TITLE */}
      <Box sx={{ mb: 1.5 }}>
        <Typography fontWeight={600} fontSize="18px" sx={{ color: "#000" }}>
          Engagement Rate per Client
        </Typography>

        <Typography fontSize="13px" sx={{ color: "#7A7A7A", mb: 2 }}>
          Credits spent per client
        </Typography>
      </Box>

      {/* SUMMARY CARD */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.04)"
        }}
      >
        <Grid
          container
          sx={{
            fontWeight: 600,
            mb: 1,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Grid item>Client</Grid>
          <Grid item>Credits</Grid>
        </Grid>

        {rawData.map((item, index) => (
          <Grid
            container
            key={index}
            sx={{
              py: 1.3,
              borderBottom:
                index !== rawData.length - 1 ? "1px solid #EEE" : "none",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Typography fontSize="15px" fontWeight={500}>
              {item.client}
            </Typography>

            <Typography
              fontSize="15px"
              fontWeight={600}
              color="grey"
              textAlign="right"
            >
              {item.creditsSpent.toLocaleString()}
            </Typography>
          </Grid>
        ))}

        <Grid
          container
          sx={{
            py: 1.5,
            mt: 1.5,
            borderTop: "2px solid #ddd",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Typography fontSize="15px" fontWeight={700}>
            Total
          </Typography>

          <Typography
            fontSize="15px"
            fontWeight={800}
            color="#4A3EF5"
            textAlign="right"
          >
            {totalCredits.toLocaleString()}
          </Typography>
        </Grid>
      </Paper>

      {/* FULL TABLE */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>

        {/* FILTERS + EXPORT (FIXED LAYOUT) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2
          }}
        >
          {/* LEFT FILTERS */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              placeholder="Search client..."
              size="small"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              sx={{ maxWidth: 240 }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                displayEmpty
                value={clientFilter}
                onChange={(e) => {
                  setClientFilter(e.target.value);
                  setPage(0);
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

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                displayEmpty
                value={creditsFilter}
                onChange={(e) => {
                  setCreditsFilter(e.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value="">
                  <em>Credits Filter</em>
                </MenuItem>
                <MenuItem value="high">High (≥ 4000)</MenuItem>
                <MenuItem value="medium">Medium (2500–3999)</MenuItem>
                <MenuItem value="low">Low (&lt; 2500)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* RIGHT SIDE EXPORT BUTTON */}
          <Button
            variant="contained"
            onClick={exportCSV}
            sx={{
              textTransform: "none",
              background: "#6A5BFF",
              borderRadius: "8px",
              px: 2,
              "&:hover": { background: "#5444ff" }
            }}
          >
            Export CSV
          </Button>
        </Box>

        {/* TABLE */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#F8FAFC" }}>
                <TableCell
                  sx={{ fontWeight: 700, cursor: "pointer" }}
                  onClick={() => setSortField("client")}
                >
                  CLIENT NAME
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 700,
                    textAlign: "right",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setSortField("creditsSpent");
                    setOrder(order === "asc" ? "desc" : "asc");
                  }}
                >
                  CREDITS {order === "asc" ? "↑" : "↓"}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.client}</TableCell>

                  <TableCell
                    sx={{
                      textAlign: "right",
                      fontWeight: 600,
                      color: "#6A5BFF"
                    }}
                  >
                    {row.creditsSpent.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPageOptions={[]}
        />
      </Paper>
    </Box>
  );
}
