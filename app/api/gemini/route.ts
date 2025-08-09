import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Configure the Gemini API
const config = {
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
};

if (!config.apiKey) {
  console.error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(config.apiKey || '');

export async function POST(request: NextRequest) {
  try {
    console.log('Gemini API: Received request');

    // Check if API key is available
    if (!config.apiKey) {
      console.log('Gemini API: Missing API key');
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Parse the request body
    const { prompt } = await request.json();

    if (!prompt) {
      console.log('Gemini API: Missing prompt in request');
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log(
      'Gemini API: Processing prompt:',
      prompt.substring(0, 50) + '...'
    );

    // Use the correct model name for the current API version
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini API: Successfully generated response');

    // Return the generated content
    return NextResponse.json({
      success: true,
      response: text,
    });
  } catch (error) {
    console.error('Error calling Gemini API:', error);

    // Provide more detailed error information
    const errorMessage = error.message || 'Unknown error';
    const statusCode = error.status || 500;

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request',
        message: errorMessage,
        details:
          'Please check your API key and ensure it has access to the Gemini API',
      },
      { status: statusCode }
    );
  }
}
