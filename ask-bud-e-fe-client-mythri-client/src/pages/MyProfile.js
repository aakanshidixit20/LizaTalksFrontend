import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";  
import Welcome from "../components/MyProfile/Welcome";
import TotalProjects from "../components/MyProfile/TotalProjects";
import TotalOrders from "../components/MyProfile/TotalOrders";
import TotalRevenue from "../components/MyProfile/TotalRevenue";
import ProfileIntro from "../components/MyProfile/ProfileIntro";
import ProfileInformation from "../components/MyProfile/ProfileInformation";
import AdditionalInformation from "../components/MyProfile/AdditionalInformation";
import ProjectsAnalysis from "../components/MyProfile/ProjectsAnalysis";
import ToDoList from "../components/MyProfile/ToDoList";
import RecentActivity from "../components/MyProfile/RecentActivity";

const MyProfile = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>My Profile</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>My Profile</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Welcome />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 2 }}>
          <TotalProjects />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 2 }}>
          <TotalOrders />
        </Grid>

        <Grid size={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 2 }}>
          <TotalRevenue />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 3 }}>
          <ProfileIntro />

          <ProfileInformation />

          <AdditionalInformation />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 9 }}>
          <ProjectsAnalysis />

          <ToDoList />

          <RecentActivity />
        </Grid>
      </Grid>
    </>
  );
};

export default MyProfile;
