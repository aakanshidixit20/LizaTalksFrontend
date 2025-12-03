import React from "react";
import { Link } from "react-router-dom";
import BotEffectiveness from "../../../components/AdminDashboard/Analytics/BotEffectiveness";

const Analytics = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Analytics</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Analytics</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="analytics-content">
                {/* Placeholder for analytics components */}
                <BotEffectiveness />
                {/* <p>Analytics content will be displayed here.</p> */}
            </div>
        </>
    );
}
export default Analytics;