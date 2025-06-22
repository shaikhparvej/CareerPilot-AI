// Mock AI Models for development
class MockAiModel {
  constructor(name) {
    this.name = name;
  }

  async sendMessage(prompt) {
    console.log(`[${this.name}] Prompt received:`, prompt);
    // Return a mock response
    return {
      response: {
        text: () => JSON.stringify({
          General_Questions: [
            "Tell me about yourself and your background.",
            "Why are you interested in this role?",
            "What do you know about our company?"
          ],
          Technical_Questions: [
            "Explain how you would approach this technical problem...",
            "What experience do you have with relevant technologies?",
            "How would you implement this feature?"
          ],
          Behavioral_Questions: [
            "Tell me about a time you faced a challenge and how you overcame it.",
            "Describe a situation where you demonstrated leadership.",
            "How do you handle conflicts in a team?"
          ],
          Situational_Questions: [
            "How would you handle a situation where deadlines are tight?",
            "What would you do if your team disagrees with your approach?",
            "How would you prioritize multiple tasks?"
          ],
          Closing_Questions: [
            "Do you have any questions for us?",
            "What are your salary expectations?",
            "When could you start if offered the position?"
          ]
        })
      }
    };
  }
}

// Export AI model instances
export const AiMockInterview = new MockAiModel("Mock Interview AI");
export const AiTeacher = new MockAiModel("Teacher AI");
export const AiCodingRoundQuestion = new MockAiModel("Coding Round AI");
export const AiEngagingContent = new MockAiModel("Engaging Content AI");
export const AiPreCourse = new MockAiModel("Pre-Course AI");
export const AiRoleMoreInfo = new MockAiModel("Role Info AI");
export const JobRolls = new MockAiModel("Job Roles AI");
export const AiGenerateRollRoadmap = new MockAiModel("Role Roadmap AI");
export const AiPreRole = new MockAiModel("Pre-Role AI"); 