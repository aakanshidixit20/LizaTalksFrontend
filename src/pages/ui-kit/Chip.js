import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import BasicChips from "../../components/UiKit/Chip/BasicChips";
import ClickableChips from "../../components/UiKit/Chip/ClickableChips";
import DeletableChips from "../../components/UiKit/Chip/DeletableChips";
import ClickableAndDeletableChips from "../../components/UiKit/Chip/ClickableAndDeletableChips";
import ClickableLinkChips from "../../components/UiKit/Chip/ClickableLinkChips";
import AvatarChips from "../../components/UiKit/Chip/AvatarChips";
import IconChips from "../../components/UiKit/Chip/IconChips";
import ChipsArray from "../../components/UiKit/Chip/ChipsArray";

const Chip = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Chip</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Chip</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicChips />

          <DeletableChips />

          <ClickableLinkChips />

          <IconChips />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ClickableChips />

          <ClickableAndDeletableChips />

          <AvatarChips />

          <ChipsArray />
        </Grid>
      </Grid>
    </>
  );
};

export default Chip;
