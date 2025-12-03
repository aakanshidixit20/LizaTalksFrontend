import React from "react";
import { Link } from "react-router-dom"; 
import ChangePasswordForm from "../../components/Settings/ChangePasswordForm";

const ChangePassword = () => {
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

      <ChangePasswordForm />
    </>
  );
};

export default ChangePassword;
