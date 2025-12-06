import React from "react";
import { Link } from "react-router-dom";
import AddUser from "../../../components/ClientDashboard/UserManagement/AddUser";

const EditUserPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Edit User</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/">
              <i className="material-symbols-outlined">home</i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/user-management">
              <i className="material-symbols-outlined">person</i>
              User Management
            </Link>
          </li>
          <li>Edit User</li>
        </ul>
      </div>

      {/* Content goes here */}
      <div className="user-management-content">
        {/* Reuse AddUser (which now supports edit mode) */}
        <AddUser />
      </div>
    </>
  );
};

export default EditUserPage;
