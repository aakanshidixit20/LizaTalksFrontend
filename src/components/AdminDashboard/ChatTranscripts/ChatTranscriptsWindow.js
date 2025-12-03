"use client";

import React, { useState, useEffect, useRef } from "react"; // ⬅ add useEffect, useRef
import { useNavigate } from "react-router-dom";
import {
    Card,
    Box,
    Typography,
    Button,
    Alert,
    AlertTitle,
    Link,
    IconButton,
    Divider,
    Collapse
} from "@mui/material";
import FeedbackModal from "./FeedBackModal";
import BudENotes from "./BudENotes";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ correct import
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const formatDateLabel = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    } else if (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else {
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }
};

const ChatTranscriptsWindow = ({ chatData }) => {
    const navigate = useNavigate();
    const { customer, chat_sessions } = chatData.data;

    const [modalOpen, setModalOpen] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState({});
    const [selectedSession, setSelectedSession] = useState(null);
    const [notesOpen, setNotesOpen] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            // jump immediately to bottom (no smooth scroll)
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []); // run only once on mount


    const handleOpenModal = (sessionId) => {
        setSelectedSession(sessionId);
        setModalOpen(true);
    };

    const handleFeedbackSubmit = () => {
        setFeedbackSubmitted((prev) => ({
            ...prev,
            [selectedSession]: true,
        }));
    };

    // 📄 Export as PDF
    const handleExport = () => {
        const doc = new jsPDF();
        let yOffset = 20;

        doc.setFontSize(16);
        doc.text(`${customer.name} - Chat Transcripts`, 14, yOffset);
        yOffset += 10;

        chat_sessions.forEach((session) => {
            doc.setFontSize(12);
            doc.text(
                `Session ID: ${session.session_id} | ${new Date(session.timestamp).toLocaleString()}`,
                14,
                yOffset
            );
            yOffset += 5;
            doc.text(`Mood: ${session.mood_selected} | Purchased: ${session.purchased_product}`, 14, yOffset);
            yOffset += 5;

            const rows = session.messages.map((msg) => [
                msg.sender.toUpperCase(),
                msg.message,
            ]);

            autoTable(doc, {
                head: [["Sender", "Message"]],
                body: rows,
                startY: yOffset + 2,
                theme: "grid",
                styles: { fontSize: 10, cellPadding: 2 },
                headStyles: { fillColor: [25, 118, 210] },
            });

            yOffset = doc.lastAutoTable.finalY + 10;
        });

        doc.save(`${customer.name}_Chat_Transcripts.pdf`);
    };

    return (
        <Card
            sx={{
                boxShadow: "none",
                bgcolor: "var(--whiteColor)",
                mb: "25px",
                borderRadius: "7px",
                padding: { xs: "20px", sm: "25px" },
                height: "72vh",
                display: "flex",
                flexDirection: "column",
                border: "1px solid var(--borderColor)",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--borderColor)",
                    pb: 1,
                }}
            >

                <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/chat-transcripts")}
                    >
                        Back
                    </Button>

                <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: "var(--blackColor)", textAlign: "center" }}
                >
                    {customer.name} - Chat Transcripts
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="contained" onClick={handleExport}>
                        Export <i className="material-symbols-outlined">download</i>
                    </Button>

                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                    <IconButton
                        color={notesOpen ? "primary" : "default"}
                        onClick={() => setNotesOpen(!notesOpen)}
                    >
                        <i className="material-symbols-outlined">clinical_notes</i>
                    </IconButton>
                </Box>
            </Box>

            {/* Chat + Notes layout */}
            <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
                {/* Chat Body */}
                <Box
                    ref={chatContainerRef}   // ⬅ add ref to scroll container
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        pr: 1,
                        transition: "margin 0.3s ease",
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgb(180, 179, 222) transparent",
                        "&::-webkit-scrollbar": { width: "4px", height: "0.5px" },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(25, 118, 210, 0.3)",
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
                    }}
                >
                    {chat_sessions.map((session) => {
                        const nameParts = customer.name.trim().split(" ");
                        const initials =
                            (nameParts[0]?.[0] || "") +
                            (nameParts[nameParts.length - 1]?.[0] || "");

                        return (
                            <Box key={session.session_id} sx={{ mb: 3 }}>
                                {/* Date Divider */}
                                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            textAlign: "center",
                                            bgcolor: "var(--whiteColor)",
                                            color: "var(--primaryColor)",
                                            borderRadius: "10px",
                                            padding: "4px 10px",
                                            display: "inline-block",
                                            border: "1px solid var(--primaryColor)",
                                        }}
                                    >
                                        {formatDateLabel(session.timestamp)}
                                    </Typography>
                                </Box>

                                {/* Messages */}
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {session.messages.map((msg, i) => {
                                        const isUser = msg.sender === "user";

                                        return (
                                            <React.Fragment key={i}>
                                                {i === 0 && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize: "0.6rem",
                                                            display: "block",
                                                            marginBottom: "4px",
                                                            marginLeft: !isUser && msg.sender === "bot" ? "43px" : "0",
                                                            marginRight: isUser ? "0" : "auto",
                                                            textAlign: isUser ? "right" : "left",
                                                            maxWidth: "70%",
                                                            overflowX: "auto",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        <Typography component="span" sx={{ fontWeight: 500, fontSize: "inherit", color: "var(--blackColor)" }}>
                                                            Session ID:
                                                        </Typography>{" "}
                                                        {session.session_id} |{" "}
                                                        <Typography component="span" sx={{ fontWeight: 500, fontSize: "inherit", color: "var(--blackColor)" }}>
                                                            Timestamp:
                                                        </Typography>{" "}
                                                        {new Date(session.timestamp).toLocaleString()} |{" "}
                                                        <Typography component="span" sx={{ fontWeight: 500, fontSize: "inherit", color: "var(--blackColor)" }}>
                                                            Mood:
                                                        </Typography>{" "}
                                                        {session.mood_selected} |{" "}
                                                        <Typography component="span" sx={{ fontWeight: 500, fontSize: "inherit", color: "var(--blackColor)" }}>
                                                            Purchased:
                                                        </Typography>{" "}
                                                        {session.purchased_product} |{" "}
                                                        {/* <Link size="small" variant="text" sx={{ textTransform: "none", ml: 1 }} onClick={() => handleOpenModal(session.session_id)}>
                                                            {feedbackSubmitted[session.session_id] ? "Feedback Submitted" : "Submit Feedback"}
                                                        </Link> */
                                                        }
                                                       <Typography component="span" sx={{ fontWeight: 500, fontSize: "inherit", color: "var(--blackColor)" }}>
                                                            Feedback:
                                                        </Typography>{" "}
                                                        { "Product has not been suggested properly"}

                                                    </Typography>
                                                )}

                                                {/* Message wrapper */}
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: isUser ? "row-reverse" : "row",
                                                        alignItems: "flex-start",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {/* BOT avatar */}
                                                    {!isUser && (
                                                        <Box
                                                            sx={{
                                                                width: 35,
                                                                height: 35,
                                                                borderRadius: "50%",
                                                                marginRight: isUser ? 0 : "8px",
                                                                marginLeft: isUser ? "8px" : 0,
                                                                flexShrink: 0,
                                                                visibility: i === 0 ? "visible" : "hidden",
                                                            }}
                                                        >
                                                            {i === 0 && (
                                                                <img
                                                                    src="/images/users/user31.jpg"
                                                                    alt="bot"
                                                                    width={35}
                                                                    height={35}
                                                                    style={{ borderRadius: "100%" }}
                                                                />
                                                            )}
                                                        </Box>
                                                    )}

                                                    {/* USER avatar */}
                                                    {isUser && (
                                                        <Box
                                                            sx={{
                                                                width: 35,
                                                                height: 35,
                                                                borderRadius: "50%",
                                                                border: "2px solid var(--primaryColor)",
                                                                color: "var(--primaryColor)",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontWeight: "bold",
                                                                fontSize: "0.9rem",
                                                                marginLeft: "8px",
                                                                marginRight: "0px",
                                                                flexShrink: 0,
                                                            }}
                                                        >
                                                            {initials.toUpperCase()}
                                                        </Box>
                                                    )}

                                                    {/* Message content */}
                                                    <Box sx={{ maxWidth: "70%" }}>
                                                        {msg.type === "product_suggestion" ? (
                                                            <Typography
                                                                component="a"
                                                                href={msg.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                sx={{
                                                                    fontSize: "12px",
                                                                    textAlign: "center",
                                                                    bgcolor: "var(--whiteColor)",
                                                                    color: "var(--primaryColor)",
                                                                    borderRadius: "10px",
                                                                    padding: "4px 10px",
                                                                    display: "inline-block",
                                                                    border: "1px solid var(--primaryColor)",
                                                                    textDecoration: "none",
                                                                }}
                                                            >
                                                                {msg.message}
                                                            </Typography>
                                                        ) : msg.type === "disclaimer" ? (
                                                            <Alert
                                                                severity="warning"
                                                                sx={{
                                                                    fontSize: "12px",
                                                                    padding: "4px 8px",
                                                                    "& .MuiAlertTitle-root": { fontSize: "12px", marginBottom: "2px" },
                                                                    "& .MuiAlert-message": { fontSize: "12px", padding: 0 },
                                                                }}
                                                            >
                                                                <AlertTitle>Warning</AlertTitle>
                                                                {msg.message}
                                                            </Alert>
                                                        ) : (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: isUser ? "var(--primaryColor)" : "var(--lightColor)",
                                                                    color: isUser ? "var(--whiteColor)" : "var(--blackColor)",
                                                                    padding: "8px 12px",
                                                                    borderRadius: "10px",
                                                                    border: "1px solid var(--borderColor)",
                                                                }}
                                                            >
                                                                <Typography variant="body2">{msg.message}</Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </li>
                                            </React.Fragment>
                                        );
                                    })}
                                </ul>
                            </Box>
                        );
                    })}
                </Box>

                {/* Collapsible Notes Panel */}
                <Collapse
                    orientation="horizontal"
                    in={notesOpen}
                    timeout={300}
                    unmountOnExit
                    sx={{
                        borderLeft: "1px solid var(--borderColor)",
                        bgcolor: "var(--lightColor)",
                        transition: "width 0.3s ease",
                    }}
                >
                    <Box sx={{ width: 300, height: "100%", p: 2 }}>
                        <BudENotes
                            moodTrends={chatData.data.customer.bot_notes.mood_trends}
                            usageSummary={chatData.data.customer.bot_notes.usage_summary}
                            productEngagement={chatData.data.customer.bot_notes.product_engagement}
                        />
                    </Box>
                </Collapse>
            </Box>

            {/* Feedback Modal */}
            <FeedbackModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleFeedbackSubmit}
            />
        </Card>
    );
};

export default ChatTranscriptsWindow;

