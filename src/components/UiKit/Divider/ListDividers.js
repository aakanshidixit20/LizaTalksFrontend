"use client";

import React from "react";
import {
  Card,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const style = {
  p: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

const ListDividers = () => {
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
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
          }}
          className="text-black"
        >
          List Dividers
        </Typography>

        <List sx={style} aria-label="mailbox folders" className="bg-white">
          <ListItem>
            <ListItemText primary="Inbox" />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Drafts" />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default ListDividers;
