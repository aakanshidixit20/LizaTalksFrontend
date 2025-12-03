"use client";

import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavList.module.css"; 

const NavList = () => {
  const location = useLocation(); // Use `useLocation` to get the current path
  const pathname = location.pathname; // Extract `pathname` from location

  return (
    <>
      <ul className={styles.profileNavLinks}>
        <li>
          <Link
            to="/profile/"
            className={`link ${
              pathname === "/profile/" ? `${styles.active}` : ""
            }`}
          >
            Profile
          </Link>
        </li>

        <li>
          <Link
            to="/profile/teams/"
            className={`link ${
              pathname === "/profile/teams/" ? `${styles.active}` : ""
            }`}
          >
            Teams
          </Link>
        </li>

        <li>
          <Link
            to="/profile/projects/"
            className={`link ${
              pathname === "/profile/projects/" ? `${styles.active}` : ""
            }`}
          >
            Projects
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavList;
