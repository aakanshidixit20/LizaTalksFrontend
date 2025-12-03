import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid"; 
import CoverImage from "../../components/Profile/CoverImage";
import NavList from "../../components/Profile/NavList";
import AboutMe from "../../components/Profile/AboutMe";
import Followers from "../../components/Profile/Followers";
import MyProjects from "../../components/Profile/MyProjectsTable";

const UserProfile = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Profile</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li> 
          <li>Profile</li>
        </ul>
      </div>

      <CoverImage />

      <NavList />

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 8 }}>
          <AboutMe />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 4 }}>
          <Followers />
        </Grid>
      </Grid>

      <MyProjects />
    </>
  );
};

export default UserProfile;
