import React, { useState, useEffect } from "react";
import {
  IconButton,
  Button,
  Typography,
  Tooltip,
  Menu,
  Badge,
  Box,
  Link,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

// Import JSON directly from src/data
import notificationsData from "../../../../data/notifications_list_success.json";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (notificationsData.status === "success" && notificationsData.data?.notifications) {
      const latest = [...notificationsData.data.notifications]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);

      setNotifications(latest);
    }
  }, []);

  return (
    <>
      <Tooltip title="Notification">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            width: "35px",
            height: "35px",
            p: 0,
          }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="for-dark-notification"
        >
          <Badge
            color="error"
            variant="dot"
            sx={{ position: "absolute", top: "12px", right: "12px" }}
          ></Badge>
          <NotificationsNoneIcon color="action" sx={{ fontSize: "24px" }} />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "5px",
            padding: "12px 20px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "600", fontSize: "14px" }}>
            Notifications <span className="text-body">({notifications.length})</span>
          </Typography>

          <Button
            variant="text"
            sx={{
              textTransform: "capitalize",
              fontSize: "12px",
              fontWeight: "500",
              minWidth: "auto",
            }}
          >
            clear all
          </Button>
        </Box>

        <Box>
          {notifications.map((notif) => (
            <Link
              key={notif.id}
              href="/notifications"
              className="text-body"
              underline="none"
            >
              <Box
                className="border-top"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "10px", sm: "15px" },
                  padding: "12px 20px",
                }}
              >
                {/* <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    borderRadius: "100%",
                    bgcolor: "#f1f1f1",
                    fontSize: "20px",
                    color: "primary.main",
                  }}
                  className="for-dark-secondary-bg"
                >
                  <i className="material-symbols-outlined">notifications</i>
                </Box> */}

                <Box>
                  <Typography sx={{ mb: "4px" }} className="text-black">
                    <strong style={{ fontWeight: "600" }}>{notif.title}</strong>
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>{notif.message}</Typography>
                </Box>
              </Box>
            </Link>
          ))}

          <Box className="border-top" textAlign="center">
            <Link
              href="/notifications"
              style={{
                fontWeight: "500",
                marginTop: "15px",
                marginBottom: "10px",
                display: "inline-block",
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              See All Notifications
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default Notifications;
