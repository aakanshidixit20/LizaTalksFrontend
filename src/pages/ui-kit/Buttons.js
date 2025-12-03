import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material"; 
import BasicButton from "../../components/UiKit/Buttons/BasicButton";
import TextButton from "../../components/UiKit/Buttons/TextButton";
import ContainedButton from "../../components/UiKit/Buttons/ContainedButton";
import ColorButton from "../../components/UiKit/Buttons/ColorButton";
import ButtonSizes from "../../components/UiKit/Buttons/ButtonSizes";
import ButtonsWithIconsAndLabel from "../../components/UiKit/Buttons/ButtonsWithIconsAndLabel";
import IconButtons from "../../components/UiKit/Buttons/IconButtons";
import IconButtonColors from "../../components/UiKit/Buttons/IconButtonColors";
import CustomizedButtons from "../../components/UiKit/Buttons/CustomizedButtons";
import ComplexButtons from "../../components/UiKit/Buttons/ComplexButtons";
import LoadingButtons from "../../components/UiKit/Buttons/LoadingButtons";
import FloatingActionButtons from "../../components/UiKit/FloatingActionButton/FloatingActionButtons";
import FloatingActionButtonSize from "../../components/UiKit/FloatingActionButton/FloatingActionButtonSize";

const Buttons = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Buttons</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Buttons</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicButton />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <TextButton />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ContainedButton />

          <FloatingActionButtons />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ColorButton />

          <FloatingActionButtonSize />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ButtonSizes />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ButtonsWithIconsAndLabel />

          <IconButtons />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <IconButtonColors />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <CustomizedButtons />
        </Grid>
 
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ComplexButtons />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <LoadingButtons />
        </Grid>
      </Grid> 
    </>
  );
};

export default Buttons;
