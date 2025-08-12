// AI Models configuration for CareerPilot AI
// Import the real AI service
export * from '../lib/aiService.js';

// Export default
import { geminiModel } from '../lib/aiService.js';
export default geminiModel;

// Mock AI Model class for missing exports
class MockAiModel {
  constructor(name) {
    this.name = name;
  }

  async sendMessage(prompt) {
    // Use the real gemini model for all AI requests
    return await geminiModel.sendMessage(prompt);
  }
}

// Export missing AI models that components expect
export const AiCareerFieldResult = new MockAiModel("Career Field Result AI");
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
