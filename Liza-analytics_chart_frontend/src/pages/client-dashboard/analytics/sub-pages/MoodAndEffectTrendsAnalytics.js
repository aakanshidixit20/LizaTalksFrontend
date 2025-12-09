import MoodAndEffectTrends from "../../../../components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrends";
import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ViewDetailsBtn from "../../../../components/ClientDashboard/analytics-components/ViewDetailsBtn/ViewDetailsBtn";

const MoodAndEffectTrendsAnalytics = () => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        px: 4,
        py: 3,
        borderRadius: "14px",
        background: "#fff",
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 600,
            flexGrow: 1,
            whiteSpace: "nowrap",
          }}
        >
          Top Mood Requests
        </Typography>

        {/* ⭐ Injected Your Reusable Button */}
        <ViewDetailsBtn
          redirectTo="/analytics/mood-trend/details"
          align="right"
        />
      </Box>

      {/* Chart */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MoodAndEffectTrends hideButton />
      </Box>
    </Card>
  );
};

export default MoodAndEffectTrendsAnalytics;


// import React from 'react'
// import MoodAndEffectTrends from '../../../../components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrends';


// const MoodAndEffectTrendsAnalytics = () => {
//   return (
//     <div>
//         <MoodAndEffectTrends/>

//     </div>
//   )
// }

// export default MoodAndEffectTrendsAnalytics;


// import React from "react";
// import MoodAndEffectTrends from "../../../../components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrends";
// import { Box, Typography, Button, Card } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useNavigate } from "react-router-dom";

// const MoodAndEffectTrendsAnalytics = () => {
//   const navigate = useNavigate();

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         width: "100%",
//         px: 4,
//         py: 3,
//         borderRadius: "14px",
//         background: "#fff",
//         border: "1px solid #E5E7EB",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography
//           sx={{ fontSize: "22px", fontWeight: 600, color: "#111827" }}
//         >
//           Top Mood Requests
//         </Typography>

//         <Button
//           onClick={() => navigate("/client-dashboard/analytics/mood-details")}
//           sx={{
//             textTransform: "none",
//             backgroundColor: "#6366F1",
//             color: "#fff",
//             px: 3,
//             py: 1.1,
//             borderRadius: "10px",
//             "&:hover": { backgroundColor: "#4F46E5" },
//           }}
//           endIcon={<ArrowForwardIcon />}
//         >
//           View Details
//         </Button>
//       </Box>

//       {/* Chart */}
//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <MoodAndEffectTrends hideButton />
//       </Box>
//     </Card>
//   );
// };

// export default MoodAndEffectTrendsAnalytics;


// import React from "react";
// import MoodAndEffectTrends from "../../../../components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrends";
// import { Box, Typography, Button, Card } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useNavigate } from "react-router-dom";

// const PRIMARY_PURPLE = "#5a42f2ff";
// const PURPLE_HOVER = "#5645c0";


// const MoodAndEffectTrendsAnalytics = () => {
//   const navigate = useNavigate();

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         width: "100%",
//         px: 4,
//         py: 3,
//         borderRadius: "14px",
//         background: "#fff",
//         border: "1px solid #E5E7EB",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
//           Top Mood Requests
//         </Typography>

//         <Button
//           onClick={() => navigate("/analytics/mood-trend/details")}
//           sx={{
//             textTransform: "none",
//             backgroundColor: "#5a42f2ff",
//             fontWeight: 600,
//             fontSize: "12px",
//             padding: "2px 10px",
//             minHeight: "26px",
//             borderRadius: "6px",
//             transition: "0.2s ease-in-out",
//             "&:hover": {
//               backgroundColor: "#5645c0",
//             },
//           }}
//           endIcon={<ArrowForwardIcon />}
//         >
//           View Details
//         </Button>
//       </Box>

//       {/* Chart */}
//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <MoodAndEffectTrends hideButton />
//       </Box>
//     </Card>
//   );
// };

// export default MoodAndEffectTrendsAnalytics;
