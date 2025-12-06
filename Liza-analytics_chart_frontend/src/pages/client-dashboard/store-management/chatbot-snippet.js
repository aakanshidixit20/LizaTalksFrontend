import React from "react";
import { Link } from "react-router-dom";
import ChatbotSnippet from "../../../components/ClientDashboard/StoreManagement/ChatBotSnippet";

const ChatBotSnippet = () => {
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
                    <li>Chatbot Snippet</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="store-management-content">
                {/* Placeholder for Store Management components */}
                <ChatbotSnippet />
            </div>
        </>
    );
}

export default ChatBotSnippet;