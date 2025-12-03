
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const LeftSidebarMenu = ({ toggleActive }) => {
  const location = useLocation();

  const isActiveLink = (path) => (location.pathname === path ? "active" : "");

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (location.pathname === "/dashboard/beauty-salon/") {
      const storedTheme = localStorage.getItem("beautySalonSidebarTheme");
      if (storedTheme) {
        setIsDark(storedTheme === "dark-theme");
      } else {
        setIsDark(true);
        localStorage.setItem("beautySalonSidebarTheme", "dark-theme");
      }
    } else {
      setIsDark(false);
    }
  }, [location.pathname]);

  return (
    <Box
      className={`leftSidebarDark hide-for-horizontal-nav ${
        location.pathname === "/dashboard/beauty-salon/" && isDark
          ? "dark-theme"
          : ""
      }`}
    >
      <Box className="left-sidebar-menu">
        <Box className="logo" sx={{ display: "flex", alignItems: "start" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src="/images/Bud-e-logo.png" alt="logo-icon" width={35} height={35} />
            <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  color: "var(--blackColor) !important",
                }}
              >
                Liza Talks
              </Typography>
            </Box>
          </Link>
        </Box>

        <Box className="burger-menu" onClick={toggleActive}>
          <Typography component={"span"} className="top-bar"></Typography>
          <Typography component={"span"} className="middle-bar"></Typography>
          <Typography component={"span"} className="bottom-bar"></Typography>
        </Box>

        <Box className="sidebar-inner">
          <Box className="sidebar-menu">

            {/* 1. Dashboard */}
            <Link to="/" className={`sidebar-menu-link ${isActiveLink("/")}`}>
              <i className="material-symbols-outlined">home</i>
              <Typography component="span" className="title">Dashboard</Typography>
            </Link>

            {/* 2. Revenue */}
            <Link to="/revenue" className={`sidebar-menu-link ${isActiveLink("/revenue")}`}>
              <i className="material-symbols-outlined">attach_money</i>
              <Typography component="span" className="title">Revenue</Typography>
            </Link>

            {/* 3. Client Management */}
            <Link to="/client-management" className={`sidebar-menu-link ${isActiveLink("/client-management")}`}>
              <i className="material-symbols-outlined">groups</i>
              <Typography component="span" className="title">Client Management</Typography>
            </Link>

            {/* 4. Client Stores */}
            <Link to="/client-stores" className={`sidebar-menu-link ${isActiveLink("/client-stores")}`}>
              <i className="material-symbols-outlined">shopping_cart</i>
              <Typography component="span" className="title">Client Stores</Typography>
            </Link>

            {/* 5. Client Order */}
            <Link to="/clients-order" className={`sidebar-menu-link ${isActiveLink("/clients-order")}`}>
              <i className="material-symbols-outlined">orders</i>
              <Typography component="span" className="title">Client Order</Typography>
            </Link>

            {/* 6. Client Products */}
            <Link to="/products" className={`sidebar-menu-link ${isActiveLink("/products")}`}>
              <i className="material-symbols-outlined">package_2</i>
              <Typography component="span" className="title">Client Products</Typography>
            </Link>

            {/* 7. Client Feedback */}
            <Link to="/client-feedback" className={`sidebar-menu-link ${isActiveLink("/client-feedback")}`}>
              <i className="material-symbols-outlined">feedback</i>
              <Typography component="span" className="title">Client Feedback</Typography>
            </Link>

            {/* 8. Chat Problems Report */}
            <Link to="/chat-problems-report" className={`sidebar-menu-link ${isActiveLink("/chat-problems-report")}`}>
              <i className="material-symbols-outlined">warning</i>
              <Typography component="span" className="title">Chat Problem Report</Typography>
            </Link>

            {/* 9. User Management */}
            <Link to="/user-management" className={`sidebar-menu-link ${isActiveLink("/user-management")}`}>
              <i className="material-symbols-outlined">person</i>
              <Typography component="span" className="title">User Management</Typography>
            </Link>

            {/* 10. Notifications */}
            <Link to="/notifications" className={`sidebar-menu-link ${isActiveLink("/notifications")}`}>
              <i className="material-symbols-outlined">notifications</i>
              <Typography component="span" className="title">Notifications</Typography>
            </Link>

            {/* 11. Analytics */}
            <Link to="/analytics" className={`sidebar-menu-link ${isActiveLink("/analytics")}`}>
              <i className="material-symbols-outlined">finance_mode</i>
              <Typography component="span" className="title">Analytics</Typography>
            </Link>

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSidebarMenu;





































// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Box, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
// import MuiAccordion from "@mui/material/Accordion";
// import MuiAccordionSummary, {
//   accordionSummaryClasses,
// } from "@mui/material/AccordionSummary";
// import MuiAccordionDetails from "@mui/material/AccordionDetails";


// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&::before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor: "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
//   {
//     transform: "rotate(90deg)",
//   },
//   [`& .${accordionSummaryClasses.content}`]: {
//     marginLeft: theme.spacing(1),
//   },
//   ...theme.applyStyles("dark", {
//     backgroundColor: "rgba(255, 255, 255, .05)",
//   }),
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

// const LeftSidebarMenu = ({ toggleActive }) => {
//   const [expanded, setExpanded] = useState("panel1");
//   const location = useLocation(); // Get current location/pathname

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };

