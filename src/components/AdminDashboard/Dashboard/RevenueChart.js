"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  Card,
  Box,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

// ✅ Import JSON at top
import dashboardData from "../../../data/dashboard_overview_success.json";

// ✅ Lazy load Chart
const Chart = lazy(() => import("react-apexcharts"));

dayjs.extend(isBetween);
dayjs.extend(quarterOfYear);
dayjs.extend(isoWeek);

const RevenueChart = () => {
  const [isChartLoaded, setChartLoaded] = useState(false);
  const [filter, setFilter] = useState("Weekly");
  const [previousFilter, setPreviousFilter] = useState("Weekly"); // Track last applied filter
  const [openModal, setOpenModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [appliedRange, setAppliedRange] = useState(null);

  useEffect(() => {
    setChartLoaded(true);
  }, []);

  const rawData = dashboardData.data.daily_revenue_chart.map((item) => ({
    ...item,
    date: dayjs(item.date),
  }));

  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");
  const startOfQuarter = today.startOf("quarter");
  const endOfQuarter = today.endOf("quarter");

  // Determine filtered data
  const getFilteredData = () => {
    let filtered = [];

    if (filter === "Weekly") {
      filtered = rawData.filter((d) =>
        d.date.isBetween(startOfWeek, endOfWeek, "day", "[]")
      );
    } else if (filter === "Monthly") {
      filtered = rawData.filter((d) =>
        d.date.isBetween(startOfMonth, endOfMonth, "day", "[]")
      );
    } else if (filter === "Quarterly") {
      filtered = rawData.filter((d) =>
        d.date.isBetween(startOfQuarter, endOfQuarter, "day", "[]")
      );
    } else if (filter === "Custom" && appliedRange) {
      const from = dayjs(appliedRange.from);
      const to = dayjs(appliedRange.to);
      filtered = rawData.filter((d) =>
        d.date.isBetween(from, to, "day", "[]")
      );
    } else {
      // If Custom selected but range not applied yet, keep previous filter
      return getPreviousFilteredData();
    }

    return filtered;
  };

  const getPreviousFilteredData = () => {
    // Use the previous filter to get data
    let prev = previousFilter;
    let filtered = [];
    if (prev === "Weekly") {
      filtered = rawData.filter((d) =>
        d.date.isBetween(startOfWeek, endOfWeek, "day", "[]")
      );
    } else if (prev === "Monthly") {
      filtered = rawData.filter((d) =>
        d.date.isBetween(startOfMonth, endOfMonth, "day", "[]")
      );
    } else if (prev === "Quarterly") {
      filtered = rawData.filter((d) =>
        d.date.isBetween(startOfQuarter, endOfQuarter, "day", "[]")
      );
    }
    return filtered;
  };

  const filteredData = getFilteredData();

  // Prepare chart data
  let categories = [];
  let data = [];

  if (filter === "Weekly" || (filter === "Custom" && !appliedRange && previousFilter === "Weekly")) {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    categories = weekdays;
    data = weekdays.map((day) => {
      const dayData = filteredData.filter((d) => d.date.format("ddd") === day);
      return dayData.reduce((sum, d) => sum + d.revenue, 0);
    });
  } else if (filter === "Monthly" || (filter === "Custom" && !appliedRange && previousFilter === "Monthly")) {
    const grouped = {};
    filteredData.forEach((d) => {
      const weekStart = d.date.startOf("week");
      const label = weekStart.format("MMM D");
      grouped[label] = (grouped[label] || 0) + d.revenue;
    });
    categories = Object.keys(grouped);
    data = Object.values(grouped);
  } else if (filter === "Quarterly" || (filter === "Custom" && !appliedRange && previousFilter === "Quarterly")) {
    const months = {};
    filteredData.forEach((d) => {
      const month = d.date.format("MMM");
      months[month] = (months[month] || 0) + d.revenue;
    });
    categories = Object.keys(months);
    data = Object.values(months);
  } else {
    if (filteredData.length <= 10) {
      categories = filteredData.map((d) => d.date.format("DD/MM"));
      data = filteredData.map((d) => d.revenue);
    } else {
      const weeks = {};
      filteredData.forEach((d) => {
        const week = d.date.isoWeek();
        weeks[week] = (weeks[week] || 0) + d.revenue;
      });
      categories = Object.keys(weeks).map((w) => `Week ${w}`);
      data = Object.values(weeks);
    }
  }

  const series = [{ name: "Revenue", data }];

  const options = {
    chart: { zoom: { enabled: false }, toolbar: { show: true } },
    dataLabels: { enabled: false },
    colors: ["#605DFF"],
    stroke: { curve: "smooth" },
    title: {
      text: "Revenue Trends",
      align: "left",
      offsetX: -9,
      style: { fontWeight: "500", fontSize: "14px", color: "#64748B" },
    },
    xaxis: {
      categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { show: true, style: { colors: "#8695AA", fontSize: "12px" } },
    },
    grid: { show: true, borderColor: "#ECEEF2" },
    yaxis: {
      opposite: true,
      labels: { show: true, style: { colors: "#64748B", fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    if (value === "Custom") {
      setOpenModal(true);
    } else {
      setPreviousFilter(value);
    }
    setFilter(value);
  };

  const handleApplyCustom = () => {
    if (fromDate && toDate) {
      setAppliedRange({ from: fromDate, to: toDate });
      setPreviousFilter("Custom"); // Mark custom as applied
    }
    setOpenModal(false);
  };

  return (
    <>
      <Card sx={{ boxShadow: "none", borderRadius: "7px", mb: "25px", p: { xs: 2, sm: 3, lg: 4 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb="25px">
          <Typography variant="h3" sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700 }}>
            Revenue Chart
          </Typography>
          <Select size="small" value={filter} onChange={handleFilterChange} sx={{ minWidth: 140 }}>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Custom">Custom</MenuItem>
          </Select>
        </Box>

        <Box sx={{ mb: "-15px", minHeight: 350 }}>
          {data.length > 0 ? (
            isChartLoaded && (
              <Suspense fallback={<div>Loading chart...</div>}>
                <Chart options={options} series={series} type="area" height={350} width="100%" />
              </Suspense>
            )
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={350} gap={1} sx={{ color: "#64748B" }}>
              <WarningAmberIcon sx={{ fontSize: 40, color: "#F59E0B" }} />
              <Typography variant="body1" fontWeight={500}>No data available</Typography>
              <Typography variant="body2">Change the date range to fetch more data</Typography>
            </Box>
          )}
        </Box>
      </Card>

      {/* Custom Range Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Select Custom Date Range</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <DatePicker
                label="From Date"
                value={fromDate ? dayjs(fromDate) : null}
                onChange={(newValue) => setFromDate(newValue ? newValue.toISOString() : null)}
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: "small", sx: { width: "100%" } }, actionBar: { actions: ["clear"] } }}
              />
              <DatePicker
                label="To Date"
                value={toDate ? dayjs(toDate) : null}
                onChange={(newValue) => setToDate(newValue ? newValue.toISOString() : null)}
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: "small", sx: { width: "100%" } }, actionBar: { actions: ["clear"] } }}
              />
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="inherit">Cancel</Button>
          <Button onClick={handleApplyCustom} variant="contained" sx={{ backgroundColor: "#605DFF" }}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RevenueChart;
