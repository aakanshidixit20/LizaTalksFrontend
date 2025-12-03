// import React from "react";
// import { Link } from "react-router-dom";
// import BotEffectiveness from "../../../components/AdminDashboard/Analytics/BotEffectiveness";

// const Analytics = () => {
//     return (
//         <>
//             {/* Breadcrumb */}
//             <div className="breadcrumb-card">
//                 <h5>Analytics</h5>

//                 <ul className="breadcrumb">
//                     <li><Link to="/">
//                         <i className="material-symbols-outlined">home</i>
//                         Home
//                     </Link>
//                     </li>
//                     <li>Analytics</li>
//                 </ul>
//             </div>

//             {/* Content goes here */}
//             <div className="analytics-content">
//                 {/* Placeholder for analytics components */}
//                 <BotEffectiveness />
//                 {/* <p>Analytics content will be displayed here.</p> */}
//             </div>
//         </>
//     );
// }
// export default Analytics;


// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import BotEffectiveness from "../../../components/AdminDashboard/Analytics/BotEffectiveness";
// import TrainingAndPerformance from "../../../components/AdminDashboard/Analytics/TrainingAndPerformance";
// import DataHealthAndReliability from "../../../components/AdminDashboard/Analytics/DataHealthAndReliability";
// import FeaturePerformance from "../../../components/AdminDashboard/Analytics/FeaturePerformance";

// const Analytics = () => {
//   return (
//     <Routes>
//       <Route path="/bot-effectiveness" element={<BotEffectiveness />} />
//       <Route path="/training-performance" element={<TrainingAndPerformance />} />
//       <Route path="/data-health" element={<DataHealthAndReliability />} />
//       <Route path="/feature-performance" element={<FeaturePerformance />} />
//     </Routes>
//   );
// };

// export default Analytics;


import React from "react";
import { Outlet } from "react-router-dom";
import AnalyticsLayout from "../../../components/AdminDashboard/Analytics/AnalyticsLayout";

export default function Analytics() {
  return (
    <AnalyticsLayout>
      <Outlet />
    </AnalyticsLayout>
  );
}
