import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import CircularIndeterminate from "../../components/UiKit/Progress/CircularIndeterminate";
import CircularColor from "../../components/UiKit/Progress/CircularColor";
import CircularDeterminate from "../../components/UiKit/Progress/CircularDeterminate";
import CircularIntegration from "../../components/UiKit/Progress/CircularIntegration";
import CircularWithValueLabel from "../../components/UiKit/Progress/CircularWithValueLabel";
import LinearIndeterminate from "../../components/UiKit/Progress/LinearIndeterminate";
import LinearColor from "../../components/UiKit/Progress/LinearColor";
import LinearDeterminate from "../../components/UiKit/Progress/LinearDeterminate";

const Progress = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Progress</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Progress</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <CircularIndeterminate />

          <CircularDeterminate />

          <CircularWithValueLabel />

          <LinearColor />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <CircularColor />

          <CircularIntegration />

          <LinearIndeterminate />

          <LinearDeterminate />
        </Grid>
      </Grid>
    </>
  );
};

export default Progress;
