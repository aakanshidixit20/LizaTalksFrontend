import React from "react";
import { Link } from "react-router-dom"; 
import TypographyTypes from "../../components/UiKit/Typography/TypographyTypes";

const Typography = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Typography</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Typography</li>
        </ul>
      </div>

      <TypographyTypes />
    </>
  );
};

export default Typography;
