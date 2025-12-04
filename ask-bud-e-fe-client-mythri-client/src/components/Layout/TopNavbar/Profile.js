"use client";

import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import ChatIcon from "@mui/icons-material/Chat";
// import ListIcon from "@mui/icons-material/List";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
// import SupportIcon from "@mui/icons-material/Support";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../authentication/AuthContext";
import config from "../../../config"

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = (config && config.user) ? config.user : {};
  const firstName = user?.first_name || "";
  const role = user?.role || "";
  const userName = user?.user_name || "";

  // Profile picture state
  const [profilePictureUrl, setProfilePictureUrl] = useState("/images/admin.png");

  // Get user ID for avatar endpoint
  const userId = user?.client_user_id || user?.user_id || "";

  // Load profile picture on mount and when user changes
  React.useEffect(() => {
    if (userId) {
      // Use avatar endpoint which generates signed URLs
      const avatarUrl = `${config.API_BASE_URL}/client/user/${userId}/avatar`;
      setProfilePictureUrl(avatarUrl);
    }
  }, [userId]);

  // Listen for profile updates (from EditProfile component)
  React.useEffect(() => {
    const handleProfileUpdate = () => {
      if (userId) {
        // Force refresh by adding timestamp to bypass cache
        const avatarUrl = `${config.API_BASE_URL}/client/user/${userId}/avatar?t=${Date.now()}`;
        setProfilePictureUrl(avatarUrl);
      }
    };

    window.addEventListener("profile:updated", handleProfileUpdate);
    return () => window.removeEventListener("profile:updated", handleProfileUpdate);
  }, [userId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
 

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const pathname = location.pathname;

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               // ✅ remove token/session
    navigate("/authentication/sign-in/"); // ✅ redirect to SignIn page
  };
   const goToEditProfile = () => {
    setAnchorEl(null);       // close menu
    navigate("/profile/edit");
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
          <Avatar
            src={profilePictureUrl}
            alt={firstName || "User"}
            sx={{
              width: { xs: "35px", sm: "42px" },
              height: { xs: "35px", sm: "42px" },
              border: "2px solid #C2CDFF",
            }}
            className="mr-8"
            imgProps={{
              onError: (e) => {
                // Fallback to default image if avatar fails to load
                e.target.src = "/images/admin.png";
              }
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: "600",
              fontSize: "13px",
              display: { xs: "none", sm: "block" },
            }}
            className="text-black"
          >
            {firstName}
          </Typography>
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
        className="for-dark-top-navList"
      >
        <MenuItem sx={{ padding: "10px 20px" }}>
          <Avatar
            src={profilePictureUrl}
            alt={firstName || "User"}
            sx={{
              width: 31,
              height: 31,
              border: "2px solid #C2CDFF",
            }}
            className="mr-8"
            imgProps={{
              onError: (e) => {
                // Fallback to default image if avatar fails to load
                e.target.src = "/images/admin.png";
              }
            }}
          />
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontSize: "13px",
                color: "#260944",
                fontWeight: "500",
              }}
              className="text-black"
              onClick={goToEditProfile}
              title="Edit Profile"
            >
             {userName}
            </Typography>

            <Typography sx={{ fontSize: "12px" }}>{role}</Typography>
          </Box>
        </MenuItem>

        <Divider sx={{ borderColor: "#F6F7F9" }} />

       


        <MenuItem sx={{ padding: "8px 20px" }}>
          <Link
            to="/settings/account-settings"
            className={`text-black ${
              pathname === "/settings/account-settings" ? `text-primary` : ""
            }`}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
              <SettingsIcon sx={{ fontSize: "20px" }} className="text-black" />
            </ListItemIcon>

            <span style={{ fontSize: "13px" }}>Settings</span>
          </Link>
        </MenuItem>




        <MenuItem sx={{ padding: "8px 20px" }} onClick={handleLogout}>
      <ListItemIcon sx={{ mr: "-10px", mt: "-3px" }}>
        <Logout sx={{ fontSize: "20px" }} />
      </ListItemIcon>
      <span style={{ fontSize: "13px" }}>Logout</span>
    </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
