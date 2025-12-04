import React from "react";
import { Link } from "react-router-dom";
import UserManagementList from "../../../components/ClientDashboard/UserManagement/UserList";

const UserManagement = () => {
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
                    <li>User Management</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="user-management-content">
                {/* Placeholder for User Management components */}
                
                <UserManagementList />
            </div>
        </>
    );
}

export default UserManagement;