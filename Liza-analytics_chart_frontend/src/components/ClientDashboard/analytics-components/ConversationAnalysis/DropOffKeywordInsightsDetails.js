import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import Papa from "papaparse";

// THEME COLORS
const PURPLE = "#6D5DD2";
const GREEN = "#2ECC71";

// LABELS + STATIC DATA
const LABELS = [
  "Effects of Indica vs Sativa",
  "CBD oil for anxiety dosage",
  "Dispensary near me THC &CBD",
  "Difference between THC &CBD",
  "How to get a medical card",
  "[State] weed laws",
  "Best vape pens 2024",
];

const DATASET = {
  week: [12, 20, 14, 10, 6, 18, 9],
  month: [44, 55, 41, 37, 22, 43, 21],
  "3months": [120, 140, 110, 98, 90, 130, 95],
};

const RESUMED = {
  week: [15, 18, 11, 17, 4, 14, 10],
  month: [53, 32, 33, 52, 13, 43, 32],
  "3months": [150, 130, 125, 160, 70, 140, 120],
};

const DropOffKeywordInsightsDetails = () => {
  const [filter, setFilter] = useState("month");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("keyword");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const rowsPerPage = 6;

  // Chart Data
  const dropoffData = DATASET[filter];
  const resumeData = RESUMED[filter];

  const chartSeries = [
    { name: "Permanent Drop-off", data: dropoffData },
    { name: "Resumed Session", data: resumeData },
  ];

  const chartOptions = {
    chart: { stacked: true, toolbar: { show: true } },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: { total: { enabled: true, style: { fontWeight: 600 } } },
      },
    },
    colors: [PURPLE, GREEN],
    legend: { position: "top", horizontalAlign: "left" },
    xaxis: { categories: LABELS },
  };

  // Table Data
  const tableData = LABELS.map((label, i) => ({
    keyword: label,
    dropoff: dropoffData[i],
    resumed: resumeData[i],
  }));

  const processedRows = useMemo(() => {
    let rows = [...tableData];

    if (search.trim()) {
      rows = rows.filter((row) =>
        row.keyword.toLowerCase().includes(search.toLowerCase())
      );
    }

    rows.sort((a, b) => {
      if (sortOrder === "asc") return a[sortField] > b[sortField] ? 1 : -1;
      return a[sortField] < b[sortField] ? 1 : -1;
    });

    return rows;
  }, [search, sortField, sortOrder, filter]);

  const totalPages = Math.ceil(processedRows.length / rowsPerPage);
  const paginatedRows = processedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // CSV EXPORT
  const exportCSV = () => {
    const csv = Papa.unparse(processedRows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "DropoffInsights.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ px: 3, pt: 1.2, pb: 3 }}>
      
      {/* BACK BUTTON */}
      <Button
        onClick={() => window.history.back()}
        startIcon={<ArrowBackIcon sx={{ fontSize: 18, color: PURPLE }} />}
        sx={{
          mb: 2,
          mt: -1,
          fontSize: "12px",
          textTransform: "uppercase",
          background: "#F8F9FF",
          border: "1px solid #D4D7E2",
          borderRadius: "6px",
          color: PURPLE,
          "&:hover": { background: "#EEF2FF" },
          px: 2,
        }}
      >
        Back
      </Button>

      {/* CHART SECTION */}
      <Paper sx={{ p: 3, borderRadius: "12px", mb: 4 }}>
        <Typography fontWeight={600} mb={1} fontSize="16px">
          User Drop-offs vs Resumed Sessions
        </Typography>

        <ReactApexChart
          type="bar"
          height={400}
          options={chartOptions}
          series={chartSeries}
        />
      </Paper>

      {/* TABLE SECTION */}
      <Paper sx={{ p: 3, borderRadius: "12px" }}>
        
        {/* Header Controls */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            placeholder="Search keyword..."
            size="small"
            sx={{ width: "260px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ textTransform: "none", borderColor: PURPLE, color: PURPLE }}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </Box>

        {/* TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#EFEAFF", fontWeight: 600 }}>
              <td
                style={{ padding: 12, cursor: "pointer" }}
                onClick={() => {
                  setSortField("keyword");
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                Keyword <SortIcon fontSize="small" />
              </td>
              <td style={{ padding: 12, textAlign: "center" }}>Drop-off</td>
              <td style={{ padding: 12, textAlign: "center" }}>Resumed</td>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 12 }}>{row.keyword}</td>
                <td style={{ padding: 12, textAlign: "center" }}>{row.dropoff}</td>
                <td style={{ padding: 12, textAlign: "center" }}>{row.resumed}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <Typography>Page {page} of {totalPages}</Typography>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            variant="contained"
            sx={{ bgcolor: PURPLE }}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DropOffKeywordInsightsDetails;
