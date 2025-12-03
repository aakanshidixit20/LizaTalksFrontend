import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material"; 
import RadioButtonsGroup from "../../components/UiKit/Radio/RadioButtonsGroup";
import RowRadioButtonsGroup from "../../components/UiKit/Radio/RowRadioButtonsGroup";
import ControlledRadioButtonsGroup from "../../components/UiKit/Radio/ControlledRadioButtonsGroup";
import StandaloneRadioButtons from "../../components/UiKit/Radio/StandaloneRadioButtons";
import SizeRadioButtons from "../../components/UiKit/Radio/SizeRadioButtons";
import ColorRadioButtons from "../../components/UiKit/Radio/ColorRadioButtons";
import FormControlLabelPlacement from "../../components/UiKit/Radio/FormControlLabelPlacement";
import CustomizedRadios from "../../components/UiKit/Radio/CustomizedRadios";

const Radio = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Radio</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Radio</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <RadioButtonsGroup />

          <StandaloneRadioButtons />

          <ColorRadioButtons />

          <FormControlLabelPlacement />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <RowRadioButtonsGroup />

          <ControlledRadioButtonsGroup />

          <SizeRadioButtons />

          <CustomizedRadios />
        </Grid>
      </Grid>
    </>
  );
};

export default Radio;
