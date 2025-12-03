"use client";

import React, { useState } from "react";
import {
    Card,
    Box,
    Typography,
    Button,
    Alert,
    AlertTitle
} from "@mui/material";

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
    const { customer, chat_sessions } = chatData.data;

    return (
        <Card
            sx={{
                boxShadow: "none",
                bgcolor: "var(--whiteColor)",
                mb: "25px",
                borderRadius: "7px",
                padding: { xs: "20px", sm: "25px" },
                height: "500px",
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
                <Button variant="outlined" size="small" sx={{ borderRadius: "20px" }}>
                    <i className="material-symbols-outlined">arrow_back</i>
                    Back
                </Button>

                <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: "var(--blackColor)", textAlign: "center" }}
                >
                    {customer.name} - Chat Transcripts
                </Typography>

                <Button variant="contained">
                    Export <i className="material-symbols-outlined">download</i>
                </Button>
            </Box>

            {/* Chat Body */}
            <Box
                sx={{
                    mt: 2,
                    flex: 1,
                    overflowY: "auto",
                    pr: 1,
                }}
            >
                {chat_sessions.map((session) => (
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
                                const bubbleMarginLeft = !isUser ? "43px" : "0";

                                return (
                                    <React.Fragment key={i}>
                                        {/* Session meta above first message */}
                                        {i === 0 && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: "0.6rem",
                                                    display: "block",
                                                    marginBottom: "4px",
                                                    textAlign: "left",
                                                    ml: bubbleMarginLeft
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
                                                {session.purchased_product}
                                            </Typography>
                                        )}

                                        <li
                                            style={{
                                                display: "flex",
                                                flexDirection: isUser ? "row-reverse" : "row",
                                                alignItems: "flex-start",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            {msg.sender === "bot" && msg.type !== "disclaimer" && (
                                                <img
                                                    src="/images/users/user31.jpg"
                                                    alt="bot"
                                                    width={35}
                                                    height={35}
                                                    style={{
                                                        borderRadius: "100px",
                                                        marginRight: "8px",
                                                    }}
                                                />
                                            )}

                                            {/* Product suggestion */}
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
                                                        ml: bubbleMarginLeft
                                                    }}
                                                >
                                                    {msg.message}
                                                </Typography>
                                            ) : msg.type === "disclaimer" ? (
                                                <Alert
                                                    severity="warning"
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "warning.main",
                                                        ml: bubbleMarginLeft
                                                    }}
                                                >
                                                    <AlertTitle>Warning</AlertTitle>
                                                    {msg.message}
                                                </Alert>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        bgcolor: isUser
                                                            ? "var(--primaryColor)"
                                                            : "var(--lightColor)",
                                                        color: isUser
                                                            ? "var(--whiteColor)"
                                                            : "var(--blackColor)",
                                                        padding: "8px 12px",
                                                        borderRadius: "10px",
                                                        maxWidth: "70%",
                                                        border: "1px solid var(--borderColor)",
                                                        transition: "var(--transition)",
                                                    }}
                                                >
                                                    <Typography variant="body2">{msg.message}</Typography>
                                                </Box>
                                            )}
                                        </li>
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </Box>
                ))}
            </Box>
        </Card>
    );
};

export default ChatTranscriptsWindow;
