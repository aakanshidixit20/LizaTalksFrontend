import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";     
import BasicSwitches from "../../components/UiKit/Switch/BasicSwitches";
import SwitchLabels from "../../components/UiKit/Switch/SwitchLabels";
import ColorSwitches from "../../components/UiKit/Switch/ColorSwitches";
import ControlledSwitches from "../../components/UiKit/Switch/ControlledSwitches";
import SwitchesWithFormGroup from "../../components/UiKit/Switch/SwitchesWithFormGroup";
import CustomizedSwitches from "../../components/UiKit/Switch/CustomizedSwitches";

const Switch = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Switch</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Switch</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicSwitches />

          <ColorSwitches />

          <SwitchesWithFormGroup />

          <CustomizedSwitches />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <SwitchLabels />

          <ControlledSwitches />
        </Grid>
      </Grid>
    </>
  );
};

export default Switch;
