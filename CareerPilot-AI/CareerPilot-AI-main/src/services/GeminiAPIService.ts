import { GoogleGenerativeAI } from '@google/generative-ai';

interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  fallbackUsed?: boolean;
}

class GeminiAPIService {
  private genAI: GoogleGenerativeAI;
  private retryOptions: RetryOptions = {
    maxRetries: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
  };

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private calculateBackoffDelay(attempt: number): number {
    // Exponential backoff with jitter
    const exponentialDelay = Math.min(
      this.retryOptions.baseDelay * Math.pow(2, attempt),
      this.retryOptions.maxDelay
    );

    // Add random jitter (±25%)
    const jitter = exponentialDelay * 0.25 * (Math.random() * 2 - 1);
    return Math.floor(exponentialDelay + jitter);
  }

  private isRetryableError(error: any): boolean {
    const errorMessage = error?.message || error?.toString() || '';

    // Check for retryable errors
    return (
      errorMessage.includes('503') ||
      errorMessage.includes('Service Unavailable') ||
      errorMessage.includes('overloaded') ||
      errorMessage.includes('rate limit') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('ECONNRESET') ||
      errorMessage.includes('ETIMEDOUT')
    );
  }

  private async generateWithRetry(
    model: any,
    prompt: string,
    attempt: number = 0
  ): Promise<string> {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (
        attempt >= this.retryOptions.maxRetries ||
        !this.isRetryableError(error)
      ) {
        throw error;
      }

      const delay = this.calculateBackoffDelay(attempt);
      console.log(
        `Retrying in ${delay}ms... (attempt ${attempt + 2}/${
          this.retryOptions.maxRetries + 1
        })`
      );

      await this.delay(delay);
      return this.generateWithRetry(model, prompt, attempt + 1);
    }
  }

  async generateContent(
    prompt: string,
    modelName: string = 'gemini-1.5-flash'
  ): Promise<APIResponse<string>> {
    try {
      const model = this.genAI.getGenerativeModel({ model: modelName });
      const text = await this.generateWithRetry(model, prompt);

      return {
        success: true,
        data: text,
      };
    } catch (error) {
      console.error('All retry attempts failed:', error);

      // Try fallback model if primary fails
      if (modelName === 'gemini-1.5-flash') {
        console.log('Trying fallback model: gemini-pro');
        try {
          const fallbackModel = this.genAI.getGenerativeModel({
            model: 'gemini-pro',
          });
          const text = await this.generateWithRetry(fallbackModel, prompt);

          return {
            success: true,
            data: text,
            fallbackUsed: true,
          };
        } catch (fallbackError) {
          console.error('Fallback model also failed:', fallbackError);
        }
      }

      // Return error if all attempts fail
      return {
        success: false,
        error: this.getErrorMessage(error),
      };
    }
  }

  private getErrorMessage(error: any): string {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';

    if (errorMessage.includes('503') || errorMessage.includes('overloaded')) {
      return 'The AI service is currently experiencing high traffic. Please try again in a few moments.';
    }

    if (errorMessage.includes('rate limit')) {
      return 'API rate limit exceeded. Please wait a moment before trying again.';
    }

    if (errorMessage.includes('API key')) {
      return 'Invalid API key. Please check your configuration.';
    }

    return 'AI service is temporarily unavailable. Please try again later.';
  }

  // Fallback content for when AI is unavailable
  generateFallbackContent(topic: string): any {
    const fallbackData = {
      interview: {
        summary:
          "This is a mock interview preparation session. We'll simulate a real interview environment to help you practice.",
        keyPoints: [
          'Be confident and maintain eye contact',
          'Prepare STAR method answers (Situation, Task, Action, Result)',
          'Research the company and role beforehand',
          'Ask thoughtful questions about the role',
          'Practice common interview questions',
        ],
        detailedExplanation:
          "Mock interviews are an excellent way to prepare for real job interviews. During this session, we'll ask you relevant questions based on your background and the role you're targeting. Remember to speak clearly, provide specific examples, and show enthusiasm for the position.",
      },
      coding: {
        summary:
          'Coding practice session focusing on problem-solving and algorithm implementation.',
        keyPoints: [
          'Break down problems into smaller steps',
          'Think about edge cases and constraints',
          'Write clean, readable code',
          'Test your solution with sample inputs',
          'Consider time and space complexity',
        ],
        detailedExplanation:
          'Effective coding requires both theoretical knowledge and practical problem-solving skills. Start by understanding the problem requirements, then design your algorithm step by step. Always test your code and consider optimization opportunities.',
      },
      general: {
        summary:
          "Here's some helpful information about your topic while we work on connecting to our AI service.",
        keyPoints: [
          'Take notes and organize your thoughts',
          'Practice regularly for best results',
          'Break complex topics into smaller parts',
          'Use multiple learning resources',
          'Apply knowledge through hands-on practice',
        ],
        detailedExplanation:
          'Learning effectively requires a structured approach. Focus on understanding core concepts before diving into advanced topics. Regular practice and application of knowledge will help reinforce your learning.',
      },
    };

    const category = topic.toLowerCase().includes('interview')
      ? 'interview'
      : topic.toLowerCase().includes('code') ||
        topic.toLowerCase().includes('programming')
      ? 'coding'
      : 'general';

    return fallbackData[category];
  }
}

export default GeminiAPIService;
