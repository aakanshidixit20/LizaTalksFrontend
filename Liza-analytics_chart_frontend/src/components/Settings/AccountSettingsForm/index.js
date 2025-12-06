"use client";

import React, { useState } from "react";
import {
  Grid,
  Card,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NavList from "../NavList";
import CustomEditor from "./CustomEditor";
import FileUpload from "../../Forms/FileUpload";

const AccountSettingsForm = () => {
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [profession, setProfession] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleProfessionChange = (event) => {
    setProfession(event.target.value);
  };

  // File Upload
  const handleFileSelect = (files) => {
    console.log("Selected files:", files);
    // Process your files here
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <NavList />

        <Box component="form">
          <Box
            sx={{
              mb: "25px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                fontWeight: 700,
                mb: "10px",
              }}
              className="text-black"
            >
              Profile
            </Typography>

            <Typography>
              Update your photo and personal details here.
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    First Name
                  </Typography>

                  <TextField
                    label="Enter first name"
                    defaultValue="Olivia"
                    variant="filled"
                    id="firstName"
                    name="firstName"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Last Name
                  </Typography>

                  <TextField
                    label="Enter last name"
                    defaultValue="John"
                    variant="filled"
                    id="lastName"
                    name="lastName"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Email Address
                  </Typography>

                  <TextField
                    label="Enter amail address"
                    defaultValue="olivia@trezo.com"
                    variant="filled"
                    id="emailAddress"
                    name="emailAddress"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Phone Number
                  </Typography>

                  <TextField
                    label="Enter phone number"
                    defaultValue="+1 444 555 6699"
                    variant="filled"
                    id="phoneNumber"
                    name="phoneNumber"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Address
                  </Typography>

                  <TextField
                    label="Enter address"
                    defaultValue="84 S. Arrowhead Court Branford"
                    variant="filled"
                    id="address"
                    name="address"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Country
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="country-label">Select</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country-type"
                    value={country}
                    label="Select"
                    onChange={handleCountryChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Switzerland</MenuItem>
                    <MenuItem value={1}>New Zealand</MenuItem>
                    <MenuItem value={2}>Germany</MenuItem>
                    <MenuItem value={3}>United States</MenuItem>
                    <MenuItem value={4}>Japan</MenuItem>
                    <MenuItem value={5}>Netherlands</MenuItem>
                    <MenuItem value={6}>Sweden</MenuItem>
                    <MenuItem value={7}>Canada</MenuItem>
                    <MenuItem value={8}>United Kingdom</MenuItem>
                    <MenuItem value={9}>Australia</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Typography
                component="h5"
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  mb: "12px",
                }}
                className="text-black"
              >
                Date Of Birth
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    width: "100%",
                    "& fieldset": {
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: "7px",
                    },
                  }}
                  className="input-date-picker"
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Gender
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="brand-name-label">Select</InputLabel>
                  <Select
                    labelId="brand-name-label"
                    id="brand-name"
                    value={gender}
                    label="Select"
                    onChange={handleGenderChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Male</MenuItem>
                    <MenuItem value={1}>Female</MenuItem>
                    <MenuItem value={2}>Custom</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Your Skills
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="brand-name-label">Select</InputLabel>
                  <Select
                    labelId="brand-name-label"
                    id="brand-name"
                    value={skills}
                    label="Select"
                    onChange={handleSkillsChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Leadership</MenuItem>
                    <MenuItem value={1}>Project Management</MenuItem>
                    <MenuItem value={2}>Data Analysis</MenuItem>
                    <MenuItem value={3}>Teamwork</MenuItem>
                    <MenuItem value={4}>Web Development</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Your Profession
                </Typography>

                <FormControl fullWidth>
                  <InputLabel id="brand-name-label">Select</InputLabel>
                  <Select
                    labelId="brand-name-label"
                    id="brand-name"
                    value={profession}
                    label="Select"
                    onChange={handleProfessionChange}
                    sx={{
                      "& fieldset": {
                        border: "1px solid #D5D9E2",
                        borderRadius: "7px",
                      },
                    }}
                  >
                    <MenuItem value={0}>Financial Manager</MenuItem>
                    <MenuItem value={1}>IT Manager</MenuItem>
                    <MenuItem value={2}>Software Developer</MenuItem>
                    <MenuItem value={3}>Physician Assistant</MenuItem>
                    <MenuItem value={4}>Data Scientist</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Company Name
                  </Typography>

                  <TextField
                    label="Enter company name"
                    defaultValue="Trezo Admin"
                    variant="filled"
                    id="companyName"
                    name="companyName"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Company Website
                  </Typography>

                  <TextField
                    label="Enter company website"
                    defaultValue="http://website.com"
                    variant="filled"
                    id="companyWebsite"
                    name="companyWebsite"
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Box>
                <Typography
                  component="label"
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    mb: "10px",
                    display: "block",
                  }}
                  className="text-black"
                >
                  Add Your Bio
                </Typography>

                <CustomEditor />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Box mb="15px">
                <Typography
                  component="h5"
                  sx={{
                    fontWeight: "700",
                    fontSize: { xs: "14px", sm: "20px" },
                    mb: "5px",
                  }}
                  className="text-black"
                >
                  Your Photo
                </Typography>

                <Typography>This will be displayed on your profile.</Typography>
              </Box>

              <FileUpload onFileSelect={handleFileSelect} />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Typography
                component="h5"
                sx={{
                  fontWeight: "700",
                  fontSize: { xs: "14px", sm: "20px" },
                }}
                className="text-black"
              >
                Socials Profile
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Facebook
                  </Typography>

                  <TextField
                    label="Enter facebook link"
                    defaultValue="https://www.facebook.com/"
                    variant="filled"
                    id="facebookLink"
                    name="facebookLink"
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    X
                  </Typography>

                  <TextField
                    label="Enter x link"
                    defaultValue="https://www.x.com/"
                    variant="filled"
                    id="xLink"
                    name="xLink"
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    Linkedin
                  </Typography>

                  <TextField
                    label="Enter linkedin link"
                    defaultValue="https://www.linkedin.com/"
                    variant="filled"
                    id="linkedinLink"
                    name="linkedinLink"
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <Typography
                    component="label"
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      mb: "10px",
                      display: "block",
                    }}
                    className="text-black"
                  >
                    YouTube
                  </Typography>

                  <TextField
                    label="Enter youtube link"
                    defaultValue="https://www.youtube.com/"
                    variant="filled"
                    id="youtubeLink"
                    name="youtubeLink"
                    required
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                        color: "#000",
                        fontWeight: "500",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "10px", sm: "20px" },
                  mb: "25px",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "6px",
                    fontWeight: "500",
                    fontSize: { xs: "13px", sm: "16px" },
                    padding: { xs: "10px 20px", sm: "10px 24px" },
                    color: "#fff !important",
                    boxShadow: "none",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "6px",
                    fontWeight: "500",
                    fontSize: { xs: "13px", sm: "16px" },
                    padding: { xs: "10px 20px", sm: "10px 24px" },
                    color: "#fff !important",
                    boxShadow: "none",
                  }}
                >
                  <i className="material-symbols-outlined">check</i> Update
                  Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default AccountSettingsForm;
