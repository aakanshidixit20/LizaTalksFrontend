"use client";

import React, { useState } from "react";
import {
  Card,
  Box,
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: "flex",
        gap: "10px",
        padding: "0 20px",
      }}
    >
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        sx={{
          borderRadius: "4px",
          padding: "4px",
        }}
        className="border"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        sx={{
          borderRadius: "4px",
          padding: "4px",
        }}
        className="border"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </Box>
  );
}

function createData(id, timestamp, type, content, status) {
  return {
    id,
    timestamp,
    type,
    content,
    status,
  };
}

const rows = [
  createData(
    "#JAN-850",
    "01 Dec 2024 09:30 AM",
    "Information",
    "New software update available. Click here to download.",
    "unread"
  ),
  createData(
    "#JAN-849",
    "30 Nov 2024 09:30 AM",
    "Alert",
    "Urgent: Server maintenance scheduled for tomorrow at 10:00 PM.",
    "read"
  ),
  createData(
    "#JAN-848",
    "28 Nov 2024 09:30 AM",
    "Announcement",
    "Welcome to our new team member, Jane Smith, as Head of Sales",
    "read"
  ),
  createData(
    "#JAN-847",
    "27 Nov 2024 09:30 AM",
    "Information",
    "Check out our latest blog post for tips on improving efficiency.",
    "read"
  ),
  createData(
    "#JAN-846",
    "26 Nov 2024 09:30 AM",
    "Alert",
    "Attention: Upcoming webinar on cybersecurity best practices.",
    "unread"
  ),
  createData(
    "#JAN-845",
    "25 Nov 2024 09:30 AM",
    "Announcement",
    "Happy Thanksgiving! Our office will be closed on Nov 30.",
    "read"
  ),
  createData(
    "#JAN-844",
    "24 Nov 2024 09:30 AM",
    "Information",
    "Year-end financial reports are now available for download.",
    "read"
  ),
  createData(
    "#JAN-843",
    "23 Nov 2024 09:30 AM",
    "Announcement",
    "Critical security update. Update your passwords immediately.",
    "read"
  ),
  createData(
    "#JAN-842",
    "22 Nov 2024 09:30 AM",
    "Information",
    "Holiday Office Party on Dec 20. Save the date!",
    "read"
  ),
  createData(
    "#JAN-841",
    "20 Nov 2024 09:30 AM",
    "Alert",
    "Year-end sale: Up to 20% off on selected products.",
    "read"
  ),
  createData(
    "#JAN-840",
    "01 Dec 2024 09:30 AM",
    "Information",
    "New software update available. Click here to download.",
    "unread"
  ),
  createData(
    "#JAN-839",
    "30 Nov 2024 09:30 AM",
    "Alert",
    "Urgent: Server maintenance scheduled for tomorrow at 10:00 PM.",
    "read"
  ),
  createData(
    "#JAN-838",
    "28 Nov 2024 09:30 AM",
    "Announcement",
    "Welcome to our new team member, Jane Smith, as Head of Sales",
    "read"
  ),
  createData(
    "#JAN-837",
    "27 Nov 2024 09:30 AM",
    "Information",
    "Check out our latest blog post for tips on improving efficiency.",
    "read"
  ),
  createData(
    "#JAN-836",
    "26 Nov 2024 09:30 AM",
    "Alert",
    "Attention: Upcoming webinar on cybersecurity best practices.",
    "unread"
  ),
  createData(
    "#JAN-835",
    "25 Nov 2024 09:30 AM",
    "Announcement",
    "Happy Thanksgiving! Our office will be closed on Nov 30.",
    "read"
  ),
  createData(
    "#JAN-834",
    "24 Nov 2024 09:30 AM",
    "Information",
    "Year-end financial reports are now available for download.",
    "read"
  ),
  createData(
    "#JAN-833",
    "23 Nov 2024 09:30 AM",
    "Announcement",
    "Critical security update. Update your passwords immediately.",
    "read"
  ),
  createData(
    "#JAN-831",
    "22 Nov 2024 09:30 AM",
    "Information",
    "Holiday Office Party on Dec 20. Save the date!",
    "read"
  ),
  createData(
    "#JAN-830",
    "20 Nov 2024 09:30 AM",
    "Alert",
    "Year-end sale: Up to 20% off on selected products.",
    "read"
  ),
].sort((b, a) => (a.id < b.id ? -1 : 1));

const NotificationsTable = () => {
  // Table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
          }}
          className="rmui-table border"
        >
          <Table sx={{ minWidth: 1200 }} aria-label="Recent Leads Table">
            <TableHead className="bg-f6f7f9">
              <TableRow
                sx={{
                  "& th": {
                    fontWeight: "500",
                    padding: "10px 24px",
                    fontSize: "14px",
                  },
                }}
              >
                <TableCell className="text-black border-bottom">ID</TableCell>

                <TableCell className="text-black border-bottom">
                  Timestamp
                </TableCell>

                <TableCell className="text-black border-bottom">Type</TableCell>

                <TableCell className="text-black border-bottom">
                  Content
                </TableCell>

                <TableCell className="text-black border-bottom">
                  Status
                </TableCell>

                <TableCell className="text-black border-bottom">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow
                  sx={{
                    "& td": {
                      padding: "15px 20px",
                      fontSize: "14px",
                    },
                  }}
                  key={row.id}
                >
                  <TableCell className="border-bottom">{row.id}</TableCell>

                  <TableCell className="border-bottom">
                    {row.timestamp}
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    {row.type}
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    <Box sx={{ maxWidth: "450px" }}>{row.content}</Box>
                  </TableCell>

                  <TableCell className="border-bottom">
                    <div
                      className={`trezo-badge ${row.status}`}
                      style={{ textTransform: "capitalize" }}
                    >
                      {row.status}
                    </div>
                  </TableCell>

                  <TableCell className="border-bottom">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        aria-label="view"
                        color="primary"
                        sx={{ padding: "5px" }}
                      >
                        <i
                          className="material-symbols-outlined"
                          style={{ fontSize: "16px" }}
                        >
                          visibility
                        </i>
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell className="border-bottom" colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{
                    border: "none",
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default NotificationsTable;
