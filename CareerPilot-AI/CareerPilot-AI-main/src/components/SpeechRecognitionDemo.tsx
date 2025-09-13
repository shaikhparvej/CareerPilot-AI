// @ts-nocheck
"use client";

import React from 'react';
import useSpeechRecognition from '../hooks/use-speech-recognition';
import SpeechErrorHandler from './SpeechErrorHandler';

interface SpeechRecognitionDemoProps {
  onTranscriptChange?: (transcript: string) => void;
  language?: string;
}

export const SpeechRecognitionDemo: React.FC<SpeechRecognitionDemoProps> = ({
  onTranscriptChange,
  language = "en-US"
}) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    clearError
  } = useSpeechRecognition();

  React.useEffect(() => {
    if (onTranscriptChange) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  const handleStartListening = () => {
    clearError();
    startListening(language);
  };

  const handleRetry = () => {
    clearError();
    if (!isListening) {
      startListening(language);
    }
  };

  return (
    <div className="space-y-4">
      <SpeechErrorHandler
        error={error}
        isSupported={isSupported}
        onRetry={handleRetry}
        onClearError={clearError}
      />

      <div className="flex space-x-2">
        <button
          onClick={handleStartListening}
          disabled={isListening || !isSupported}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isListening
              ? 'bg-red-500 text-white cursor-not-allowed'
              : isSupported
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isListening ? 'Listening...' : 'Start Listening'}
        </button>

        <button
          onClick={stopListening}
          disabled={!isListening}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Stop
        </button>

        <button
          onClick={resetTranscript}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="space-y-2">
        <div className="p-3 bg-gray-100 rounded-md min-h-[100px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Final Transcript:
          </label>
          <p className="text-gray-900">{transcript || 'No speech detected yet...'}</p>
        </div>

        {interimTranscript && (
          <div className="p-3 bg-blue-50 rounded-md">
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Current Speech:
            </label>
            <p className="text-blue-900 italic">{interimTranscript}</p>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        <p>Status: {isListening ? '🎤 Listening...' : '⏹️ Not listening'}</p>
        <p>Language: {language}</p>
        <p>Browser Support: {isSupported ? '✅ Supported' : '❌ Not supported'}</p>
      </div>
    </div>
  );
};

export default SpeechRecognitionDemo;
