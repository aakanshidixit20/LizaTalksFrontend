"use client";

import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavList.module.css";

const NavList = () => {
  const location = useLocation(); // Use `useLocation` to get the current path
  const pathname = location.pathname; // Extract `pathname` from location

  return (
    <>
      <ul className={styles.navList}>
        <li>
          <Link
            to="/settings/account-settings"
            className={`link ${
              pathname === "/settings/account-settings" ? `${styles.active}` : ""
            }`}
          >
            Account Settings
          </Link>
        </li>
        <li>
          <Link
            to="/settings/change-password/"
            className={`link ${
              pathname === "/settings/change-password/"
                ? `${styles.active}`
                : ""
            }`}
          >
            Change Password
          </Link>
        </li>
        <li>
          <Link
            to="/settings/connections/"
            className={`link ${
              pathname === "/settings/connections/" ? `${styles.active}` : ""
            }`}
          >
            Connections
          </Link>
        </li>
        <li>
          <Link
            to="/settings/privacy-policy/"
            className={`link ${
              pathname === "/settings/privacy-policy/" ? `${styles.active}` : ""
            }`}
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            to="/settings/terms-conditions/"
            className={`link ${
              pathname === "/settings/terms-conditions/"
                ? `${styles.active}`
                : ""
            }`}
          >
            Terms & Conditions
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavList;
