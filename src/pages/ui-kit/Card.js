import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";  
import BasicCard from "../../components/UiKit/Card/BasicCard";
import OutlinedCard from "../../components/UiKit/Card/OutlinedCard";
import RecipeReviewCard from "../../components/UiKit/Card/RecipeReviewCard";
import MediaCard from "../../components/UiKit/Card/MediaCard";
import MediaControlCard from "../../components/UiKit/Card/MediaControlCard";

const Card = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Card</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Card</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <BasicCard />

          <RecipeReviewCard />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
          <OutlinedCard />

          <MediaCard />

          <MediaControlCard />
        </Grid> 
      </Grid>
    </>
  );
};

export default Card;
