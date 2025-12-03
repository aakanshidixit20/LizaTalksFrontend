import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import BasicBadge from "../../components/UiKit/Badge/BasicBadge";
import ColorBadge from "../../components/UiKit/Badge/ColorBadge";
import CustomizedBadges from "../../components/UiKit/Badge/CustomizedBadges";
import BadgeVisibility from "../../components/UiKit/Badge/BadgeVisibility";
import MaximumValue from "../../components/UiKit/Badge/MaximumValue";
import AccessibleBadges from "../../components/UiKit/Badge/AccessibleBadges";

const Badge = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Badge</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Badge</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicBadge />

          <CustomizedBadges />

          <MaximumValue />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ColorBadge />

          <BadgeVisibility />

          <AccessibleBadges />
        </Grid>
      </Grid>
    </>
  );
};

export default Badge;
