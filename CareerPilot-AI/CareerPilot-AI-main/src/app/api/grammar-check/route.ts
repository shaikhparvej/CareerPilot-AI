import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

const SUPPORTED_LANGUAGES = [
  'english',
  'spanish',
  'french',
  'german',
  'italian',
  'portuguese',
];

const CHECK_TYPES = [
  'full',
  'grammar-only',
  'spelling-only',
  'style-only',
  'punctuation-only',
];

const WRITING_STYLES = [
  'academic',
  'business',
  'casual',
  'creative',
  'technical',
  'formal',
];

export async function POST(request: NextRequest) {
  try {
    const { text, language, checkType, writingStyle, userLevel, context } =
      await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required for grammar check' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeAI({ model: 'gemini-pro' });

    const prompt = `
You are an expert grammar and writing assistant. Please analyze the following text comprehensively.

**Text to Analyze:**
"${text}"

**Analysis Parameters:**
- Language: ${language || 'English'}
- Check Type: ${checkType || 'full'}
- Writing Style: ${writingStyle || 'general'}
- User Level: ${userLevel || 'intermediate'}
- Context: ${context || 'general writing'}

**Please provide a comprehensive analysis including:**

1. **Corrected Text**
   - Provide the fully corrected version
   - Maintain the original meaning and style
   - Fix all identified issues

2. **Error Analysis**
   - Grammar errors (verb tense, subject-verb agreement, etc.)
   - Spelling mistakes
   - Punctuation issues
   - Style inconsistencies
   - Word choice problems

3. **Detailed Error Breakdown**
   For each error, provide:
   - Original text excerpt
   - Corrected version
   - Error type and category
   - Explanation of why it's incorrect
   - Grammar rule involved

4. **Writing Quality Assessment**
   - Clarity score (1-10)
   - Coherence score (1-10)
   - Style appropriateness (1-10)
   - Overall quality score (1-10)

5. **Style and Flow Improvements**
   - Sentence structure enhancements
   - Vocabulary improvements
   - Readability suggestions
   - Tone adjustments

6. **Suggestions for Enhancement**
   - Alternative phrasings
   - More sophisticated vocabulary
   - Better sentence transitions
   - Stronger arguments or examples

7. **Writing Statistics**
   - Word count
   - Sentence count
   - Average sentence length
   - Reading level estimate
   - Passive voice usage

8. **Educational Notes**
   - Grammar rules to remember
   - Common mistakes to avoid
   - Writing tips for improvement
   - Resources for further learning

9. **Context-Specific Feedback**
   - Appropriateness for intended audience
   - Style consistency with purpose
   - Professional/academic standards met
   - Cultural considerations (if applicable)

**Format your response with clear sections and be specific about each correction.**
Adjust the complexity of explanations based on the user's ${
      userLevel || 'intermediate'
    } level.
Focus on ${checkType || 'comprehensive'} analysis as requested.
Consider the ${writingStyle || 'general'} writing style expectations.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    // Extract scores from the analysis
    const extractScore = (text: string, scoreType: string) => {
      const regex = new RegExp(`${scoreType}[^\\d]*(\\d+(?:\\.\\d+)?)`, 'i');
      const match = text.match(regex);
      return match ? parseFloat(match[1]) : null;
    };

    const scores = {
      clarity: extractScore(analysis, 'clarity'),
      coherence: extractScore(analysis, 'coherence'),
      style: extractScore(analysis, 'style'),
      overall: extractScore(analysis, 'overall'),
    };

    // Count different types of errors
    const errorCounts = {
      grammar: (analysis.match(/grammar\s+error/gi) || []).length,
      spelling: (analysis.match(/spelling\s+mistake/gi) || []).length,
      punctuation: (analysis.match(/punctuation/gi) || []).length,
      style: (analysis.match(/style\s+issue/gi) || []).length,
    };

    // Basic text statistics
    const stats = {
      originalWordCount: text.trim().split(/\s+/).length,
      originalSentenceCount: text
        .split(/[.!?]+/)
        .filter(s => s.trim().length > 0).length,
      originalCharCount: text.length,
      averageSentenceLength: Math.round(
        text.trim().split(/\s+/).length /
          text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
      ),
    };

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        scores,
        errorCounts,
        statistics: stats,
        metadata: {
          language: language || 'english',
          checkType: checkType || 'full',
          writingStyle: writingStyle || 'general',
          userLevel: userLevel || 'intermediate',
          context: context || 'general',
          analyzedAt: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Grammar check error:', error);
    return NextResponse.json(
      {
        error: 'Failed to check grammar',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Additional endpoint for quick suggestions
export async function PUT(request: NextRequest) {
  try {
    const { sentence, language } = await request.json();

    if (!sentence) {
      return NextResponse.json(
        { error: 'Sentence is required for quick suggestions' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Provide quick writing suggestions for this sentence:

"${sentence}"

Language: ${language || 'English'}

Please provide:
1. **Quick Fix** - Immediate correction if needed
2. **Alternative Versions** - 2-3 different ways to express the same idea
3. **Style Improvements** - More sophisticated or clearer versions
4. **Concise Version** - Shortened version if possible
5. **Formal Version** - More professional version
6. **Casual Version** - More relaxed version

Keep suggestions brief and practical.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestions = response.text();

    return NextResponse.json({
      success: true,
      data: {
        suggestions,
        originalSentence: sentence,
        language: language || 'english',
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Quick suggestions error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate suggestions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'CareerPilot-AI Grammar & Writing Check API',
    description: 'AI-powered grammar, spelling, and writing analysis',
    supportedLanguages: SUPPORTED_LANGUAGES,
    checkTypes: CHECK_TYPES,
    writingStyles: WRITING_STYLES,
    userLevels: ['beginner', 'intermediate', 'advanced'],
    endpoints: {
      'full-check': 'POST /api/grammar-check',
      'quick-suggestions': 'PUT /api/grammar-check',
    },
    documentation: {
      POST: {
        body: {
          text: 'string (required) - Text to analyze',
          language: 'string (optional) - Text language',
          checkType: 'string (optional) - Type of check to perform',
          writingStyle: 'string (optional) - Expected writing style',
          userLevel: 'string (optional) - User proficiency level',
          context: 'string (optional) - Writing context or purpose',
        },
        response: {
          success: 'boolean',
          data: {
            analysis: 'string - Detailed analysis',
            scores: 'object - Quality scores',
            errorCounts: 'object - Error statistics',
            statistics: 'object - Text statistics',
            metadata: 'object - Analysis metadata',
          },
        },
      },
      PUT: {
        body: {
          sentence: 'string (required) - Sentence for quick suggestions',
          language: 'string (optional) - Sentence language',
        },
        response: {
          success: 'boolean',
          data: {
            suggestions: 'string - Writing suggestions',
            originalSentence: 'string - Original input',
            language: 'string - Language used',
            generatedAt: 'string - ISO timestamp',
          },
        },
      },
    },
    features: [
      'Grammar and spelling correction',
      'Style and clarity analysis',
      'Writing quality scoring',
      'Context-aware suggestions',
      'Multi-language support',
      'Educational explanations',
      'Quick sentence improvements',
      'Writing statistics and metrics',
    ],
  });
}
