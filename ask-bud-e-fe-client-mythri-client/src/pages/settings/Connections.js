import React from "react";
import { Link } from "react-router-dom";  
import ConnectionsContent from "../../components/Settings/ConnectionsContent";

const Connections = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Settings</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>Settings</li>
        </ul>
      </div>

      <ConnectionsContent />
    </>
  );
};

export default Connections;
