import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";   
import StandardImageList from "../../components/UiKit/ImageList/StandardImageList";
import WovenImageList from "../../components/UiKit/ImageList/WovenImageList";
import MasonryImageList from "../../components/UiKit/ImageList/MasonryImageList";
import TitlebarImageList from "../../components/UiKit/ImageList/TitlebarImageList";

const ImageList = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Image List</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Image List</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <StandardImageList />

          <MasonryImageList />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <WovenImageList />

          <TitlebarImageList />
        </Grid>
      </Grid>
    </>
  );
};

export default ImageList;
