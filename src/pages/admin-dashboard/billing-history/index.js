import React from "react";
import { Link } from "react-router-dom";
import BillingHistoryList from "../../../components/AdminDashboard/BillingHistory";

const BillingHistory = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Revenue</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Revenue</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="billing-history-content">
                {/* Placeholder for billing history components */}
                <BillingHistoryList/>
            </div>
        </>
    );
}

export default BillingHistory;