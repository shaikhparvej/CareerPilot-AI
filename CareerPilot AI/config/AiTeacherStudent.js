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
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const StudentInterview = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'genarate 5 question that can be asked in interview for the job role "water treatment" ,include question:question that can be asked for that job role.points:key points that can answer must contain.model_answer:answer in points.in json formate.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '## Water Treatment Interview Questions:\n\n```json\n[\n  {\n    "question": "Describe your experience with different water treatment processes, such as filtration, disinfection, and softening. What are the advantages and disadvantages of each process?",\n    "key_points": [\n      "Specific experience with different water treatment processes",\n      "Understanding of process mechanisms and applications",\n      "Knowledge of advantages and disadvantages of each process (efficiency, cost, environmental impact, etc.)",\n      "Ability to compare and contrast different treatment methods"\n    ],\n    "model_answer": [\n      "I have experience with [list specific processes, e.g., sand filtration, reverse osmosis, chlorination, UV disinfection, lime softening]. I understand the principles behind each process and their respective applications in treating different water sources and contaminants.",\n      "For example, sand filtration is effective for removing suspended solids, but it may not be sufficient for removing dissolved contaminants. Reverse osmosis is highly effective for removing dissolved salts and contaminants, but it can be energy-intensive and expensive.",\n      "I can assess the suitability of different treatment processes based on the specific water quality parameters, budget constraints, and environmental regulations."\n    ]\n  },\n  {\n    "question": "How would you troubleshoot a problem with a water treatment system, such as a decrease in water quality or a malfunctioning component?",\n    "key_points": [\n      "Analytical approach to problem-solving",\n      "Understanding of system operation and potential causes of malfunction",\n      "Knowledge of diagnostic tools and techniques",\n      "Ability to communicate effectively and collaborate with others",\n      "Safety awareness and procedures"\n    ],\n    "model_answer": [\n      "I would first identify the specific issue by reviewing the system performance data, inspecting the equipment, and conducting water quality tests.",\n      "Then, I would use my knowledge of the system\'s operation and potential causes of malfunction to formulate a hypothesis about the problem.",\n      "I would then test my hypothesis by examining relevant parameters, adjusting system settings, or conducting further analysis.",\n      "If necessary, I would consult with other technical experts and follow established safety procedures to resolve the problem."\n    ]\n  },\n  {\n    "question": "Explain the importance of water quality monitoring and how it contributes to effective water treatment.",\n    "key_points": [\n      "Understanding of water quality parameters and their significance",\n      "Knowledge of monitoring methods and equipment",\n      "Ability to interpret data and identify trends",\n      "Understanding of regulatory requirements and compliance",\n      "Importance of data analysis for process optimization and improvement"\n    ],\n    "model_answer": [\n      "Water quality monitoring is crucial for ensuring that the treatment process effectively removes contaminants and delivers safe and potable water.",\n      "I understand the importance of monitoring key parameters such as pH, turbidity, chlorine levels, and the presence of specific contaminants.",\n      "I am familiar with different monitoring methods and equipment, including online sensors, laboratory analysis, and field testing.",\n      "I can interpret data, identify trends, and make adjustments to the treatment process based on the monitoring results.",\n      "Effective water quality monitoring allows for compliance with regulatory standards and ensures the long-term health and safety of the water supply."\n    ]\n  },\n  {\n    "question": "Describe your understanding of water treatment regulations and how they impact your work.",\n    "key_points": [\n      "Knowledge of relevant regulations and standards",\n      "Understanding of compliance requirements and reporting procedures",\n      "Ability to adapt to changing regulations",\n      "Awareness of potential legal and environmental consequences",\n      "Commitment to safe and environmentally responsible practices"\n    ],\n    "model_answer": [\n      "I am familiar with the [list specific regulations, e.g., EPA Safe Drinking Water Act, local water quality regulations, etc.] and understand their impact on water treatment operations.",\n      "I am proficient in complying with reporting requirements, maintaining accurate records, and ensuring that the treatment process meets all regulatory standards.",\n      "I am committed to staying informed about changes in regulations and adapting my work accordingly.",\n      "I understand the importance of ethical and responsible water treatment practices to protect public health and the environment."\n    ]\n  },\n  {\n    "question": "What are some common challenges faced in water treatment, and how would you approach these challenges in your role?",\n    "key_points": [\n      "Awareness of common water treatment challenges (e.g., changing water quality, cost constraints, technological advancements, etc.)",\n      "Problem-solving skills and ability to find creative solutions",\n      "Collaboration and communication skills",\n      "Adaptability and willingness to learn",\n      "Focus on continuous improvement and optimization"\n    ],\n    "model_answer": [\n      "Some common challenges in water treatment include fluctuations in water quality, budget constraints, regulatory changes, and the need to keep up with technological advancements.",\n      "I would approach these challenges by adopting a proactive and analytical approach, utilizing my technical expertise and problem-solving skills to identify solutions.",\n      "I am a strong team player and value open communication with colleagues, experts, and stakeholders to collaboratively develop and implement effective strategies.",\n      "I am committed to continuous learning and professional development to stay updated on industry trends and best practices."\n    ]\n  }\n]\n```',
        },
      ],
    },
  ],
});
