import { NextRequest, NextResponse } from 'next/server';

const JOB_CATEGORIES = [
  'software-engineer',
  'data-scientist',
  'product-manager',
  'designer',
  'marketing',
  'sales',
  'finance',
  'hr',
  'consultant',
  'analyst',
];

const DIFFICULTY_LEVELS = ['entry', 'mid', 'senior', 'executive'];

const QUESTION_TYPES = [
  'behavioral',
  'technical',
  'situational',
  'company-specific',
  'problem-solving',
  'leadership',
  'cultural-fit',
];

export async function POST(request: NextRequest) {
  try {
    const {
      action,
      jobRole,
      techStack,
      experienceLevel,
      industryType,
      questionType,
      numQuestions,
      question,
      answer,
      interviewStyle,
    } = await request.json();

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    let prompt = '';

    switch (action) {
      case 'generate-questions':
        if (!jobRole || !numQuestions) {
          return NextResponse.json(
            { error: 'Job role and number of questions are required' },
            { status: 400 }
          );
        }

        prompt = `
Generate ${numQuestions} interview questions for a ${jobRole} position.

**Interview Parameters:**
- Job Role: ${jobRole}
- Tech Stack: ${techStack || 'General'}
- Experience Level: ${experienceLevel || 'mid-level'}
- Industry: ${industryType || 'Technology'}
- Question Type Focus: ${questionType || 'mixed'}
- Interview Style: ${interviewStyle || 'professional'}

**Requirements:**
1. Generate exactly ${numQuestions} questions
2. Mix of question types: behavioral, technical, situational
3. Progressive difficulty appropriate for ${
          experienceLevel || 'mid-level'
        } level
4. Industry-relevant scenarios
5. Each question should include:
   - The question text
   - Question type (behavioral/technical/situational)
   - Difficulty level (1-5)
   - Key points the interviewer is looking for
   - Sample answer outline (not full answer)

**Format as JSON:**
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here",
      "type": "behavioral|technical|situational",
      "difficulty": 1-5,
      "category": "specific category",
      "lookingFor": ["key point 1", "key point 2", "key point 3"],
      "sampleOutline": "Brief outline of good answer approach",
      "followUpQuestions": ["optional follow-up 1", "optional follow-up 2"]
    }
  ],
  "interviewMetadata": {
    "totalQuestions": ${numQuestions},
    "estimatedDuration": "X minutes",
    "focusAreas": ["area1", "area2", "area3"],
    "tips": ["tip1", "tip2", "tip3"]
  }
}

Make questions realistic, relevant, and challenging but fair for the specified experience level.
`;
        break;

      case 'evaluate-answer':
        if (!question || !answer) {
          return NextResponse.json(
            { error: 'Question and answer are required for evaluation' },
            { status: 400 }
          );
        }

        prompt = `
Evaluate this interview answer as an experienced interviewer for a ${
          jobRole || 'software engineer'
        } position.

**Question:** "${question}"
**Candidate's Answer:** "${answer}"
**Role Context:** ${jobRole || 'Software Engineer'}
**Experience Level:** ${experienceLevel || 'mid-level'}

**Please provide a comprehensive evaluation:**

1. **Overall Score** (1-10 scale)
   - Rate the overall quality of the answer
   - Consider completeness, relevance, and depth

2. **Strengths Analysis**
   - What the candidate did well
   - Specific examples from their answer
   - Positive indicators for the role

3. **Areas for Improvement**
   - Missing elements
   - Unclear explanations
   - Opportunities for better responses

4. **Technical Assessment** (if applicable)
   - Technical accuracy
   - Problem-solving approach
   - Industry best practices mentioned

5. **Communication Skills**
   - Clarity and structure
   - Professional language use
   - Storytelling ability (for behavioral questions)

6. **Specific Feedback**
   - Line-by-line analysis of key points
   - Suggestions for improvement
   - Alternative approaches

7. **Follow-up Questions**
   - Questions the interviewer might ask based on this answer
   - Areas to probe deeper
   - Clarification needs

8. **Interview Tips**
   - How to improve similar answers
   - General interview advice
   - Role-specific guidance

9. **Sample Improved Answer**
   - How a strong candidate might answer
   - Key elements to include
   - Better structure or examples

**Format the response clearly with scores and actionable feedback.**
Be constructive and helpful while maintaining professional interviewer standards.
`;
        break;

      case 'practice-scenarios':
        prompt = `
Create realistic interview scenarios for ${
          jobRole || 'software engineer'
        } practice.

**Parameters:**
- Job Role: ${jobRole || 'Software Engineer'}
- Experience Level: ${experienceLevel || 'mid-level'}
- Industry: ${industryType || 'Technology'}
- Focus: ${questionType || 'mixed scenarios'}

**Generate 3 comprehensive practice scenarios:**

For each scenario, provide:

1. **Scenario Setup**
   - Company background and context
   - Role requirements and challenges
   - Interview format and expectations

2. **Behavioral Scenario Questions** (2-3 questions)
   - Real workplace situations
   - STAR method opportunities
   - Leadership/teamwork focus

3. **Technical/Problem-Solving Challenge**
   - Role-appropriate technical question
   - Problem-solving approach
   - Expected solution depth

4. **Case Study or Situational Question**
   - Real business scenario
   - Decision-making opportunity
   - Strategic thinking requirement

5. **Role-Playing Exercise**
   - Interactive scenario description
   - Expected interactions
   - Success criteria

6. **Evaluation Criteria**
   - What interviewers will assess
   - Key success indicators
   - Common failure points

7. **Preparation Tips**
   - How to prepare for each scenario
   - Research recommendations
   - Practice suggestions

Make scenarios realistic and challenging while remaining fair for the experience level.
Include industry-specific context and current market trends.
`;
        break;

      case 'interview-tips':
        prompt = `
Provide comprehensive interview preparation tips for a ${
          jobRole || 'software engineer'
        } position.

**Context:**
- Target Role: ${jobRole || 'Software Engineer'}
- Experience Level: ${experienceLevel || 'mid-level'}
- Industry: ${industryType || 'Technology'}
- Tech Stack: ${techStack || 'General'}

**Comprehensive Interview Guide:**

1. **Pre-Interview Preparation**
   - Company research strategy
   - Role-specific preparation
   - Technical skill review
   - Portfolio/project preparation

2. **Common Question Categories**
   - Behavioral questions and STAR method
   - Technical questions and approaches
   - System design (if applicable)
   - Culture fit questions

3. **Industry-Specific Tips**
   - Current trends and technologies
   - Industry challenges and opportunities
   - Key skills and competencies
   - Market expectations

4. **Technical Preparation** (if applicable)
   - Coding interview preparation
   - System design concepts
   - Technology stack deep-dive
   - Problem-solving frameworks

5. **Soft Skills Focus**
   - Communication strategies
   - Leadership examples
   - Teamwork scenarios
   - Conflict resolution

6. **Day-of-Interview Tips**
   - Presentation and appearance
   - Question-asking strategies
   - Follow-up approaches
   - Nervous management

7. **Post-Interview Actions**
   - Thank you note best practices
   - Follow-up timing
   - Feedback incorporation
   - Next steps preparation

8. **Red Flags to Avoid**
   - Common mistakes
   - Interview killers
   - Unprofessional behaviors
   - Preparation gaps

9. **Salary and Negotiation**
   - Market research approach
   - Negotiation strategies
   - Benefits consideration
   - Timing guidelines

10. **Role-Specific Advice**
    - Unique aspects of ${jobRole || 'this role'}
    - Industry expectations
    - Career progression paths
    - Success metrics

Provide actionable, specific advice that candidates can immediately implement.
`;
        break;

      case 'generate-feedback-report':
        prompt = `
Generate a comprehensive interview performance report.

**Interview Session Summary:**
- Role: ${jobRole || 'Software Engineer'}
- Questions Answered: ${numQuestions || 'Multiple'}
- Experience Level: ${experienceLevel || 'mid-level'}

Create a detailed performance report including:

1. **Executive Summary**
   - Overall performance rating
   - Key strengths and weaknesses
   - Interview readiness assessment
   - Recommendation (proceed/more practice needed)

2. **Performance Breakdown**
   - Communication skills score
   - Technical competency score
   - Problem-solving ability score
   - Cultural fit assessment score

3. **Detailed Analysis**
   - Question-by-question performance
   - Answer quality assessment
   - Improvement opportunities
   - Standout moments

4. **Skill Gap Analysis**
   - Technical skills assessment
   - Soft skills evaluation
   - Industry knowledge gaps
   - Experience alignment

5. **Development Recommendations**
   - Specific skills to improve
   - Learning resources
   - Practice exercises
   - Timeline for improvement

6. **Interview Strategy**
   - Answer structure improvements
   - Communication enhancements
   - Confidence building tips
   - Preparation focus areas

7. **Next Steps Action Plan**
   - Immediate actions (next 1-2 weeks)
   - Short-term goals (1-2 months)
   - Long-term development (3-6 months)
   - Progress tracking methods

8. **Industry Benchmarking**
   - How performance compares to market standards
   - Competitive positioning
   - Market readiness assessment
   - Salary negotiation readiness

Provide specific, actionable feedback that helps the candidate improve systematically.
`;
        break;

      default:
        return NextResponse.json(
          { error: `Unsupported action: ${action}` },
          { status: 400 }
        );
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    // Try to parse JSON for structured responses
    let parsedContent;
    if (action === 'generate-questions') {
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedContent = JSON.parse(jsonMatch[0]);
        } else {
          parsedContent = { rawContent: content };
        }
      } catch (e) {
        parsedContent = { rawContent: content };
      }
    } else {
      parsedContent = { content };
    }

    // Extract score if it's an evaluation
    let score = null;
    if (action === 'evaluate-answer') {
      const scoreMatch = content.match(/(?:Score|Rating):\s*(\d+(?:\.\d+)?)/i);
      score = scoreMatch ? parseFloat(scoreMatch[1]) : null;
    }

    return NextResponse.json({
      success: true,
      data: {
        ...parsedContent,
        action,
        jobRole: jobRole || 'software-engineer',
        experienceLevel: experienceLevel || 'mid-level',
        score,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Mock interview API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process mock interview request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'CareerPilot-AI Mock Interview API',
    description: 'AI-powered interview practice and feedback system',
    supportedActions: [
      'generate-questions',
      'evaluate-answer',
      'practice-scenarios',
      'interview-tips',
      'generate-feedback-report',
    ],
    jobCategories: JOB_CATEGORIES,
    difficultyLevels: DIFFICULTY_LEVELS,
    questionTypes: QUESTION_TYPES,
    endpoints: {
      interview: 'POST /api/mock-interview',
    },
    documentation: {
      body: {
        action: 'string (required) - Action to perform',
        jobRole: 'string (optional) - Target job role',
        techStack: 'string (optional) - Required technologies',
        experienceLevel: 'string (optional) - entry/mid/senior/executive',
        industryType: 'string (optional) - Industry context',
        questionType: 'string (optional) - Question focus type',
        numQuestions: 'number (optional) - Number of questions to generate',
        question: 'string (optional) - Question text for evaluation',
        answer: 'string (optional) - Answer text for evaluation',
        interviewStyle: 'string (optional) - Interview style preference',
      },
      response: {
        success: 'boolean',
        data: {
          content: 'string - Generated content or structured data',
          action: 'string - Action performed',
          jobRole: 'string - Job role context',
          experienceLevel: 'string - Experience level',
          score: 'number - Score (for evaluations)',
          generatedAt: 'string - ISO timestamp',
        },
      },
    },
  });
}
