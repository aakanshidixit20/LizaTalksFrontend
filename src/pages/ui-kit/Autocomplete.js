import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import ComboBox from "../../components/UiKit/Autocomplete/ComboBox";
import CountrySelect from "../../components/UiKit/Autocomplete/CountrySelect";
import Grouped from "../../components/UiKit/Autocomplete/Grouped";
import LoadOnOpen from "../../components/UiKit/Autocomplete/LoadOnOpen";
import MultipleValues from "../../components/UiKit/Autocomplete/MultipleValues";
import Checkboxes from "../../components/UiKit/Autocomplete/Checkboxes";
import LimitTags from "../../components/UiKit/Autocomplete/LimitTags";

const Autocomplete = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Autocomplete</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Autocomplete</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ComboBox />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <CountrySelect />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Grouped />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <LoadOnOpen />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <MultipleValues />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <Checkboxes />

          <LimitTags />
        </Grid>
      </Grid>
    </>
  );
};

export default Autocomplete;
