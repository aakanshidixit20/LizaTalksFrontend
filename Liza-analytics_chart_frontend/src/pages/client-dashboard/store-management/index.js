import React from "react";
import { Link } from "react-router-dom";
import StoreList from "../../../components/ClientDashboard/StoreManagement/StoreList";

const StoreManagement = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Store Management</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Store Management</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="store-management-content">
                {/* Placeholder for Store Management components */}
               <StoreList/>
            </div>
        </>
    );
}

export default StoreManagement;