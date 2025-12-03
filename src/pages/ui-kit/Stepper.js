import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material"; 
import HorizontalLinearStepper from "../../components/UiKit/Stepper/HorizontalLinearStepper";
import HorizontalNonLinearStepper from "../../components/UiKit/Stepper/HorizontalNonLinearStepper";
import LinearAlternativeLabelStepper from "../../components/UiKit/Stepper/LinearAlternativeLabelStepper";
import HorizontalStepperWithError from "../../components/UiKit/Stepper/HorizontalStepperWithError";
import VerticalLinearStepper from "../../components/UiKit/Stepper/VerticalLinearStepper";

const Stepper = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Stepper</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Stepper</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <HorizontalLinearStepper />

          <LinearAlternativeLabelStepper /> 

          <HorizontalNonLinearStepper />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}> 
          <HorizontalStepperWithError />

          <VerticalLinearStepper />
        </Grid> 
      </Grid>
    </>
  );
};

export default Stepper;
