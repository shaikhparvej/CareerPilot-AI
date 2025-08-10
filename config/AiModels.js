// AI Models configuration for CareerPilot AI
// Simple mock implementation that works during build

// Mock AI Model class for build compatibility
class MockAiModel {
  constructor(name) {
    this.name = name;
  }

  async sendMessage(prompt) {
    // Touch prompt to avoid unused var warnings
    void prompt;
    // Return a simple mock response that works during build
    return {
      response: {
        text: () => JSON.stringify({
          message: "AI service temporarily unavailable during build",
          success: false,
          fallback: true
        })
      }
    };
  }
}

// Export all AI models that components expect
export const AiSoftSkillReport = new MockAiModel("Soft Skill Report AI");
export const AiSoftSkillQuestion = new MockAiModel("Soft Skill Question AI");
export const AiFeedbackReport = new MockAiModel("Feedback Report AI");
export const AiMockInterview = new MockAiModel("Mock Interview AI");
export const AiCodingRoundQuestion = new MockAiModel("Coding Round Question AI");
export const AiCodingRoundFeedback = new MockAiModel("Coding Round Feedback AI");
export const AiDoubtSuggestion = new MockAiModel("Doubt Suggestion AI");
export const AiChapterContent = new MockAiModel("Chapter Content AI");
export const AiCourseContent = new MockAiModel("Course Content AI");
export const AiCourseMcqFeedbackReport = new MockAiModel("Course MCQ Feedback AI");
export const AiGenerateCourseMcq = new MockAiModel("Course MCQ Generator AI");
export const AiGeneratePoints = new MockAiModel("Points Generator AI");
export const AiChapterExam = new MockAiModel("Chapter Exam AI");
export const Aiexpand = new MockAiModel("Content Expander AI");
export const AiCheatSheet = new MockAiModel("Cheat Sheet AI");
export const AiEngagingContent = new MockAiModel("Engaging Content AI");
export const AiInter = new MockAiModel("Interactive AI");
export const AiTraslator = new MockAiModel("Translator AI");
export const AiFixBug = new MockAiModel("Bug Fix AI");
export const AiTooldSoftware = new MockAiModel("Tool Software AI");
export const AiResumeAnalyzer = new MockAiModel("Resume Analyzer AI");
export const AiProjectIdea = new MockAiModel("Project Idea AI");
// Additional models required by various components
export const geminiModel = new MockAiModel("Gemini Mock Model");
export const AiDaysRemains = new MockAiModel("30 Days Remains AI");
export const AiProjectPlan = new MockAiModel("Project Plan AI");
export const AiNotesSection = new MockAiModel("Notes Section AI");
export const AiFlashCard = new MockAiModel("Flash Card AI");
export const AiQuizRecall = new MockAiModel("Quiz Recall AI");
export const AiQueAns = new MockAiModel("Question Answer AI");
export const AiTeachToOther = new MockAiModel("Teach To Other AI");
export const AiCareerFieldResult = new MockAiModel("Career Field Result AI");

// Export default
const DefaultAi = new MockAiModel("Default AI");
export default DefaultAi;
