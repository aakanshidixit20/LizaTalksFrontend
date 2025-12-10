export const analyticsData = {
  clients: ["Alpha Retail", "Beta Corp", "Gamma Styles", "Delta Home", "Epsilon Tech"],

  botEffectiveness: {
    engagementRatePerClient: [
      { client: "Alpha Retail", creditsSpent: 4500, engagementRate: 76 },
      { client: "Beta Corp", creditsSpent: 3200, engagementRate: 63 },
      { client: "Gamma Styles", creditsSpent: 5100, engagementRate: 84 },
      { client: "Delta Home", creditsSpent: 2700, engagementRate: 57 },
      { client: "Epsilon Tech", creditsSpent: 3900, engagementRate: 71 }
    ],

    conversionRatePerClient: [
      { client: "Alpha Retail", conversionRate: 12 },
      { client: "Beta Corp", conversionRate: 9 },
      { client: "Gamma Styles", conversionRate: 15 },
      { client: "Delta Home", conversionRate: 5 },
      { client: "Epsilon Tech", conversionRate: 8 }
    ],

    fallbackErrorRatePerClient: [
      { client: "Alpha Retail", errorCount: 28 },
      { client: "Beta Corp", errorCount: 53 },
      { client: "Gamma Styles", errorCount: 19 },
      { client: "Delta Home", errorCount: 91 },
      { client: "Epsilon Tech", errorCount: 42 }
    ]
  },

  trainingPerformanceInsights: {
    apiResponseLatency: [
      { client: "Alpha Retail", avgLatencyMs: 620 },
      { client: "Beta Corp", avgLatencyMs: 720 },
      { client: "Gamma Styles", avgLatencyMs: 540 },
      { client: "Delta Home", avgLatencyMs: 880 },
      { client: "Epsilon Tech", avgLatencyMs: 660 }
    ]
  },

  dataHealthReliability: {
    productSyncFrequency: [
      { client: "Alpha Retail", storeName: "Alpha Main Store", syncPerMonth: 27 },
      { client: "Beta Corp", storeName: "Beta Fashion Hub", syncPerMonth: 19 },
      { client: "Gamma Styles", storeName: "Gamma Boutique", syncPerMonth: 34 },
      { client: "Delta Home", storeName: "Delta Furnishings", syncPerMonth: 14 },
      { client: "Epsilon Tech", storeName: "Epsilon Electronics", syncPerMonth: 22 }
    ]
  },

  featurePerformance: {
    featureUsageBreakdown: [
      {
        client: "Alpha Retail",
        storeName: "Alpha Main Store",
        usage: { generalChat: 430, storeInquiry: 210, productSuggestion: 350 }
      },
      {
        client: "Beta Corp",
        storeName: "Beta Fashion Hub",
        usage: { generalChat: 330, storeInquiry: 190, productSuggestion: 270 }
      },
      {
        client: "Gamma Styles",
        storeName: "Gamma Boutique",
        usage: { generalChat: 510, storeInquiry: 260, productSuggestion: 420 }
      },
      {
        client: "Delta Home",
        storeName: "Delta Furnishings",
        usage: { generalChat: 260, storeInquiry: 150, productSuggestion: 180 }
      },
      {
        client: "Epsilon Tech",
        storeName: "Epsilon Electronics",
        usage: { generalChat: 390, storeInquiry: 240, productSuggestion: 310 }
      }
    ],

    dropOffPerFeature: [
      { client: "Alpha Retail", avgSessionDurationSec: 42 },
      { client: "Beta Corp", avgSessionDurationSec: 51 },
      { client: "Gamma Styles", avgSessionDurationSec: 38 },
      { client: "Delta Home", avgSessionDurationSec: 62 },
      { client: "Epsilon Tech", avgSessionDurationSec: 47 }
    ]
  }
};
