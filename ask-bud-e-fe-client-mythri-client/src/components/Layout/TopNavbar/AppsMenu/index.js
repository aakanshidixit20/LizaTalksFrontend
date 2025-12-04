"use client";

import * as React from "react";
import { IconButton, Typography, Tooltip, Menu } from "@mui/material";
import styles from "../AppsMenu/AppsMenu.module.css";

const AppsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Apps">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="for-dark-notification"
        >
          <i className="material-symbols-outlined">apps</i>
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
            maxWidth: "240px",
            padding: "15px 15px",
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
        <ul className={styles.appsMenuList}>
          <li>
            <a href="https://www.figma.com/" target="_blank" rel="noreferrer">
              <img
                src="/images/icons/figma.svg"
                alt="figma"
                width={20}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                Figma
              </Typography>
            </a>
          </li>

          <li>
            <a href="https://dribbble.com/" target="_blank" className="d-block" rel="noreferrer">
              <img
                src="/images/icons/dribbble.svg"
                alt="dribbble"
                width={30}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                Dribbble
              </Typography>
            </a>
          </li>

          <li>
            <a
              href="https://open.spotify.com/"
              target="_blank"
              className="d-block"
              rel="noreferrer"
            >
              <img
                src="/images/icons/spotify.svg"
                alt="spotify"
                width={30}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                Spotify
              </Typography>
            </a>
          </li>

          <li>
            <a href="https://gitlab.com/" target="_blank" className="d-block" rel="noreferrer">
              <img
                src="/images/icons/gitlab.svg"
                alt="gitlab"
                width={34}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                Gitlab
              </Typography>
            </a>
          </li>

          <li>
            <a
              href="https://drive.google.com/drive/u/0/home"
              target="_blank"
              className="d-block"
              rel="noreferrer"
            >
              <img
                src="/images/icons/google-drive.svg"
                alt="google-drive"
                width={34}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                GDrive
              </Typography>
            </a>
          </li>

          <li>
            <a href="https://trello.com/" target="_blank" className="d-block" rel="noreferrer">
              <img
                src="/images/icons/trello.svg"
                alt="trello"
                width={30}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                Trello
              </Typography>
            </a>
          </li>

          <li>
            <a href="https://slack.com/" target="_blank" className="d-block" rel="noreferrer">
              <img
                src="/images/icons/slack.svg"
                alt="slack"
                width={30}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                Slack
              </Typography>
            </a>
          </li>

          <li>
            <a
              href="https://www.pinterest.com/"
              target="_blank"
              className="d-block"
              rel="noreferrer"
            >
              <img
                src="/images/icons/pinterest.svg"
                alt="pinterest"
                width={30}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                Pinterest
              </Typography>
            </a>
          </li>

          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="d-block"
              rel="noreferrer"
            >
              <img
                src="/images/icons/facebook.svg"
                alt="facebook"
                width={30}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                Facebook
              </Typography>
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="d-block"
              rel="noreferrer"
            >
              <img
                src="/images/icons/linkedin.svg"
                alt="linkedin"
                width={30}
                height={30}
              />
              <Typography sx={{ display: "block", fontSize: "12px" }}>
                LinkedIn
              </Typography>
            </a>
          </li>
        </ul>
      </Menu>
    </>
  );
};

export default AppsMenu;
