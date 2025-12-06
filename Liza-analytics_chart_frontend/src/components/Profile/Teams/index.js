"use client";

import React, { useState } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  AvatarGroup,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Sample dynamic data for teams
const teamsData = [
  {
    id: 1,
    leader: "Ava Turner",
    role: "Team Leader",
    project: "Project Management",
    progress: 85,
    members: [
      "/images/users/user15.jpg",
      "/images/users/user16.jpg",
      "/images/users/user17.jpg",
      "/images/users/user18.jpg",
    ],
    image: "/images/users/user11.jpg",
  },
  {
    id: 2,
    leader: "Ethan Parker",
    role: "Team Leader",
    project: "eCommerce Theme",
    progress: 45,
    members: [
      "/images/users/user6.jpg",
      "/images/users/user7.jpg",
      "/images/users/user8.jpg",
    ],
    image: "/images/users/user12.jpg",
  },
  {
    id: 3,
    leader: "Isabella Lee",
    role: "Team Leader",
    project: "Shopify Theme Dev",
    progress: 70,
    members: [
      "/images/users/user10.jpg",
      "/images/users/user11.jpg",
      "/images/users/user12.jpg",
    ],
    image: "/images/users/user13.jpg",
  },
  {
    id: 4,
    leader: "Thompson Torres",
    role: "Team Leader",
    project: "Oito - HTML",
    progress: 90,
    members: [
      "/images/users/user30.jpg",
      "/images/users/user29.jpg",
      "/images/users/user28.jpg",
    ],
    image: "/images/users/user14.jpg",
  },
  {
    id: 5,
    leader: "Lucas Lyon",
    role: "Team Leader",
    project: "Tanus - Template",
    progress: 75,
    members: [
      "/images/users/user25.jpg",
      "/images/users/user26.jpg",
      "/images/users/user27.jpg",
    ],
    image: "/images/users/user15.jpg",
  },
  {
    id: 6,
    leader: "Lucas Lyon",
    role: "Morgan Sturges",
    project: "Delft - TypeScript",
    progress: 65,
    members: [
      "/images/users/user15.jpg",
      "/images/users/user16.jpg",
      "/images/users/user17.jpg",
    ],
    image: "/images/users/user11.jpg",
  },
  {
    id: 7,
    leader: "Sophia McNeel",
    role: "Team Leader",
    project: "Trezo - Angular",
    progress: 90,
    members: [
      "/images/users/user21.jpg",
      "/images/users/user22.jpg",
      "/images/users/user23.jpg",
    ],
    image: "/images/users/user17.jpg",
  },
  {
    id: 8,
    leader: "Rodriguez Meade",
    role: "Team Leader",
    project: "eLearniv - React",
    progress: 90,
    members: [
      "/images/users/user15.jpg",
      "/images/users/user16.jpg",
      "/images/users/user17.jpg",
      "/images/users/user18.jpg",
      "/images/users/user19.jpg",
    ],
    image: "/images/users/user18.jpg",
  },
  {
    id: 9,
    leader: "Ethan Parker",
    role: "Team Leader",
    project: "eCommerce Theme",
    progress: 45,
    members: [
      "/images/users/user6.jpg",
      "/images/users/user7.jpg",
      "/images/users/user8.jpg",
    ],
    image: "/images/users/user12.jpg",
  },
  {
    id: 10,
    leader: "Isabella Lee",
    role: "Team Leader",
    project: "Shopify Theme Dev",
    progress: 70,
    members: [
      "/images/users/user10.jpg",
      "/images/users/user11.jpg",
      "/images/users/user12.jpg",
    ],
    image: "/images/users/user13.jpg",
  },
  {
    id: 11,
    leader: "Thompson Torres",
    role: "Team Leader",
    project: "Oito - HTML",
    progress: 90,
    members: [
      "/images/users/user30.jpg",
      "/images/users/user29.jpg",
      "/images/users/user28.jpg",
    ],
    image: "/images/users/user14.jpg",
  },
  {
    id: 12,
    leader: "Lucas Lyon",
    role: "Team Leader",
    project: "Tanus - Template",
    progress: 75,
    members: [
      "/images/users/user25.jpg",
      "/images/users/user26.jpg",
      "/images/users/user27.jpg",
    ],
    image: "/images/users/user15.jpg",
  },
];

