import React from "react";
import { Link } from "react-router-dom";
import ProductsList from "../../../components/ClientDashboard/Products";

const Products = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Products</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Products</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="products-content">
                {/* Placeholder for billing history components */}
                <ProductsList />
            </div>
        </>
    );
}

export default Products;