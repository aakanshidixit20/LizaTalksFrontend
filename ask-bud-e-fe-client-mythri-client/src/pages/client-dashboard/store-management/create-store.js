import React from "react";
import { Link } from "react-router-dom";
import CreateStoreComponent from "../../../components/ClientDashboard/StoreManagement/CreateEditStore/CreateStore";

const CreateStore = () => {
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
                    <li>Create Store</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="store-management-content">
                <CreateStoreComponent />
            </div>
        </>
    );
}

export default CreateStore;