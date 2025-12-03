import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import SimpleAlert from "../../components/UiKit/Alerts/SimpleAlert";
import BasicAlerts from "../../components/UiKit/Alerts/BasicAlerts";
import FilledAlerts from "../../components/UiKit/Alerts/FilledAlerts";
import OutlinedAlerts from "../../components/UiKit/Alerts/OutlinedAlerts";
import DescriptionAlerts from "../../components/UiKit/Alerts/DescriptionAlerts";
import TransitionAlerts from "../../components/UiKit/Alerts/TransitionAlerts";

const Alerts = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Alerts</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Alerts</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <SimpleAlert />

          <FilledAlerts />

          <DescriptionAlerts />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicAlerts />

          <OutlinedAlerts />

          <TransitionAlerts />
        </Grid>
      </Grid>
    </>
  );
};

export default Alerts;
