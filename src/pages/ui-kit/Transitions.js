import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";    
import SimpleCollapse from "../../components/UiKit/Transitions/SimpleCollapse";
import SimpleFade from "../../components/UiKit/Transitions/SimpleFade";
import SimpleGrow from "../../components/UiKit/Transitions/SimpleGrow";
import SimpleSlide from "../../components/UiKit/Transitions/SimpleSlide";

const Transitions = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Transitions</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Transitions</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <SimpleCollapse />

          <SimpleGrow />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <SimpleFade />

          <SimpleSlide />
        </Grid>
      </Grid>
    </>
  );
};

export default Transitions;
