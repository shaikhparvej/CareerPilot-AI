'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Mic, MicOff, Camera, CameraOff, Settings } from 'lucide-react';

export default function MockInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [difficultyLevel, setDifficultyLevel] = useState('medium');
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

  const interviewQuestions = {
    general: [
      "Tell me about yourself and your background.",
      "Why are you interested in this position?",
      "What are your greatest strengths and weaknesses?",
      "Where do you see yourself in 5 years?",
      "Why are you leaving your current job?"
    ],
    technical: [
      "Explain the difference between async and sync operations.",
      "What is the time complexity of sorting algorithms?",
      "How would you optimize a slow database query?",
      "Explain the concept of RESTful APIs.",
      "What are design patterns and give examples?"
    ],
    behavioral: [
      "Describe a challenging project you worked on.",
      "How do you handle stress and pressure?",
      "Tell me about a time you had to work with a difficult team member.",
      "Describe a situation where you had to learn something quickly.",
      "How do you prioritize tasks when everything seems urgent?"
    ]
  };

  const startInterview = () => {
    setIsInterviewStarted(true);
    setCurrentQuestion(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < interviewQuestions[selectedCategory].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const endInterview = () => {
    setIsInterviewStarted(false);
    setIsRecording(false);
    setCurrentQuestion(0);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-2">
            🎯 AI-Powered Mock Interview
          </h1>
          <p className="text-blue-200">
            Practice your interview skills with our AI system
          </p>
        </div>

        {!isInterviewStarted ? (
          /* Interview Setup */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Settings Panel */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Interview Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Interview Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="general">General Questions</option>
                    <option value="technical">Technical Questions</option>
                    <option value="behavioral">Behavioral Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Difficulty Level</label>
                  <select
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="medium">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-medium">Audio & Video Settings</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsMicEnabled(!isMicEnabled)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isMicEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                      } text-white`}
                    >
                      {isMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      Microphone
                    </button>
                    <button
                      onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isCameraEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                      } text-white`}
                    >
                      {isCameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                      Camera
                    </button>
                  </div>
                </div>

                <button
                  onClick={startInterview}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  Start Mock Interview
                </button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Preview Questions</h3>
              <div className="space-y-4">
                {interviewQuestions[selectedCategory].slice(0, 3).map((question, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="text-blue-300 font-medium mb-2">Question {index + 1}</div>
                    <div className="text-white">{question}</div>
                  </div>
                ))}
                <div className="text-blue-200 text-sm text-center">
                  +{interviewQuestions[selectedCategory].length - 3} more questions
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Interview Interface */
          <div className="space-y-6">
            {/* Question Display */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
              <div className="text-blue-300 font-medium mb-4">
                Question {currentQuestion + 1} of {interviewQuestions[selectedCategory].length}
              </div>
              <h2 className="text-2xl font-bold text-white mb-6">
                {interviewQuestions[selectedCategory][currentQuestion]}
              </h2>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / interviewQuestions[selectedCategory].length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Video/Audio Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Feed */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-4">
                  {isCameraEnabled ? (
                    <div className="text-white text-center">
                      <Camera className="w-16 h-16 mx-auto mb-4" />
                      <div>Camera Feed (Simulated)</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      <CameraOff className="w-16 h-16 mx-auto mb-4" />
                      <div>Camera Disabled</div>
                    </div>
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={toggleRecording}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      isRecording 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-5 h-5" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Start Recording
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">Controls</h3>
                <div className="space-y-3">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Previous Question
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestion === interviewQuestions[selectedCategory].length - 1}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Next Question
                  </button>
                  <button
                    onClick={endInterview}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    End Interview
                  </button>
                </div>

                {/* Audio Controls */}
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-3">Audio/Video</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsMicEnabled(!isMicEnabled)}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                        isMicEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                      } text-white`}
                    >
                      {isMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      {isMicEnabled ? 'Mute' : 'Unmute'}
                    </button>
                    <button
                      onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                        isCameraEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                      } text-white`}
                    >
                      {isCameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                      {isCameraEnabled ? 'Turn Off' : 'Turn On'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">🚀 Interview Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-blue-300 mb-2">AI Feedback</h4>
              <p className="text-blue-200 text-sm">Get instant feedback on your responses</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-green-300 mb-2">Video Recording</h4>
              <p className="text-green-200 text-sm">Record and review your performance</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-purple-300 mb-2">Multiple Categories</h4>
              <p className="text-purple-200 text-sm">Practice different types of questions</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Progress Tracking</h4>
              <p className="text-yellow-200 text-sm">Track your improvement over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}