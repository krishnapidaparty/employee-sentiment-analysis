# Analyze API Endpoint

## Overview
The `/api/analyze` endpoint is a comprehensive API that performs sentiment analysis on Slack messages and generates managerial insights for employee engagement monitoring.

## Endpoint
`POST /api/analyze`

## Request Body
```json
{
  "slackToken": "xoxb-your-slack-bot-token",
  "channelId": "C1234567890"
}
```

### Required Parameters
- `slackToken`: A valid Slack Bot User OAuth Token with permissions to read channel history
- `channelId`: The ID of the Slack channel to analyze

## Response
```json
{
  "success": true,
  "sentimentAnalysis": [
    {
      "text": "Great work on the project!",
      "sentiment": "Positive"
    }
  ],
  "insights": {
    "keyTakeaways": [
      "Team shows positive engagement overall"
    ],
    "burnoutRisks": [
      "No immediate burnout risks detected"
    ],
    "actionableInsights": [
      "Continue fostering positive team communication"
    ]
  },
  "messageCount": 50
}
```

## Features

### Part 1: Sentiment Analysis
- Fetches the last 100 messages from the specified Slack channel
- Filters out bot messages, system messages, and channel joins
- Uses OpenAI GPT-4o to analyze sentiment of each message
- Returns sentiment as Positive, Negative, or Neutral

### Part 2: Managerial Insights
- Analyzes the sentiment results to generate HR insights
- Provides key takeaways about team sentiment
- Identifies potential burnout risks
- Suggests actionable insights for management

## Environment Variables Required
- `OPENAI_API_KEY`: Your OpenAI API key for sentiment analysis

## Error Handling
The API includes comprehensive error handling for:
- Missing required parameters
- Invalid Slack tokens
- Failed message fetching
- OpenAI API errors
- JSON parsing errors

## Rate Limits
- Fetches up to 100 messages per request
- Uses OpenAI GPT-4o model for analysis
- Consider implementing rate limiting for production use

## Security Considerations
- Store Slack tokens securely
- Validate channel access permissions
- Monitor API usage and costs
- Consider implementing authentication for the endpoint