//   // Function to check if current pathname matches the link path
//   const isActiveLink = (path) => (location.pathname === path ? "active" : "");

//   // Enable the dark sidebar exclusively for the /dashboard/beauty-salon/ page URL.
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     // Only check or set the theme if we're on the beauty-salon page.
//     if (location.pathname === "/dashboard/beauty-salon/") {
//       const storedTheme = localStorage.getItem("beautySalonSidebarTheme");
//       if (storedTheme) {
//         setIsDark(storedTheme === "dark-theme");
//       } else {
//         // Default to dark theme and persist it in localStorage
//         setIsDark(true);
//         localStorage.setItem("beautySalonSidebarTheme", "dark-theme");
//       }
//     } else {
//       // For other pages, do not use localStorage for the theme
//       setIsDark(false);
//     }
//   }, [location.pathname]);

//   return (
//     <Box
//       className={`leftSidebarDark hide-for-horizontal-nav ${location.pathname === "/dashboard/beauty-salon/" && isDark
//         ? "dark-theme"
//         : ""
//         }`}
//     >

//        <Box className="left-sidebar-menu">
//   <Box className="logo" sx={{ display: "flex", alignItems: "start"}}>
//     <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
//       <img
//         src="/images/Bud-e-logo.png"
//         alt="logo-icon"
//         width={35}
//         height={35}
     
//       />
//       <Box>
//        <Typography
//           sx={{
//             fontSize: "20px", // reduced font size
//             fontWeight: "bold",
//             lineHeight: 1.2,
//             color: "var(--blackColor) !important", // force override
//           }}
//         >
//           Liza Talks
//           </Typography>
//       </Box>
//     </Link>
//   </Box>


//         <Box className="burger-menu" onClick={toggleActive}>
//           <Typography component={"span"} className="top-bar"></Typography>
//           <Typography component={"span"} className="middle-bar"></Typography>
//           <Typography component={"span"} className="bottom-bar"></Typography>
//         </Box>

//         <Box className="sidebar-inner">
//           <Box className="sidebar-menu">

//             <Link
//               to="/"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/"
//               )}`}
//             >
//               <i className="material-symbols-outlined">home</i>
//               <Typography component={"span"} className="title">
//                 Dashboard
//               </Typography>
//             </Link>
//             <Link
//               to="/revenue"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/revenue"
//               )}`}
//             >
//               <i className="material-symbols-outlined">attach_money</i>
//               <Typography component={"span"} className="title">
//                 Revenue
//               </Typography>
//             </Link>


           
            

