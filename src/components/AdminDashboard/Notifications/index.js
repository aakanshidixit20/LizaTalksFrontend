"use client";

import React, { useState } from "react";
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
  Checkbox,
  TablePagination
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import DraftsIcon from "@mui/icons-material/Drafts";
import notificationsData from "../../../data/notifications_list_success.json";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState(
    notificationsData.data.notifications
  );
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Admin only if created_by contains 'admin'; 'system' -> Client (per your rule)
  const getScope = (n) => {
    if (n.scope) return n.scope;
    const by = String(n.created_by || "").toLowerCase();
    return by.includes("admin") ? "Admin" : "Client";
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: n.status === "unread" ? "read" : "unread" } : n
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "read" })));
  };

  const handleCheckboxToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleChangePage = (_e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredNotifications = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedNotifications =
    rowsPerPage > 0
      ? filteredNotifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filteredNotifications;

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
          borderBottom: `1px solid var(--borderColor)`
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: "64px" }}>
          <form className="t-search-form">
            <label>
              <i className="material-symbols-outlined">search</i>
            </label>
            <input
              type="text"
              className="t-input"
              placeholder="Search here....."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <Button
            variant="contained"
            sx={{ marginLeft: "auto" }}
            startIcon={<DoneAllIcon />}
            onClick={handleMarkAllRead}
          >
            Mark All as Read
          </Button>
        </Toolbar>
      </AppBar>

      {/* Notifications List */}
      <List sx={{ p: 0 }}>
        {paginatedNotifications.map((n) => (
          <ListItem
            key={n.id}
            divider
            sx={{
              backgroundColor: "var(--whiteColor)",
              borderBottom: `1px solid var(--borderColor)`,
              "&:hover": { backgroundColor: "var(--lightColor)" }
            }}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleToggleRead(n.id)}>
                {n.status === "unread" ? <MarkunreadIcon color="error" /> : <DraftsIcon color="primary" />}
              </IconButton>
            }
          >
            {/* Checkbox */}
            <Checkbox
              edge="start"
              checked={selected.includes(n.id)}
              onChange={() => handleCheckboxToggle(n.id)}
            />

            <ListItemText
              primary={
                // LEFT side: title + Admin/Client pill (replaces the old Unread chip)
                <Box sx={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "var(--blackColor)",
                        fontWeight: n.status === "unread" ? "bold" : "normal",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {n.title}
                    </Typography>

                    {/* 👇 Admin/Client pill placed here */}
                    <Chip
  label={getScope(n)}
  size="small"
  variant={getScope(n) === "Admin" ? "outlined" : "filled"} // <-- dynamic variant
  sx={{
    fontWeight: 600,
    ...(getScope(n) === "Admin"
      ? { borderColor: "var(--primaryColor)", color: "var(--primaryColor)" }
      : { backgroundColor: "var(--primaryColor)", color: "var(--whiteColor)" }),
  }}
/>
                  </Box>
                </Box>
              }
              secondary={
                <>
                  <Typography variant="body2" sx={{ color: "var(--bodyColor)" }}>
                    {n.message}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "var(--bodyColor)" }}>
                    {new Date(n.created_at).toLocaleString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}

        {filteredNotifications.length === 0 && (
          <Typography variant="body2" sx={{ p: 2, textAlign: "center" }}>
            No notifications found.
          </Typography>
        )}
      </List>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
          backgroundColor: "var(--whiteColor)",
          borderTop: `1px solid var(--borderColor)`
        }}
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          count={filteredNotifications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ border: "none", ".MuiToolbar-root": { minHeight: "auto", padding: 0 } }}
        />
      </Box>
    </Box>
  );
}
