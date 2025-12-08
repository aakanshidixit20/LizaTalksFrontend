import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Breadcrumbs,
  Link,
  TablePagination,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { CSVLink } from "react-csv";
 
// SAME DATA
const funnelData = [
  { stage: "Product Page Views", value: 1200, category: "Views" },
  { stage: "Added to Cart", value: 600, category: "Cart" },
  { stage: "Completed Purchase", value: 150, category: "Purchase" },
];
 
const ProductRecommendationFunnelDetails = () => {
  const navigate = useNavigate();
 
  // SEARCH FILTER
  const [search, setSearch] = useState("");
 
  // TABLE FILTERS
  const [stageFilter, setStageFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 
  // FILTER LOGIC
  const filteredData = useMemo(() => {
    return funnelData.filter((row) => {
      const matchSearch = row.stage
        .toLowerCase()
        .includes(search.toLowerCase());
 
      const matchStage =
        stageFilter === "" || row.stage === stageFilter;
 
      const matchCategory =
        categoryFilter === "" || row.category === categoryFilter;
 
      const matchMin =
        minValue === "" || row.value >= Number(minValue);
 
      const matchMax =
        maxValue === "" || row.value <= Number(maxValue);
 
      return (
        matchSearch && matchStage && matchCategory && matchMin && matchMax
      );
    });
  }, [search, stageFilter, categoryFilter, minValue, maxValue]);
 
  const getCategoryChip = (category) => {
    const colors = {
      Views: "info",
      Cart: "warning",
      Purchase: "success",
    };
    return (
      <Chip
        label={category}
        color={colors[category]}
        size="small"
        sx={{ fontWeight: 600 }}
      />
    );
  };
 
  // ⭐ SAME FUNNEL GRAPH AS MAIN PAGE (NO CHANGES)
  const chartState = {
    series: [
      {
        name: "Funnel Series",
        data: [1200, 600, 150],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
 
      plotOptions: {
        bar: {
          horizontal: true,
          isFunnel: true,
          barHeight: "48%",
          borderRadius: 6,
        },
      },
 
      fill: {
        type: "solid",
        colors: ["#6f42c1", "#6f42c1", "#6f42c1"],
      },
 
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          const percentages = ["12.0%", "6.0%", "1.5%"];
          return percentages[opt.dataPointIndex];
        },
        style: {
          fontSize: "16px",
          fontWeight: 700,
          colors: ["#ffffff"],
        },
      },
 
      xaxis: {
        categories: [
          "Product Page Views",
          "Added to Cart",
          "Completed Purchase",
        ],
        max: 1500,
        labels: { show: false },
      },
 
      yaxis: {
        labels: { show: false },
      },
 
      grid: { show: false },
      legend: { show: false },
      tooltip: { enabled: false },
    },
  };
 
  return (
    <Box p={3}>
      <Breadcrumbs sx={{ mb: 2, fontSize: "14px" }}>
        <Link underline="hover" sx={{ cursor: "pointer" }} onClick={() => navigate("/analytics")}>
          Analytics
        </Link>
        <Typography color="textPrimary">Product Funnel Details</Typography>
      </Breadcrumbs>
 
      {/* Back */}
      <Box mb={2}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            borderColor: "#6f42c1",
            color: "#6f42c1",
            "&:hover": { borderColor: "#5b34a0", color: "#5b34a0" },
          }}
        >
          ← Back
        </Button>
      </Box>
 
      {/* ⭐ SAME FUNNEL GRAPH AS MAIN PAGE */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", mb: 3 }}>
        <CardContent>
          <ReactApexChart
            options={chartState.options}
            series={chartState.series}
            type="bar"
            height={350}
          />
 
          <Box
            display="flex"
            justifyContent="space-around"
            mt={1.5}
            sx={{ fontSize: "14px", color: "#525252", fontWeight: 600 }}
          >
            <span>Product Page Views</span>
            <span>Added to Cart</span>
            <span>Completed Purchase</span>
          </Box>
        </CardContent>
      </Card>
 
      {/* SEARCH + FILTERS + EXPORT */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
        {/* SEARCH */}
        <TextField
          label="Search Stage"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 200 }}
        />
 
        {/* STAGE FILTER */}
        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel>Stage</InputLabel>
          <Select
            value={stageFilter}
            label="Stage"
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {funnelData.map((d) => (
              <MenuItem key={d.stage} value={d.stage}>
                {d.stage}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
 
        {/* EXPORT */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6f42c1",
            "&:hover": { backgroundColor: "#5b34a0" },
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          <CSVLink
            data={filteredData}
            filename={"purchase_funnel.csv"}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Export CSV
          </CSVLink>
        </Button>
      </Box>
 
      {/* TABLE */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3e8ff" }}>
                <TableCell><strong>Stage</strong></TableCell>
                <TableCell><strong>Value</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
              </TableRow>
            </TableHead>
 
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.stage}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{getCategoryChip(row.category)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
 
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
 
export default ProductRecommendationFunnelDetails;