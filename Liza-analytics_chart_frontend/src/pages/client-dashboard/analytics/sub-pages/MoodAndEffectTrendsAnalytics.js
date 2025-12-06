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


import React from "react";
import MoodAndEffectTrends from "../../../../components/ClientDashboard/analytics-components/MoodAndEffectTrends/MoodAndEffectTrends";
import { Box, Typography, Button, Card } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

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
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
          Top Mood Requests
        </Typography>

        <Button
          onClick={() => navigate("/analytics/mood-trend/details")}
          sx={{
            textTransform: "none",
            backgroundColor: "#6366F1",
            color: "#fff",
            px: 3,
            py: 1.1,
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#4F46E5" },
          }}
          endIcon={<ArrowForwardIcon />}
        >
          View Details
        </Button>
      </Box>

      {/* Chart */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MoodAndEffectTrends hideButton />
      </Box>
    </Card>
  );
};

export default MoodAndEffectTrendsAnalytics;
