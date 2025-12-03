import React from "react";
import { Link } from "react-router-dom";
import ChatTranscriptsCalling from "../../../components/AdminDashboard/ChatTranscripts/ChatTranscriptsCalling";

const ChatWindow = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Chat Details</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li><Link to="/chat-transcripts">
                        <i className="material-symbols-outlined">article</i>
                        Chat Transcripts
                    </Link>
                    </li>
                    <li>Chat Details</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="chat-transcripts-content">
                {/* Placeholder for billing history components */}
                {/* <p>chat transcripts content will be displayed here.</p> */}
                <ChatTranscriptsCalling />
            </div>
        </>
    );
}
export default ChatWindow;