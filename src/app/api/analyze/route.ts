import { NextRequest, NextResponse } from 'next/server';
import { WebClient } from '@slack/web-api';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { slackToken, channelId } = await request.json();

    if (!slackToken || !channelId) {
      return NextResponse.json(
        { error: 'slackToken and channelId are required' },
        { status: 400 }
      );
    }

    // Initialize Slack client
    const client = new WebClient(slackToken);

    // Part 1: Fetch and Analyze Sentiment
    console.log('Fetching messages from Slack channel...');
    
    // Fetch the last 100 messages from the channel
    const result = await client.conversations.history({
      channel: channelId,
      limit: 100,
    });

    if (!result.ok || !result.messages) {
      return NextResponse.json(
        { error: 'Failed to fetch messages from Slack' },
        { status: 500 }
      );
    }

    // Filter messages to keep only real user messages (not bot messages or channel joins)
    const userMessages = result.messages
      .filter((message: any) => {
        // Filter out bot messages, channel joins, and other system messages
        return (
          message.type === 'message' &&
          !message.bot_id &&
          !message.subtype &&
          message.text &&
          message.text.trim().length > 0
        );
      })
      .map((message: any) => message.text);

    if (userMessages.length === 0) {
      return NextResponse.json(
        { error: 'No user messages found in the channel' },
        { status: 404 }
      );
    }

    console.log(`Found ${userMessages.length} user messages for analysis`);

    // Call OpenAI for sentiment analysis
    console.log('Performing sentiment analysis...');
    const sentimentResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a sentiment analysis expert. Analyze the sentiment of each message and return ONLY a valid JSON array (no markdown formatting, no code blocks). Each object should have "text" (the original message) and "sentiment" (Positive, Negative, or Neutral). Do not wrap the response in markdown code blocks.'
        },
        {
          role: 'user',
          content: `Analyze the sentiment of these Slack messages and return ONLY a valid JSON array: ${JSON.stringify(userMessages)}`
        }
      ],
      temperature: 0.3,
    });

    const sentimentContent = sentimentResponse.choices[0]?.message?.content;
    if (!sentimentContent) {
      return NextResponse.json(
        { error: 'Failed to get sentiment analysis response' },
        { status: 500 }
      );
    }

    // Parse the sentiment results
    let sentimentResults;
    try {
      // Clean the response content - remove markdown code blocks if present
      let cleanedContent = sentimentContent.trim();
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      sentimentResults = JSON.parse(cleanedContent);
    } catch (error) {
      console.error('Failed to parse sentiment results:', error);
      console.error('Raw content:', sentimentContent);
      return NextResponse.json(
        { error: 'Failed to parse sentiment analysis results' },
        { status: 500 }
      );
    }

    // Part 2: Generate Managerial Insights
    console.log('Generating managerial insights...');
    const insightsResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert HR analyst. Based on the list of Slack message sentiments, generate a high-level report. Return ONLY a valid JSON object (no markdown formatting, no code blocks) with three keys: "keyTakeaways" (an array of 2-3 strings), "burnoutRisks" (an array of 1-2 strings), and "actionableInsights" (an array of 1-2 strings). Do not wrap the response in markdown code blocks.'
        },
        {
          role: 'user',
          content: `Based on this list of Slack message sentiments, generate a high-level report. The list is: ${JSON.stringify(sentimentResults)}`
        }
      ],
      temperature: 0.4,
    });

    const insightsContent = insightsResponse.choices[0]?.message?.content;
    if (!insightsContent) {
      return NextResponse.json(
        { error: 'Failed to get insights response' },
        { status: 500 }
      );
    }

    // Parse the insights results
    let insights;
    try {
      // Clean the response content - remove markdown code blocks if present
      let cleanedContent = insightsContent.trim();
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      insights = JSON.parse(cleanedContent);
    } catch (error) {
      console.error('Failed to parse insights results:', error);
      console.error('Raw content:', insightsContent);
      return NextResponse.json(
        { error: 'Failed to parse insights results' },
        { status: 500 }
      );
    }

    // Return the complete analysis
    return NextResponse.json({
      success: true,
      sentimentAnalysis: sentimentResults,
      insights: insights,
      messageCount: userMessages.length,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
