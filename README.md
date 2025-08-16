# 🚀 Slack Pulse Dashboard

A powerful employee engagement analysis tool that analyzes Slack messages to provide sentiment insights and managerial recommendations.

## ✨ Features

- **🔍 Real-time Sentiment Analysis**: Analyzes Slack messages using OpenAI GPT-4o
- **📊 Interactive Visualizations**: Beautiful pie charts showing sentiment distribution
- **💡 AI-Powered Insights**: Generates key takeaways, burnout risks, and actionable insights
- **🎨 Modern UI**: Dark theme with responsive design
- **⚡ Fast & Efficient**: Built with Next.js 15 and Turbopack

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Charts**: Recharts for data visualization
- **AI**: OpenAI GPT-4o for sentiment analysis and insights
- **API**: Slack Web API for message retrieval
- **Styling**: Tailwind CSS with dark theme

## 🚀 Quick Start

### Prerequisites

1. **OpenAI API Key**: Get your key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Slack Bot Token**: Create a Slack app with proper permissions

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd employee-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=your-openai-api-key-here" > .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Setup Guide

### Slack App Configuration

1. Go to [Slack API Apps](https://api.slack.com/apps)
2. Create a new app → "From scratch"
3. Add these Bot Token Scopes:
   - `channels:history` - Read public channel messages
   - `groups:history` - Read private channel messages
   - `im:history` - Read direct messages
   - `mpim:history` - Read group direct messages
4. Install the app to your workspace
5. Copy the "Bot User OAuth Token" (starts with `xoxb-`)

### Getting Channel ID

1. In Slack, right-click on the channel you want to analyze
2. Select "Copy link"
3. The channel ID is the last part (e.g., `C1234567890`)

## 🎯 Usage

1. **Enter your Slack Bot Token** in the first input field
2. **Enter your Channel ID** in the second input field
3. **Click "Analyze Channel"**
4. **View the results**:
   - Sentiment distribution pie chart
   - Key takeaways and insights
   - Individual message analysis

## 📊 What You'll See

### Sentiment Overview
- **Pie Chart**: Visual representation of sentiment distribution
- **Statistics**: Total message count and sentiment breakdown
- **Color Coding**: Green (Positive), Red (Negative), Gray (Neutral)

### Managerial Insights
- **Key Takeaways**: 2-3 main observations about team sentiment
- **Burnout Risks**: 1-2 potential concerns to watch for
- **Actionable Insights**: 1-2 specific recommendations for management

### Message Analysis
- **Individual Messages**: Each message with sentiment badge
- **Scrollable List**: Easy navigation through analyzed messages

## 🔧 API Endpoints

### POST `/api/analyze`
Analyzes Slack channel messages and generates insights.

**Request Body:**
```json
{
  "slackToken": "xoxb-your-slack-bot-token",
  "channelId": "C1234567890"
}
```

**Response:**
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
    "keyTakeaways": ["Team shows positive engagement"],
    "burnoutRisks": ["No immediate risks detected"],
    "actionableInsights": ["Continue fostering positive communication"]
  },
  "messageCount": 50
}
```

## 🚀 Deployment

### Replit (Quick & Easy)
1. Follow the [Replit Setup Guide](REPLIT_SETUP.md)
2. Import from GitHub: `https://github.com/krishnapidaparty/employee-sentiment-analysis`
3. Set environment variables in Replit Secrets
4. Click "Run" to deploy instantly

### Vercel (Recommended for Production)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Set build command to `npm run build`
- **Railway**: Connect repository and set environment variables

## 🔒 Security Considerations

- Never commit `.env.local` to version control
- Use environment variables for all secrets
- Consider implementing authentication for production
- Monitor API usage and costs

## 📁 Project Structure

```
employee-pulse/
├── src/
│   └── app/
│       ├── api/
│       │   └── analyze/
│       │       ├── route.ts          # Main API endpoint
│       │       ├── README.md         # API documentation
│       │       └── test.ts           # Test examples
│       ├── page.tsx                  # Main dashboard
│       ├── layout.tsx                # App layout
│       └── globals.css               # Global styles
├── public/                           # Static assets
├── SETUP.md                          # Detailed setup guide
├── TESTING.md                        # Testing checklist
├── DEPLOYMENT.md                     # Deployment guide
└── README.md                         # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [Recharts](https://recharts.org/)
- AI analysis via [OpenAI](https://openai.com/)
- Slack integration via [Slack Web API](https://api.slack.com/)

---

**Made with ❤️ for better team engagement and communication**
