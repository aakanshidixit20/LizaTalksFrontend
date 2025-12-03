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
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

const DividerVariants = () => {
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
          Divider Variants
        </Typography>

        <List sx={style} className="bg-white">
          <ListItem>
            <ListItemText primary="Full width variant below" />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Inset variant below" />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemText primary="Middle variant below" />
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText primary="List item" />
          </ListItem>
        </List>
      </Card>
    </>
  );
};

export default DividerVariants;
