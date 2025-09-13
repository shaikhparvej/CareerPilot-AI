import { ai } from './genkit';

interface AICallOptions {
  prompt: string;
  retries?: number;
  fallbackModel?: string;
}

interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function safeAICall(options: AICallOptions): Promise<AIResponse> {
  const { prompt, retries = 3, fallbackModel } = options;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`AI Call attempt ${attempt}/${retries}`);

      const response = await ai.generate(prompt);

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error(`AI Call attempt ${attempt} failed:`, error);

      if (attempt === retries) {
        // Last attempt failed, return error
        return {
          success: false,
          error: `AI service unavailable after ${retries} attempts. ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
        };
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  return {
    success: false,
    error: 'Maximum retry attempts exceeded',
  };
}

export function validateAPIKey(): boolean {
  const apiKey =
    process.env.GOOGLE_GENAI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Missing Google Gemini API key');
    return false;
  }

  if (apiKey.length < 20) {
    console.error('Invalid Google Gemini API key format');
    return false;
  }

  return true;
}

export async function testAIConnection(): Promise<AIResponse> {
  if (!validateAPIKey()) {
    return {
      success: false,
      error: 'Invalid or missing API key',
    };
  }

  return safeAICall({
    prompt: 'Say "AI connection test successful" in a single sentence.',
    retries: 2,
  });
}
