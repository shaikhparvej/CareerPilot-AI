import { useState } from 'react';
import { StudyContent } from '../lib/types';
import GeminiAPIService from '../services/GeminiAPIService';

export const useGeminiAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStudyContent = async (
    topic: string
  ): Promise<StudyContent | null> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      setError('Please add your Gemini API key to the .env file');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const geminiService = new GeminiAPIService(apiKey);

      const prompt = `
        Create a comprehensive study guide for the topic: "${topic}"

        Please provide:
        1. A concise summary (2-3 sentences)
        2. 5-7 key points that are essential to understand
        3. A detailed explanation that covers the important concepts

        Format your response as JSON with the following structure:
        {
          "summary": "Brief summary here",
          "keyPoints": ["Point 1", "Point 2", "Point 3", ...],
          "detailedExplanation": "Comprehensive explanation here"
        }

        Make it educational, clear, and suitable for focused study and revision.
        *Context Awareness:*
        - Track the last all exchanges (user inputs and your responses).
        - Check if the current query relates to previous inputs (e.g., shared topics, follow-ups, or references). If yes, include relevant context in your response.
      `;

      const result = await geminiService.generateContent(prompt);

      if (!result.success) {
        // Use fallback content if AI service fails
        console.warn(
          'AI service failed, using fallback content:',
          result.error
        );
        const fallbackContent = geminiService.generateFallbackContent(topic);

        setError(
          'AI service is temporarily unavailable. Showing sample content.'
        );

        return {
          topic,
          summary: fallbackContent.summary,
          keyPoints: fallbackContent.keyPoints,
          detailedExplanation: fallbackContent.detailedExplanation,
          isGenerating: false,
        };
      }

      const text = result.data!;

      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        // Use fallback if JSON parsing fails
        const fallbackContent = geminiService.generateFallbackContent(topic);
        setError('AI response format issue. Showing sample content.');

        return {
          topic,
          summary: fallbackContent.summary,
          keyPoints: fallbackContent.keyPoints,
          detailedExplanation: fallbackContent.detailedExplanation,
          isGenerating: false,
        };
      }

      const parsedContent = JSON.parse(jsonMatch[0]);

      if (result.fallbackUsed) {
        setError('Primary AI model unavailable. Using backup model.');
      }

      return {
        topic,
        summary: parsedContent.summary,
        keyPoints: parsedContent.keyPoints,
        detailedExplanation: parsedContent.detailedExplanation,
        isGenerating: false,
      };
    } catch (err) {
      console.error('Error generating content:', err);

      // Always provide fallback content rather than complete failure
      const geminiService = new GeminiAPIService('');
      const fallbackContent = geminiService.generateFallbackContent(topic);

      setError(
        'Service temporarily unavailable. Showing sample content - please try again later.'
      );

      return {
        topic,
        summary: fallbackContent.summary,
        keyPoints: fallbackContent.keyPoints,
        detailedExplanation: fallbackContent.detailedExplanation,
        isGenerating: false,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateStudyContent,
    isLoading,
    error,
  };
};
