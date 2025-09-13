import type { AnalyzeInterviewAnswersOutput } from '@/ai/flows/analyze-interview-answers';

export interface InterviewConfig {
  jobRole: string;
  techStack?: string;
  numQuestions: number;
  difficulty: string; // Added difficulty
}

export interface UserAnswer {
  question: string;
  answerText: string;
}

export interface FeedbackResult extends UserAnswer {
  analysis: AnalyzeInterviewAnswersOutput | null;
  error?: string;
}

export interface StudyContent {
  topic: string;
  summary: string;
  keyPoints: string[];
  detailedExplanation: string;
  isGenerating: boolean;
}

export type AppState = 'setup' | 'interview' | 'analyzing' | 'feedback';
