import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    Box,
    Typography,
    Button,
    Alert,
    CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import config from "../../../config";
import { AuthContext } from "../../../authentication/AuthContext";

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

const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

// Helper function to parse user mood data - ONLY for JSON messages
const parseMoodData = (message) => {
    try {
        // Only parse if it looks like JSON (starts with { and ends with })
        if (!message || !message.trim().startsWith('{') || !message.trim().endsWith('}')) {
            return [];
        }

        const moodData = JSON.parse(message);
        const bubbles = [];

        if (moodData.mood) {
            bubbles.push({ type: 'mood', label: 'Mood', value: moodData.mood });
        }
        if (moodData.category) {
            bubbles.push({ type: 'category', label: 'Category', value: moodData.category });
        }
        if (moodData.budget) {
            bubbles.push({ type: 'budget', label: 'Budget', value: moodData.budget });
        }

        return bubbles;
    } catch (error) {
        // If not valid JSON, return empty array
        return [];
    }
};

const SessionChatTranscript = () => {
    const navigate = useNavigate();
    const { feedback_id } = useParams();
    const { logout } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chatData, setChatData] = useState(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log("📄 Fetching chat history for feedback:", feedback_id);

                const response = await fetch(
                    `${config.API_BASE_URL}/client/chat-reports/${feedback_id}/chat-history`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success && data.data) {
                    setChatData(data.data);
                } else {
                    throw new Error(data.message || "Failed to load chat history");
                }
            } catch (err) {
                console.error("❌ Error fetching chat history:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (feedback_id) {
            fetchChatHistory();
        }
    }, [feedback_id]);

    // Auto-scroll to bottom when loading is complete
    useEffect(() => {
        if (!loading && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [loading, chatData]);

    // Export to PDF
    const handleExport = () => {
        if (!chatData) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let yPosition = 10;

        // Title
        doc.setFontSize(16);
        doc.text("Chat Transcript", pageWidth / 2, yPosition, { align: "center" });
        yPosition += 10;

        // Customer Info
        doc.setFontSize(10);
        doc.text(`Customer: ${chatData.customer_name}`, 10, yPosition);
        yPosition += 6;
        doc.text(`Email: ${chatData.customer_email}`, 10, yPosition);
        yPosition += 6;
        doc.text(`Issue: ${chatData.customer_issue}`, 10, yPosition);
        yPosition += 10;

        // Messages
        doc.setFontSize(9);
        const messages = chatData.messages || [];

        messages.forEach((msg) => {
            const userText = `User: ${msg.user_query}`;
            const botText = `Bot: ${msg.response_text}`;
            const time = formatTime(msg.created_at);

            // User message
            const userLines = doc.splitTextToSize(userText, pageWidth - 20);
            userLines.forEach((line) => {
                if (yPosition > pageHeight - 10) {
                    doc.addPage();
                    yPosition = 10;
                }
                doc.text(line, 10, yPosition);
                yPosition += 5;
            });

            // Bot message
            const botLines = doc.splitTextToSize(botText, pageWidth - 20);
            botLines.forEach((line) => {
                if (yPosition > pageHeight - 10) {
                    doc.addPage();
                    yPosition = 10;
                }
                doc.text(line, 10, yPosition);
                yPosition += 5;
            });

            // Time
            doc.setFontSize(8);
            doc.text(time, pageWidth - 20, yPosition - 5, { align: "right" });
            doc.setFontSize(9);
            yPosition += 8;
        });

        doc.save(`chat-transcript-${chatData.customer_name}.pdf`);
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ margin: "2rem" }}>
                <Alert severity="error">{error}</Alert>
            </div>
        );
    }

    if (!chatData) {
        return (
            <div style={{ margin: "2rem" }}>
                <Alert severity="warning">No chat data found.</Alert>
            </div>
        );
    }

    const messages = chatData.messages || [];

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
                    mb: 2,
                    flexWrap: "nowrap",
                    minWidth: 0,
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/chat-problems-report")}
                    sx={{
                        flexShrink: 0,
                        fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.9rem" },
                        padding: { xs: "3px 6px", sm: "5px 10px" },
                    }}
                >
                    Back
                </Button>

                <Typography
                    fontWeight={600}
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: { xs: "0.85rem", sm: "1.1rem", md: "1.3rem" },
                        color: "var(--blackColor)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        mx: 1,
                    }}
                >
                    Chat Transcript - {chatData.customer_name}
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleExport}
                    sx={{
                        flexShrink: 0,
                        minWidth: "70px",
                        fontSize: { xs: "0.65rem", sm: "0.8rem", md: "0.9rem" },
                        padding: { xs: "3px 6px", sm: "5px 10px" },
                        whiteSpace: "nowrap",
                    }}
                >
                    Export <i className="material-symbols-outlined" style={{ marginLeft: "4px", fontSize: "1rem" }}>download</i>
                </Button>
            </Box>

            {/* Feedback Info */}
            <Box sx={{ mb: 2, p: 1, bgcolor: "var(--lightColor)", borderRadius: "6px" }}>
                <Typography variant="caption" sx={{ fontSize: "0.8rem", color: "var(--blackColor)" }}>
                    <strong>Customer:</strong> {chatData.customer_name}
                </Typography>
                <br />
                <Typography variant="caption" sx={{ fontSize: "0.8rem", color: "var(--blackColor)" }}>
                    <strong>Email:</strong> {chatData.customer_email}
                </Typography>
                <br />
                <Typography variant="caption" sx={{ fontSize: "0.8rem", color: "var(--blackColor)" }}>
                    <strong>Issue:</strong> {chatData.customer_issue}
                </Typography>
            </Box>

            {/* Chat Messages */}
            <Box
                ref={chatContainerRef}
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    pr: 1,
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgb(180, 179, 222) transparent",
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(25, 118, 210, 0.3)",
                        borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
                }}
            >
                {messages.length === 0 ? (
                    <Typography sx={{ textAlign: "center", color: "var(--primaryColor)", mt: 3 }}>
                        No messages found for this session.
                    </Typography>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {messages.map((msg, index) => {
                            const moodBubbles = parseMoodData(msg.user_query);

                            return (
                                <React.Fragment key={index}>
                                    {/* Date Divider - Show only for first message */}
                                    {index === 0 && (
                                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                                                    textAlign: "center",
                                                    bgcolor: "var(--whiteColor)",
                                                    color: "var(--primaryColor)",
                                                    borderRadius: "10px",
                                                    padding: "4px 10px",
                                                    display: "inline-block",
                                                    border: "1px solid var(--primaryColor)",
                                                }}
                                            >
                                                {formatDateLabel(msg.created_at)}
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* User Message */}
                                    <li
                                        style={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            alignItems: "flex-start",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <Box sx={{ maxWidth: "70%", position: 'relative', paddingBottom: '16px' }}>
                                            {/* Handle mood data - ONLY for JSON messages */}
                                            {moodBubbles.length > 0 ? (
                                                <Box sx={{ position: 'relative' }}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 1,
                                                        maxWidth: '250px'
                                                    }}>
                                                        {moodBubbles.map((bubble, idx) => (
                                                            <Box
                                                                key={idx}
                                                                sx={{
                                                                    bgcolor: "var(--primaryColor)",
                                                                    color: "var(--whiteColor)",
                                                                    padding: "6px 12px",
                                                                    borderRadius: "10px",
                                                                    border: "1px solid var(--borderColor)",
                                                                    wordBreak: 'break-word',
                                                                }}
                                                            >
                                                                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                                                                    {bubble.label}:
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                                                    {bubble.value}
                                                                </Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: -14,
                                                            right: 8,
                                                            fontSize: '0.6rem',
                                                            opacity: 0.7,
                                                            color: 'var(--primaryColor)',
                                                            padding: '2px 4px',
                                                        }}
                                                    >
                                                        {formatTime(msg.created_at)}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        bgcolor: "var(--primaryColor)",
                                                        color: "var(--whiteColor)",
                                                        padding: "8px 12px",
                                                        borderRadius: "10px",
                                                        border: "1px solid var(--borderColor)",
                                                        position: 'relative',
                                                        paddingBottom: '20px',
                                                    }}
                                                >
                                                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                                        {msg.user_query}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 4,
                                                            right: 8,
                                                            fontSize: '0.6rem',
                                                            opacity: 0.7,
                                                            color: 'var(--whiteColor)',
                                                        }}
                                                    >
                                                        {formatTime(msg.created_at)}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </li>

                                    {/* Bot Response */}
                                    <li
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "flex-start",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                maxWidth: "70%",
                                                bgcolor: "var(--lightColor)",
                                                color: "var(--blackColor)",
                                                padding: "8px 12px",
                                                borderRadius: "10px",
                                                border: "1px solid var(--borderColor)",
                                                position: 'relative',
                                                paddingBottom: '20px',
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                                {msg.response_text}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 4,
                                                    right: 8,
                                                    fontSize: '0.6rem',
                                                    opacity: 0.7,
                                                    color: 'var(--blackColor)',
                                                }}
                                            >
                                                {formatTime(msg.created_at)}
                                            </Typography>
                                        </Box>
                                    </li>
                                </React.Fragment>
                            );
                        })}
                    </ul>
                )}
            </Box>
        </Card>
    );
};

export default SessionChatTranscript;

