import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { topic, subject, learningLevel, contentType, duration } =
      await request.json();

    if (!topic || !subject) {
      return NextResponse.json(
        { error: 'Topic and subject are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = '';

    switch (contentType) {
      case 'study-plan':
        prompt = `
Create a comprehensive study plan for the topic "${topic}" in ${subject}.

Parameters:
- Learning Level: ${learningLevel}
- Duration: ${duration} days
- Subject: ${subject}

Please provide:
1. **Learning Objectives** (3-5 clear, measurable goals)
2. **Daily Schedule** (breakdown by day with specific topics)
3. **Key Concepts** (essential concepts to master)
4. **Resources** (recommended books, websites, videos)
5. **Practice Exercises** (hands-on activities and problems)
6. **Assessment Milestones** (checkpoints to track progress)
7. **Tips for Success** (study techniques and strategies)

Format the response with clear headings and bullet points for easy reading.
Make it practical and actionable for a ${learningLevel} level student.
`;
        break;

      case 'quiz':
        prompt = `
Create an interactive quiz on "${topic}" for ${subject} at ${learningLevel} level.

Please provide:
1. **10 Multiple Choice Questions** with 4 options each
2. **5 Short Answer Questions**
3. **3 Problem-solving Questions** (if applicable)

For each question, include:
- The question text
- Answer options (for multiple choice)
- Correct answer
- Brief explanation of why the answer is correct

Format as JSON structure:
{
  "multipleChoice": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "..."
    }
  ],
  "shortAnswer": [...],
  "problemSolving": [...]
}
`;
        break;

      case 'flashcards':
        prompt = `
Create 20 flashcards for the topic "${topic}" in ${subject} at ${learningLevel} level.

Format as JSON:
{
  "flashcards": [
    {
      "front": "Question or concept",
      "back": "Answer or explanation",
      "difficulty": "easy|medium|hard",
      "category": "specific subtopic"
    }
  ]
}

Include:
- Key definitions and terminology
- Important formulas (if applicable)
- Conceptual questions
- Memory aids and mnemonics
- Visual descriptions for complex concepts

Make them progressively challenging and cover all important aspects of the topic.
`;
        break;

      case 'summary':
        prompt = `
Create a comprehensive summary of "${topic}" in ${subject} for ${learningLevel} level.

Include:
1. **Introduction** (what this topic is about)
2. **Key Concepts** (main ideas explained simply)
3. **Important Details** (crucial information to remember)
4. **Examples** (real-world applications)
5. **Common Misconceptions** (what students often get wrong)
6. **Quick Review Points** (bullet points for fast revision)
7. **Further Learning** (what to study next)

Make it concise but comprehensive, suitable for both learning and revision.
Use clear language appropriate for ${learningLevel} level students.
`;
        break;

      case 'practice-problems':
        prompt = `
Create practice problems for "${topic}" in ${subject} at ${learningLevel} level.

Provide:
1. **10 Beginner Problems** (basic understanding)
2. **8 Intermediate Problems** (application of concepts)
3. **5 Advanced Problems** (synthesis and analysis)

For each problem:
- Clear problem statement
- Step-by-step solution
- Key concepts used
- Common mistakes to avoid
- Variations or extensions

Make problems progressively challenging and cover different aspects of the topic.
Include both theoretical and practical applications where relevant.
`;
        break;

      default:
        prompt = `
Create educational content about "${topic}" in ${subject} for ${learningLevel} level students.

Please provide a comprehensive overview including:
1. Introduction to the topic
2. Key concepts and principles
3. Examples and applications
4. Common challenges and how to overcome them
5. Study tips and strategies
6. Additional resources for deeper learning

Make the content engaging, clear, and appropriate for the student's level.
`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    // Try to parse as JSON if it's a quiz or flashcards
    let parsedContent;
    if (contentType === 'quiz' || contentType === 'flashcards') {
      try {
        // Extract JSON from the response
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

    return NextResponse.json({
      success: true,
      data: parsedContent,
      metadata: {
        topic,
        subject,
        learningLevel,
        contentType,
        duration,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Study content generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate study content',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
