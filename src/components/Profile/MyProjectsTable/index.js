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
  TableHead,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

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

function createData(
  id,
  projectName,
  client,
  assignees,
  budget,
  startDate,
  endDate,
  status
) {
  return {
    id,
    projectName,
    client,
    assignees,
    budget,
    startDate,
    endDate,
    status,
  };
}

const rows = [
  createData(
    "#854",
    "Project CyberSphere",
    "NovaTech Solutions",
    [
      {
        image: "/images/users/user6.jpg",
      },
      {
        image: "/images/users/user7.jpg",
      },
      {
        image: "/images/users/user8.jpg",
      },
      {
        image: "/images/users/user9.jpg",
      },
      {
        image: "/images/users/user10.jpg",
      },
      {
        image: "/images/users/user5.jpg",
      },
      {
        image: "/images/users/user3.jpg",
      },
    ],
    "$4,500",
    "25 Mar 2024",
    "25 Apr 2024",
    "Finished"
  ),
  createData(
    "#853",
    "Digital Oasis Initiative",
    "AlphaWave Innovations",
    [
      {
        image: "/images/users/user11.jpg",
      },
      {
        image: "/images/users/user12.jpg",
      },
      {
        image: "/images/users/user13.jpg",
      },
      {
        image: "/images/users/user14.jpg",
      },
      {
        image: "/images/users/user15.jpg",
      },
      {
        image: "/images/users/user12.jpg",
      },
      {
        image: "/images/users/user13.jpg",
      },
    ],
    "$6,800",
    "20 Mar 2024",
    "20 Apr 2024",
    "In Progress"
  ),
  createData(
    "#852",
    "CloudScape Evolution",
    "InnovateIQ Inc.",
    [
      {
        image: "/images/users/user16.jpg",
      },
      {
        image: "/images/users/user17.jpg",
      },
      {
        image: "/images/users/user18.jpg",
      },
      {
        image: "/images/users/user19.jpg",
      },
      {
        image: "/images/users/user20.jpg",
      },
    ],
    "$2,500",
    "15 Mar 2024",
    "15 Apr 2024",
    "Pending"
  ),
  createData(
    "#851",
    "Data Dynamo Drive",
    "BlueSky Technologies",
    [
      {
        image: "/images/users/user21.jpg",
      },
      {
        image: "/images/users/user22.jpg",
      },
      {
        image: "/images/users/user23.jpg",
      },
      {
        image: "/images/users/user24.jpg",
      },
      {
        image: "/images/users/user25.jpg",
      },
    ],
    "$7,500",
    "10 Mar 2024",
    "10 Apr 2024",
    "Pending"
  ),
  createData(
    "#849",
    "QuantumLeap Quest",
    "NexGen Systems",
    [
      {
        image: "/images/users/user26.jpg",
      },
      {
        image: "/images/users/user27.jpg",
      },
      {
        image: "/images/users/user28.jpg",
      },
      {
        image: "/images/users/user29.jpg",
      },
      {
        image: "/images/users/user30.jpg",
      },
    ],
    "$3,400",
    "05 Mar 2024",
    "05 Apr 2024",
    "Finished"
  ),
  createData(
    "#848",
    "Project Cyber Security",
    "HITech Solutions",
    [
      {
        image: "/images/users/user1.jpg",
      },
      {
        image: "/images/users/user2.jpg",
      },
      {
        image: "/images/users/user3.jpg",
      },
    ],
    "$4,680",
    "25 Mar 2024",
    "25 Apr 2025",
    "Finished"
  ),
  createData(
    "#847",
    "React Digital Agency",
    "ABC Innovations",
    [
      {
        image: "/images/users/user10.jpg",
      },
      {
        image: "/images/users/user11.jpg",
      },
      {
        image: "/images/users/user14.jpg",
      },
      {
        image: "/images/users/user20.jpg",
      },
      {
        image: "/images/users/user30.jpg",
      },
    ],
    "$4,780",
    "20 Mar 2024",
    "20 Apr 2024",
    "In Progress"
  ),
  createData(
    "#846",
    "Angular Evolution",
    "Salah Software",
    [
      {
        image: "/images/users/user9.jpg",
      },
      {
        image: "/images/users/user12.jpg",
      },
      {
        image: "/images/users/user14.jpg",
      },
      {
        image: "/images/users/user16.jpg",
      },
      {
        image: "/images/users/user20.jpg",
      },
    ],
    "$4,980",
    "03 Mar 2024",
    "15 Apr 2024",
    "Pending"
  ),
  createData(
    "#845",
    "Data Dynamo Drive",
    "BlueSky Technologies",
    [
      {
        image: "/images/users/user30.jpg",
      },
      {
        image: "/images/users/user25.jpg",
      },
      {
        image: "/images/users/user20.jpg",
      },
      {
        image: "/images/users/user22.jpg",
      },
      {
        image: "/images/users/user11.jpg",
      },
    ],
    "$4,550",
    "10 Mar 2024",
    "10 Apr 2024",
    "Pending"
  ),
  createData(
    "#844",
    "QuantumLeap Quest",
    "NexGen Systems",
    [
      {
        image: "/images/users/user6.jpg",
      },
      {
        image: "/images/users/user7.jpg",
      },
      {
        image: "/images/users/user8.jpg",
      },
    ],
    "$3,450",
    "05 Mar 2024",
    "05 Apr 2024",
    "Finished"
  ),
].sort((b, a) => (a.id < b.id ? -1 : 1));

