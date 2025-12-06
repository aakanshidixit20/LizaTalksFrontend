import React from "react";
import { Link } from "react-router-dom";
import InvoicesList from "../../../components/ClientDashboard/Invoices";

const Invoices = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Invoices</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Invoices</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="invoices-content">
                {/* Placeholder for invoices components */}
                <InvoicesList/>
            </div>
        </>
    );
}

export default Invoices;

