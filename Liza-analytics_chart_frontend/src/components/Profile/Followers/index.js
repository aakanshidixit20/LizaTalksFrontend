"use client";

import React, { useState } from "react";
import {
  Card,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const theme = useTheme();

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
      }}
      className="ml-15"
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

function createData(id, image, name, email, viewLink) {
  return {
    id,
    image,
    name,
    email,
    viewLink,
  };
}

const rows = [
  createData(1, "/images/users/user6.jpg", "Alex Davis", "alex@trezo.com", "#"),
  createData(
    2,
    "/images/users/user7.jpg",
    "Laura Martinez",
    "laura@trezo.com",
    "#"
  ),
  createData(
    3,
    "/images/users/user8.jpg",
    "Mark Thompson",
    "mark@trezo.com",
    "#"
  ),
  createData(
    4,
    "/images/users/user9.jpg",
    "Rachel White",
    "rachel@trezo.com",
    "#"
  ),
  createData(
    5,
    "/images/users/user10.jpg",
    "Kevin Lee",
    "kevin@trezo.com",
    "#"
  ),
  createData(
    6,
    "/images/users/user11.jpg",
    "Oliver Johnson",
    "oliver@trezo.com",
    "#"
  ),
  createData(7, "/images/users/user12.jpg", "Jake Noah", "jake@trezo.com", "#"),
  createData(
    8,
    "/images/users/user13.jpg",
    "Callum Mason",
    "callum@trezo.com",
    "#"
  ),
  createData(
    9,
    "/images/users/user14.jpg",
    "Robert Kyle",
    "robert@trezo.com",
    "#"
  ),
  createData(
    10,
    "/images/users/user15.jpg",
    "Thomas Joe",
    "thomas@trezo.com",
    "#"
  ),
].sort((b, a) => (a.id < b.id ? -1 : 1));

const Followers = () => {
  const [select, setSelect] = useState("");
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

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
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            mb: "25px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              fontWeight: 700,
            }}
            className="text-black"
          >
            Followers
          </Typography>

          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              mt: { xs: "10px", sm: "0" },
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{ minWidth: { xs: "100%", sm: "115px" } }}
              size="small"
            >
              <InputLabel id="demo-select-small">Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={select}
                label="select"
                onChange={handleChange}
                className="select"
              >
                <MenuItem value={0}>This Day</MenuItem>
                <MenuItem value={0}>This Weekly</MenuItem>
                <MenuItem value={1}>This Monthly</MenuItem>
                <MenuItem value={2}>This Yearly</MenuItem>
                <MenuItem value={4}>All Time</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
          className="rmui-table followers-table border-top"
        >
          <Table sx={{ minWidth: 250 }} aria-label="Table">
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    sx={{
                      padding: "14px 0",
                      fontSize: "14px",
                    }}
                    className="text-black border-bottom"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Box sx={{ flexShrink: "0" }}>
                        <img
                          src={row.image}
                          alt="Product"
                          width={44}
                          height={44}
                          style={{ borderRadius: "100px" }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "500",
                          }}
                          className="text-black"
                        >
                          {row.name}
                        </Typography>

                        <Typography className="text-body">
                          {row.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      padding: "14px 0",
                    }}
                    className="text-end border-bottom"
                  >
                    <Link
                      to={row.viewLink}
                      style={{
                        display: "inline-block",
                        borderRadius: "100px",
                        width: "36px",
                        height: "36px",
                        lineHeight: "36px",
                        textAlign: "center",
                      }}
                      className="text-body border tp-link"
                    >
                      <i
                        className="material-symbols-outlined"
                        style={{ fontSize: "18px", lineHeight: "inherit" }}
                      >
                        arrow_outward
                      </i>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell className="border-bottom" colSpan={2} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={2}
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

                    ".MuiToolbar-root": {
                      minHeight: "auto",
                      marginTop: "15px",
                    },
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

export default Followers;
