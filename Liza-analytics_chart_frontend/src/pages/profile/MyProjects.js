import React from "react";
import { Link } from "react-router-dom"; 
import CoverImage from "../../components/Profile/CoverImage";
import NavList from "../../components/Profile/NavList";  
import MyProjectsTable from "../../components/Profile/MyProjectsTable";

const MyProjects = () => {
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

      <MyProjectsTable />
    </>
  );
};

export default MyProjects;
