'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Helper function to transform sentiment data for Recharts
const transformSentimentData = (sentimentAnalysis: any[]) => {
  const sentimentCounts = sentimentAnalysis.reduce((acc: any, item: any) => {
    const sentiment = item.sentiment;
    acc[sentiment] = (acc[sentiment] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(sentimentCounts).map(([name, value]) => ({
    name,
    value,
  }));
};

// Color mapping for sentiment
const COLORS = {
  Positive: '#10B981', // green
  Negative: '#EF4444', // red
  Neutral: '#6B7280',  // gray
};

export default function Home() {
  const [slackToken, setSlackToken] = useState('');
  const [channelId, setChannelId] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!slackToken || !channelId) {
      setError('Please provide both Slack Bot Token and Channel ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slackToken,
          channelId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze channel');
      }

      setAnalysisResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const sentimentData = analysisResult?.sentimentAnalysis 
    ? transformSentimentData(analysisResult.sentimentAnalysis)
    : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Slack Pulse Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Analyze team sentiment and engagement through Slack messages
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Channel Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Slack Bot Token
              </label>
              <input
                type="password"
                value={slackToken}
                onChange={(e) => setSlackToken(e.target.value)}
                placeholder="xoxb-your-slack-bot-token"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Channel ID
              </label>
              <input
                type="text"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
                placeholder="C1234567890"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-md font-medium transition-colors"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Channel'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-8">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {analysisResult && (
          <div className="space-y-8">
            {/* Sentiment Overview */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Sentiment Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sentimentData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Stats */}
                <div className="flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Messages:</span>
                      <span className="font-semibold">{analysisResult.messageCount}</span>
                    </div>
                    {sentimentData.map((item: any) => (
                      <div key={item.name} className="flex justify-between items-center">
                        <span className="text-gray-400">{item.name}:</span>
                        <span className="font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Key Takeaways */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-400">Key Takeaways</h3>
                {analysisResult.insights?.keyTakeaways ? (
                  <ul className="space-y-2">
                    {analysisResult.insights.keyTakeaways.map((takeaway: string, index: number) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No key takeaways available</p>
                )}
              </div>

              {/* Burnout Risks */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-400">Burnout Risks</h3>
                {analysisResult.insights?.burnoutRisks ? (
                  <ul className="space-y-2">
                    {analysisResult.insights.burnoutRisks.map((risk: string, index: number) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No burnout risks detected</p>
                )}
              </div>

              {/* Actionable Insights */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Actionable Insights</h3>
                {analysisResult.insights?.actionableInsights ? (
                  <ul className="space-y-2">
                    {analysisResult.insights.actionableInsights.map((insight: string, index: number) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No actionable insights available</p>
                )}
              </div>
            </div>

            {/* Raw Sentiment Data */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Message Analysis</h3>
              <div className="max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {analysisResult.sentimentAnalysis?.map((item: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700 rounded">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.sentiment === 'Positive' ? 'bg-green-600 text-green-100' :
                        item.sentiment === 'Negative' ? 'bg-red-600 text-red-100' :
                        'bg-gray-600 text-gray-100'
                      }`}>
                        {item.sentiment}
                      </span>
                      <span className="text-sm text-gray-300 flex-1">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
