import React from "react";
import { Link } from "react-router-dom";
import ChatTranscriptsList from "../../../components/AdminDashboard/ChatTranscripts";

const ChatTranscripts = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Chat Transcripts</h5>

                <ul className="breadcrumb">
                    <li><Link to="/">
                        <i className="material-symbols-outlined">home</i>
                        Home
                    </Link>
                    </li>
                    <li>Chat Transcripts</li>
                </ul>
            </div>

            {/* Content goes here */}
            <div className="chat-transcripts-content">
                {/* Placeholder for billing history components */}
                {/* <p>chat transcripts content will be displayed here.</p> */}
                <ChatTranscriptsList/>
            </div>
        </>
    );
}
export default ChatTranscripts;