const MyProjectsTable = () => {
  const [select, setSelect] = useState("");
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
            display: "flex",
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
            My Projects
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ minWidth: "115px" }} size="small">
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
                <MenuItem value={1}>This Weekly</MenuItem>
                <MenuItem value={2}>This Monthly</MenuItem>
                <MenuItem value={3}>This Yearly</MenuItem>
                <MenuItem value={4}>All Time</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Table */}
        <Box
          sx={{
            marginLeft: "-25px",
            marginRight: "-25px",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              borderRadius: "0",
            }}
            className="rmui-table"
          >
            <Table sx={{ minWidth: 1200 }} aria-label="All Projects Table">
              <TableHead className="bg-primary-50">
                <TableRow
                  sx={{
                    th: {
                      fontWeight: "500",
                      padding: "10px 20px",
                      fontSize: "14px",
                    },
                  }}
                >
                  <TableCell className="text-black border-bottom">ID</TableCell>

                  <TableCell className="text-black border-bottom">
                    Project Name
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Client
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Assignees
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Budget
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Start Date
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    End Date
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
                    key={row.id}
                    sx={{
                      td: {
                        padding: "15px 20px",
                        fontSize: "14px",
                      },
                    }}
                  >
                    <TableCell className="border-bottom">{row.id}</TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.projectName}
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.client}
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      <AvatarGroup
                        max={4}
                        sx={{
                          justifyContent: "flex-end",

                          "& .MuiAvatar-root": {
                            border: "2px solid #fff",
                            backgroundColor: "#f0f0f0",
                            color: "#000",
                            width: "32px",
                            height: "32px",
                          },
                          "& .MuiAvatarGroup-avatar": {
                            backgroundColor: "#605dff", // Custom background color for the total avatar
                            color: "#fff", // Custom color for the text
                            fontSize: "10px",
                          },
                        }}
                      >
                        {row.assignees.map((assignee, index) => (
                          <Avatar
                            key={index}
                            src={assignee.image}
                            alt="Assignee"
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.budget}
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.startDate}
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.endDate}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "15px 20px",
                        fontSize: "14px",
                      }}
                      className="text-black border-bottom"
                    >
                      <div className={`trezo-badge ${row.status}`}>
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

                        <IconButton
                          aria-label="edit"
                          color="secondary"
                          sx={{ padding: "5px" }}
                        >
                          <i
                            className="material-symbols-outlined"
                            style={{ fontSize: "16px" }}
                          >
                            edit
                          </i>
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          color="error"
                          sx={{ padding: "5px" }}
                        >
                          <i
                            className="material-symbols-outlined"
                            style={{ fontSize: "16px" }}
                          >
                            delete
                          </i>
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell className="border-bottom" colSpan={9} />
                  </TableRow>
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={9}
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
        </Box>
      </Card>
    </>
  );
};

export default MyProjectsTable;
