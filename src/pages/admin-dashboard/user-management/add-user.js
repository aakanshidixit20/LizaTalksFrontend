import React from "react";
import { Link } from "react-router-dom";
import AddUser from "../../../components/AdminDashboard/UserManagement/AddUser";

const AddingNewUser = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>User Management</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li><Link to="/user-management">
                        <i className="material-symbols-outlined">person</i>
                        User Management
                    </Link>
                    </li>
                    <li>Add user</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="user-management-content">
                {/* Placeholder for User Management components */}
             <AddUser/>
            </div>
        </>
    );
}

export default AddingNewUser;