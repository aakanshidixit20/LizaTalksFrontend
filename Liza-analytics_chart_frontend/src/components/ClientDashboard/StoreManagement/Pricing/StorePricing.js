"use client";

import * as React from "react";
import { Grid, Typography, Button, Tabs, Tab, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./StorePricing.module.css";

const monthlyPlans = [
    {
        id: "free",
        title: "Free Trial",
        price: 0,
        interval: "per month",
        description: "Try all features for 14 days",
        features: [
            "Basic Dashboard",
            "Task Management",
            "File Storage (1GB)",
            "Basic Reporting",
            "Email Integration",
            "Community Support",
        ],
        popular: false,
        popularBadge: null,
    },
    {
        id: 1,
        title: "Basic",
        price: 29,
        interval: "per month",
        description: "For individual user",
        features: [
            "Basic Dashboard",
            "Task Management",
            "File Storage (5GB)",
            "Basic Reporting",
            "Email Integration",
            "Basic Support",
        ],
        popular: false,
        popularBadge: null,
    },
    {
        id: 2,
        title: "Premium",
        price: 49,
        interval: "per month",
        description: "For team of 10 users",
        features: [
            "Advanced Dashboard",
            "Task Management",
            "File Storage (10GB)",
            "Advanced Reporting",
            "Email Integration",
            "Priority Support",
        ],
        popular: true,
        popularBadge: "/images/icons/star-popular.svg",
    },
    {
        id: 3,
        title: "Pro",
        price: 79,
        interval: "per month",
        description: "For team of 15 users",
        features: [
            "Customizable Dashboard",
            "Task Management",
            "File Storage (Unlimited)",
            "Custom Reporting",
            "Email Integration",
            "24/7 Premium Support",
        ],
        popular: false,
        popularBadge: null,
    },
];

const StorePricing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tabValue, setTabValue] = React.useState(0);
    const { state } = location;
    const selectedPlan = state?.selectedPlan || null;
    const isEdit = state?.isEdit || false;
    const formData = state?.formData || null;



    const getPlans = () => {
        if (tabValue === 0) return monthlyPlans;
        if (tabValue === 1) return quarterlyPlans;
        if (tabValue === 2) return annualPlans;
        return [];
    };

    const quarterlyPlans = monthlyPlans
        .filter((plan) => plan.id !== "free")
        .map((plan) => ({
            ...plan,
            price: plan.price * 3,
            interval: "per quarter",
        }));

    const annualPlans = monthlyPlans
        .filter((plan) => plan.id !== "free")
        .map((plan) => ({
            ...plan,
            price: plan.price * 12,
            interval: "per year",
        }));

    return (
        <Box>



            {/* header */}
            {/* Tabs centered + Back button right */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                }}
            >
                {/* Left spacer to push tabs into true center */}
                <Box sx={{ flex: 1 }} />

                {/* Tabs */}
                <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    textColor="primary"
                    indicatorColor="primary"
                    centered
                >
                    <Tab label="Monthly" />
                    <Tab label="Quarterly" />
                    <Tab label="Annually" />
                </Tabs>

                {/* Back Button */}
                <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => {
                            if (location.state?.from) {
                                navigate(location.state.from); // 👈 goes back preserving state
                            } else {
                                navigate(-1); // fallback
                            }
                        }}
                    >
                        Back
                    </Button>
                </Box>
            </Box>



            {/* Pricing Cards */}
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
                {getPlans().map((plan) => (
                    <Grid
                        key={plan.id}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: tabValue === 0 ? 3 : 4, // Monthly → 4 per row, Others → 3 per row
                            lg: tabValue === 0 ? 3 : 4,
                        }}
                    >
                        <div
                            className={`mb-25 border-radius bg-white ${styles.pricingStyle2Card}`}
                            style={{
                                border:
                                    selectedPlan === plan.title
                                        ? "2px solid var(--primaryColor)"
                                        : "1px solid #e0e0e0",
                            }}
                        >
                            <div className={styles.cardContent}>
                                <div className="text-center">
                                    <div className={styles.title}>
                                        <span>{plan.title}</span>
                                    </div>

                                    <div className={`text-black ${styles.price}`}>
                                        {plan.price === 0 ? "Free" : `$${plan.price}`}{" "}
                                        <span className="text-body">/ {plan.interval}</span>
                                    </div>

                                    <Typography
                                        component="span"
                                        fontWeight={500}
                                        display="block"
                                        mb="20px"
                                    >
                                        {plan.description}
                                    </Typography>
                                </div>

                                <Button
                                    type="button"
                                    variant="contained"
                                    sx={{
                                        textTransform: "capitalize",
                                        borderRadius: "6px",
                                        fontWeight: "500",
                                        fontSize: { xs: "13px", sm: "16px" },
                                        padding: { xs: "10px 20px" },
                                        color: "#fff !important",
                                        boxShadow: "none",
                                        display: "block",
                                        width: "100%",
                                    }}
                                >
                                    <i
                                        className="material-symbols-outlined mr-5"
                                        style={{ fontSize: "16px" }}
                                    >
                                        arrow_forward_ios
                                    </i>
                                    {isEdit
                                        ? plan.title !== selectedPlan
                                            ? "Upgrade"
                                            : "Current Plan"
                                        : plan.price === 0
                                            ? "Start Free Trial"
                                            : "Buy Now"}
                                </Button>


                                <ul className={styles.featuresList}>
                                    {plan.features.map((feature, index) => (
                                        <li key={index}>
                                            <i className="material-symbols-outlined">check</i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {plan.popular && plan.popularBadge && (
                                    <div className={styles.popular}>
                                        <img
                                            src={plan.popularBadge}
                                            alt="popular-image"
                                            width={80}
                                            height={80}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StorePricing;
