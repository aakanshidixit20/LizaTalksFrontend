import React from "react";
import { Link } from "react-router-dom";
import DocumentList from "../../../components/AdminDashboard/DocumentManagement";

const DocumentManagement = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Document Management</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Document Management</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="document-management-content">
                {/* Placeholder for document management components */}
                <DocumentList/>
            </div>
        </>
    );
}

export default DocumentManagement;