
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExtemporeTopicInputSchema = z.object({
  _seed: z.number().optional().describe("A random seed to ensure input uniqueness, not used by the prompt directly."),
});
export type GenerateExtemporeTopicInput = z.infer<typeof GenerateExtemporeTopicInputSchema>;


const GenerateExtemporeTopicOutputSchema = z.object({
  topic: z.string().describe('A random topic suitable for a short extempore speech.'),
});
export type GenerateExtemporeTopicOutput = z.infer<typeof GenerateExtemporeTopicOutputSchema>;

export async function generateExtemporeTopic(): Promise<GenerateExtemporeTopicOutput> {
  return generateExtemporeTopicWithRetry({ _seed: Date.now() });
}

async function generateExtemporeTopicWithRetry(
  input: GenerateExtemporeTopicInput,
  retries: number = 3
): Promise<GenerateExtemporeTopicOutput> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Topic generation attempt ${attempt}/${retries}`);
      return await generateExtemporeTopicFlow(input);
    } catch (error) {
      console.error(`Topic generation attempt ${attempt} failed:`, error);
      
      // Check if it's a 503 Service Unavailable error
      if (error instanceof Error && error.message.includes('503')) {
        if (attempt < retries) {
          // Wait with exponential backoff: 2s, 4s, 8s
          const delay = Math.pow(2, attempt) * 1000;
          console.log(`Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      // If it's the last attempt or a different error, return a fallback topic
      if (attempt === retries) {
        console.error('All attempts failed, returning fallback topic');
        return createFallbackTopic();
      }
    }
  }
  
  // Should never reach here, but just in case
  return createFallbackTopic();
}

function createFallbackTopic(): GenerateExtemporeTopicOutput {
  const fallbackTopics = [
    "The importance of effective communication",
    "How technology has changed our daily lives",
    "The value of continuous learning",
    "My ideal weekend activity",
    "The benefits of reading books",
    "How to maintain work-life balance",
    "The impact of social media on relationships",
    "A skill I would like to learn",
    "The importance of time management",
    "My favorite hobby and why I enjoy it"
  ];
  
  const randomIndex = Math.floor(Math.random() * fallbackTopics.length);
  return {
    topic: fallbackTopics[randomIndex]
  };
}

const prompt = ai.definePrompt({
  name: 'generateExtemporeTopicPrompt',
  output: {schema: GenerateExtemporeTopicOutputSchema},
  prompt: `You are an AI assistant that provides interesting and diverse topics for extempore speeches.
Please generate one random topic. The topic should be suitable for a 1-2 minute speech.
Avoid overly controversial or highly niche topics. Aim for general interest.

Examples of good topics:
- The future of remote work.
- The importance of lifelong learning.
- My favorite travel destination.
- The impact of social media on society.
- A book that changed my perspective.

Generate one such topic.
`,
});

const generateExtemporeTopicFlow = ai.defineFlow(
  {
    name: 'generateExtemporeTopicFlow',
    inputSchema: GenerateExtemporeTopicInputSchema,
    outputSchema: GenerateExtemporeTopicOutputSchema,
  },
  async (_input) => { 
    const {output} = await prompt({}); 
    return output!;
  }
);
