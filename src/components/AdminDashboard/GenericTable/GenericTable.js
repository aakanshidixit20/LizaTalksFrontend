

import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
    Card,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
    TableHead,
    MenuItem,
    Select,
    Checkbox,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    RadioGroup,
    FormControlLabel,
    Radio,
    Slider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// (TablePaginationActions unchanged)
function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
    const theme = useTheme();
    const handleBackButtonClick = (event) => onPageChange(event, page - 1);
    const handleNextButtonClick = (event) => onPageChange(event, page + 1);

    return (
        <Box sx={{ flexShrink: 0, display: "flex", gap: 1, padding: "0 20px" }}>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

function GenericTable({
    columns,
    rows,
    showView = false,
    showEdit = false,
    showDelete = false,
    onView,
    onEdit,
    onDelete,
    title = "Table",
    subtitle = "",
    dropdownFilters = [],
    rangeFilters = [],
    dateFilters = [],
    customActions = [], // ✅ new
    customActionsHeader,
    customHeaderButtons = []
}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");

    // Filters state
    const [filters, setFilters] = useState(() => {
        let initial = {};
        dropdownFilters.forEach(colId => {
            initial[colId] = [];
        });
        rangeFilters.forEach(colId => {
            const nums = rows.map(r => Number(r[colId])).filter(n => !isNaN(n));
            const min = Math.min(...nums);
            const max = Math.max(...nums);
            initial[colId] = [min, max];
        });
        dateFilters.forEach(colId => {
            initial[colId] = { from: null, to: null };
        });
        return initial;
    });

    // Export modal
    const [exportOpen, setExportOpen] = useState(false);
    const [exportType, setExportType] = useState("csv");

    // Add state for More Filters modal
    const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

    // Utility: count filters
    const totalFilterCount =
        dropdownFilters.length +
        rangeFilters.length +
        dateFilters.length * 2;

    const inlineFiltersLimit = 2;
    const allFilters = [
        ...dropdownFilters.map(f => ({ type: "dropdown", id: f })),
        ...dateFilters.map(f => ({ type: "date", id: f })),
        ...rangeFilters.map(f => ({ type: "range", id: f }))
    ];
    const inlineFilters = allFilters.slice(0, inlineFiltersLimit);
    const moreFilters = allFilters.slice(inlineFiltersLimit);


    const handleFilterChange = (colId, value) => {
        setFilters((prev) => ({ ...prev, [colId]: value }));
    };
    const handleRangeFilterChange = (colId, newValue) => {
        setFilters(prev => ({ ...prev, [colId]: newValue }));
    };
    const handleDateFilterChange = (colId, key, value) => {
        setFilters(prev => ({
            ...prev,
            [colId]: { ...prev[colId], [key]: value }
        }));
    };



    // Filtered rows
    const filteredRows = useMemo(() => {
        let filtered = rows;

        if (searchQuery) {
            const lowerSearch = searchQuery.toLowerCase();
            filtered = filtered.filter((row) =>
                columns.some((col) => {
                    const val = col.render ? col.render(row) : row[col.id];
                    if (val === undefined || val === null) return false;
                    return val.toString().toLowerCase().includes(lowerSearch);
                })
            );
        }

        Object.entries(filters).forEach(([colId, filterVal]) => {
            if (dropdownFilters.includes(colId) && filterVal.length > 0) {
                filtered = filtered.filter(row => {
                    const val = row[colId];
                    if (Array.isArray(val)) {
                        return val.some(v => filterVal.includes(v?.toString()));
                    }
                    return filterVal.includes(val?.toString());
                });
            }

            if (rangeFilters.includes(colId)) {
                const [min, max] = filterVal;
                filtered = filtered.filter(row => {
                    const val = Number(row[colId]);
                    if (isNaN(val)) return false;
                    return val >= min && val <= max;
                });
            }

            if (dateFilters.includes(colId)) {
                const { from, to } = filterVal;
                filtered = filtered.filter(row => {
                    const val = row[colId] ? new Date(row[colId]) : null;
                    if (!val || isNaN(val.getTime())) return false;
                    if (from && val < new Date(from)) return false;
                    if (to && val > new Date(to)) return false;
                    return true;
                });
            }
        });

        return filtered;
    }, [rows, searchQuery, filters, columns, dropdownFilters, rangeFilters, dateFilters]);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Dropdown options
    const dropdownOptions = useMemo(() => {
        const options = {};
        dropdownFilters.forEach((colId) => {
            const uniqueVals = new Set();
            rows.forEach((row) => {
                let val = row[colId];
                if (Array.isArray(val)) {
                    val.forEach(v => v != null && uniqueVals.add(v.toString()));
                } else if (val != null) {
                    uniqueVals.add(val.toString());
                }
            });
            options[colId] = Array.from(uniqueVals).sort();
        });
        return options;
    }, [rows, dropdownFilters]);

    // Export
    const handleExportOpen = () => setExportOpen(true);
    const handleExportClose = () => setExportOpen(false);

    const handleClearAllFilters = () => {
        setFilters(() => {
            let initial = {};
            dropdownFilters.forEach(colId => { initial[colId] = []; });
            rangeFilters.forEach(colId => {
                const nums = rows.map(r => Number(r[colId])).filter(n => !isNaN(n));
                const min = Math.min(...nums);
                const max = Math.max(...nums);
                initial[colId] = [min, max];
            });
            dateFilters.forEach(colId => {
                initial[colId] = { from: null, to: null };
            });
            return initial;
        });
        setSearchQuery("");
    };


    const exportToCSV = () => {
        const headers = columns.map((c) => c.label);
        const csvRows = [headers.join(",")];
        filteredRows.forEach((row) => {
            const values = columns.map((col) => {
                const val = col.render ? col.render(row) : row[col.id];
                if (val == null) return "";
                const strVal = val.toString();
                if (strVal.includes(",") || strVal.includes('"')) {
                    return `"${strVal.replace(/"/g, '""')}"`;
                }
                return strVal;
            });
            csvRows.push(values.join(","));
        });
        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title.replace(/\s+/g, "_")}_${new Date().toISOString()}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const headers = columns.map(c => c.label);

        const data = filteredRows.map(row =>
            columns.map(col => {
                const val = col.render ? col.render(row) : row[col.id];
                return val == null ? "" : val.toString();
            })
        );

        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 20,
        });

        doc.save(`${title.replace(/\s+/g, "_")}_${new Date().toISOString()}.pdf`);
    };

    const handleDownload = () => {
        if (exportType === "csv") exportToCSV();
        if (exportType === "pdf") exportToPDF();
        setExportOpen(false);
    };
    return (
        <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
                <Typography variant="h5">{title}</Typography>
                {subtitle && (
                    <Typography variant="body1" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                    {/* Search + Filters */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
                        <form className="t-search-form">
                            <label><i className="material-symbols-outlined">search</i></label>
                            <input
                                type="text"
                                className="t-input"
                                placeholder="Search here....."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>

                        {/* {dropdownFilters.map((colId) => {
                            const colLabel = columns.find((c) => c.id === colId)?.label || colId;
                            const options = dropdownOptions[colId] || [];
                            const selected = filters[colId] || [];

                            const handleClearFilter = (e) => {
                                e.stopPropagation();
                                handleFilterChange(colId, []);
                            };

                            return (
                                <Select
                                    key={colId}
                                    multiple
                                    displayEmpty
                                    value={selected}
                                    onChange={(e) => handleFilterChange(colId, e.target.value)}
                                    sx={{ minWidth: 200 }}
                                    size="small"
                                    renderValue={(selected) =>
                                        selected.length > 0 ? selected.join(", ") : `Select ${colLabel}`
                                    }
                                >
                                    {selected.length > 0 && (
                                        <>
                                            <MenuItem value="__clear__" onClick={handleClearFilter}>
                                                <em>Clear Filter</em>
                                            </MenuItem>
                                        </>
                                    )}

                                    {options.map((optionVal) => (
                                        <MenuItem key={optionVal} value={optionVal}>
                                            <Checkbox checked={selected.indexOf(optionVal) > -1} />
                                            {optionVal}
                                        </MenuItem>
                                    ))}
                                </Select>
                            );
                        })} */}

                        {/* Date filters */}
                        {/* {dateFilters.map((colId) => {
                            const { from, to } = filters[colId] || {};

                            return (
                                <LocalizationProvider key={colId} dateAdapter={AdapterDayjs}>
                                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                        <DatePicker
                                            label="Select From Date"
                                            value={from ? dayjs(from) : null}
                                            onChange={(newValue) =>
                                                handleDateFilterChange(colId, "from", newValue ? newValue.toISOString() : null)
                                            }
                                            format="DD/MM/YYYY"
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    sx: { width: "180px" },
                                                },
                                                // Enable clearable button
                                                actionBar: {
                                                    actions: ["clear"], // Adds a clear button in the picker popup
                                                },
                                            }}
                                        />


                                        <DatePicker
                                            label="Select To Date"
                                            value={to ? dayjs(to) : null}
                                            onChange={(newValue) =>
                                                handleDateFilterChange(colId, "to", newValue ? newValue.toISOString() : null)
                                            }
                                            format="DD/MM/YYYY" // <-- Add this
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    sx: { width: "180px" },
                                                },
                                                actionBar: {
                                                    actions: ["clear"], // Adds a clear button in the picker popup
                                                },
                                            }}
                                        />

                                    </Box>
                                </LocalizationProvider>
                            );
                        })} */}

                        {/* Range filters */}
                        {/* {rangeFilters.map((colId) => {
                            const colLabel = columns.find((c) => c.id === colId)?.label || colId;
                            const nums = rows.map(r => Number(r[colId])).filter(n => !isNaN(n));
                            const minVal = Math.min(...nums);
                            const maxVal = Math.max(...nums);
                            return (
                                <Box key={colId} sx={{ width: 160, px: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Typography variant="caption" gutterBottom sx={{ fontWeight: 500 }}>
                                        {colLabel}
                                    </Typography>
                                    <Slider
                                        size="small"
                                        value={filters[colId]}
                                        onChange={(e, newValue) => handleRangeFilterChange(colId, newValue)}
                                        valueLabelDisplay="auto"
                                        min={minVal}
                                        max={maxVal}
                                        sx={{ height: 4, '& .MuiSlider-thumb': { width: 12, height: 12 } }}
                                    />
                                </Box>
                            );
                        })} */}


                        {/* Inline Filters */}
                        {inlineFilters.map((filter, idx) => {
                            if (filter.type === "dropdown") {
                                const colId = filter.id;
                                const colLabel = columns.find((c) => c.id === colId)?.label || colId;
                                const options = dropdownOptions[colId] || [];
                                const selected = filters[colId] || [];
                                const handleClearFilter = (e) => {
                                    e.stopPropagation();
                                    handleFilterChange(colId, []);
                                };
                                return (
                                    <Select
                                        key={colId}
                                        multiple
                                        displayEmpty
                                        value={selected}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.includes("__clear__")) {
                                                handleFilterChange(colId, []);
                                            } else {
                                                handleFilterChange(colId, value);
                                            }
                                        }}
                                        sx={{ minWidth: 200 }}
                                        size="small"
                                        renderValue={(selected) =>
                                            selected.length > 0 ? selected.join(", ") : `Select ${colLabel}`
                                        }
                                    >
                                        {selected.length > 0 && (
                                            <MenuItem value="__clear__">
                                                <em>Clear Filter</em>
                                            </MenuItem>
                                        )}

                                        {options.map((optionVal) => (
                                            <MenuItem key={optionVal} value={optionVal}>
                                                <Checkbox checked={selected.indexOf(optionVal) > -1} />
                                                {optionVal}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                );
                            }

                            if (filter.type === "date") {
                                const colId = filter.id;
                                const { from, to } = filters[colId] || {};
                                return (
                                    <LocalizationProvider key={colId} dateAdapter={AdapterDayjs}>
                                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                            <DatePicker
                                                label="Select From Date"
                                                value={from ? dayjs(from) : null}
                                                onChange={(newValue) =>
                                                    handleDateFilterChange(colId, "from", newValue ? newValue.toISOString() : null)
                                                }
                                                format="DD/MM/YYYY"
                                                slotProps={{
                                                    textField: { size: "small", sx: { width: "180px" } },
                                                    actionBar: { actions: ["clear"] }
                                                }}
                                            />
                                            <DatePicker
                                                label="Select To Date"
                                                value={to ? dayjs(to) : null}
                                                onChange={(newValue) =>
                                                    handleDateFilterChange(colId, "to", newValue ? newValue.toISOString() : null)
                                                }
                                                format="DD/MM/YYYY"
                                                slotProps={{
                                                    textField: { size: "small", sx: { width: "180px" } },
                                                    actionBar: { actions: ["clear"] }
                                                }}
                                            />
                                        </Box>
                                    </LocalizationProvider>
                                );
                            }

                            if (filter.type === "range") {
                                const colId = filter.id;
                                const colLabel = columns.find((c) => c.id === colId)?.label || colId;
                                const nums = rows.map(r => Number(r[colId])).filter(n => !isNaN(n));
                                const minVal = Math.min(...nums);
                                const maxVal = Math.max(...nums);
                                return (
                                    <Box key={colId} sx={{ width: 160, px: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <Typography variant="caption" gutterBottom sx={{ fontWeight: 500 }}>
                                            {colLabel}
                                        </Typography>
                                        <Slider
                                            size="small"
                                            value={filters[colId]}
                                            onChange={(e, newValue) => handleRangeFilterChange(colId, newValue)}
                                            valueLabelDisplay="auto"
                                            min={minVal}
                                            max={maxVal}
                                            sx={{ height: 4, '& .MuiSlider-thumb': { width: 12, height: 12 } }}
                                        />
                                    </Box>
                                );
                            }

                            return null;
                        })}

                        {/* More Filters Button */}
                        {moreFilters.length > 0 && (
                            <Button
                                variant="outlined"
                                onClick={() => setMoreFiltersOpen(true)}
                            >
                                <i className="material-symbols-outlined">filter_list</i>
                                Apply More Filters
                            </Button>
                        )}

                        {/* More Filters Modal */}
                        <Dialog
                            open={moreFiltersOpen}
                            onClose={() => setMoreFiltersOpen(false)}
                            fullWidth
                            maxWidth="sm"
                        >
                            <DialogTitle>More Filters</DialogTitle>
                            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
                                {moreFilters.map((filter, idx) => {
                                    // 🔁 Reuse the same rendering logic as above
                                    if (filter.type === "dropdown") {
                                        const colId = filter.id;
                                        const colLabel = columns.find((c) => c.id === colId)?.label || colId;
                                        const options = dropdownOptions[colId] || [];
                                        const selected = filters[colId] || [];
                                        const handleClearFilter = (e) => {
                                            e.stopPropagation();
                                            handleFilterChange(colId, []);
                                        };
                                        return (
                                            <Select
                                                key={colId}
                                                multiple
                                                displayEmpty
                                                value={selected}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value.includes("__clear__")) {
                                                        handleFilterChange(colId, []);
                                                    } else {
                                                        handleFilterChange(colId, value);
                                                    }
                                                }}
                                                sx={{ minWidth: 200 }}
                                                size="small"
                                                renderValue={(selected) =>
                                                    selected.length > 0 ? selected.join(", ") : `Select ${colLabel}`
                                                }
                                            >
                                                {selected.length > 0 && (
                                                    <MenuItem value="__clear__">
                                                        <em>Clear Filter</em>
                                                    </MenuItem>
                                                )}

                                                {options.map((optionVal) => (
                                                    <MenuItem key={optionVal} value={optionVal}>
                                                        <Checkbox checked={selected.indexOf(optionVal) > -1} />
                                                        {optionVal}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                        );
                                    }

                                    if (filter.type === "date") {
                                        const colId = filter.id;
                                        const { from, to } = filters[colId] || {};
                                        return (
                                            <LocalizationProvider key={colId} dateAdapter={AdapterDayjs}>
                                                <Box sx={{ display: "flex", gap: 2 }}>
                                                    <DatePicker
                                                        label="From Date"
                                                        value={from ? dayjs(from) : null}
                                                        onChange={(newValue) =>
                                                            handleDateFilterChange(colId, "from", newValue ? newValue.toISOString() : null)
                                                        }
                                                        format="DD/MM/YYYY"
                                                        slotProps={{
                                                            textField: { size: "small", sx: { width: "100%" } },
                                                            actionBar: { actions: ["clear"] }
                                                        }}
                                                    />
                                                    <DatePicker
                                                        label="To Date"
                                                        value={to ? dayjs(to) : null}
                                                        onChange={(newValue) =>
                                                            handleDateFilterChange(colId, "to", newValue ? newValue.toISOString() : null)
                                                        }
                                                        format="DD/MM/YYYY"
                                                        slotProps={{
                                                            textField: { size: "small", sx: { width: "100%" } },
                                                            actionBar: { actions: ["clear"] }
                                                        }}
                                                    />
                                                </Box>
                                            </LocalizationProvider>
                                        );
                                    }

                                    if (filter.type === "range") {
                                        const colId = filter.id;
                                        const colLabel = columns.find((c) => c.id === colId)?.label || colId;
                                        const nums = rows.map(r => Number(r[colId])).filter(n => !isNaN(n));
                                        const minVal = Math.min(...nums);
                                        const maxVal = Math.max(...nums);
                                        return (
                                            <Box key={colId} sx={{ width: "100%", px: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                                                <Typography variant="caption" gutterBottom sx={{ fontWeight: 500 }}>
                                                    {colLabel}
                                                </Typography>
                                                <Slider
                                                    size="small"
                                                    value={filters[colId]}
                                                    onChange={(e, newValue) => handleRangeFilterChange(colId, newValue)}
                                                    valueLabelDisplay="auto"
                                                    min={minVal}
                                                    max={maxVal}
                                                    sx={{ height: 4, '& .MuiSlider-thumb': { width: 12, height: 12 } }}
                                                />
                                            </Box>
                                        );
                                    }
                                    return null;
                                })}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setMoreFiltersOpen(false)}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>



                    {/* Buttons */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {/* ✅ Custom Header Buttons */}
                        {customHeaderButtons?.map((btn, idx) => (
                            <Button
                                key={idx}
                                variant={btn.variant || "outlined"}
                                color={btn.color || "primary"}
                                startIcon={btn.icon ? <i className="material-symbols-outlined">{btn.icon}</i> : null}
                                onClick={() => btn.onClick?.()}
                            >
                                {btn.label}
                            </Button>
                        ))}

                        {/* Export Button */}
                        <Button variant="contained" sx={{ color: "primary" }} endIcon={<DownloadIcon />} onClick={handleExportOpen}>
                            Export
                        </Button>
                    </Box>

                </Box>
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: 0 }}>
                <Table
                    sx={{
                        minWidth: 650,
                        tableLayout: "fixed",
                        "& td": { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
                        "& th": { whiteSpace: "normal", overflow: "visible", textOverflow: "unset" }
                    }}
                >
                    <TableHead className="bg-primary-50">
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.id}>{col.label}</TableCell>
                            ))}

                            {/* Default Actions column */}
                            {(showView || showEdit || showDelete) && (
                                <TableCell>Actions</TableCell>
                            )}

                            {/* Custom Actions column */}
                            {customActions.length > 0 && (
                                <TableCell>
                                    {customActionsHeader ? customActionsHeader : "Custom Actions"}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredRows.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        columns.length +
                                        (showView || showEdit || showDelete ? 1 : 0) +
                                        (customActions.length > 0 ? 1 : 0)
                                    }
                                    sx={{ textAlign: "center", py: 5 }}
                                >
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                        <i className="material-symbols-outlined" style={{ fontSize: 48, color: "#9e9e9e" }}>
                                            folder_off
                                        </i>
                                        <Typography variant="h6" color="text.secondary">
                                            No data found
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Try adjusting your filters or clear them to see all results.
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleClearAllFilters}
                                        >
                                            Clear Filters
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            (rowsPerPage > 0
                                ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : filteredRows
                            ).map((row, idx) => (
                                <TableRow key={row.id || idx} hover>
                                    {columns.map((col) => {
                                        let value = col.render ? col.render(row) : row[col.id];
                                        if (typeof value === "boolean") value = value ? "Yes" : "No";
                                        if (value == null) value = "";
                                        return <TableCell key={col.id}>{value}</TableCell>;
                                    })}

                                    {/* Default Actions */}
                                    {(showView || showEdit || showDelete) && (
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                {showView && (
                                                    <IconButton color="primary" size="small" onClick={() => onView?.(row)}>
                                                        <i className="material-symbols-outlined" style={{ fontSize: 18 }}>visibility</i>
                                                    </IconButton>
                                                )}
                                                {showEdit && (
                                                    <IconButton color="secondary" size="small" onClick={() => onEdit?.(row)}>
                                                        <i className="material-symbols-outlined" style={{ fontSize: 18 }}>edit</i>
                                                    </IconButton>
                                                )}
                                                {showDelete && (
                                                    <IconButton color="error" size="small" onClick={() => onDelete?.(row)}>
                                                        <i className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</i>
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </TableCell>
                                    )}

                                    {/* Custom Actions */}
                                    {customActions.length > 0 && (
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                {customActions.map((action, idx) => (
                                                    <IconButton
                                                        key={idx}
                                                        color={action.color || "default"}
                                                        size="small"
                                                        title={action.label}
                                                        onClick={() => action.onClick?.(row)}
                                                    >
                                                        <i className="material-symbols-outlined" style={{ fontSize: 18 }}>
                                                            {action.icon}
                                                        </i>
                                                    </IconButton>
                                                ))}
                                            </Box>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>


                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                colSpan={
                                    columns.length +
                                    (showView || showEdit || showDelete ? 1 : 0) +
                                    (customActions.length > 0 ? 1 : 0)
                                }
                                count={filteredRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                sx={{
                                    border: "none",
                                    ".MuiToolbar-root": { minHeight: "auto", marginTop: 2 }
                                }}
                            />
                        </TableRow>
                    </TableFooter>

                </Table>
            </TableContainer>

            {/* Export Modal */}
            <Dialog open={exportOpen} onClose={handleExportClose} maxWidth="xs" fullWidth>
                <DialogTitle textAlign="center">Export Data</DialogTitle>
                <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1, pb: 2 }}>
                    <RadioGroup value={exportType} onChange={(e) => setExportType(e.target.value)}>
                        <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                        <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
                    </RadioGroup>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
                    <Button variant="outlined" onClick={handleExportClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleDownload} autoFocus>Download</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

GenericTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    showView: PropTypes.bool,
    showEdit: PropTypes.bool,
    showDelete: PropTypes.bool,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    title: PropTypes.string,
    subtitle: PropTypes.string,   // ✅ added
    dropdownFilters: PropTypes.arrayOf(PropTypes.string),
    rangeFilters: PropTypes.arrayOf(PropTypes.string),
    dateFilters: PropTypes.arrayOf(PropTypes.string),
    customActionsHeader: PropTypes.string,
    customHeaderButtons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            icon: PropTypes.string,
            onClick: PropTypes.func.isRequired,
            variant: PropTypes.string, // optional
            color: PropTypes.string    // optional
        })
    ),
};


export default GenericTable;
