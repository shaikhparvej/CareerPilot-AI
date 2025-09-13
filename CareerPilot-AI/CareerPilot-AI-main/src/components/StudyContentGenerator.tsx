import { BookOpen, Brain, FileText, HelpCircle, Loader2, Play, Square, Target, Volume2 } from 'lucide-react';
import React, { useState } from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface StudyContentGeneratorProps {
  className?: string;
}

interface GeneratedContent {
  content?: string;
  flashcards?: Array<{
    front: string;
    back: string;
    difficulty: string;
    category: string;
  }>;
  multipleChoice?: Array<{
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }>;
  shortAnswer?: Array<{
    question: string;
    answer: string;
  }>;
  rawContent?: string;
}

const StudyContentGenerator: React.FC<StudyContentGeneratorProps> = ({ className = '' }) => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('mathematics');
  const [learningLevel, setLearningLevel] = useState('intermediate');
  const [contentType, setContentType] = useState('summary');
  const [duration, setDuration] = useState('7');
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { speak, stopSpeaking, isSpeaking, speechRate, setSpeechRate } = useTextToSpeech();

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: '📐' },
    { id: 'physics', name: 'Physics', icon: '⚛️' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
    { id: 'biology', name: 'Biology', icon: '🧬' },
    { id: 'computer-science', name: 'Computer Science', icon: '💻' },
    { id: 'english', name: 'English', icon: '📚' },
    { id: 'history', name: 'History', icon: '🏛️' },
    { id: 'general', name: 'General', icon: '🎯' }
  ];

  const contentTypes = [
    { id: 'summary', name: 'Summary', icon: FileText, description: 'Comprehensive topic overview' },
    { id: 'study-plan', name: 'Study Plan', icon: Target, description: 'Structured learning schedule' },
    { id: 'quiz', name: 'Quiz', icon: HelpCircle, description: 'Practice questions and tests' },
    { id: 'flashcards', name: 'Flashcards', icon: BookOpen, description: 'Memory cards for quick review' },
    { id: 'practice-problems', name: 'Practice Problems', icon: Brain, description: 'Exercises and solutions' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-study-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic.trim(),
          subject,
          learningLevel,
          contentType,
          duration: parseInt(duration)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const result = await response.json();
      if (result.success) {
        setContent(result.data);
      } else {
        throw new Error(result.error || 'Failed to generate content');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  const exportContent = () => {
    if (!content) return;

    const dataStr = JSON.stringify(content, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `${topic.replace(/\s+/g, '_')}_${contentType}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-center mb-6">
        <Brain className="text-white/80 mr-2" size={24} />
        <h3 className="text-xl font-semibold text-white">AI Study Assistant</h3>
      </div>

      <div className="mb-6">
        <div className="flex space-x-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic to study (e.g., 'Photosynthesis', 'Machine Learning')"
            className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors duration-200 flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2\" size={20} />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-200 text-sm">{error}</p>
          <p className="text-red-200/80 text-xs mt-1">
            Make sure to add your Gemini API key to the .env file
          </p>
        </div>
      )}

      {content && (
        <div className="mb-6 flex items-center justify-between bg-white/5 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={speakFullContent}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-white text-sm transition-colors duration-200"
            >
              {isSpeaking ? <Square size={16} /> : <Play size={16} />}
              <span>{isSpeaking ? 'Stop' : 'Read Aloud'}</span>
            </button>

            <Volume2 size={16} className="text-white/60" />
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-20 h-2 bg-white/20 rounded-lg appearance-none"
            />
            <span className="text-xs text-white/60">Speed</span>
          </div>
        </div>
      )}

      {content && (
        <div className="space-y-6">

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">Summary</h4>
              <button
                onClick={() => handleSpeak(content.summary)}
                className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Read summary aloud"
              >
                {isSpeaking ? <Square size={18} /> : <Play size={18} />}
              </button>
            </div>
            <p className="text-white/90 leading-relaxed">{content.summary}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">Key Concepts</h4>
              <button
                onClick={() => handleSpeak(content.keyPoints.join('. '))}
                className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Read key points aloud"
              >
                {isSpeaking ? <Square size={18} /> : <Play size={18} />}
              </button>
            </div>
            <ul className="space-y-2">
              {content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white text-sm rounded-full flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">Detailed Explanation</h4>
              <button
                onClick={() => handleSpeak(content.detailedExplanation)}
                className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Read explanation aloud"
              >
                {isSpeaking ? <Square size={18} /> : <Play size={18} />}
              </button>
            </div>
            <div className="text-white/90 leading-relaxed whitespace-pre-line">
              {content.detailedExplanation}
            </div>
          </div>
        </div>
      )}

      {!content && !isLoading && (
        <div className="text-center py-12">
          <Brain className="mx-auto mb-4 text-white/40" size={48} />
          <p className="text-white/60">Enter a topic to generate AI-powered study content</p>
        </div>
      )}
    </div>
  );
};

export default StudyContentGenerator;
