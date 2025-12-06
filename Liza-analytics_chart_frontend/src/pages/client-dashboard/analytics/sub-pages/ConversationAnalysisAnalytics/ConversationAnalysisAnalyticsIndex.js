import React, { useEffect, useState } from 'react'
import AnalyticsCard from '../../../../../components/ClientDashboard/analytics-components/Shared/AnalyticsCard'
import DropoffKeywordInsights from '../../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/DropoffKeywordInsights'
import MostRepeatedUserQueries from '../../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/MostRepeatedUserQueries'
import UserAcquisitionRetentionTrends from '../../../../../components/ClientDashboard/analytics-components/ConversationAnalysis/UserAcquisitionRetentionTrends'

function ConversationAnalysisAnalyticsIndex() {
    // Common filter state for this page
    const [filter, setFilter] = useState(() => {
        return localStorage.getItem("conversation_filter") || "month";
    });

    useEffect(() => {
        localStorage.setItem("conversation_filter", filter);
    }, [filter]);

    return (
        <div> <AnalyticsCard
            redirection="drop-off-keyword-insights"
            title="Drop-off Keyword Insights"
            navigateTo="drop-off-keyword-insights"
        >
            <DropoffKeywordInsights filter={filter} />
        </AnalyticsCard>

            <AnalyticsCard
                redirection="most-repeated-user-queries" >
                <MostRepeatedUserQueries filter={filter} />
            </AnalyticsCard>

            <AnalyticsCard
                redirection="user-acquisition-retention-trends">
                <UserAcquisitionRetentionTrends filter={filter} />
            </AnalyticsCard>
        </div>
    )
}

export default ConversationAnalysisAnalyticsIndex