//             <Link
//               to="/chat-transcripts"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/chat-transcripts"
//               )}`}
//             >
//               <i className="material-symbols-outlined">article</i>
//               <Typography component={"span"} className="title">
//                 Chat Transcripts
//               </Typography>
//             </Link>

            
              
            
//             <Link
//               to="/client-management"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/client-management"
//               )}`}
//             >
//               <i className="material-symbols-outlined">groups</i>
//               <Typography component={"span"} className="title">
//                 Client Management
//               </Typography>
//             </Link>

            
//             <Link
//               to="/client-stores"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/client-stores"
//               )}`}
//             >
//               <i className="material-symbols-outlined">shopping_cart</i>
//               <Typography component={"span"} className="title">
//                  Client Stores
//               </Typography>
//             </Link>
              
//               <Link
//               to="/clients-order"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/clients-order"
//               )}`}
//             >
//               <i className="material-symbols-outlined">orders</i>
//               <Typography component={"span"} className="title">
//                 Client's Order
//               </Typography>
//             </Link>

            
//             <Link
//               to="/user-management"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/user-management"
//               )}`}
//             >
//               <i className="material-symbols-outlined">person</i>
//               <Typography component={"span"} className="title">
//                 User Management
//               </Typography>
//             </Link>

//              <Link
//               to="/products"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/products"
//               )}`}
//             >
//               <i className="material-symbols-outlined">package_2</i>
//               <Typography component={"span"} className="title">
//                Products
//               </Typography>
//             </Link>

//              <Link
//               to="/client-feedback"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/client-feedback"
//               )}`}
//             >
//               <i className="material-symbols-outlined">feedback</i>
//               <Typography component={"span"} className="title">
//                Client Feedback
//               </Typography>
//             </Link>

//               <Link
//               to="/chat-problems-report"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/chat-problems-report"
//               )}`}
//             >
//               <i className="material-symbols-outlined">warning</i>
//               <Typography component={"span"} className="title">
//                Chat Problems Report
//               </Typography>
//             </Link>
            
//             <Link
//               to="/analytics"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/analytics"
//               )}`}
//             >
//               <i className="material-symbols-outlined">finance_mode</i>
//               <Typography component={"span"} className="title">
//                 Analytics
//               </Typography>
//             </Link>

//              <Link
//               to="/notifications"
//               className={`sidebar-menu-link ${isActiveLink(
//                 "/notifications"
//               )}`}
//             >
//               <i className="material-symbols-outlined">notifications</i>
//               <Typography component={"span"} className="title">
//                 Notifications
//               </Typography>
//             </Link>

//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default LeftSidebarMenu;




// ==================================================================================================================



// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Box, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
// import MuiAccordion from "@mui/material/Accordion";
// import MuiAccordionSummary, {
//   accordionSummaryClasses,
// } from "@mui/material/AccordionSummary";
// import MuiAccordionDetails from "@mui/material/AccordionDetails";

// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&::before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor: "rgba(0, 0, 0, .03)",
//   flexDirection: "row-reverse",
//   [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
//     {
//       transform: "rotate(90deg)",
//     },
//   [`& .${accordionSummaryClasses.content}`]: {
//     marginLeft: theme.spacing(1),
//   },
//   ...theme.applyStyles("dark", {
//     backgroundColor: "rgba(255, 255, 255, .05)",
//   }),
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

// const LeftSidebarMenu = ({ toggleActive }) => {
//   const [expanded, setExpanded] = useState("panel1");
//   const location = useLocation();

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };

//   const isActiveLink = (path) => (location.pathname === path ? "active" : "");

//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     if (location.pathname === "/dashboard/beauty-salon/") {
//       const storedTheme = localStorage.getItem("beautySalonSidebarTheme");
//       if (storedTheme) {
//         setIsDark(storedTheme === "dark-theme");
//       } else {
//         setIsDark(true);
//         localStorage.setItem("beautySalonSidebarTheme", "dark-theme");
//       }
//     } else {
//       setIsDark(false);
//     }
//   }, [location.pathname]);

