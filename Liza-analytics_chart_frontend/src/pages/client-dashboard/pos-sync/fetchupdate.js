import React from "react";
import { Link } from "react-router-dom";
import POSEdit from "../../../components/ClientDashboard/PosSync/POSEdit";

const FetchUpdatePOS = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Edit POS Configuration</h5>

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
                    <li>Edit</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="posSync-content">
                {/* Placeholder for posSync history components */}
                <POSEdit/>
            </div>
        </>
    );
}

export default FetchUpdatePOS;