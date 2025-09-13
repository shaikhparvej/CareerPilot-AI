import { testAIConnection, validateAPIKey } from '@/ai/utils/ai-error-handler';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing AI connection...');

    // First validate API key
    const isValidKey = validateAPIKey();
    if (!isValidKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or missing Google Gemini API key',
          details:
            'Please check your GOOGLE_GENAI_API_KEY environment variable',
        },
        { status: 401 }
      );
    }

    // Test AI connection
    const result = await testAIConnection();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'AI connection successful',
        model: 'gemini-1.5-flash',
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          details: 'AI service is currently unavailable',
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('AI test endpoint error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing prompt parameter',
        },
        { status: 400 }
      );
    }

    const isValidKey = validateAPIKey();
    if (!isValidKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or missing Google Gemini API key',
        },
        { status: 401 }
      );
    }

    const result = await testAIConnection();

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI test POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
