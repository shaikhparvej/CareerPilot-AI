/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AiSoftSkillQuestion = model.startChat({
  generationConfig,

  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate list of 5 question that help to know about the soft skill of student,include question.skill.in json formate.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "question": "Describe a time you had to work on a project with a group of people who had different ideas and approaches. How did you handle the situation and ensure everyone\'s ideas were heard and considered?",\n    "skill": "Collaboration and Teamwork"\n  },\n  {\n    "question": "Tell me about a time you had to adapt to a change in plans or unexpected challenge. How did you handle the situation and what did you learn from it?",\n    "skill": "Adaptability and Flexibility"\n  },\n  {\n    "question": "Think about a time you had to present information or ideas to a group of people. How did you prepare for the presentation and what strategies did you use to make it effective?",\n    "skill": "Communication and Public Speaking"\n  },\n  {\n    "question": "Describe a time you had to deal with a difficult or stressful situation. How did you manage your emotions and find a solution?",\n    "skill": "Stress Management and Emotional Intelligence"\n  },\n  {\n    "question": "Tell me about a time you took initiative and went above and beyond in your role. What motivated you to do so and what were the results?",\n    "skill": "Initiative and Self-Motivation"\n  }\n]\n```\n',
        },
      ],
    },
  ],
});