const Teams = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 8;
  const totalPages = Math.ceil(teamsData.length / teamsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedTeams = teamsData.slice(
    (currentPage - 1) * teamsPerPage,
    currentPage * teamsPerPage
  );

  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        {paginatedTeams.map((team) => (
          <Grid key={team.id} size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 3 }}>
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
                  mb: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Box>
                    <img
                      src={team.image}
                      className="rounded-circle"
                      alt={team.leader}
                      width={65}
                      height={65}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontWeight={500}
                      fontSize="16px"
                      className="text-black"
                    >
                      {team.leader}
                    </Typography>
                    <Typography fontSize="13px">{team.role}</Typography>
                  </Box>
                </Box>

                <Box>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <MoreHorizIcon sx={{ fontSize: "25px" }} />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        boxShadow: "0 4px 45px #0000001a",
                        mt: 0,
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>View</MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </Menu>
                </Box>
              </Box>

              <Box sx={{ textAlign: "center", mb: "15px" }}>
                <Typography
                  className="text-black bg-purple-100"
                  sx={{
                    fontWeight: "500",
                    display: "inline-block",
                    padding: "5px 15px",
                    borderRadius: "30px",
                  }}
                >
                  {team.project}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center", mb: "15px" }}>
                <Typography mb="5px">Team Members</Typography>
                <AvatarGroup
                  max={4}
                  sx={{
                    justifyContent: "center",
                    "& .MuiAvatar-root": {
                      border: "2px solid #fff",
                      width: "35px",
                      height: "35px",
                    },
                    "& .MuiAvatarGroup-avatar": {
                      backgroundColor: "#605dff",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: "500",
                    },
                  }}
                >
                  {team.members.map((member, idx) => (
                    <Avatar key={idx} alt={`Member ${idx + 1}`} src={member} />
                  ))}
                </AvatarGroup>
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: "8px",
                  }}
                >
                  <Typography sx={{ fontWeight: "500" }}>Progress</Typography>
                  <Typography sx={{ fontWeight: "500" }}>
                    {team.progress}%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "#ecf0ff",
                    width: "100%",
                    height: "4px",
                    display: "block",
                    borderRadius: "30px",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#605dff",
                      width: `${team.progress}%`,
                      height: "4px",
                      borderRadius: "30px",
                    }}
                  ></Box>
                </Box>
              </Box>

              <Box sx={{ mt: "30px" }}>
                <Link to="#">
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      display: "block",
                      width: "100%",
                      textTransform: "capitalize",
                      fontWeight: "500",
                      borderRadius: "7px",
                      padding: "7px 15px",
                      fontSize: "14px",
                    }}
                  >
                    View Details
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box
        className="bg-white"
        sx={{
          p: { xs: "20px", md: "25px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "25px",
          borderRadius: "7px",
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>
          Showing {Math.min(currentPage * teamsPerPage, teamsData.length)} of{" "}
          {teamsData.length} results
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Button
            className="border text-black"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            sx={{
              minWidth: "auto",
              width: "30px",
              height: "30px",
              padding: "0",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            <ChevronLeftIcon />
          </Button>

          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              className="border"
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              sx={{
                bgcolor: currentPage === index + 1 ? "primary.main" : "inherit",
                color:
                  currentPage === index + 1 ? "white !important" : "text-body",
                minWidth: "30px",
                height: "30px",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white !important",
                },
              }}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            className="border text-black"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            sx={{
              minWidth: "auto",
              width: "30px",
              height: "30px",
              padding: "0",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Teams;
