// Real AI Service for CareerPilot AI
import axios from 'axios';

export class AiService {
  constructor(modelName) {
    this.modelName = modelName;
    this.baseURL = '/api/gemini';
  }

  async sendMessage(prompt) {
    try {
      console.log(`[${this.modelName}] Sending request to Gemini API`);

      const response = await axios.post(this.baseURL, {
        prompt: prompt
      });

      if (response.data.success) {
        return {
          response: {
            text: () => response.data.response
          }
        };
      } else {
        throw new Error(response.data.error || 'API request failed');
      }
    } catch (error) {
      console.error(`[${this.modelName}] Error:`, error.message);

      // Return fallback response for better UX
      return {
        response: {
          text: () => this.getFallbackResponse(prompt)
        }
      };
    }
  }

  getFallbackResponse(prompt) {
    const promptLower = prompt.toLowerCase();

    if (promptLower.includes('flashcard')) {
      return JSON.stringify({
        flashcards: [
          {
            front: "What is artificial intelligence?",
            back: "AI is the simulation of human intelligence in machines that are programmed to think and learn."
          },
          {
            front: "What are the types of machine learning?",
            back: "Supervised learning, Unsupervised learning, and Reinforcement learning."
          }
        ]
      });
    }

    if (promptLower.includes('quiz') || promptLower.includes('mcq')) {
      return JSON.stringify({
        questions: [
          {
            question: "What does AI stand for?",
            options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Applied Intelligence"],
            correct: 0
          },
          {
            question: "Which is a popular machine learning library?",
            options: ["React", "TensorFlow", "Bootstrap", "jQuery"],
            correct: 1
          }
        ]
      });
    }

    if (promptLower.includes('question') || promptLower.includes('qa')) {
      return JSON.stringify({
        questions: [
          "What are the main applications of AI in today's world?",
          "How does machine learning differ from traditional programming?",
          "What are the ethical considerations in AI development?"
        ]
      });
    }

    if (promptLower.includes('teach') || promptLower.includes('explain')) {
      return "Here's a simple explanation: AI is like teaching computers to think and make decisions like humans. Start with basic concepts like pattern recognition, then move to algorithms, and finally practical applications.";
    }

    if (promptLower.includes('notes') || promptLower.includes('content')) {
      return `
## Chapter Notes

### Key Concepts
- Understanding the fundamentals
- Practical applications
- Real-world examples

### Important Points
1. Core principles and theory
2. Implementation strategies
3. Best practices

### Summary
This chapter covers essential concepts that form the foundation for advanced topics.
      `;
    }

    return "I can help you with your learning journey. Please provide more specific details about what you'd like to learn.";
  }
}

// Create instances for all AI models
export const geminiModel = new AiService("Gemini");
export const AiFlashCard = new AiService("AiFlashCard");
export const AiQuizRecall = new AiService("AiQuizRecall");
export const AiQueAns = new AiService("AiQueAns");
export const AiTeachToOther = new AiService("AiTeachToOther");
export const AiChapterContent = new AiService("AiChapterContent");
export const AiNotesSection = new AiService("AiNotesSection");
export const AiCourseContent = new AiService("AiCourseContent");
export const AiAnswerQueAns = new AiService("AiAnswerQueAns");
export const AiDoubtSuggestion = new AiService("AiDoubtSuggestion");

// Other existing models
export const AiDaysRemains = new AiService("AiDaysRemains");
export const AiProjectPlan = new AiService("AiProjectPlan");
export const AiProjectIdea = new AiService("AiProjectIdea");
export const AiResumeAnalyzer = new AiService("AiResumeAnalyzer");
export const AiTooldSoftware = new AiService("AiTooldSoftware");
export const AiCareerFieldResult = new AiService("AiCareerFieldResult");
export const AiCodingRoundFeedback = new AiService("AiCodingRoundFeedback");
export const AiQuizList = new AiService("AiQuizList");
export const AiSoftSkillQuestion = new AiService("AiSoftSkillQuestion");
export const AiFeedbackReport = new AiService("AiFeedbackReport");
export const AiMockInterview = new AiService("AiMockInterview");
export const AiSoftSkillReport = new AiService("AiSoftSkillReport");
export const AiCodingRoundQuestion = new AiService("AiCodingRoundQuestion");

export default geminiModel;
