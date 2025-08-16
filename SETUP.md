# Slack Pulse Setup Guide

## Prerequisites

1. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Slack Bot Token**: Create a Slack app and get a Bot User OAuth Token

## Environment Setup

Create a `.env.local` file in the root directory:

```bash
# OpenAI API Key for sentiment analysis
OPENAI_API_KEY=your-openai-api-key-here
```

## Slack App Setup

1. Go to [Slack API Apps](https://api.slack.com/apps)
2. Click "Create New App" → "From scratch"
3. Give your app a name and select your workspace
4. Go to "OAuth & Permissions" in the sidebar
5. Add these Bot Token Scopes:
   - `channels:history` - Read messages from public channels
   - `groups:history` - Read messages from private channels (if needed)
6. Install the app to your workspace
7. Copy the "Bot User OAuth Token" (starts with `xoxb-`)

## Getting Channel ID

1. In Slack, right-click on the channel you want to analyze
2. Select "Copy link"
3. The channel ID is the last part of the URL (e.g., `C1234567890`)

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

4. Enter your Slack Bot Token and Channel ID, then click "Analyze Channel"

## Features

- **Sentiment Analysis**: Analyzes the last 100 messages in the channel
- **Visual Dashboard**: Pie chart showing sentiment distribution
- **Managerial Insights**: Key takeaways, burnout risks, and actionable insights
- **Message Details**: View individual messages with their sentiment scores

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your Slack Bot Token secure
- Consider implementing authentication for production use
- Monitor API usage and costs
