import React from "react";
import { Link } from "react-router-dom"; 
import SettingsForm from "../../components/Social/Settings/SettingsForm" 

const SosialProfileSettings = () => {
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
          <li>Social</li>
          <li>Settings</li>
        </ul>
      </div>

      <SettingsForm />
    </>
  );
};

export default SosialProfileSettings;
