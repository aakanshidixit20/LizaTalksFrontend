import React from "react";
import { Link } from "react-router-dom";
// import ClientFeedbackList from "../../../components/AdminDashboard/ClientFeedback";
import ProblemReportsList from "../../../components/ClientDashboard/ReportProblems";
// import FeedbackModal from "../../../components/AdminDashboard/ChatTranscripts/FeedBackModal";
// import ChatTranscriptsList from "../../../components/AdminDashboard/ChatTranscripts";

const ReportProblem = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Chatbot Problems Report</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Chatbot Problems Report</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="chat-transcripts-content">
                {/* Placeholder for billing history components */}
                {/* <p>chat transcripts content will be displayed here.</p> */}
                {/* <FeedbackModal/> */}
                <ProblemReportsList/>
            </div>
        </>
    );
}
export default ReportProblem;