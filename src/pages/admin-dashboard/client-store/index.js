import React from "react";
import { Link } from "react-router-dom";
import ClientStoresList from "../../../components/AdminDashboard/ClientStore/ClientStoreList";

const ClientStores = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Client Stores</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/">
              <i className="material-symbols-outlined">home</i>
              Home
            </Link>
          </li>
          <li>Client Stores</li>
        </ul>
      </div>

      {/* Content */}
      <div className="client-stores">
        <ClientStoresList />
      </div>
    </>
  );
};

export default ClientStores;
