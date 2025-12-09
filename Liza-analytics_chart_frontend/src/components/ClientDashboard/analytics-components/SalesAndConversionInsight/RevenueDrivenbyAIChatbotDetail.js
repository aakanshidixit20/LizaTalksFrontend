import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RevenueDrivenbyAIChatbotDetail = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const graphState = {
    series: [44, 55, 13, 33],
    options: {
      chart: { type: "donut" },
      labels: ["Product A", "Product B", "Product C", "Product D"],
      legend: { position: "right" },
    },
  };

  const tableData = [
    { product: "Product A", revenue: "$4,500" },
    { product: "Product B", revenue: "$3,200" },
    { product: "Product C", revenue: "$1,800" },
    { product: "Product D", revenue: "$1,200" },
  ];

  return (
    <Box width="100%" p={2}>

      <Box mb={2}>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ borderRadius: 2 }}>
          ← Back
        </Button>
      </Box>

      <Card sx={{ width: "100%", borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <CardContent>

          <Typography variant="h5" fontWeight={600} mb={2}>
            Revenue Driven by AI Chatbot — Details
          </Typography>

          {/* Graph */}
          <Box display="flex" justifyContent="center" mb={4}>
            <ReactApexChart
              options={graphState.options}
              series={graphState.series}
              type="donut"
              width={400}
            />
          </Box>

          {/* Search + Additional Button (Export or Filter) */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
            <TextField
              label="Search Product..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Box display="flex" gap={2}>
              <Button variant="contained" color="primary">
                Export
              </Button>
              {/* You can add more buttons here if needed */}
              <Button variant="outlined" color="secondary">
                Filter
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell><strong>Revenue</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData
                .filter((item) =>
                  item.product.toLowerCase().includes(search.toLowerCase())
                )
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>{row.revenue}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>
    </Box>
  );
};

export default RevenueDrivenbyAIChatbotDetail;