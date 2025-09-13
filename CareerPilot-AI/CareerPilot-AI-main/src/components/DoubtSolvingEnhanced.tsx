'use client';

import { BookOpen, Brain, Image as ImageIcon, Lightbulb, Mic, MicOff, Send, Target } from 'lucide-react';
import React, { useRef, useState } from 'react';

interface Doubt {
  id: string;
  question: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timestamp: Date;
  answer?: string;
  isResolved: boolean;
  attachments?: Array<{
    type: 'image' | 'text' | 'voice';
    url: string;
    name: string;
  }>;
}

interface AIResponse {
  answer: string;
  explanation: string;
  relatedTopics: string[];
  difficulty: string;
  confidence: number;
}

const DoubtSolvingEnhanced: React.FC = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [currentDoubt, setCurrentDoubt] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: '📐', color: 'blue' },
    { id: 'physics', name: 'Physics', icon: '⚛️', color: 'purple' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'green' },
    { id: 'biology', name: 'Biology', icon: '🧬', color: 'emerald' },
    { id: 'computer-science', name: 'Computer Science', icon: '💻', color: 'indigo' },
    { id: 'english', name: 'English', icon: '📚', color: 'red' },
    { id: 'history', name: 'History', icon: '🏛️', color: 'yellow' },
    { id: 'general', name: 'General', icon: '🎯', color: 'gray' }
  ];

  // Real AI API call
  const solveDoubtWithAI = async (question: string, subject: string, attachments: File[]): Promise<AIResponse> => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          subject,
          attachments: attachments.map(f => ({ name: f.name, type: f.type }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return {
        answer: data.answer,
        explanation: data.explanation,
        relatedTopics: data.relatedTopics,
        difficulty: data.difficulty,
        confidence: data.confidence
      };

    } catch (error) {
      console.error('AI API Error:', error);

      // Fallback to simulated response
      return {
        answer: `I apologize, but I'm currently experiencing technical difficulties processing your ${subject} question. Here's some general guidance:\n\n` +
                `1. Break down the problem into smaller, manageable parts\n` +
                `2. Identify the key concepts and formulas involved\n` +
                `3. Work through the solution step by step\n` +
                `4. Double-check your work and ensure your answer makes sense\n\n` +
                `For immediate assistance, please try rephrasing your question or contact your instructor.`,
        explanation: 'This is a fallback response due to temporary technical issues with our AI service.',
        relatedTopics: [`${subject} Fundamentals`, 'Problem Solving', 'Study Strategies'],
        difficulty: 'intermediate',
        confidence: 0.5
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitDoubt = async () => {
    if (!currentDoubt.trim()) return;

    const newDoubt: Doubt = {
      id: Date.now().toString(),
      question: currentDoubt,
      subject: selectedSubject,
      difficulty: 'beginner',
      timestamp: new Date(),
      isResolved: false,
      attachments: attachments.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : 'text',
        url: URL.createObjectURL(file),
        name: file.name
      }))
    };

    setDoubts(prev => [newDoubt, ...prev]);

    // Get AI response
    const aiResponse = await solveDoubtWithAI(currentDoubt, selectedSubject, attachments);

    // Update doubt with AI response
    setDoubts(prev => prev.map(doubt =>
      doubt.id === newDoubt.id
        ? {
            ...doubt,
            answer: aiResponse.answer,
            difficulty: aiResponse.difficulty as 'beginner' | 'intermediate' | 'advanced',
            isResolved: true
          }
        : doubt
    ));

    // Reset form
    setCurrentDoubt('');
    setAttachments([]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'voice-doubt.wav', { type: 'audio/wav' });
        setAttachments(prev => [...prev, audioFile]);

        // Here you would transcribe the audio to text
        setCurrentDoubt(prev => prev + ' [Voice recording attached - transcription pending...]');
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getSubjectColor = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.color || 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Doubt Solving Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Get instant, detailed solutions to your academic questions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Brain className="mr-3 text-blue-600" size={24} />
                Ask Your Doubt
              </h2>

              {/* Subject Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Subject
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {subjects.slice(0, 6).map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm ${
                        selectedSubject === subject.id
                          ? `border-${subject.color}-500 bg-${subject.color}-50 dark:bg-${subject.color}-900/20`
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <span className="mr-2" role="img" aria-label={subject.name}>
                        {subject.icon}
                      </span>
                      {subject.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Question
                </label>
                <textarea
                  value={currentDoubt}
                  onChange={(e) => setCurrentDoubt(e.target.value)}
                  placeholder="Describe your doubt in detail..."
                  className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Attachments */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Attachments
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Upload image"
                  >
                    <ImageIcon className="mx-auto" size={20} />
                    <span className="text-xs">Image</span>
                  </button>
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex-1 p-2 border rounded-lg transition-colors ${
                      isRecording
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    aria-label={isRecording ? "Stop recording" : "Start voice recording"}
                  >
                    {isRecording ? <MicOff className="mx-auto" size={20} /> : <Mic className="mx-auto" size={20} />}
                    <span className="text-xs">{isRecording ? 'Stop' : 'Voice'}</span>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload files"
                />
              </div>

              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attached Files ({attachments.length})
                  </h4>
                  <div className="space-y-1">
                    {attachments.map((file, index) => (
                      <div key={index} className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmitDoubt}
                disabled={!currentDoubt.trim() || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Solving...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Get AI Solution
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Lightbulb className="mr-3 text-yellow-600" size={24} />
                Solutions & Explanations
              </h2>

              {doubts.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500 dark:text-gray-400">
                    No doubts yet. Ask your first question to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {doubts.map((doubt) => (
                    <div key={doubt.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      {/* Question */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(doubt.difficulty)}`}>
                              {doubt.difficulty}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs bg-${getSubjectColor(doubt.subject)}-100 text-${getSubjectColor(doubt.subject)}-800 dark:bg-${getSubjectColor(doubt.subject)}-900 dark:text-${getSubjectColor(doubt.subject)}-200`}>
                              {subjects.find(s => s.id === doubt.subject)?.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {doubt.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {doubt.question}
                        </p>
                      </div>

                      {/* Answer */}
                      {doubt.answer ? (
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center">
                            <Target className="mr-2" size={16} />
                            AI Solution
                          </h4>
                          <div className="text-blue-800 dark:text-blue-300 whitespace-pre-line">
                            {doubt.answer}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                          <p className="text-yellow-800 dark:text-yellow-300">
                            🤖 AI is analyzing your question...
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtSolvingEnhanced;
