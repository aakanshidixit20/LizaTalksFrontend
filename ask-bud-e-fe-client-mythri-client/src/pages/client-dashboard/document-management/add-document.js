import React from "react";
import { Link } from "react-router-dom";
import AddDocument from "../../../components/ClientDashboard/DocumentManagement/AddDcoument";

const AddDoc = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Add Document</h5>

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


                    <li>Add Dcoument</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="document-management-content">
                {/* Placeholder for document management components */}
                <AddDocument />
            </div>
        </>
    );
}

export default AddDoc;