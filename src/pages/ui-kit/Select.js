import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";   
import BasicSelect from "../../components/UiKit/Select/BasicSelect";
import SelectVariants from "../../components/UiKit/Select/SelectVariants";
import SelectAutoWidth from "../../components/UiKit/Select/SelectAutoWidth";
import SelectOtherProps from "../../components/UiKit/Select/SelectOtherProps";
import NativeSelectDemo from "../../components/UiKit/Select/NativeSelectDemo";
import MultipleSelect from "../../components/UiKit/Select/MultipleSelect";
import MultipleSelectCheckmarks from "../../components/UiKit/Select/MultipleSelectCheckmarks";
import MultipleSelectChip from "../../components/UiKit/Select/MultipleSelectChip";

const Select = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Select</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Select</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicSelect />

          <SelectAutoWidth />

          <NativeSelectDemo />

          <MultipleSelectCheckmarks />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <SelectVariants />

          <SelectOtherProps />

          <MultipleSelect />

          <MultipleSelectChip />
        </Grid>
      </Grid>
    </>
  );
};

export default Select;
