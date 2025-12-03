import React from "react"; 
import { Link } from "react-router-dom";    
import ClientDashboard from "../../../components/AdminDashboard/Dashboard";

const Dashboard = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Dashboard</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
        </ul>
      </div>

      {/* Content goes here */}
      <div className="dashboard-content">
        {/* Placeholder for dashboard components */}
        <ClientDashboard />
      </div>
    </>
  );
}
export default Dashboard;