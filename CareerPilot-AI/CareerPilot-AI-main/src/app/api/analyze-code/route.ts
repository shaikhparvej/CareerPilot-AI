import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { code, language, problem, userLevel } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are an expert programming mentor analyzing code for educational purposes.

**Code Analysis Request:**
Language: ${language}
User Level: ${userLevel || 'intermediate'}
Problem Context: ${problem || 'General code review'}

**Code to Analyze:**
\`\`\`${language}
${code}
\`\`\`

Please provide a comprehensive code analysis including:

1. **Code Quality Assessment** (Score: 1-10)
   - Readability and style
   - Code organization
   - Best practices adherence
   - Performance considerations

2. **Strengths** (What's done well)
   - Good programming practices observed
   - Effective solutions or approaches
   - Proper use of language features

3. **Areas for Improvement**
   - Code quality issues
   - Performance bottlenecks
   - Style and readability concerns
   - Logic or algorithm improvements

4. **Specific Suggestions**
   - Line-by-line feedback for critical issues
   - Alternative approaches or refactoring suggestions
   - Best practice recommendations

5. **Learning Opportunities**
   - Concepts to study further
   - Advanced techniques to explore
   - Related algorithms or patterns

6. **Optimized Version** (if improvements are possible)
   - Provide a refactored version of the code
   - Explain the changes made
   - Highlight the benefits

7. **Practice Recommendations**
   - Similar problems to solve
   - Skills to develop
   - Next steps for learning

Format your response clearly with appropriate headings and code examples.
Be constructive, educational, and encouraging while providing actionable feedback.
Adjust the complexity of your feedback to match the user's ${
      userLevel || 'intermediate'
    } level.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = response.text();

    // Extract score if mentioned
    const scoreMatch = analysis.match(/Score:\s*(\d+(?:\.\d+)?)/i);
    const overallScore = scoreMatch ? parseFloat(scoreMatch[1]) : null;

    return NextResponse.json({
      success: true,
      data: {
        analysis,
        overallScore,
        language,
        codeLength: code.length,
        linesOfCode: code.split('\n').length,
        analyzedAt: new Date().toISOString(),
        suggestions: {
          hasImprovements: analysis.toLowerCase().includes('improvement'),
          hasOptimization: analysis.toLowerCase().includes('optimiz'),
          hasRefactoring: analysis.toLowerCase().includes('refactor'),
        },
      },
    });
  } catch (error) {
    console.error('Code analysis error:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze code',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'CareerPilot-AI Code Analysis API',
    description: 'AI-powered code review and feedback system',
    supportedLanguages: [
      'javascript',
      'python',
      'java',
      'cpp',
      'c',
      'go',
      'rust',
      'typescript',
      'php',
      'ruby',
      'swift',
      'kotlin',
    ],
    endpoints: {
      analyze: 'POST /api/analyze-code',
    },
    documentation: {
      body: {
        code: 'string (required) - Source code to analyze',
        language: 'string (required) - Programming language',
        problem: 'string (optional) - Problem context or description',
        userLevel:
          'string (optional) - User skill level: beginner, intermediate, advanced',
      },
      response: {
        success: 'boolean',
        data: {
          analysis: 'string - Detailed code analysis',
          overallScore: 'number - Code quality score (1-10)',
          language: 'string - Programming language',
          codeLength: 'number - Character count',
          linesOfCode: 'number - Line count',
          analyzedAt: 'string - ISO timestamp',
          suggestions: 'object - Analysis flags',
        },
      },
    },
  });
}
