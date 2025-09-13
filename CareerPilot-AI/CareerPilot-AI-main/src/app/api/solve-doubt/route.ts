import GeminiAPIService from '@/services/GeminiAPIService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, subject, attachments } = await request.json();

    if (!question || !subject) {
      return NextResponse.json(
        { error: 'Question and subject are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const geminiService = new GeminiAPIService(apiKey);

    // Create a detailed prompt for educational content
    const prompt = `
You are an expert educational AI tutor specializing in ${subject}. A student has asked the following question:

"${question}"

Please provide a comprehensive, educational response that includes:

1. A clear, step-by-step solution or explanation
2. The underlying concepts and principles involved
3. Why this approach works (educational reasoning)
4. Common mistakes to avoid
5. Related topics the student should explore
6. Practice suggestions

Make your response educational, encouraging, and appropriate for a student learning ${subject}.
Use clear language and break down complex concepts into understandable parts.
Format your response in a structured way with clear sections.

Additional context:
- Subject: ${subject}
- Student level: Assume intermediate understanding unless otherwise specified
- Attachments: ${attachments?.length || 0} files provided
`;

    // Generate response with retry logic
    const result = await geminiService.generateContent(prompt, 'gemini-pro');

    if (!result.success) {
      // Provide fallback response
      const fallbackResponse = `I'm sorry, but I'm currently experiencing technical difficulties.

However, I can offer some general guidance for your ${subject} question about "${question}":

1. Break down the problem into smaller, manageable parts
2. Review the fundamental concepts related to this topic
3. Look for similar examples in your textbook or online resources
4. Practice with related problems to build understanding
5. Don't hesitate to ask for help from teachers or classmates

The AI service should be available again shortly. Please try your question again in a few minutes.`;

      return NextResponse.json({
        success: true,
        response: fallbackResponse,
        fallback: true,
        message: result.error,
      });
    }

    return NextResponse.json({
      success: true,
      response: result.data,
      fallbackUsed: result.fallbackUsed || false,
    });
  } catch (error) {
    console.error('Error in solve-doubt API:', error);

    // Always provide a helpful response even on error
    return NextResponse.json({
      success: true,
      response: `I'm experiencing some technical difficulties right now, but I want to help you with your question.

For immediate assistance with your question, I recommend:
1. Checking your textbook or course materials
2. Looking up the topic online with reliable educational sources
3. Asking a classmate or teacher for guidance
4. Breaking the problem down into smaller steps

Please try asking your question again in a few minutes when the service is restored.`,
      fallback: true,
      error: 'Service temporarily unavailable',
    });
  }
}
