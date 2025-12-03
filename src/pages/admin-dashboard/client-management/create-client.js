import React from "react";
import { Link } from "react-router-dom";
import CreateEditClient from "../../../components/AdminDashboard/ClientManagement/CreateEditClient";

const CreateClient = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Client Management</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/">
              <i className="material-symbols-outlined">home</i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/client-management">
              <i className="material-symbols-outlined">groups</i>
              Client Management
            </Link>
          </li>
          <li>Add New Client</li>
        </ul>
      </div>

      {/* Content goes here */}
      <div className="client-management-content">
        {/* Placeholder for Client Management components */}
        <CreateEditClient />
      </div>
    </>
  );
};

export default CreateClient;
