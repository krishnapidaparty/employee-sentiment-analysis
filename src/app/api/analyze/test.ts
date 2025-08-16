// Test file for the analyze API endpoint
// This is for reference only - not meant to be executed directly

export const testAnalyzeAPI = async () => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slackToken: 'your-slack-token-here',
      channelId: 'your-channel-id-here',
    }),
  });

  const data = await response.json();
  console.log('Analysis Results:', data);
  
  return data;
};

// Expected response structure:
/*
{
  "success": true,
  "sentimentAnalysis": [
    {
      "text": "Great work on the project!",
      "sentiment": "Positive"
    },
    {
      "text": "I'm feeling overwhelmed with the workload",
      "sentiment": "Negative"
    }
  ],
  "insights": {
    "keyTakeaways": [
      "Team shows mixed sentiment with both positive and negative expressions",
      "Communication patterns indicate varying levels of engagement"
    ],
    "burnoutRisks": [
      "Some team members express feeling overwhelmed"
    ],
    "actionableInsights": [
      "Consider workload distribution and stress management support"
    ]
  },
  "messageCount": 50
}
*/
