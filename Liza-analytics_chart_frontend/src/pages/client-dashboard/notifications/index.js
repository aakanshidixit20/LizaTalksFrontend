import React from "react";  
import { Link } from "react-router-dom";
import NotificationsList from "../../../components/ClientDashboard/Notifications";

const Notifications = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Notifications</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Notifications</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="notifications-content">
                {/* Placeholder for notifications history components */}
                <NotificationsList/>
            </div>
        </>
    );
}

export default Notifications;