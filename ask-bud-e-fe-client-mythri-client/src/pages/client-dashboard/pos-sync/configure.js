import React from "react";
import { Link } from "react-router-dom";
import POSConfigure from "../../../components/ClientDashboard/PosSync/POSConfigure";

const ConfigurePOS = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Configure New POS</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li><Link to="/pos-sync">
                        <i className="material-symbols-outlined"></i>
                        POS Management
                    </Link>
                    </li>
                    <li>Configure New POS</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="posSync-content">
                <POSConfigure/>
            </div>
        </>
    );
}

export default ConfigurePOS;