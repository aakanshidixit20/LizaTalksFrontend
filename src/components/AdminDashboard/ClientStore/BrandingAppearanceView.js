// BrandingAppearanceView.js
"use client";

// import React from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Avatar,
// } from "@mui/material";

// const BrandingAppearanceView = ({ brandingData }) => {
//   return (
//     <Grid container spacing={4}>
//       {/* Left - Logo & Font */}
//       <Grid item xs={12} md={4}>
//         {/* Logo */}
//         <Box
//           sx={{
//             border: "2px dashed #ccc",
//             borderRadius: 2,
//             p: 3,
//             textAlign: "center",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             height: 220,
//           }}
//         >
//           {brandingData?.logo_url ? (
//             <Avatar
//               src={brandingData.logo_url}
//               alt="Logo"
//               sx={{ width: 100, height: 100, mb: 2 }}
//             />
//           ) : (
//             <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: "#f0f0f0" }} />
//           )}

//           <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
//             Logo
//           </Typography>
//         </Box>

//         {/* Font Style */}
//         <Box sx={{ mt: 3 }}>
//           <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: 1 }}>
//             Font Style
//           </Typography>
//           <FormControl fullWidth disabled>
//             <InputLabel>Font Style</InputLabel>
//             <Select value={brandingData?.font_style || ""} label="Font Style">
//               <MenuItem value={brandingData?.font_style || ""}>
//                 {brandingData?.font_style || "Default"}
//               </MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Grid>

//       {/* Right - Theme Color */}
//       <Grid item xs={12} md={8}>
//         <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: 1 }}>
//           Theme Color
//         </Typography>
//         <Box
//           sx={{
//             width: 60,
//             height: 50,
//             borderRadius: "7px",
//             border: "1px solid #D5D9E2",
//             backgroundColor: brandingData?.theme_color_hex || "#000000",
//             mb: 1,
//           }}
//         />
//         <Typography variant="body2" color="text.secondary">
//           {brandingData?.theme_color_hex || "#000000"}
//         </Typography>
//       </Grid>
//     </Grid>
//   );
// };

// export default BrandingAppearanceView;

import React from "react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const BrandingAppearanceView = ({ brandingData }) => {
  return (
    <Grid container spacing={4}>
      {/* LEFT SIDE - LOGO + FONT */}
      <Grid item xs={12} md={4}>
        {/* LOGO UPLOADER BOX */}
        <Box
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 220,
          }}
        >
          {brandingData?.logo_url ? (
            <Avatar
              src={brandingData.logo_url}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          ) : (
            <Avatar
              sx={{ width: 100, height: 100, mb: 2, bgcolor: "#f0f0f0" }}
            />
          )}

          <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Click or drag to upload logo
          </Typography>

          <Button variant="contained" disabled sx={{ opacity: 0.5 }}>
            Upload
          </Button>
        </Box>

        {/* FONT STYLE */}
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: 1 }}>
            Choose Font Style
          </Typography>

          <FormControl fullWidth disabled>
            <InputLabel>Font Style</InputLabel>
            <Select
              value={brandingData?.font_style || ""}
              label="Font Style"
            >
              <MenuItem value={brandingData?.font_style || ""}>
                {brandingData?.font_style || "Font Style"}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* <Typography
          variant="body2"
          sx={{ mt: 2, color: "#FFAA00", fontSize: "12px" }}
        >
          ⚠ Branding editing is only available for Premium and Pro plans.
        </Typography> */}
      </Grid>

      {/* RIGHT SIDE - THEME COLOR PICKER */}
      <Grid item xs={12} md={8}>
        <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: 1 }}>
          Theme Color
        </Typography>

        {/* Color preview square */}
        <Box
          sx={{
            width: 60,
            height: 50,
            borderRadius: "7px",
            border: "1px solid #D5D9E2",
            backgroundColor: brandingData?.chatbot_theme_color || "#000000",
            mb: 1,
          }}
        />

        {/* Hex code text */}
        <Typography variant="body2" color="text.secondary">
          {brandingData?.theme_color_hex || "#000000"}
        </Typography>
      </Grid>

      {/* FOOTER BUTTONS */}
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          {/* <Button variant="outlined">Previous</Button> */}

          <Box sx={{ display: "flex", gap: 2 }}>
            {/* <Button variant="contained" disabled sx={{ opacity: 0.5 }}>
              Save Changes
            </Button> */}
            {/* <Button variant="contained" color="primary">
              Done
            </Button> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BrandingAppearanceView;
