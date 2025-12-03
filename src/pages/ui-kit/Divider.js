import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material"; 
import IntroDivider from "../../components/UiKit/Divider/IntroDivider";
import DividerVariants from "../../components/UiKit/Divider/DividerVariants";
import DividerText from "../../components/UiKit/Divider/DividerText";
import ListDividers from "../../components/UiKit/Divider/ListDividers";

const Divider = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Divider</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Divider</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <IntroDivider />

          <DividerText />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <DividerVariants />

          <ListDividers />
        </Grid>
      </Grid>
    </>
  );
};

export default Divider;
