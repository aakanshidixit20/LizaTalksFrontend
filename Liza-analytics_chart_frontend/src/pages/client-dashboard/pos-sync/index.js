import React from "react";  
import { Link } from "react-router-dom";
import SyncList from "../../../components/ClientDashboard/PosSync/SyncList";

const POS_Sync = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>POS Management</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>POS Management</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="posSync-content">
                {/* Placeholder for posSync history components */}
              <SyncList/>
            </div>
        </>
    );
}

export default POS_Sync;