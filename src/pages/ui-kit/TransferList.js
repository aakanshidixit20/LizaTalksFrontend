import React from "react";
import { Link } from "react-router-dom";  
import BasicTransferList from "../../components/UiKit/TransferList/BasicTransferList";
import EnhancedTransferList from "../../components/UiKit/TransferList/EnhancedTransferList";

const TransferList = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Transfer List</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Transfer List</li>
        </ul>
      </div>

      <BasicTransferList />
   
      <EnhancedTransferList />
    </>
  );
};

export default TransferList;
