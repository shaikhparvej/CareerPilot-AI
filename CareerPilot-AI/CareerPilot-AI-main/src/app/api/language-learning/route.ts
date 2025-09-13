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
  'chinese',
  'japanese',
  'korean',
  'arabic',
  'hindi',
  'russian',
];

const LESSON_TYPES = [
  'vocabulary',
  'grammar',
  'conversation',
  'pronunciation',
  'reading',
  'writing',
  'listening',
  'cultural',
];

export async function POST(request: NextRequest) {
  try {
    const {
      action,
      targetLanguage,
      nativeLanguage,
      proficiencyLevel,
      lessonType,
      topic,
      text,
      userResponse,
    } = await request.json();

    if (!action || !targetLanguage) {
      return NextResponse.json(
        { error: 'Action and target language are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    let prompt = '';
    let responseData = {};

    switch (action) {
      case 'generate-lesson':
        prompt = `
Create a comprehensive language lesson for learning ${targetLanguage}.

**Lesson Parameters:**
- Target Language: ${targetLanguage}
- Native Language: ${nativeLanguage || 'English'}
- Proficiency Level: ${proficiencyLevel || 'beginner'}
- Lesson Type: ${lessonType || 'vocabulary'}
- Topic: ${topic || 'basic conversation'}

**Please provide:**

1. **Lesson Title and Objectives**
   - Clear learning goals
   - What students will achieve

2. **Core Content**
   - Key vocabulary (10-15 words/phrases)
   - Grammar points (if applicable)
   - Cultural context

3. **Example Sentences**
   - 5-8 practical examples
   - Pronunciation guides (phonetic)
   - Usage contexts

4. **Interactive Exercises**
   - Fill-in-the-blank (3 exercises)
   - Translation practice (5 sentences)
   - Conversation scenarios

5. **Practice Activities**
   - Speaking practice prompts
   - Writing exercises
   - Real-world applications

6. **Assessment Questions**
   - Multiple choice (5 questions)
   - Short answer (3 questions)
   - Practical scenarios

7. **Cultural Notes**
   - Cultural context and etiquette
   - Common expressions
   - Do's and don'ts

Format the lesson clearly with sections and provide both ${targetLanguage} and ${
          nativeLanguage || 'English'
        } translations where helpful.
Make it engaging and appropriate for ${
          proficiencyLevel || 'beginner'
        } level learners.
`;
        break;

      case 'translate-text':
        prompt = `
Translate the following text from ${
          nativeLanguage || 'English'
        } to ${targetLanguage}:

"${text}"

Provide:
1. **Direct Translation**
2. **Natural/Contextual Translation** (how a native speaker would say it)
3. **Pronunciation Guide** (phonetic)
4. **Grammar Notes** (key grammar points used)
5. **Alternative Expressions** (2-3 ways to say the same thing)
6. **Cultural Context** (if relevant)

Make sure the translation is accurate and appropriate for ${
          proficiencyLevel || 'intermediate'
        } level.
`;
        break;

      case 'conversation-practice':
        prompt = `
Create a conversation practice scenario for ${targetLanguage} learning.

**Scenario Parameters:**
- Language: ${targetLanguage}
- Level: ${proficiencyLevel || 'beginner'}
- Topic: ${topic || 'everyday conversation'}
- Setting: Real-world practical situation

**Provide:**

1. **Scenario Description**
   - Setting and context
   - Characters involved
   - Situation objectives

2. **Sample Dialogue**
   - 8-10 exchanges between characters
   - Natural, practical conversation
   - Pronunciation guides

3. **Key Phrases**
   - Essential expressions for this scenario
   - Polite forms and alternatives
   - Common responses

4. **Role-Play Prompts**
   - Guided conversation starters
   - Follow-up questions
   - Scenario variations

5. **Grammar Focus**
   - Key grammar points used
   - Sentence structures
   - Common patterns

6. **Cultural Tips**
   - Appropriate behavior
   - Social context
   - Communication style

Make it practical and engaging for ${
          proficiencyLevel || 'beginner'
        } level learners.
Include both formal and informal expressions where appropriate.
`;
        break;

      case 'pronunciation-help':
        prompt = `
Provide pronunciation help for ${targetLanguage}:

**Text to pronounce:** "${text}"

**Please provide:**

1. **Phonetic Transcription**
   - International Phonetic Alphabet (IPA)
   - Simplified pronunciation guide

2. **Syllable Breakdown**
   - Divide into syllables
   - Stress patterns
   - Rhythm guidance

3. **Sound Analysis**
   - Difficult sounds for ${nativeLanguage || 'English'} speakers
   - Similar sounds in ${nativeLanguage || 'English'}
   - Mouth position tips

4. **Practice Tips**
   - Specific pronunciation exercises
   - Common mistakes to avoid
   - Progressive practice steps

5. **Audio Description**
   - How each sound should be produced
   - Tongue and lip positions
   - Breathing techniques

6. **Similar Words**
   - Words with similar sounds
   - Minimal pair practice
   - Context examples

Make the guidance clear and practical for ${
          proficiencyLevel || 'beginner'
        } level learners.
`;
        break;

      case 'check-grammar':
        prompt = `
Check and correct the grammar in this ${targetLanguage} text:

**Student's text:** "${text}"
**Student level:** ${proficiencyLevel || 'beginner'}

**Please provide:**

1. **Corrected Version**
   - Properly corrected text
   - Maintain original meaning

2. **Error Analysis**
   - Specific grammar mistakes
   - Error categories (verb tense, word order, etc.)
   - Frequency of each error type

3. **Explanations**
   - Why each correction was made
   - Grammar rules involved
   - Examples of correct usage

4. **Improvement Suggestions**
   - Alternative ways to express the same idea
   - More natural phrasing
   - Advanced constructions

5. **Practice Recommendations**
   - Grammar points to study
   - Exercises to practice
   - Common patterns to learn

6. **Positive Feedback**
   - What was done correctly
   - Good language choices
   - Progress indicators

Be encouraging and educational, focusing on learning rather than just correction.
`;
        break;

      case 'evaluate-response':
        prompt = `
Evaluate this language learning response:

**Student Response:** "${userResponse}"
**Expected Context:** ${topic || 'language practice'}
**Student Level:** ${proficiencyLevel || 'beginner'}
**Language:** ${targetLanguage}

**Please provide:**

1. **Overall Assessment** (Score: 1-10)
   - Accuracy
   - Fluency
   - Appropriateness

2. **Strengths**
   - Correct usage
   - Good vocabulary choices
   - Proper grammar

3. **Areas for Improvement**
   - Grammar issues
   - Vocabulary gaps
   - Pronunciation concerns

4. **Specific Feedback**
   - Detailed corrections
   - Alternative expressions
   - Better word choices

5. **Encouragement**
   - Progress acknowledgment
   - Motivation
   - Next steps

6. **Practice Suggestions**
   - Targeted exercises
   - Similar scenarios
   - Skills to develop

Be constructive and supportive while providing actionable feedback.
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

    // Extract score if it's an evaluation
    let score = null;
    if (action === 'evaluate-response') {
      const scoreMatch = content.match(/Score:\s*(\d+(?:\.\d+)?)/i);
      score = scoreMatch ? parseFloat(scoreMatch[1]) : null;
    }

    responseData = {
      content,
      action,
      targetLanguage,
      proficiencyLevel: proficiencyLevel || 'beginner',
      score,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error('Language learning API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process language learning request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'CareerPilot-AI Language Learning API',
    description: 'AI-powered language learning assistance',
    supportedLanguages: SUPPORTED_LANGUAGES,
    supportedActions: [
      'generate-lesson',
      'translate-text',
      'conversation-practice',
      'pronunciation-help',
      'check-grammar',
      'evaluate-response',
    ],
    lessonTypes: LESSON_TYPES,
    proficiencyLevels: ['beginner', 'intermediate', 'advanced'],
    endpoints: {
      learn: 'POST /api/language-learning',
    },
    documentation: {
      body: {
        action: 'string (required) - Action to perform',
        targetLanguage: 'string (required) - Language to learn',
        nativeLanguage: "string (optional) - User's native language",
        proficiencyLevel: 'string (optional) - beginner/intermediate/advanced',
        lessonType: 'string (optional) - Type of lesson',
        topic: 'string (optional) - Topic or theme',
        text: 'string (optional) - Text to process',
        userResponse: 'string (optional) - User response to evaluate',
      },
      response: {
        success: 'boolean',
        data: {
          content: 'string - Generated content',
          action: 'string - Action performed',
          targetLanguage: 'string - Target language',
          proficiencyLevel: 'string - User level',
          score: 'number - Score (for evaluations)',
          generatedAt: 'string - ISO timestamp',
        },
      },
    },
  });
}
