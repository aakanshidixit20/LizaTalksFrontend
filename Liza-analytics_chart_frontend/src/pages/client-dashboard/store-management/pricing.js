import React from "react";
import { Link } from "react-router-dom";
// import PricingStyle2 from "../../../components/Pricing/PricingStyle2";
import StorePricing from "../../../components/ClientDashboard/StoreManagement/Pricing/StorePricing";
// import PricingStyle1 from "../../../components/Pricing/PricingStyle2";


const Pricing = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Store Management</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li><Link to="/store-management">
                        <i className="material-symbols-outlined">shopping_cart</i>
                        Store Management
                    </Link>
                    </li>
                    <li>Pricing</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="store-management-content">
                {/* Placeholder for Store Management components */}
                <StorePricing/>
              
            </div>
        </>
    );
}

export default Pricing;