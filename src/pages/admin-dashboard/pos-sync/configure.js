import React from "react";  
import { Link } from "react-router-dom";
import POSConfig from "../../../components/AdminDashboard/PosSync/POSConfig";

const ConfigurePOS = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Configure POS</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li><Link to="/pos-sync">
                        <i className="material-symbols-outlined">cloud_sync</i>
                        POS Sync
                    </Link>
                    </li>
                    <li>Configure</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="posSync-content">
                {/* Placeholder for posSync history components */}
                <POSConfig/>
            </div>
        </>
    );
}

export default ConfigurePOS;