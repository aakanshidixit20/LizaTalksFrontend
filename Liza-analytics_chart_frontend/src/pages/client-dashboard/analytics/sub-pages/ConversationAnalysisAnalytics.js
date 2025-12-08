// import React from 'react'
// import MostRepeatedUserQueries from '../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/MostRepeatedUserQueries';
// import DropoffKeywordInsights from '../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/DropoffKeywordInsights';
// import UserAcquisitionRetentionTrends from '../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/UserAcquisitionRetentionTrends';

// const ConversationAnalysisAnalytics = () => {
//   return (
//     <div>
//         <DropoffKeywordInsights/>
//         <MostRepeatedUserQueries/>   
//         <UserAcquisitionRetentionTrends/>
//     </div>
//   )
// }

// export default ConversationAnalysisAnalytics;

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
// import FilterDropdown from "../../../../components/ClientDashboard/analytics-components/Common/FilterDropdown";
import AnalyticsCard from "../../../../components/ClientDashboard/analytics-components/Shared/AnalyticsCard";
 
// import DropoffKeywordInsights from "../../../components/ClientDashboard/analytics-components/ConversationAnalysis/DropoffKeywordInsights";
import MostRepeatedUserQueries from "../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/MostRepeatedUserQueries";
import UserAcquisitionRetentionTrends from "../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/UserAcquisitionRetentionTrends";
import DropoffDetailsPage from "../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/DropoffKeywordInsights";
import { Outlet, useLocation } from "react-router-dom";
import ConversationAnalysisAnalyticsIndex from "./ConversationAnalysisAnalytics/ConversationAnalysisAnalyticsIndex";
const ConversationAnalysisAnalytics = () => {
  const location = useLocation()
  console.log(location.pathname)
 
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("conversation_filter") || "month";
  });
 
  return (
    <>
      {/* {} */}
      <div>
        {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>Conversation Analytics</Typography>
          <FilterDropdown onChange={setFilter} />
        </Box> */}
        {/* 🔹 Cards Section */}
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
 
export default ConversationAnalysisAnalytics;
 