import React from "react";
import { Link } from "react-router-dom";
import OrdersList from "../../../components/ClientDashboard/Orders";

const Orders = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Orders</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Orders</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="orders-content">
                {/* Placeholder for orders history components */}
                <OrdersList />
            </div>
        </>
    );
}

export default Orders;