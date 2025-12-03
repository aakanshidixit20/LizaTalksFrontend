import React from "react";
import { Link } from "react-router-dom"; 
import { Grid } from "@mui/material"; 
import BasicTooltip from "../../components/UiKit/Tooltip/BasicTooltip";
import PositionedTooltips from "../../components/UiKit/Tooltip/PositionedTooltips";
import CustomizedTooltips from "../../components/UiKit/Tooltip/CustomizedTooltips";
import ArrowTooltips from "../../components/UiKit/Tooltip/ArrowTooltips";
import TriggersTooltips from "../../components/UiKit/Tooltip/TriggersTooltips";

const Tooltip = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Tooltip</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Tooltip</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicTooltip />

          <ArrowTooltips />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <CustomizedTooltips />

          <TriggersTooltips />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 12 }}>
          <PositionedTooltips />
        </Grid>
      </Grid>
    </>
  );
};

export default Tooltip;
