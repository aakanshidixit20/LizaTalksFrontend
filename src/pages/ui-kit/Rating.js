import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";  
import BasicRating from "../../components/UiKit/Rating/BasicRating";
import RatingPrecision from "../../components/UiKit/Rating/RatingPrecision";
import HoverFeedback from "../../components/UiKit/Rating/HoverFeedback";
import RatingSize from "../../components/UiKit/Rating/RatingSize";
import CustomizedRating from "../../components/UiKit/Rating/CustomizedRating";
import RadioGroupRating from "../../components/UiKit/Rating/RadioGroupRating";

const Rating = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Rating</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Rating</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicRating />

          <RatingSize />

          <RadioGroupRating />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <RatingPrecision />

          <HoverFeedback />

          <CustomizedRating />
        </Grid>
      </Grid>
    </>
  );
};

export default Rating;
