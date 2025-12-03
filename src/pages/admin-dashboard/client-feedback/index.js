import React from "react";
import { Link } from "react-router-dom";
import ClientFeedbackList from "../../../components/AdminDashboard/ClientFeedback";
// import FeedbackModal from "../../../components/AdminDashboard/ChatTranscripts/FeedBackModal";
// import ChatTranscriptsList from "../../../components/AdminDashboard/ChatTranscripts";

const ClientFeedBack = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Client Feedback</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Client Feedback</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="chat-transcripts-content">
                {/* Placeholder for billing history components */}
                {/* <p>chat transcripts content will be displayed here.</p> */}
                {/* <FeedbackModal/> */}
                <ClientFeedbackList/>
            </div>
        </>
    );
}
export default ClientFeedBack;