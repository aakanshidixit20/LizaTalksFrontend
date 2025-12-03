import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material"; 
import BasicMasonry from "../../components/UiKit/Masonry/BasicMasonry";
import ImageMasonry from "../../components/UiKit/Masonry/ImageMasonry";
import FixedColumns from "../../components/UiKit/Masonry/FixedColumns";
import Sequential from "../../components/UiKit/Masonry/Sequential";

const Masonry = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Masonry</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Masonry</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicMasonry />

          <FixedColumns />

          <Sequential />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <ImageMasonry />
        </Grid>
      </Grid>
    </>
  );
};

export default Masonry;
