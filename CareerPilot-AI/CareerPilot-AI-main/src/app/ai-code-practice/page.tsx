"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Brain, CheckCircle, Clock, Code, PlayCircle, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CodePracticePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const difficulties = [
    {
      id: 'beginner',
      name: 'Beginner',
      color: 'green',
      description: 'Basic syntax and simple algorithms',
      problems: 25
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      color: 'yellow',
      description: 'Data structures and complex logic',
      problems: 35
    },
    {
      id: 'advanced',
      name: 'Advanced',
      color: 'red',
      description: 'Advanced algorithms and optimization',
      problems: 20
    }
  ];

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚡' },
    { id: 'go', name: 'Go', icon: '🔵' }
  ];

  const problems = [
    {
      id: 1,
      title: 'Two Sum Problem',
      difficulty: 'beginner',
      solved: true,
      time: '15 min',
      tags: ['Arrays', 'Hash Table']
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      difficulty: 'beginner',
      solved: true,
      time: '20 min',
      tags: ['Linked List', 'Recursion']
    },
    {
      id: 3,
      title: 'Binary Tree Traversal',
      difficulty: 'intermediate',
      solved: false,
      time: '30 min',
      tags: ['Tree', 'DFS', 'BFS']
    },
    {
      id: 4,
      title: 'Dynamic Programming - Fibonacci',
      difficulty: 'intermediate',
      solved: false,
      time: '25 min',
      tags: ['DP', 'Optimization']
    },
    {
      id: 5,
      title: 'Graph Shortest Path',
      difficulty: 'advanced',
      solved: false,
      time: '45 min',
      tags: ['Graph', 'Dijkstra', 'BFS']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/dashboard"
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Code Practice
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Sharpen your coding skills with AI-powered challenges
            </p>
          </div>
        </motion.div>

        {/* Language Selection */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Choose Programming Language
          </h2>
          <div className="flex gap-3 flex-wrap">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedLanguage === language.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-purple-300'
                }`}
              >
                <span className="mr-2">{language.icon}</span>
                {language.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Difficulty Selection */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Select Difficulty Level
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {difficulties.map((difficulty) => (
              <motion.div
                key={difficulty.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer border-2 transition-all ${
                  selectedDifficulty === difficulty.id
                    ? 'border-purple-500 shadow-xl'
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDifficulty(difficulty.id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    difficulty.color === 'green' ? 'bg-green-500' :
                    difficulty.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {difficulty.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {difficulty.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Code className="w-4 h-4" />
                  <span>{difficulty.problems} problems</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Problems List */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Practice Problems
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Trophy className="w-4 h-4" />
              <span>2/5 completed</span>
            </div>
          </div>

          <div className="grid gap-4">
            {problems.map((problem) => (
              <motion.div
                key={problem.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all ${
                  selectedDifficulty && problem.difficulty !== selectedDifficulty ? 'opacity-50' : ''
                }`}
                whileHover={{ scale: selectedDifficulty && problem.difficulty !== selectedDifficulty ? 1 : 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      problem.solved ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'
                    }`}>
                      {problem.solved ?
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" /> :
                        <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      }
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {problem.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{problem.time}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          problem.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          problem.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {problem.difficulty}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {problem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {problem.solved && (
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                        Solved ✓
                      </span>
                    )}
                    <button
                      className={`p-2 rounded-lg transition-colors ${
                        problem.solved ?
                        'bg-green-600 hover:bg-green-700 text-white' :
                        'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      title={problem.solved ? "Review solution" : "Start problem"}
                    >
                      <PlayCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Features */}
        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            AI-Powered Features
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg w-fit mx-auto mb-3">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Hints</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">AI provides contextual hints when you&apos;re stuck</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit mx-auto mb-3">
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Code Review</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get detailed feedback on your solutions</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg w-fit mx-auto mb-3">
                <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Personalized Path</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">AI adapts difficulty based on your progress</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
