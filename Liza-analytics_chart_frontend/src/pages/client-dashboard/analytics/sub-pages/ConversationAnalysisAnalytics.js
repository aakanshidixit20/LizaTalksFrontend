import React from 'react'
import MostRepeatedUserQueries from '../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/MostRepeatedUserQueries';
import DropoffKeywordInsights from '../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/DropoffKeywordInsights';
import UserAcquisitionRetentionTrends from '../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/UserAcquisitionRetentionTrends';

const ConversationAnalysisAnalytics = () => {
  return (
    <div>
        <DropoffKeywordInsights/>
        <MostRepeatedUserQueries/>   
        <UserAcquisitionRetentionTrends/>
    </div>
  )
}

export default ConversationAnalysisAnalytics;