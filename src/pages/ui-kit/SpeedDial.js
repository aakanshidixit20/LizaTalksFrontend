import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import BasicSpeedDial from "../../components/UiKit/SpeedDial/BasicSpeedDial";
import PlaygroundSpeedDial from "../../components/UiKit/SpeedDial/PlaygroundSpeedDial";
import ControlledOpenSpeedDial from "../../components/UiKit/SpeedDial/ControlledOpenSpeedDial";

const SpeedDial = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Speed Dial</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Speed Dial</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicSpeedDial />

          <ControlledOpenSpeedDial />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <PlaygroundSpeedDial />
        </Grid> 
      </Grid>
    </>
  );
};

export default SpeedDial;
