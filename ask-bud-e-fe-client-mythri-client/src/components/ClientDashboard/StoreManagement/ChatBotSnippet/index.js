"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    Typography,
    Button,
    Stack,
    CircularProgress,
    Snackbar,
    Fade,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate, useParams } from "react-router-dom";

const ChatbotSnippet = () => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();
    const { store_id } = useParams();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const storeNames = {
        "ST-001": "Green Haven Dispensary",
        "ST-002": "Elevate Wellness",
        "ST-003": "Bliss Botanicals",
    };
    const storeName = storeNames[store_id] || "Unknown Store";

    const filePath = `${process.env.PUBLIC_URL}/snippets/chatbotsnippet.js`;
    const subtitle = `Store Name: ${storeName}`;

    useEffect(() => {
        const fetchCode = async () => {
            try {
                const res = await fetch(filePath);
                const text = await res.text();
                setCode(text);
            } catch (err) {
                console.error("Error loading code file:", err);
                setCode("// Error loading code");
            } finally {
                setLoading(false);
            }
        };

        fetchCode();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setSnackbarOpen(true);
        });
    };

    const handleCancel = () => {
        navigate(`/store-management/`);
    };

    return (
        <Card sx={{ boxShadow: "none", borderRadius: 2, mb: 3, p: 2 }}>
            {/* Header */}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row", // ✅ always in a row
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderBottom: "1px solid #ECEEF2",
                    flexWrap: "nowrap", // ✅ prevent wrapping
                    minWidth: 0, // ✅ allow flex children to shrink
                }}
            >
                {/* Title & Subtitle */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0, // ✅ allows text to shrink/truncate
                        overflow: "hidden",
                    }}
                >
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            mr: 2,
                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis", // ✅ truncates long titles
                        }}
                    >
                        Chatbot Snippet
                    </Typography>
                    <Typography
                        variant="body2"
                        component="span"
                        color="textSecondary"
                        sx={{
                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis", // ✅ truncates long subtitle
                        }}
                    >
                        {subtitle}
                    </Typography>
                </Box>

                {/* Buttons */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        flexShrink: 0, // ✅ buttons never shrink
                        whiteSpace: "nowrap",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleCopy}
                        startIcon={<ContentCopyIcon />}
                        sx={{ fontSize: "0.85rem" }}
                    >
                        Copy
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleCancel}
                        sx={{ fontSize: "0.85rem" }}
                    >
                        Back
                    </Button>
                </Stack>
            </Box>



            {/* Code Viewer */}
            <Box
                sx={{
                    maxHeight: "500px",
                    overflow: "auto",
                    p: 2,
                    backgroundColor: "#282c34",
                    fontSize: isMobile ? "0.75rem" : "0.85rem", // ✅ smaller text on mobile
                }}
            >
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <SyntaxHighlighter
                        language="javascript"
                        style={oneDark}
                        showLineNumbers
                        customStyle={{ margin: 0, borderRadius: 0 }}
                    >
                        {code}
                    </SyntaxHighlighter>
                )}
            </Box>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message="Code copied successfully"
                autoHideDuration={2000}
                TransitionComponent={Fade}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Card>
    );
};

export default ChatbotSnippet;