//   return (
//     <Box
//       className={`leftSidebarDark hide-for-horizontal-nav ${
//         location.pathname === "/dashboard/beauty-salon/" && isDark
//           ? "dark-theme"
//           : ""
//       }`}
//     >
//       <Box className="left-sidebar-menu">
//         <Box className="logo" sx={{ display: "flex", alignItems: "start" }}>
//           <Link
//             to="/"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               textDecoration: "none",
//             }}
//           >
//             <img src="/images/Bud-e-logo.png" alt="logo-icon" width={35} height={35} />
//             <Box>
//               <Typography
//                 sx={{
//                   fontSize: "20px",
//                   fontWeight: "bold",
//                   lineHeight: 1.2,
//                   color: "var(--blackColor) !important",
//                 }}
//               >
//                 Liza Talks
//               </Typography>
//             </Box>
//           </Link>
//         </Box>

//         <Box className="burger-menu" onClick={toggleActive}>
//           <Typography component={"span"} className="top-bar"></Typography>
//           <Typography component={"span"} className="middle-bar"></Typography>
//           <Typography component={"span"} className="bottom-bar"></Typography>
//         </Box>

//         <Box className="sidebar-inner">
//           <Box className="sidebar-menu">

//             {/* 1. Dashboard */}
//             <Link to="/" className={`sidebar-menu-link ${isActiveLink("/")}`}>
//               <i className="material-symbols-outlined">home</i>
//               <Typography component="span" className="title">Dashboard</Typography>
//             </Link>

//             {/* 2. Revenue */}
//             <Link to="/revenue" className={`sidebar-menu-link ${isActiveLink("/revenue")}`}>
//               <i className="material-symbols-outlined">attach_money</i>
//               <Typography component="span" className="title">Revenue</Typography>
//             </Link>

//             {/* 3. Client Management */}
//             <Link to="/client-management" className={`sidebar-menu-link ${isActiveLink("/client-management")}`}>
//               <i className="material-symbols-outlined">groups</i>
//               <Typography component="span" className="title">Client Management</Typography>
//             </Link>

//             {/* 4. Client Stores */}
//             <Link to="/client-stores" className={`sidebar-menu-link ${isActiveLink("/client-stores")}`}>
//               <i className="material-symbols-outlined">shopping_cart</i>
//               <Typography component="span" className="title">Client Stores</Typography>
//             </Link>

//             {/* 5. Client Order */}
//             <Link to="/clients-order" className={`sidebar-menu-link ${isActiveLink("/clients-order")}`}>
//               <i className="material-symbols-outlined">orders</i>
//               <Typography component="span" className="title">Client Order</Typography>
//             </Link>

//             {/* 6. Client Products */}
//             <Link to="/products" className={`sidebar-menu-link ${isActiveLink("/products")}`}>
//               <i className="material-symbols-outlined">package_2</i>
//               <Typography component="span" className="title">Client Products</Typography>
//             </Link>

//             {/* 7. Client Feedback */}
//             <Link to="/client-feedback" className={`sidebar-menu-link ${isActiveLink("/client-feedback")}`}>
//               <i className="material-symbols-outlined">feedback</i>
//               <Typography component="span" className="title">Client Feedback</Typography>
//             </Link>

//             {/* 8. Chat Problems Report */}
//             <Link to="/chat-problems-report" className={`sidebar-menu-link ${isActiveLink("/chat-problems-report")}`}>
//               <i className="material-symbols-outlined">warning</i>
//               <Typography component="span" className="title">Chat Problem Report</Typography>
//             </Link>

//             {/* 9. User Management */}
//             <Link to="/user-management" className={`sidebar-menu-link ${isActiveLink("/user-management")}`}>
//               <i className="material-symbols-outlined">person</i>
//               <Typography component="span" className="title">User Management</Typography>
//             </Link>

//             {/* 10. Notifications */}
//             <Link to="/notifications" className={`sidebar-menu-link ${isActiveLink("/notifications")}`}>
//               <i className="material-symbols-outlined">notifications</i>
//               <Typography component="span" className="title">Notifications</Typography>
//             </Link>

//             {/* 11. Analytics */}
//             <Link to="/analytics" className={`sidebar-menu-link ${isActiveLink("/analytics")}`}>
//               <i className="material-symbols-outlined">finance_mode</i>
//               <Typography component="span" className="title">Analytics</Typography>
//             </Link>

//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default LeftSidebarMenu;


// ===============================================
