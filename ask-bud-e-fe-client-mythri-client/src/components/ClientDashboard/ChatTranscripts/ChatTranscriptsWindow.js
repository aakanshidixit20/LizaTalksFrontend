"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Card,
    Box,
    Typography,
    Button,
    Alert,
    AlertTitle,
    Link,
    IconButton,
    Collapse,
    useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FeedbackModal from "./FeedBackModal";
import BudENotes from "./BudENotes";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CircularProgress } from "@mui/material";
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

// Helper function to format time as HH:MM
const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
};

// Helper function to truncate session ID
const truncateSessionId = (sessionId) => {
    if (!sessionId) return "...";
    if (sessionId.length <= 6) return sessionId;
    return `...${sessionId.slice(-6)}`;
};

// Helper function to parse suggestions message - ONLY for bot messages starting with "Suggestions:"
const parseSuggestions = (message) => {
    if (!message || !message.startsWith("Suggestions:")) return [];
    
    // Remove "Suggestions:" prefix and trim
    const cleanMessage = message.replace(/^Suggestions:\s*/i, "").trim();
    
    // Split by comma and trim each item
    return cleanMessage.split(',').map(item => item.trim()).filter(item => item.length > 0);
};

// Helper function to parse user mood data - ONLY for JSON messages
const parseMoodData = (message) => {
    try {
        // Only parse if it looks like JSON (starts with { and ends with })
        if (!message.trim().startsWith('{') || !message.trim().endsWith('}')) {
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

const ChatTranscriptsWindow = ({ chatData }) => {
    const navigate = useNavigate();
    const customer = chatData?.customer || {};
    const chat_sessions = chatData?.chat_sessions || [];
    const { customer_id } = useParams();
    const { logout } = useContext(AuthContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState({});
    const [selectedSession, setSelectedSession] = useState(null);
    const [notesOpen, setNotesOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [botNotesData, setBotNotesData] = useState(null);
    const [error, setError] = useState(null);
    
    const chatContainerRef = useRef(null);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    // ✅ Sort sessions by timestamp - OLDEST FIRST (so newest appear at bottom)
    const sortedSessions = [...chat_sessions].sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
    );

    // ✅ Fetch bot notes
    useEffect(() => {
        const fetchBotNotes = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check if user is authenticated
                if (!config.isAuthenticated()) {
                    logout("Please login to access bot notes.");
                    return;
                }

                console.log("Making Bot Notes API call with:", {
                    clientId: config.clientId,
                    apiKey: config.apiKey ? "***" + config.apiKey.slice(-4) : "missing"
                });

                const response = await fetch(
                    `${config.API_BASE_URL}/client/bot-notes/${customer_id}`,
                    {
                        method: "GET",
                        headers: config.getHeaders(),
                    }
                );

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Session expired. Please login again.");
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result?.success && result?.data?.bot_notes) {
                    setBotNotesData(result.data.bot_notes);
                    console.log("Fetched bot notes:", result.data.bot_notes);
                } else {
                    throw new Error(result?.message || "Failed to fetch bot notes");
                }
            } catch (err) {
                console.error("Error fetching bot notes:", err);
                if (err.message.includes("Session expired") || err.message.includes("login")) {
                    logout(err.message);
                } else {
                    setError(err.message || "Failed to fetch bot notes. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (customer_id) {
            fetchBotNotes();
        } else {
            setError("Customer ID is missing from the URL.");
            setLoading(false);
        }
    }, [customer_id, logout]);

    // ✅ Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (botNotesData !== null || error !== null) {
                setLoading(false);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [botNotesData, error]);

    // ✅ Auto-scroll to bottom when loading is complete
    useEffect(() => {
        if (!loading && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [loading, sortedSessions]); // Use sortedSessions here

    const handleOpenModal = (sessionId) => {
        setSelectedSession(sessionId);
        setModalOpen(true);
    };

   const handleFeedbackSubmit = (feedbackType, tags = []) => {
    setFeedbackSubmitted((prev) => ({
        ...prev,
        [selectedSession]: true,
    }));
    console.log(`Feedback submitted for session ${selectedSession}:`, {
        type: feedbackType,
        tags: tags
    });
};

    // 📄 Export as PDF
    const handleExport = () => {
        const doc = new jsPDF();
        let yOffset = 20;

        doc.setFontSize(16);
        doc.text(`${customer.name} - Chat Transcripts`, 14, yOffset);
        yOffset += 10;

        sortedSessions.forEach((session) => {
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

    // Safe function to get initials
    const getInitials = (name) => {
        if (!name) return "??";
        const nameParts = (customer.name || "").trim().split(" "); 
        return (
            (nameParts[0]?.[0] || "") +
            (nameParts[nameParts.length - 1]?.[0] || "")
        ).toUpperCase();
    };

    // ✅ Render loading, error, or main content
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

    if (!botNotesData) {
        return (
            <div style={{ margin: "2rem" }}>
                <Alert severity="warning">No bot notes found for this customer.</Alert>
            </div>
        );
    }

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
                    flexWrap: "nowrap",
                    minWidth: 0,
                }}
            >
                {/* Left - Back */}
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/chat-transcripts")}
                    sx={{
                        flexShrink: 0,
                        fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.9rem" },
                        padding: { xs: "3px 6px", sm: "5px 10px" },
                    }}
                >
                    Back
                </Button>

                {/* Center - Title */}
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
                    {customer.name} - Chat Transcripts
                </Typography>

                {/* Right - Actions */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexShrink: 0,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleExport}
                        sx={{
                            minWidth: "70px",
                            fontSize: { xs: "0.65rem", sm: "0.8rem", md: "0.9rem" },
                            padding: { xs: "3px 6px", sm: "5px 10px" },
                            whiteSpace: "nowrap",
                        }}
                    >
                        Export <i className="material-symbols-outlined">download</i>
                    </Button>

                    <IconButton
                        color={notesOpen ? "primary" : "default"}
                        onClick={() => setNotesOpen(!notesOpen)}
                        sx={{
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                        }}
                    >
                        <i className="material-symbols-outlined">clinical_notes</i>
                    </IconButton>
                </Box>
            </Box>

            {/* Chat + Notes layout */}
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    overflow: "hidden",
                    flexDirection: isSmallScreen ? "column" : "row",
                }}
            >
                {/* Chat Body */}
                <Box
                    ref={chatContainerRef}
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
                    {/* FIXED: Show sessions in chronological order (oldest first at TOP, newest last at BOTTOM) */}
                    {sortedSessions.map((session) => {
                        const nameParts = (customer.name || "").trim().split(" "); 
                        const initials = getInitials(customer.name);

                        return (
                            <Box key={session.session_id} sx={{ mb: 3 }}>
                                {/* Date Divider - Show at the top of each session */}
                                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
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
                                        {formatDateLabel(session.timestamp)}
                                    </Typography>
                                </Box>

                                {/* Messages - Show in correct order within session */}
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {session.messages.map((msg, i, array) => {
                                        const isUser = msg.sender === "user";
                                        
                                        // ONLY parse suggestions for bot messages that start with "Suggestions:"
                                        const suggestions = !isUser && msg.message.startsWith("Suggestions:") 
                                            ? parseSuggestions(msg.message) 
                                            : [];
                                        
                                        // ONLY parse mood data for user messages that are valid JSON
                                        const moodBubbles = isUser 
                                            ? parseMoodData(msg.message)
                                            : [];

                                        return (
                                            <React.Fragment key={i}>
                                                {/* Session info - Show only for first message with truncated session ID */}
                                                {i === 0 && (
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.75rem" },
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
                                                        {truncateSessionId(session.session_id)} |{" "}
                                                        <Typography component="span" sx={{ fontWeight: 500, fontSize: "inherit", color: "var(--blackColor)" }}>
                                                            Mood:
                                                        </Typography>{" "}
                                                        {session.mood_selected} |{" "}
                                                        <Typography component="span" sx={{ fontWeight: 500, fontSize: "inherit", color: "var(--blackColor)" }}>
                                                            Purchased:
                                                        </Typography>{" "}
                                                        {session.purchased_product}
                                                        <Link 
                                                            size="small" 
                                                            variant="text" 
                                                            sx={{ 
                                                                textTransform: "none", 
                                                                ml: 1,
                                                                cursor: 'pointer'
                                                            }} 
                                                            onClick={() => handleOpenModal(session.session_id)}
                                                        >
                                                            {feedbackSubmitted[session.session_id] ? "Feedback Submitted" : "Submit Feedback"}
                                                        </Link>
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
                                                    {/* Avatar logic */}
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
                                                                visibility: i === 0 ? "visible" : "hidden",
                                                            }}
                                                        >
                                                            {initials}
                                                        </Box>
                                                    )}

                                                    <Box sx={{ 
                                                        maxWidth: "70%", 
                                                        position: 'relative',
                                                        paddingBottom: '16px'
                                                    }}>
                                                        {/* FIX 2: Handle bot suggestions - ONLY for messages starting with "Suggestions:" */}
                                                        {!isUser && suggestions.length > 0 ? (
                                                            <Box sx={{ position: 'relative' }}>
                                                                <Box sx={{ 
                                                                    display: 'flex', 
                                                                    flexDirection: 'column',
                                                                    gap: 1,
                                                                    maxWidth: '300px'
                                                                }}>
                                                                    {suggestions.map((suggestion, index) => (
                                                                        <Typography
                                                                            key={index}
                                                                            sx={{
                                                                                fontSize: "12px",
                                                                                textAlign: "left",
                                                                                bgcolor: "var(--whiteColor)",
                                                                                color: "var(--primaryColor)",
                                                                                borderRadius: "10px",
                                                                                padding: "6px 12px",
                                                                                display: "inline-block",
                                                                                border: "1px solid var(--primaryColor)",
                                                                                textDecoration: "none",
                                                                                wordBreak: 'break-word',
                                                                                maxWidth: '100%'
                                                                            }}
                                                                        >
                                                                            {suggestion}
                                                                        </Typography>
                                                                    ))}
                                                                </Box>
                                                                {/* Time for suggestions */}
                                                                <Typography 
                                                                    variant="caption" 
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        bottom: -12,
                                                                        right: 8,
                                                                        fontSize: '0.6rem',
                                                                        opacity: 0.7,
                                                                        color: 'var(--primaryColor)',
                                                                        padding: '2px 4px',
                                                                    }}
                                                                >
                                                                    {formatTime(msg.timestamp || session.timestamp)}
                                                                </Typography>
                                                            </Box>
                                                        ) : 
                                                        /* FIX 3: Handle user mood data - ONLY for JSON messages */
                                                        isUser && moodBubbles.length > 0 ? (
                                                            <Box sx={{ position: 'relative' }}>
                                                                <Box sx={{ 
                                                                    display: 'flex', 
                                                                    flexDirection: 'column',
                                                                    gap: 1,
                                                                    maxWidth: '250px'
                                                                }}>
                                                                    {moodBubbles.map((bubble, index) => (
                                                                        <Box
                                                                            key={index}
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
                                                                {/* Time for mood bubbles */}
                                                                <Typography 
                                                                    variant="caption" 
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        bottom: -12,
                                                                        right: 8,
                                                                        fontSize: '0.6rem',
                                                                        opacity: 0.7,
                                                                        color: 'var(--whiteColor)',
                                                                        padding: '0px 2px',
                                                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                                                        borderRadius: '2px',
                                                                    }}
                                                                >
                                                                    {formatTime(msg.timestamp || session.timestamp)}
                                                                </Typography>
                                                            </Box>
                                                        ) : 
                                                        msg.type === "product_suggestion" ? (
                                                            <Box sx={{ position: 'relative' }}>
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
                                                                {/* Time for product suggestions */}
                                                                <Typography 
                                                                    variant="caption" 
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        bottom: -12,
                                                                        right: 8,
                                                                        fontSize: '0.6rem',
                                                                        opacity: 0.7,
                                                                        color: 'var(--primaryColor)',
                                                                        padding: '2px 4px',
                                                                    }}
                                                                >
                                                                    {formatTime(msg.timestamp || session.timestamp)}
                                                                </Typography>
                                                            </Box>
                                                        ) : msg.type === "disclaimer" ? (
                                                            <Box sx={{ position: 'relative' }}>
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
                                                                {/* Time for disclaimers */}
                                                                <Typography 
                                                                    variant="caption" 
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        bottom: -12,
                                                                        right: 8,
                                                                        fontSize: '0.6rem',
                                                                        opacity: 0.7,
                                                                        color: 'var(--blackColor)',
                                                                        padding: '2px 4px',
                                                                    }}
                                                                >
                                                                    {formatTime(msg.timestamp || session.timestamp)}
                                                                </Typography>
                                                            </Box>
                                                        ) : (
                                                            // Regular messages - unchanged
                                                            <Box
                                                                sx={{
                                                                    bgcolor: isUser ? "var(--primaryColor)" : "var(--lightColor)",
                                                                    color: isUser ? "var(--whiteColor)" : "var(--blackColor)",
                                                                    padding: "8px 12px",
                                                                    borderRadius: "10px",
                                                                    border: "1px solid var(--borderColor)",
                                                                    position: 'relative',
                                                                }}
                                                            >
                                                                <Typography variant="body2" sx={{ paddingRight: '30px' }}>
                                                                    {msg.message}
                                                                </Typography>
                                                                {/* Time for regular messages */}
                                                                <Typography 
                                                                    variant="caption" 
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        bottom: 4,
                                                                        right: 8,
                                                                        fontSize: '0.6rem',
                                                                        opacity: 0.7,
                                                                        color: isUser ? 'var(--whiteColor)' : 'var(--blackColor)',
                                                                        padding: '0px 2px',
                                                                        backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                                        borderRadius: '2px',
                                                                    }}
                                                                >
                                                                    {formatTime(msg.timestamp || session.timestamp)}
                                                                </Typography>
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
                    orientation={isSmallScreen ? "vertical" : "horizontal"}
                    in={notesOpen}
                    timeout={150}
                    unmountOnExit
                    sx={{
                        borderLeft: isSmallScreen ? "none" : "1px solid var(--borderColor)",
                        borderTop: isSmallScreen ? "1px solid var(--borderColor)" : "none",
                        bgcolor: "var(--lightColor)",
                        transition: "width 0.3s ease, height 0.3s ease",
                    }}
                >
                    <Box
                        sx={{
                            width: isSmallScreen ? "100%" : 300,
                            height: "100%",
                            p: 2,
                        }}
                    >
                        <BudENotes
                            moodTrends={botNotesData.mood_trends}
                            usageSummary={botNotesData.usage_summary}
                            productEngagement={botNotesData.product_engagement}
                        />
                    </Box>
                </Collapse>
            </Box>

            {/* Feedback Modal */}
           <FeedbackModal
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    onSubmit={handleFeedbackSubmit}
    sessionId={selectedSession}
/>
        </Card>
    );
};

export default ChatTranscriptsWindow;