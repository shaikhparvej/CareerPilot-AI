"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, Award, Book, Globe, Headphones, MessageCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LanguageLearningPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState(0);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', level: 'Advanced' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', level: 'Intermediate' },
    { code: 'fr', name: 'French', flag: '🇫🇷', level: 'Beginner' },
    { code: 'de', name: 'German', flag: '🇩🇪', level: 'Beginner' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', level: 'Beginner' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', level: 'Beginner' },
  ];

  const lessons = [
    {
      title: 'Basic Greetings',
      duration: '10 min',
      type: 'Speaking',
      completed: true,
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      title: 'Common Phrases',
      duration: '15 min',
      type: 'Vocabulary',
      completed: true,
      icon: <Book className="w-5 h-5" />
    },
    {
      title: 'Pronunciation Practice',
      duration: '20 min',
      type: 'Listening',
      completed: false,
      icon: <Headphones className="w-5 h-5" />
    },
    {
      title: 'Conversation Starters',
      duration: '25 min',
      type: 'Speaking',
      completed: false,
      icon: <MessageCircle className="w-5 h-5" />
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8">
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
              Language Learning
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Master new languages with AI-powered interactive lessons
            </p>
          </div>
        </motion.div>

        {!selectedLanguage ? (
          /* Language Selection */
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Choose Your Language
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Select a language to start your learning journey
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {languages.map((language, index) => (
                <motion.div
                  key={language.code}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedLanguage(language.code)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{language.flag}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {language.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        language.level === 'Advanced' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        language.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {language.level}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features Overview */}
            <motion.div
              className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Learning Features
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg w-fit mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Conversations</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Practice speaking with AI tutors</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg w-fit mx-auto mb-3">
                    <Headphones className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pronunciation Training</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Perfect your accent with AI feedback</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg w-fit mx-auto mb-3">
                    <Book className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Vocabulary Building</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Learn words in context</p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg w-fit mx-auto mb-3">
                    <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Progress Tracking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monitor your improvement</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Lesson Dashboard */
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {languages.find(l => l.code === selectedLanguage)?.flag}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {languages.find(l => l.code === selectedLanguage)?.name} Lessons
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Continue your learning journey
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLanguage(null)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Change Language
              </button>
            </div>

            {/* Progress Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
                <span className="text-sm text-gray-600 dark:text-gray-300">2/4 lessons completed</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full w-1/2"></div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="grid gap-4">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                    lesson.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        lesson.completed ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'
                      }`}>
                        {lesson.completed ?
                          <Award className="w-5 h-5 text-green-600 dark:text-green-400" /> :
                          lesson.icon
                        }
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                          <span>{lesson.duration}</span>
                          <span>•</span>
                          <span>{lesson.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {lesson.completed && (
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                          Completed
                        </span>
                      )}
                      <button
                        className={`p-2 rounded-lg transition-colors ${
                        lesson.completed ?
                        'bg-green-600 hover:bg-green-700 text-white' :
                        'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                        title={lesson.completed ? "Review lesson" : "Start lesson"}
                      >
                        <PlayCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
