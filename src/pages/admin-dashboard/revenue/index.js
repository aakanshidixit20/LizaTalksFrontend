import React from "react";
import { Link } from "react-router-dom";
import RevenueList from "../../../components/AdminDashboard/Revenue";

const Revenue = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Client's Order</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Client's Order</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="revenue-content">
                {/* Placeholder for revenue history components */}
                <RevenueList />
            </div>
        </>
    );
}

export default Revenue;