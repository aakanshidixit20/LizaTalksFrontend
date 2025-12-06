import React from "react";
import { Link } from "react-router-dom";
import EditStoreComponent from "../../../components/ClientDashboard/StoreManagement/CreateEditStore/EditStore";

const EditStore = () => {
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
                    <li><Link to="/store-management">
                        <i className="material-symbols-outlined">shopping_cart</i>
                        Store Management
                    </Link>
                    </li>
                    <li>Edit Store </li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="store-management-content">
                {/* Edit Store Component */}
                <EditStoreComponent />
            </div>
        </>
    );
}

export default EditStore;