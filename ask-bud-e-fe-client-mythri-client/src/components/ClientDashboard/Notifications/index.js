"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Chip,
  TablePagination,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import DraftsIcon from "@mui/icons-material/Drafts";
import config from "../../../config";

export default function NotificationsList() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const clientId = config.clientId;  // ✅ Get from config object
      const apiKey = config.apiKey;      // ✅ Get from config object

      console.log("📄 Notifications Page - Fetching notifications...", {
        clientId: clientId ? `${clientId.substring(0, 8)}...` : "MISSING",
        apiKey: apiKey ? `${apiKey.substring(0, 8)}...` : "MISSING",
        page: page + 1,
        limit: rowsPerPage,
        baseUrl: config.API_BASE_URL,
      });

      if (!clientId || !apiKey) {
        console.error("❌ Notifications Page - Missing clientId or apiKey", {
          clientId,
          apiKey,
        });
        setLoading(false);
        return;
      }

      const url = `${config.API_BASE_URL}/client/notifications/list?client_id=${clientId}&page=${page + 1}&limit=${rowsPerPage}`;
      console.log("🌐 Notifications Page - Making API call to:", url);

      const response = await fetch(url, {
        headers: {
          "x-api-key": apiKey,
        },
      });

      console.log("📡 Notifications Page - Response status:", response.status);

      const result = await response.json();
      console.log("📦 Notifications Page - Response data:", result);

      if (result.success && result.data) {
        setNotifications(result.data.notifications || []);
        setTotalCount(result.data.total || 0);
        console.log("✅ Notifications Page - Loaded", result.data.notifications?.length || 0, "notifications, total:", result.data.total);
      } else {
        console.warn("⚠️ Notifications Page - No notifications or failed response");
      }
    } catch (error) {
      console.error("❌ Notifications Page - Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle individual notification read/unread
  const handleToggleRead = async (id, currentStatus) => {
    try {
      const apiKey = config.apiKey;  // ✅ Get from config object
      const clientUserId = config.clientUserId;  // ✅ Get client_user_id from config
      if (!apiKey) return;

      const newStatus = currentStatus === "unread" ? "read" : "unread";

      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: newStatus } : n))
      );

      const response = await fetch(
        `${config.API_BASE_URL}/client/notifications/mark-read`,
        {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notification_ids: [id],
            status: newStatus,
            modified_by: clientUserId,  // ✅ Send client_user_id
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        // Revert on error
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, status: currentStatus } : n))
        );
        console.error("Failed to update notification status");
      }
    } catch (error) {
      console.error("Error toggling notification:", error);
      // Revert on error
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: currentStatus } : n))
      );
    }
  };

  // Mark all notifications as read (across all pages)
  const handleMarkAllRead = async () => {
    try {
      const clientId = config.clientId;  // ✅ Get from config object
      const apiKey = config.apiKey;      // ✅ Get from config object
      const clientUserId = config.clientUserId;  // ✅ Get client_user_id from config
      if (!apiKey || !clientId) return;

      // First, fetch ALL notification IDs for the client
      const response = await fetch(
        `${config.API_BASE_URL}/client/notifications/list?client_id=${clientId}&page=1&limit=1000`,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      const result = await response.json();

      if (result.success && result.data?.notifications) {
        const allNotificationIds = result.data.notifications.map((n) => n.id);

        // Mark all as read
        const markReadResponse = await fetch(
          `${config.API_BASE_URL}/client/notifications/mark-read`,
          {
            method: "POST",
            headers: {
              "x-api-key": apiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              notification_ids: allNotificationIds,
              status: "read",
              modified_by: clientUserId,  // ✅ Send client_user_id
            }),
          }
        );

        const markReadResult = await markReadResponse.json();

        if (markReadResult.success) {
          // Refresh current page
          fetchNotifications();
        }
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Client-side search filter
  const filteredNotifications = notifications.filter(
    (n) =>
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.message?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    console.log("🚀 Notifications Page - useEffect triggered, calling fetchNotifications...", {
      page,
      rowsPerPage,
    });
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  return (
    <Box>
      {/* Header */}
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: "var(--whiteColor)",
          color: "var(--blackColor)",
          boxShadow: "none",
          borderBottom: `1px solid var(--borderColor)`,
        }}
      >
       <Toolbar
  sx={{
    gap: 2,
    minHeight: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  {/* Search Box */}
  <Box
    component="form"
    className="t-search-form"
    sx={{
      flex: 1, // ✅ takes available space
      display: "flex",
      alignItems: "center",
      minWidth: 0, // ✅ prevents overflow
      maxWidth: "100%",
    }}
  >
    <label>
      <i className="material-symbols-outlined">search</i>
    </label>
    <input
      type="text"
      className="t-input"
      placeholder="Search here....."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        flex: 1,
        minWidth: 0, // ✅ allows shrinking
        fontSize: "0.9rem",
      }}
    />
  </Box>

  {/* Mark All as Read Button */}
  <Button
    variant="contained"
    sx={{
      flexShrink: 0, // ✅ button never shrinks
      whiteSpace: "nowrap", // ✅ text never breaks
      fontSize: "0.85rem",
    }}
    startIcon={<DoneAllIcon />}
    onClick={handleMarkAllRead}
  >
    Mark All as Read
  </Button>
</Toolbar>

      </AppBar>

      {/* Notifications List */}
      <List sx={{ p: 0 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : filteredNotifications.length === 0 ? (
          <Box
            sx={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {search ? "No notifications found matching your search" : "No notifications"}
            </Typography>
          </Box>
        ) : (
          filteredNotifications.map((n) => (
            <ListItem
              key={n.id}
              divider
              sx={{
                backgroundColor: "var(--whiteColor)",
                borderBottom: `1px solid var(--borderColor)`,
                "&:hover": { backgroundColor: "var(--lightColor)" },
              }}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleToggleRead(n.id, n.status)}>
                  {n.status === "unread" ? (
                    <MarkunreadIcon color="error" />
                  ) : (
                    <DraftsIcon color="primary" />
                  )}
                </IconButton>
              }
            >
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant={isMobile ? "body1" : "subtitle1"}
                    sx={{
                      color: "var(--blackColor)",
                      fontWeight: n.status === "unread" ? "bold" : "normal",
                    }}
                  >
                    {n.title}
                  </Typography>
                  {n.status === "unread" && (
                    <Chip
                      label="Unread"
                      size="small"
                      sx={{
                        backgroundColor: "var(--dangerColor)",
                        color: "var(--whiteColor)",
                        fontSize: isMobile ? "0.65rem" : "0.75rem",
                      }}
                    />
                  )}
                </Box>
              }
              secondary={
                <>
                  <Typography
                    variant="body2"
                    sx={{ color: "var(--bodyColor)", fontSize: isMobile ? "0.75rem" : "0.85rem" }}
                  >
                    {n.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "var(--bodyColor)", display: "block" }}
                  >
                    {new Date(n.created_at).toLocaleString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
          ))
        )}
      </List>

      {/* Pagination */}
      {!loading && notifications.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            backgroundColor: "var(--whiteColor)",
            borderTop: `1px solid var(--borderColor)`,
          }}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              border: "none",
              ".MuiToolbar-root": {
                minHeight: "auto",
                padding: 0,
                fontSize: isMobile ? "0.75rem" : "0.85rem",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
