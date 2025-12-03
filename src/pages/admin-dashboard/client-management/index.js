import React from "react";
import { Link } from "react-router-dom";
import ClientList from "../../../components/AdminDashboard/ClientManagement/ClientList";

const ClientManagement = () => {
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
          <li>Client Management</li>
        </ul>
      </div>

      {/* Content */}
      <div className="client-management-content">
        <ClientList />
      </div>
    </>
  );
};

export default ClientManagement;
