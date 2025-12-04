import React from "react";
import { Link } from "react-router-dom";
import ProductDetails from "../../../components/ClientDashboard/Products/ProductDetails";

const ProductsDetailsPage = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Product Details</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Product details</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="products-content">
                {/* Placeholder for billing history components */}
                <ProductDetails />
            </div>
        </>
    );
}

export default ProductsDetailsPage;