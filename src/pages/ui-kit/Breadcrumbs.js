import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";   
import BasicBreadcrumbs from "../../components/UiKit/Breadcrumbs/BasicBreadcrumbs";
import CustomSeparator from "../../components/UiKit/Breadcrumbs/CustomSeparator";
import BreadcrumbsWithIcons from "../../components/UiKit/Breadcrumbs/BreadcrumbsWithIcons";

const Breadcrumbs = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Breadcrumbs</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Breadcrumbs</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicBreadcrumbs />

          <BreadcrumbsWithIcons />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <CustomSeparator />
        </Grid> 
      </Grid>
    </>
  );
};

export default Breadcrumbs;
