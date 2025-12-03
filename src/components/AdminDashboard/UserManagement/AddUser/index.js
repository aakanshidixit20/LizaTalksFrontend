"use client";
import React, { useState } from "react";
import { Card, Typography, Box, Tabs, Tab, Button, Stack } from "@mui/material";
import UserInfo from "./UserInfo";

function CustomTabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
}

const AddUser = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => setValue(newValue);
    const handleNext = () => value < 3 && setValue(value + 1);
    const handlePrev = () => value > 0 && setValue(value - 1);
    const handleSave = () => console.log(`Saving data for tab index ${value}`);

    const tabLabels = ["User Info"];

    return (
        <Card
            sx={{
                boxShadow: "none",
                borderRadius: "7px",
                mb: "25px",
                padding: { xs: "18px", sm: "20px", lg: "25px" },
            }}
            className="rmui-card"
        >
            <Typography variant="h3" sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: 700, mb: "25px" }}>
                Add User
            </Typography>

            <Tabs value={value} onChange={handleChange}>
                {tabLabels.map((label, index) => (
                    <Tab key={index} label={label} />
                ))}
            </Tabs>

            <CustomTabPanel value={value} index={0}>
                <UserInfo />
            </CustomTabPanel>


            {/* Navigation buttons layout */}
            <Stack direction="row" alignItems="center" justifyContent="center" mt={2}>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >
                        Submit
                    </Button>
                </Box>
            </Stack>
        </Card>
    );
};

export default AddUser;
