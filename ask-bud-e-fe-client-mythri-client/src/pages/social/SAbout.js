import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid"; 
import CoverImage from "../../components/Social/Profile/CoverImage";
import ProfileIntro from "../../components/Social/Profile/ProfileIntro";
import Followers from "../../components/Social/Profile/Followers";
import Following from "../../components/Social/Profile/Following";
import Photos from "../../components/Social/Profile/Photos";
import Friends from "../../components/Social/Profile/Friends";
import NavList from "../../components/Social/Profile/NavList";
import AboutMe from "../../components/Social/About/AboutMe";

const SAbout = () => {
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
          <li>Social</li>
          <li>About</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 9 }}>
          <CoverImage />

          {/* NavList */}
          <NavList />

          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <Friends />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
              <AboutMe />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 3 }}>
          <ProfileIntro />

          <Followers />

          <Following />

          <Photos />
        </Grid>
      </Grid>
    </>
  );
};

export default SAbout;
