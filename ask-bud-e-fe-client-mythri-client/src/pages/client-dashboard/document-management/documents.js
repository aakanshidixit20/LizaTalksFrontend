import React from "react";
import { Link } from "react-router-dom";
import DocumentsDetails from "../../../components/ClientDashboard/DocumentManagement/DocumentDetails";


const DocDetails = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Document Details</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li><Link to="/document-management">
                        <i className="material-symbols-outlined">clarify</i>
                        Document Mangement
                    </Link>
                    </li>
                    
                    
                    <li>Document Details</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="document-management-content">
                {/* Placeholder for document management components */}
                <DocumentsDetails />

            </div>
        </>
    );
}

export default DocDetails;