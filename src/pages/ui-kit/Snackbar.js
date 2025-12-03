import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import SimpleSnackbar from "../../components/UiKit/Snackbar/SimpleSnackbar";
import PositionedSnackbar from "../../components/UiKit/Snackbar/PositionedSnackbar";
import AutohideSnackbar from "../../components/UiKit/Snackbar/AutohideSnackbar";
import TransitionsSnackbar from "../../components/UiKit/Snackbar/TransitionsSnackbar"; 

const Snackbar = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Snackbar</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Snackbar</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <SimpleSnackbar />

          <AutohideSnackbar />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <PositionedSnackbar />

          <TransitionsSnackbar />
        </Grid>
      </Grid>
    </>
  );
};

export default Snackbar;
