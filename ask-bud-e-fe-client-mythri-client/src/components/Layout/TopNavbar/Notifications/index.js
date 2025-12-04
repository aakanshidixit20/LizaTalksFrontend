import { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  Tooltip,
  Menu,
  Badge,
  Box,
  Link,
  CircularProgress,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";
import config from "../../../../config";

const Notifications = () => {
  console.log("🎨 TopNavbar Notifications - Component rendering...");

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // Refresh notifications when opening the menu
    fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch top 3 unread notifications and total unread count
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const clientId = config.clientId;
      const apiKey = config.apiKey;

      console.log("🔔 TopNavbar Notifications - Fetching unread notifications...", {
        clientId: clientId ? `${clientId.substring(0, 8)}...` : "MISSING",
        apiKey: apiKey ? `${apiKey.substring(0, 8)}...` : "MISSING",
        baseUrl: config.API_BASE_URL,
      });

      if (!clientId || !apiKey) {
        console.error("❌ TopNavbar Notifications - Missing clientId or apiKey", {
          clientId,
          apiKey,
        });
        return;
      }

      // Fetch all unread notifications to get accurate count
      const url = `${config.API_BASE_URL}/client/notifications/list?client_id=${clientId}&page=1&limit=5000`;
      console.log("🌐 TopNavbar Notifications - Making API call to:", url);

      const response = await fetch(url, {
        headers: {
          "x-api-key": apiKey,
        },
      });

      console.log("📡 TopNavbar Notifications - Response status:", response.status);

      const result = await response.json();
      console.log("📦 TopNavbar Notifications - Response data:", result);

      if (result.success && result.data?.notifications) {
        // Filter only unread notifications
        const unreadNotifications = result.data.notifications.filter(
          (n) => n.status === "unread"
        );

        // Set top 3 unread notifications for display
        setNotifications(unreadNotifications.slice(0, 3));

        // Set total unread count
        setUnreadCount(unreadNotifications.length);

        console.log("✅ TopNavbar Notifications - Loaded", unreadNotifications.length, "unread notifications, showing top 3");
      } else {
        console.warn("⚠️ TopNavbar Notifications - No notifications or failed response");
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("❌ TopNavbar Notifications - Error fetching notifications:", error);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    console.log("🚀 TopNavbar Notifications - Component mounted, calling fetchNotifications...");
    fetchNotifications();
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
            badgeContent={unreadCount > 0 ? unreadCount : null}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "10px",
                height: "18px",
                minWidth: "18px",
                fontWeight: 600,
              },
            }}
          >
            <NotificationsNoneIcon color="action" sx={{ fontSize: "24px" }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
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
            Unread Notifications <span className="text-body">({unreadCount})</span>
          </Typography>
        </Box>

        <Box>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <CircularProgress size={24} />
            </Box>
          ) : notifications.length === 0 ? (
            <Box
              className="border-top"
              sx={{
                padding: "20px",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                No unread notifications
              </Typography>
            </Box>
          ) : (
            notifications.map((notif) => (
              <Link
                key={notif.id}
                onClick={() => navigate("/notifications")}
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
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <Box>
                    <Typography sx={{ mb: "4px" }} className="text-black">
                      <strong style={{ fontWeight: "600" }}>{notif.title}</strong>
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>{notif.message}</Typography>
                  </Box>
                </Box>
              </Link>
            ))
          )}

          <Box className="border-top" textAlign="center">
            <Link
               onClick = {() => navigate("/notifications")}
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
