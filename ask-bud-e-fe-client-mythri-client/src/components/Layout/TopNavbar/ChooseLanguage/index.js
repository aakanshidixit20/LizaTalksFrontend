"use client";

import React, { useState } from "react"; 
import {
  Box,
  IconButton,
  Button,
  Typography,
  Tooltip,
  Menu,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TranslateIcon from "@mui/icons-material/Translate";

const ChooseLanguage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ p: 0, borderRadius: "5px" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <TranslateIcon />
          <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "240px",
            padding: "0",
            borderRadius: "7px",
            boxShadow: "0 4px 45px #0000001a",
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "15px",
            padding: "10px 20px 15px",
            fontWeight: "600",
          }}
          className="text-black"
        >
          Choose Language
        </Typography>

        <Box>
          <Button
            variant="text"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              textTransform: "capitalize",
              fontSize: "14px",
              width: "100%",
              borderStyle: "dashed !important",
              padding: "10px 20px",
            }}
            className="text-black border-top"
          >
            <img src="/images/flags/usa.svg" alt="usa" width={30} height={30} />
            English
          </Button>

          <Button
            variant="text"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              textTransform: "capitalize",
              fontSize: "14px",
              width: "100%",
              borderStyle: "dashed !important",
              padding: "10px 20px",
            }}
            className="text-black border-top"
          >
            <img
              src="/images/flags/canada.svg"
              alt="canada"
              width={30}
              height={30}
            />
            Canada
          </Button>

          <Button
            variant="text"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              textTransform: "capitalize",
              fontSize: "14px",
              width: "100%",
              borderStyle: "dashed !important",
              padding: "10px 20px",
            }}
            className="text-black border-top"
          >
            <img
              src="/images/flags/germany.svg"
              alt="germany"
              width={30}
              height={30}
            />
            Germany
          </Button>

          <Button
            variant="text"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              textTransform: "capitalize",
              fontSize: "14px",
              width: "100%",
              borderStyle: "dashed !important",
              padding: "10px 20px",
            }}
            className="text-black border-top"
          >
            <img
              src="/images/flags/portugal.svg"
              alt="portugal"
              width={30}
              height={30}
            />
            Portugal
          </Button>

          <Button
            variant="text"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              textTransform: "capitalize",
              fontSize: "14px",
              width: "100%",
              borderStyle: "dashed !important",
              padding: "10px 20px",
            }}
            className="text-black border-top"
          >
            <img
              src="/images/flags/spain.svg"
              alt="spain"
              width={30}
              height={30}
            />
            Spain
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default ChooseLanguage;
