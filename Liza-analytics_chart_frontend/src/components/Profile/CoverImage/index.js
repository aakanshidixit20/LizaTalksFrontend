"use client";

import React, { useState } from "react";
import { Box, Typography, MenuItem, Button, Menu } from "@mui/material";

const CoverImage = () => {
  // Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className="profile-card border-radius bg-white" mb="25px">
        <Box
          className="cover-image border-top-radius"
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(/images/profile-cover.jpg)`,
              height: { xs: "160px", sm: "200px", lg: "255px" },
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            className="border-top-radius"
          ></Box>

          <Box
            sx={{
              position: "absolute",
              bottom: "28px",
            }}
            className="po-right-28"
          >
            <Button
              variant="outlined"
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                color: "#fff !important",
                textTransform: "capitalize",
                border: "1px solid #fff",
                padding: "8px 20px",
              }}
            >
              Update Cover Photo
            </Button>

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
                  minWidth: "160px",

                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>Upload Photo</MenuItem>
              <MenuItem>Reposition</MenuItem>
              <MenuItem>Remove</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box
          className="profile-content"
          sx={{
            marginTop: { xs: "-30px", sm: "-60px" },
            paddingLeft: { xs: "20px", sm: "30px" },
            paddingRight: { xs: "20px", sm: "30px" },
            paddingBottom: { xs: "30px", sm: "45px" },
          }}
        >
          <Box
            sx={{
              display: { sm: "flex" },
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: { md: "flex" },
                alignItems: "end",
                gap: "30px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "120px", sm: "160px" },
                }}
              >
                <img
                  src="/images/profile.jpg"
                  className="profile-image rounded-circle"
                  alt="profile-image"
                  width={240}
                  height={240}
                />

                <img
                  src="/images/icons/verified.svg"
                  alt="verified"
                  width={50}
                  height={50}
                  style={{
                    position: "absolute",
                    bottom: "11px",
                  }}
                  className="po-right-0"
                />
              </Box>

              <Box sx={{ mt: { xs: "10px", md: "0" } }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  className="text-black"
                  sx={{
                    fontSize: { sx: "20px", md: "22px", lg: "24px" },
                  }}
                >
                  Alice Johnson
                </Typography>

                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Product Designer
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                gap: "10px",
                mt: { xs: "15px", sm: "0" },
              }}
            >
              <Box>
                <Button
                  variant="outlined"
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{
                    textTransform: "capitalize",
                    padding: "10px 28px",
                    borderRadius: "7px",
                    fontSize: "16px",
                    fontWeight: "500",
                    boxShadow: "none",
                  }}
                  className="border text-body"
                >
                  <i
                    className="material-symbols-outlined mr-8"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    edit
                  </i>
                  Edit
                </Button>

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
                      minWidth: "160px",

                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>See Photo</MenuItem>
                  <MenuItem>Upload Photo</MenuItem>
                  <MenuItem>Remove</MenuItem>
                </Menu>
              </Box>

              <Box>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  sx={{
                    textTransform: "capitalize",
                    padding: "10px 28px",
                    borderRadius: "7px",
                    fontSize: "16px",
                    fontWeight: "500",
                    boxShadow: "none",
                    color: "#fff !important",
                  }}
                >
                  <i
                    className="material-symbols-outlined mr-8"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    share
                  </i>
                  Share
                </Button>

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
                      minWidth: "160px",

                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>Facebook</MenuItem>
                  <MenuItem>X</MenuItem>
                  <MenuItem>Instagram</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CoverImage;
