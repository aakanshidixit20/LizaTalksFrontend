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

const PURPLE = "#6D5DD2";

const MostRepeatedUserQueriesDetails = () => {
  const [filter] = useState("month");
  const [search, setSearch] = useState("");
  const [sortField] = useState("keyword");
  const [sortOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const labels = [
    "Dispensary near me",
    "Sativa vs Indica",
    "THC percentage",
    "Medical card requirements",
    "Edible dosage",
    "Delivery options",
    "California weed laws",
  ];

  const datasets = {
    week: [120, 100, 80, 75, 60, 58, 50],
    month: [400, 350, 320, 280, 250, 180, 150],
    "3months": [1100, 920, 840, 770, 710, 600, 550],
  };

  const chartData = datasets[filter];

  const rows = labels.map((label, i) => ({
    keyword: label,
    count: chartData[i],
  }));

  // SEARCH + SORT PROCESSING
  const processedRows = useMemo(() => {
    let data = [...rows];

    if (search) {
      data = data.filter((row) =>
        row.keyword.toLowerCase().includes(search.toLowerCase())
      );
    }

    data.sort((a, b) => b.count - a.count);

    return data;
  }, [rows, search]);

  const totalPages = Math.ceil(processedRows.length / rowsPerPage);
  const paginatedRows = processedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const series = [{ name: "Query Count", data: chartData }];

  const chartOptions = {
    chart: { type: "bar", toolbar: { show: true } },
    plotOptions: { bar: { horizontal: true, borderRadius: 6 } },
    xaxis: { categories: labels },
    colors: [PURPLE],
    dataLabels: { enabled: false },
  };

  const exportCSV = () => {
    const csv = Papa.unparse(processedRows);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "MostRepeatedQueries.csv";
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        onClick={() => window.history.back()}
        startIcon={<ArrowBackIcon sx={{ fontSize: 18, color: "#4F46E5" }} />}
        sx={{
          mb: 2,
          border: "1px solid #D4D7E2",
          background: "#F8F9FF",
          color: "#4F46E5",
          textTransform: "uppercase",
          fontSize: "12px",
        }}
      >
        Back
      </Button>

      <Typography variant="h5" fontWeight={700} mb={2}>
        Most Repeated User Queries
      </Typography>

      {/* CHART */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <ReactApexChart
          type="bar"
          height={400}
          series={series}
          options={chartOptions}
        />
      </Paper>

      {/* Search + Table */}
      <Paper sx={{ p: 3 }}>
        <TextField
          placeholder="Search keyword..."
          size="small"
          sx={{ mb: 2, width: "260px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F3F4F6", fontWeight: 600 }}>
              <td style={{ padding: 12 }}>Keyword</td>
              <td style={{ padding: 12, textAlign: "center" }}>
                Query Count <SortIcon fontSize="small" />
              </td>
            </tr>
          </thead>

          <tbody>
            {paginatedRows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: 10 }}>{row.keyword}</td>
                <td style={{ padding: 10, textAlign: "center" }}>
                  {row.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </Button>

          <Typography>Page {page} of {totalPages}</Typography>

          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </Box>

        {/* CSV Export */}
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          sx={{ mt: 3, borderColor: PURPLE, color: PURPLE }}
          onClick={exportCSV}
        >
          Export CSV
        </Button>
      </Paper>
    </Box>
  );
};

export default MostRepeatedUserQueriesDetails;
